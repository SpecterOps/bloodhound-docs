import {
  copyFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const dataFile = join(repoRoot, 'docs/snippets/opengraph/library/data/data.generated.jsx');
const assetRoot = join(repoRoot, 'docs/assets/opengraph-marketplace');
const args = process.argv.slice(2);

function getOption(name, fallback) {
  const index = args.indexOf(name);
  if (index < 0) return fallback;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) fail(`Expected a path after ${name}.`);
  return resolve(value);
}

function fail(message) {
  throw new Error(`[opengraph-marketplace] ${message}`);
}

function loadCatalog(repoPath) {
  const catalogPath = join(repoPath, 'cmd/ui/src/views/Marketplace/marketplaceCatalog.ts');
  if (!existsSync(catalogPath)) fail(`Marketplace catalog not found: ${catalogPath}`);
  return import(pathToFileURL(catalogPath).href);
}

function itemToDoc(item, { edition, section, categoryLabel, type, publicRoot, linkLabel }) {
  if (!item || typeof item !== 'object') fail(`${edition} catalog contains an invalid item.`);

  const name = item.name;
  const logoPath = item.logoPath || (item.logoFilename && `/img/product-logos/${item.logoFilename}`);
  if (!name || !item.description || !item.href || !logoPath) {
    fail(`${edition} catalog item is missing name, description, href, or logo: ${JSON.stringify(item)}`);
  }

  const cleanLogoPath = logoPath.replace(/^\/+/, '');
  if (cleanLogoPath.split(/[\\/]/).includes('..')) fail(`Unsafe logo path for ${name}: ${logoPath}`);
  const sourceLogo = resolve(publicRoot, cleanLogoPath);
  const sourceRelative = relative(resolve(publicRoot), sourceLogo);
  if (sourceRelative.startsWith(`..${sep}`) || sourceRelative === '..' || !existsSync(sourceLogo)) {
    fail(`Logo for ${name} was not found under ${publicRoot}: ${logoPath}`);
  }

  const extension = edition === 'CE' ? 'ce' : 'enterprise';
  const logoRelative = join(extension, sourceRelative).split(sep).join('/');
  const targetLogo = join(assetRoot, logoRelative);
  mkdirSync(dirname(targetLogo), { recursive: true });
  copyFileSync(sourceLogo, targetLogo);

  return {
    edition,
    type,
    section,
    categoryLabel,
    name,
    author: item.author,
    publisher: item.publisher || 'specterops',
    availability: item.availability || 'general',
    badge: item.badge,
    badgeColor: item.badgeColor,
    description: item.description,
    href: item.href,
    linkLabel,
    logo: `/assets/opengraph-marketplace/${logoRelative}`,
  };
}

function mapItems(items, options) {
  if (!Array.isArray(items)) fail(`${options.edition} catalog is missing the ${options.section} array.`);
  return items
    .filter((item) => item?.availability !== 'coming-soon')
    .map((item) => itemToDoc(item, options));
}

function makeCatalog(catalogs, roots) {
  const items = [];
  const cePublic = join(roots.bh, 'cmd/ui/public');
  const bhePublic = join(roots.bhe, 'cmd/ui/public');

  rmSync(join(assetRoot, 'ce'), { recursive: true, force: true });
  rmSync(join(assetRoot, 'enterprise'), { recursive: true, force: true });

  items.push(
    ...mapItems(catalogs.ce.communityExtensions, {
      edition: 'CE', section: 'Community Extensions', categoryLabel: 'Community Extension', type: 'extension', publicRoot: cePublic, linkLabel: 'View on GitHub',
    }),
    ...mapItems(catalogs.ce.communityIntegrations, {
      edition: 'CE', section: 'Community Integrations', categoryLabel: 'Integration', type: 'integration', publicRoot: cePublic, linkLabel: 'Learn More',
    }),
    ...mapItems(catalogs.ce.enterpriseExtensions, {
      edition: 'CE', section: 'OpenGraph Enterprise Extensions', categoryLabel: 'Enterprise Extension', type: 'extension', publicRoot: cePublic, linkLabel: 'Learn More',
    }),
    ...mapItems(catalogs.ce.developmentExtensions, {
      edition: 'CE', section: 'OpenGraph Enterprise Extensions in Development', categoryLabel: 'Enterprise Extension', type: 'extension', publicRoot: cePublic, linkLabel: 'Sign up to learn more',
    }),
    ...mapItems(catalogs.ce.enterpriseIntegrations, {
      edition: 'CE', section: 'Enterprise Integrations', categoryLabel: 'Integration', type: 'integration', publicRoot: cePublic, linkLabel: 'Learn More',
    }),
    ...mapItems(catalogs.bhe.enterpriseExtensions, {
      edition: 'Enterprise', section: 'OpenGraph Enterprise Extensions', categoryLabel: 'Enterprise Extension', type: 'extension', publicRoot: bhePublic, linkLabel: 'Learn More',
    }),
    ...mapItems(catalogs.bhe.comingSoonExtensions, {
      edition: 'Enterprise', section: 'OpenGraph Enterprise Extensions in Development', categoryLabel: 'Enterprise Extension', type: 'extension', publicRoot: bhePublic, linkLabel: 'Sign up to learn more',
    }),
    ...mapItems(catalogs.bhe.communityExtensions, {
      edition: 'Enterprise', section: 'Community Extensions', categoryLabel: 'Community Extension', type: 'extension', publicRoot: bhePublic, linkLabel: 'View on GitHub',
    }),
    ...mapItems(catalogs.bhe.integrations, {
      edition: 'Enterprise', section: 'Integrations', categoryLabel: 'Integration', type: 'integration', publicRoot: bhePublic, linkLabel: 'Learn More',
    }),
  );

  const identities = new Set();
  for (const item of items) {
    const identity = `${item.edition}:${item.section}:${item.name}`.toLowerCase();
    if (identities.has(identity)) fail(`Duplicate Marketplace item: ${identity}`);
    identities.add(identity);
  }
  return items;
}

const defaultBhRoot = resolve(repoRoot, '../BloodHound');
const defaultBheRoot = resolve(repoRoot, '../bloodhound-enterprise');
const roots = {
  bh: getOption('--bh-root', defaultBhRoot),
  bhe: getOption('--bhe-root', defaultBheRoot),
};

if (!existsSync(roots.bh) || !existsSync(roots.bhe)) {
  fail(`Both code repositories must be available locally. Set --bh-root and --bhe-root (defaults: ${defaultBhRoot}, ${defaultBheRoot}).`);
}

const [ceCatalog, bheCatalog] = await Promise.all([loadCatalog(roots.bh), loadCatalog(roots.bhe)]);
const catalog = makeCatalog({ ce: ceCatalog, bhe: bheCatalog }, roots);
const disclaimer = ceCatalog.COMMUNITY_EXTENSIONS_DISCLAIMER || '';
const generated = `// Generated from the local BloodHound and bloodhound-enterprise Marketplace catalogs. Do not edit directly.
// Regenerate with: just sync-opengraph-marketplace

export const marketplaceCatalog = ${JSON.stringify(catalog, null, 2)};

export const communityExtensionsDisclaimer = ${JSON.stringify(disclaimer)};
`;

writeFileSync(dataFile, generated);
console.log(`[opengraph-marketplace] Synced ${catalog.length} catalog items and copied their logos.`);
