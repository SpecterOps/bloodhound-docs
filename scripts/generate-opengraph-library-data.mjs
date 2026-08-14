import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const opengraphSnippetDir = join(repoRoot, 'docs/snippets/opengraph');

const readJson = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'));

const readCategoryDirectory = (directory) =>
  readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => readJson(join(directory, fileName)))
    .sort((left, right) => left.name.localeCompare(right.name));

const libraryCategories = readCategoryDirectory(
  join(opengraphSnippetDir, 'library-categories'),
);
const nonAttackPathCategories = readCategoryDirectory(
  join(opengraphSnippetDir, 'non-attack-path-categories'),
);
const openGraphTools = readJson(join(opengraphSnippetDir, 'open-graph-tools.json'));

const generatedFile = join(opengraphSnippetDir, 'library-data.generated.jsx');
const generatedContent = `// Generated from the OpenGraph library JSON files. Do not edit directly.
// Edit the JSON source files, then run:
// node scripts/generate-opengraph-library-data.mjs

export const libraryCategories = ${JSON.stringify(libraryCategories, null, 2)};

export const nonAttackPathCategories = ${JSON.stringify(nonAttackPathCategories, null, 2)};

export const openGraphTools = ${JSON.stringify(openGraphTools, null, 2)};
`;

writeFileSync(generatedFile, generatedContent);
