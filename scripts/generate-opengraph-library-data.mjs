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
    .map((fileName) => readJson(join(directory, fileName)))
    .sort((left, right) => left.name.localeCompare(right.name));

const compareByOrderThenName = (left, right) =>
  left.order - right.order || left.name.localeCompare(right.name);

const fail = (message) => {
  throw new Error(`OpenGraph library data generation failed: ${message}`);
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
  if (typeof group.id !== 'string' || group.id.length === 0) {
    fail('Each library group must define an id.');
  }

  if (typeof group.name !== 'string' || group.name.length === 0) {
    fail(`Group "${group.id}" must define a name.`);
  }

  if (typeof group.description !== 'string' || group.description.length === 0) {
    fail(`Group "${group.id}" must define a description.`);
  }

  if (!Number.isInteger(group.order)) {
    fail(`Group "${group.id}" must define an integer order.`);
  }
};

const validateCategory = (category, knownGroups) => {
  if (typeof category.group !== 'string' || category.group.length === 0) {
    fail(`Category "${category.name}" must define a group.`);
  }

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
};

const libraryCategories = readCategoryDirectory(
  join(librarySnippetDir, 'categories'),
);
const libraryGroups = readJson(join(librarySnippetDir, 'groups.json')).sort(
  compareByOrderThenName,
);
const openGraphTools = readJson(join(librarySnippetDir, 'tools.json'));

assertUnique(libraryGroups, (group) => group.id, 'library group id');
assertUnique(libraryCategories, (category) => category.name, 'library category name');

for (const group of libraryGroups) {
  validateGroup(group);
}

const groupMap = new Map(libraryGroups.map((group) => [group.id, group]));

for (const category of libraryCategories) {
  validateCategory(category, groupMap);
}

const generatedFile = join(librarySnippetDir, 'data.generated.jsx');
const generatedContent = `// Generated from the OpenGraph library JSON files. Do not edit directly.
// Edit the JSON source files, then run:
// node scripts/generate-opengraph-library-data.mjs

export const libraryCategories = ${JSON.stringify(libraryCategories, null, 2)};

export const libraryGroups = ${JSON.stringify(libraryGroups, null, 2)};

export const openGraphTools = ${JSON.stringify(openGraphTools, null, 2)};
`;

writeFileSync(generatedFile, generatedContent);
