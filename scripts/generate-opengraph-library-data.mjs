import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const opengraphSnippetDir = join(repoRoot, 'docs/snippets/opengraph');
const librarySnippetDir = join(opengraphSnippetDir, 'library');
const libraryDataDir = join(librarySnippetDir, 'data');
const gridFile = join(librarySnippetDir, 'grid.jsx');
const generatedFile = join(libraryDataDir, 'data.generated.jsx');
const checkOnly = process.argv.includes('--check');

const maintainerValues = new Set(['specterops', 'community']);
const builtInIconTypes = new Set(['cross-platform', 'key', 'terminal']);
const textTileIconTypes = new Set([
  'network',
  'scim',
  'servicenow',
  'splunk',
  'xsoar',
]);

const readJson = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'));

const readCategoryDirectory = (directory) =>
  readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => readJson(join(directory, fileName)));

const compareByName = (left, right) => left.name.localeCompare(right.name);
const normalizeKey = (value) => value.trim().toLowerCase();

const fail = (message) => {
  throw new Error(`OpenGraph library data generation failed: ${message}`);
};

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const validateRequiredString = (value, label) => {
  if (!isNonEmptyString(value)) {
    fail(`${label} must be a non-empty string.`);
  }
};

const validateOptionalString = (value, label) => {
  if (value !== undefined && !isNonEmptyString(value)) {
    fail(`${label} must be a non-empty string when present.`);
  }
};

const assertPlainObject = (value, label) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(`${label} must be an object.`);
  }
};

const assertUnique = (items, getKey, label) => {
  const seen = new Set();

  for (const item of items) {
    const key = normalizeKey(getKey(item));

    if (seen.has(key)) {
      fail(`Duplicate ${label}: ${key}`);
    }

    seen.add(key);
  }
};

const validateExternalUrl = (value, label) => {
  let url;

  try {
    url = new URL(value);
  } catch {
    fail(`${label} must be a valid URL.`);
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    fail(`${label} must use http or https.`);
  }
};

const validateInternalHref = (href, label) => {
  const routePath = href.split(/[?#]/)[0];

  if (!routePath.startsWith('/') || routePath.includes('..')) {
    fail(`${label} must be an absolute docs path that does not contain "..".`);
  }

  const docsPath = join(repoRoot, 'docs', routePath);
  const candidates = [
    `${docsPath}.mdx`,
    join(docsPath, 'index.mdx'),
  ];

  if (!candidates.some((candidate) => existsSync(candidate))) {
    fail(`${label} points to a missing docs page: ${href}`);
  }
};

const validateHref = (href, label) => {
  validateRequiredString(href, label);

  if (href.startsWith('/')) {
    validateInternalHref(href, label);
    return;
  }

  validateExternalUrl(href, label);
};

const readVendorIconMap = () => {
  const gridContent = readFileSync(gridFile, 'utf8');
  const entries = new Map();
  const iconEntryPattern =
    /^\s+([a-zA-Z0-9_-]+): \{ src: '([^']+)', wide: (true|false) \},$/gm;

  for (const match of gridContent.matchAll(iconEntryPattern)) {
    entries.set(match[1], {
      src: match[2],
      wide: match[3] === 'true',
    });
  }

  if (entries.size === 0) {
    fail('No vendorIconMap entries were found in grid.jsx.');
  }

  return entries;
};

const vendorIconMap = readVendorIconMap();

const validateMappedIconAssets = () => {
  for (const [type, icon] of vendorIconMap.entries()) {
    if (!icon.src.startsWith('/assets/icons/vendor/')) {
      fail(`Mapped icon "${type}" must point to /assets/icons/vendor/.`);
    }

    const assetPath = join(repoRoot, 'docs', icon.src);

    if (!existsSync(assetPath)) {
      fail(`Mapped icon "${type}" points to a missing asset: ${icon.src}`);
    }
  }
};

const validateIcon = (icon, label) => {
  assertPlainObject(icon, label);
  validateRequiredString(icon.type, `${label} type`);
  validateRequiredString(icon.label, `${label} label`);

  if (
    vendorIconMap.has(icon.type) ||
    builtInIconTypes.has(icon.type) ||
    textTileIconTypes.has(icon.type)
  ) {
    return;
  }

  fail(
    `${label} type "${icon.type}" must be mapped in vendorIconMap or listed as an intentional text tile.`,
  );
};

const validateAuthor = (author, label) => {
  assertPlainObject(author, label);
  validateRequiredString(author.name, `${label} name`);
  validateOptionalString(author.organization, `${label} organization`);

  if (author.href !== undefined) {
    validateExternalUrl(author.href, `${label} href`);
  }

  if (author.organizationHref !== undefined) {
    validateExternalUrl(author.organizationHref, `${label} organizationHref`);
  }
};

const validateAuthors = (authors, label, required) => {
  if (authors === undefined) {
    if (required) {
      fail(`${label} authors must be an array.`);
    }

    return;
  }

  if (!Array.isArray(authors)) {
    fail(`${label} authors must be an array.`);
  }

  if (required && authors.length === 0) {
    fail(`${label} authors must include at least one author.`);
  }

  for (const [index, author] of authors.entries()) {
    validateAuthor(author, `${label} author ${index + 1}`);
  }
};

const validateMaintainer = (maintainer, label, required) => {
  if (maintainer === undefined) {
    if (required) {
      fail(`${label} maintainer is required.`);
    }

    return;
  }

  if (!maintainerValues.has(maintainer)) {
    fail(`${label} maintainer must be "specterops" or "community".`);
  }
};

const validateExtension = (
  extension,
  label,
  {
    requireAuthors = false,
    requireIcon = false,
    requireMaintainer = false,
  } = {},
) => {
  assertPlainObject(extension, label);

  validateRequiredString(extension.name, `${label} name`);
  validateRequiredString(
    extension.description,
    `Extension "${extension.name}" description`,
  );
  validateHref(extension.href, `Extension "${extension.name}" href`);
  validateOptionalString(extension.action, `Extension "${extension.name}" action`);
  validateOptionalString(
    extension.vendorName,
    `Extension "${extension.name}" vendorName`,
  );
  validateMaintainer(
    extension.maintainer,
    `Extension "${extension.name}"`,
    requireMaintainer,
  );
  validateAuthors(
    extension.authors,
    `Extension "${extension.name}"`,
    requireAuthors,
  );

  if (extension.icon !== undefined) {
    validateIcon(extension.icon, `Extension "${extension.name}" icon`);
  } else if (requireIcon) {
    fail(`Extension "${extension.name}" icon is required.`);
  }
};

const validateExtensionList = (extensions, label, options) => {
  if (!Array.isArray(extensions)) {
    fail(`${label} extensions must be an array.`);
  }

  for (const extension of extensions) {
    validateExtension(extension, `${label} extension`, options);
  }
};

const validateCategory = (category) => {
  assertPlainObject(category, 'Each library category');

  validateRequiredString(category.name, 'Each library category name');
  validateOptionalString(
    category.shortName,
    `Category "${category.name}" shortName`,
  );
  validateIcon(category.icon, `Category "${category.name}" icon`);

  validateExtensionList(
    category.extensions,
    `Category "${category.name}"`,
    {
      requireAuthors: true,
      requireMaintainer: true,
    },
  );
};

const communityExtensions = readCategoryDirectory(
  join(libraryDataDir, 'extensions'),
);
const enterpriseExtensions = readJson(join(libraryDataDir, 'enterprise.json'));
const integrations = readJson(join(libraryDataDir, 'integrations.json'));
const openGraphTools = readJson(join(libraryDataDir, 'tools.json'));

if (!Array.isArray(enterpriseExtensions)) {
  fail('Enterprise extensions must be an array.');
}

if (!Array.isArray(integrations)) {
  fail('Integrations must be an array.');
}

if (!Array.isArray(openGraphTools)) {
  fail('OpenGraph tools must be an array.');
}

for (const category of communityExtensions) {
  validateCategory(category);
  assertUnique(
    category.extensions,
    (extension) => extension.name,
    `extension name in category "${category.name}"`,
  );
}

assertUnique(communityExtensions, (category) => category.name, 'library category name');
assertUnique(
  communityExtensions.flatMap((category) => category.extensions),
  (extension) => extension.name,
  'community extension name',
);

validateMappedIconAssets();
validateExtensionList(enterpriseExtensions, 'Enterprise extensions', {
  requireIcon: true,
});
validateExtensionList(integrations, 'Integrations', {
  requireIcon: true,
});
validateExtensionList(openGraphTools, 'OpenGraph tools', {
  requireAuthors: true,
  requireMaintainer: true,
});
assertUnique(enterpriseExtensions, (extension) => extension.name, 'enterprise extension name');
assertUnique(integrations, (integration) => integration.name, 'integration name');
assertUnique(openGraphTools, (tool) => tool.name, 'OpenGraph tool name');

const allEntries = [
  ...communityExtensions.flatMap((category) => category.extensions),
  ...enterpriseExtensions,
  ...integrations,
  ...openGraphTools,
];

assertUnique(allEntries, (entry) => entry.href, 'library entry href');

communityExtensions.sort(compareByName);
communityExtensions.forEach((category) => category.extensions.sort(compareByName));
enterpriseExtensions.sort(compareByName);
integrations.sort(compareByName);
openGraphTools.sort(compareByName);

const generatedContent = `// Generated from the OpenGraph library JSON files. Do not edit directly.
// Edit the JSON source files, then run:
// node scripts/generate-opengraph-library-data.mjs

export const communityExtensions = ${JSON.stringify(communityExtensions, null, 2)};

export const enterpriseExtensions = ${JSON.stringify(enterpriseExtensions, null, 2)};

export const integrations = ${JSON.stringify(integrations, null, 2)};

export const openGraphTools = ${JSON.stringify(openGraphTools, null, 2)};
`;

if (checkOnly) {
  const existingContent = readFileSync(generatedFile, 'utf8');

  if (existingContent !== generatedContent) {
    fail('Generated data is stale. Run `just generate-opengraph-library`.');
  }

  process.exit(0);
}

writeFileSync(generatedFile, generatedContent);
