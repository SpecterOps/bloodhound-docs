import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const opengraphSnippetDir = join(repoRoot, 'docs/snippets/opengraph');
const librarySnippetDir = join(opengraphSnippetDir, 'library');

const readJson = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'));

const readCategoryDirectory = (directory) =>
  readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => readJson(join(directory, fileName)));

const compareByOrderThenName = (left, right) =>
  left.order - right.order || left.name.localeCompare(right.name);

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

const validateGroup = (group) => {
  if (!group || typeof group !== 'object' || Array.isArray(group)) {
    fail('Each library group must be an object.');
  }

  validateRequiredString(group.id, 'Each library group id');
  validateRequiredString(group.name, `Group "${group.id}" name`);
  validateRequiredString(group.description, `Group "${group.id}" description`);

  if (!Number.isInteger(group.order)) {
    fail(`Group "${group.id}" must define an integer order.`);
  }
};

const validateExtension = (extension, label) => {
  if (!extension || typeof extension !== 'object' || Array.isArray(extension)) {
    fail(`${label} must be an object.`);
  }

  validateRequiredString(extension.name, `${label} name`);
  validateRequiredString(extension.vendor, `Extension "${extension.name}" vendor`);
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

const validateCategory = (category, knownGroups) => {
  if (!category || typeof category !== 'object' || Array.isArray(category)) {
    fail('Each library category must be an object.');
  }

  validateRequiredString(category.name, 'Each library category name');
  validateRequiredString(category.group, `Category "${category.name}" group`);

  if (!knownGroups.has(category.group)) {
    fail(
      `Category "${category.name}" references unknown group "${category.group}". Valid groups: ${[
        ...knownGroups,
      ].join(', ')}`,
    );
  }

  if (!Number.isInteger(category.order)) {
    fail(`Category "${category.name}" must define an integer order.`);
  }

  validateExtensionList(
    category.extensions,
    `Category "${category.name}"`,
  );
};

const libraryCategories = readCategoryDirectory(
  join(librarySnippetDir, 'categories'),
);
const libraryGroups = readJson(join(librarySnippetDir, 'groups.json'));
const openGraphTools = readJson(join(librarySnippetDir, 'tools.json'));

if (!Array.isArray(libraryGroups)) {
  fail('Library groups must be an array.');
}

if (!Array.isArray(openGraphTools)) {
  fail('OpenGraph tools must be an array.');
}

for (const group of libraryGroups) {
  validateGroup(group);
}

assertUnique(libraryGroups, (group) => group.id, 'library group id');

const knownGroupIds = new Set(libraryGroups.map((group) => group.id));

for (const category of libraryCategories) {
  validateCategory(category, knownGroupIds);
}

assertUnique(libraryCategories, (category) => category.name, 'library category name');

validateExtensionList(openGraphTools, 'OpenGraph tools');

libraryGroups.sort(compareByOrderThenName);
libraryCategories.sort((left, right) => left.name.localeCompare(right.name));

const generatedFile = join(librarySnippetDir, 'data.generated.jsx');
const generatedContent = `// Generated from the OpenGraph library JSON files. Do not edit directly.
// Edit the JSON source files, then run:
// node scripts/generate-opengraph-library-data.mjs

export const libraryCategories = ${JSON.stringify(libraryCategories, null, 2)};

export const libraryGroups = ${JSON.stringify(libraryGroups, null, 2)};

export const openGraphTools = ${JSON.stringify(openGraphTools, null, 2)};
`;

writeFileSync(generatedFile, generatedContent);
