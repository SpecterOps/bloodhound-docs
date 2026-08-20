import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const opengraphSnippetDir = join(repoRoot, 'docs/snippets/opengraph');
const librarySnippetDir = join(opengraphSnippetDir, 'library');
const libraryDataDir = join(librarySnippetDir, 'data');

const readJson = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'));

const readCategoryDirectory = (directory) =>
  readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => readJson(join(directory, fileName)));

const compareByName = (left, right) => left.name.localeCompare(right.name);

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

const assertUnique = (items, getKey, label) => {
  const seen = new Set();

  for (const item of items) {
    const key = getKey(item);

    if (seen.has(key)) {
      fail(`Duplicate ${label}: ${key}`);
    }

    seen.add(key);
  }
};

const validateExtension = (extension, label) => {
  if (!extension || typeof extension !== 'object' || Array.isArray(extension)) {
    fail(`${label} must be an object.`);
  }

  validateRequiredString(extension.name, `${label} name`);
  validateRequiredString(
    extension.description,
    `Extension "${extension.name}" description`,
  );
  validateRequiredString(extension.href, `Extension "${extension.name}" href`);
};

const validateExtensionList = (extensions, label) => {
  if (!Array.isArray(extensions)) {
    fail(`${label} extensions must be an array.`);
  }

  for (const extension of extensions) {
    validateExtension(extension, `${label} extension`);
  }
};

const validateCategory = (category) => {
  if (!category || typeof category !== 'object' || Array.isArray(category)) {
    fail('Each library category must be an object.');
  }

  validateRequiredString(category.name, 'Each library category name');

  validateExtensionList(
    category.extensions,
    `Category "${category.name}"`,
  );
};

const libraryCategories = readCategoryDirectory(
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

for (const category of libraryCategories) {
  validateCategory(category);
}

assertUnique(libraryCategories, (category) => category.name, 'library category name');

validateExtensionList(enterpriseExtensions, 'Enterprise extensions');
validateExtensionList(integrations, 'Integrations');
validateExtensionList(openGraphTools, 'OpenGraph tools');

libraryCategories.sort(compareByName);
enterpriseExtensions.sort(compareByName);
integrations.sort(compareByName);

const generatedFile = join(libraryDataDir, 'data.generated.jsx');
const generatedContent = `// Generated from the OpenGraph library JSON files. Do not edit directly.
// Edit the JSON source files, then run:
// node scripts/generate-opengraph-library-data.mjs

export const libraryCategories = ${JSON.stringify(libraryCategories, null, 2)};

export const enterpriseExtensions = ${JSON.stringify(enterpriseExtensions, null, 2)};

export const integrations = ${JSON.stringify(integrations, null, 2)};

export const openGraphTools = ${JSON.stringify(openGraphTools, null, 2)};
`;

writeFileSync(generatedFile, generatedContent);
