'use client';

// Must use arrow function syntax in Mintlify snippets

export const OpenGraphLibrary = ({
  enterpriseExtensions = [],
  integrations = [],
  communityExtensions = [],
  openGraphTools = [],
  vendorIconMap = {},
}) => {
const ALL_FILTER_VALUE = 'all';

const flattenExtensions = (categories) =>
  categories.reduce(
    (items, category) =>
      items.concat(
        category.extensions.map((extension) => ({
          ...extension,
          icon: category.icon,
          vendorName: category.shortName || category.name,
        })),
      ),
    [],
  );

const compareByName = (left, right) => left.name.localeCompare(right.name);

const formatMaintainer = (maintainer) => {
  if (maintainer === 'specterops') {
    return 'SpecterOps';
  }

  if (maintainer === 'community') {
    return 'Community';
  }

  return maintainer;
};

const getAuthorNames = (extension) =>
  (extension.authors || [])
    .map((author) => author.name)
    .filter(Boolean);

const getSearchContent = (extension) =>
  [
    extension.name,
    extension.vendorName,
    extension.description,
    extension.maintainer,
    formatMaintainer(extension.maintainer),
    extension.action,
    ...getAuthorNames(extension),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

const getFilterOptions = (extensions, getValue) =>
  Array.from(
    new Set(
      extensions
        .flatMap((extension) => getValue(extension))
        .filter(Boolean),
    ),
  ).sort((left, right) => left.localeCompare(right));

const communityExtensionCards = flattenExtensions(communityExtensions)
  .sort(compareByName);
const specterOpsCreatedExtensionCards = communityExtensionCards.filter(
  (extension) => extension.maintainer === 'specterops',
);
const communityCreatedExtensionCards = communityExtensionCards.filter(
  (extension) => extension.maintainer !== 'specterops',
);

const tools = openGraphTools
  .map((tool) => ({
    ...tool,
    icon: tool.icon || { type: 'tools', label: 'Tool' },
    vendorName: tool.vendorName || 'OpenGraph tool',
  }))
  .sort(compareByName);

const builtInIconTypes = new Set(['cross-platform', 'key', 'terminal']);
const builtInIconMap = {
  network: 'network-wired',
  scim: 'arrows-rotate',
  tools: 'tools',
};

const VendorIcon = ({ icon }) => {
  if (!icon) {
    return null;
  }

  const vendorIcon = vendorIconMap[icon.type];

  if (vendorIcon) {
    return (
      <span
        className="og-vendor-icon og-vendor-icon-image"
        aria-label={`${icon.label} icon`}
      >
        <img src={vendorIcon.src} alt="" loading="lazy" />
      </span>
    );
  }

  const builtInIcon = builtInIconTypes.has(icon.type)
    ? 'plug'
    : builtInIconMap[icon.type];

  if (builtInIcon) {
    return (
      <span className="og-vendor-icon" aria-label={`${icon.label} icon`}>
        <Icon icon={builtInIcon} iconType="solid" color="currentColor" size={24} />
      </span>
    );
  }

  return (
    <span
      className={`og-vendor-icon og-vendor-icon-${icon.type}`}
      aria-label={`${icon.label} icon`}
    >
      <span>{icon.label}</span>
    </span>
  );
};

const AuthorAttribution = ({ authors = [] }) => {
  if (authors.length === 0) {
    return null;
  }

  return (
    <p className="og-extension-authors">
      <span className="og-extension-authors-label">
        {authors.length === 1 ? 'Author' : 'Authors'}:
      </span>{' '}
      {authors.map((author, index) => (
        <span key={`${author.name}-${index}`}>
          {index > 0 ? ', ' : null}
          {author.href ? (
            <a
              className="og-extension-author-link"
              href={author.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {author.name}
            </a>
          ) : (
            author.name
          )}
        </span>
      ))}
    </p>
  );
};

const ExtensionCard = ({ extension }) => {
  const external = extension.href.startsWith('http');

  return (
    <article className="og-extension-card">
      <div className="og-extension-card-top">
        <div className="og-extension-title">
          <VendorIcon icon={extension.icon} />
          <div>
            <h3>{extension.name}</h3>
            {extension.vendorName ? (
              <p>{extension.vendorName}</p>
            ) : null}
            <AuthorAttribution authors={extension.authors} />
          </div>
        </div>
      </div>
      <p className="og-extension-description">{extension.description}</p>
      <a
        className="og-extension-action"
        href={extension.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {extension.action || 'View on GitHub'}
      </a>
    </article>
  );
};

const LibraryHero = () => {
  return (
    <header className="og-library-hero">
      <div className="og-library-hero-copy">
        <a className="og-library-breadcrumb" href="/opengraph">
          OpenGraph
        </a>
        <h1>BloodHound Marketplace</h1>
        <p>
          Explore the BloodHound Marketplace, a curated collection of OpenGraph extensions, integrations, and tools.
        </p>
      </div>
        <img noZoom src="/assets/enterprise-AND-community-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise and CE"/>
    </header>
  );
};

const LibrarySection = ({
  title,
  description,
  countLabel,
  extensions,
  totalCount,
  hasActiveItemFilters,
  children,
}) => {
  return (
    <section className="og-library-section">
      <div className="og-section-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>
            {hasActiveItemFilters
              ? `${extensions.length} of ${totalCount} ${countLabel}`
              : `${totalCount} ${countLabel}`}
          </p>
        </div>
      </div>

      {children}

      {extensions.length > 0 ? (
        <div className="og-card-grid">
          {extensions.map((extension) => (
            <ExtensionCard key={extension.name} extension={extension} />
          ))}
        </div>
      ) : (
        <p className="og-empty-state">No matches. Clear the filters and try another search.</p>
      )}
    </section>
  );
};

const [searchQuery, setSearchQuery] = useState('');
const [selectedSection, setSelectedSection] = useState(ALL_FILTER_VALUE);
const [selectedTechnology, setSelectedTechnology] = useState(ALL_FILTER_VALUE);

const sectionGroups = [
  {
    id: 'enterprise-extensions',
    title: 'Enterprise Extensions',
    description: 'Enterprise extensions are maintained by SpecterOps and managed through BloodHound Enterprise.',
    countLabel: 'enterprise extensions',
    optionLabel: 'Enterprise extensions',
    extensions: enterpriseExtensions,
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect BloodHound Enterprise findings and graph data to security operations, ticketing, and automation platforms.',
    countLabel: 'integrations',
    optionLabel: 'Integrations',
    extensions: integrations,
  },
  {
    id: 'specterops-created-extensions',
    title: 'SpecterOps employee-created Extensions',
    description: 'Extensions created by SpecterOps employees and published outside the managed Enterprise extension catalog.',
    countLabel: 'SpecterOps employee-created extensions',
    optionLabel: 'SpecterOps employee-created extensions',
    extensions: specterOpsCreatedExtensionCards,
    hasWarning: true,
  },
  {
    id: 'community-created-extensions',
    title: 'Community-Created Extensions',
    description: 'Extensions created by the broader BloodHound and OpenGraph community.',
    countLabel: 'community-created extensions',
    optionLabel: 'Community-created extensions',
    extensions: communityCreatedExtensionCards,
    hasWarning: true,
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Use these libraries and utilities to generate, validate, ingest, or manage OpenGraph data for BloodHound.',
    countLabel: 'tools',
    optionLabel: 'Tools',
    extensions: tools,
  },
];

const technologyOptions = getFilterOptions(
  sectionGroups.flatMap((section) => section.extensions),
  (extension) => extension.vendorName,
);

const normalizedQuery = searchQuery.trim().toLowerCase();
const hasActiveItemFilters =
  normalizedQuery.length > 0 || selectedTechnology !== ALL_FILTER_VALUE;
const hasActiveControls =
  hasActiveItemFilters || selectedSection !== ALL_FILTER_VALUE;

const filteredSections = sectionGroups
  .filter(
    (section) =>
      selectedSection === ALL_FILTER_VALUE || section.id === selectedSection,
  )
  .map((section) => ({
    ...section,
    filteredExtensions: section.extensions.filter((extension) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        getSearchContent(extension).includes(normalizedQuery);
      const matchesTechnology =
        selectedTechnology === ALL_FILTER_VALUE ||
        extension.vendorName === selectedTechnology;

      return matchesSearch && matchesTechnology;
    }),
  }));

const visibleSections = filteredSections.filter(
  (section) =>
    selectedSection !== ALL_FILTER_VALUE ||
    !hasActiveItemFilters ||
    section.filteredExtensions.length > 0,
);

const clearFilters = () => {
  setSearchQuery('');
  setSelectedSection(ALL_FILTER_VALUE);
  setSelectedTechnology(ALL_FILTER_VALUE);
};

  return (
    <div className="og-library">
      <LibraryHero />

      <div className="og-section-controls" role="search" aria-label="Marketplace filters">
        <label className="og-search-field">
          <span className="og-control-label">Search</span>
          <span className="og-search-input-wrap">
            <Icon icon="magnifying-glass" iconType="solid" color="currentColor" size={16} />
            <input
              type="search"
              value={searchQuery}
              placeholder="Search marketplace"
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </span>
        </label>

        <label className="og-filter-field">
          <span className="og-control-label">Section</span>
          <select
            value={selectedSection}
            onChange={(event) => setSelectedSection(event.target.value)}
          >
            <option value={ALL_FILTER_VALUE}>All sections</option>
            {sectionGroups.map((section) => (
              <option value={section.id} key={section.id}>
                {section.optionLabel}
              </option>
            ))}
          </select>
        </label>

        <label className="og-filter-field">
          <span className="og-control-label">Technology</span>
          <select
            value={selectedTechnology}
            onChange={(event) => setSelectedTechnology(event.target.value)}
          >
            <option value={ALL_FILTER_VALUE}>All technologies</option>
            {technologyOptions.map((technology) => (
              <option value={technology} key={technology}>
                {technology}
              </option>
            ))}
          </select>
        </label>

        {hasActiveControls ? (
          <button className="og-clear-filters" type="button" onClick={clearFilters}>
            <Icon icon="xmark" iconType="solid" color="currentColor" size={14} />
            Clear
          </button>
        ) : null}
      </div>

      {visibleSections.length > 0 ? (
        visibleSections.map((section) => (
          <LibrarySection
            key={section.id}
            title={section.title}
            description={section.description}
            countLabel={section.countLabel}
            extensions={section.filteredExtensions}
            totalCount={section.extensions.length}
            hasActiveItemFilters={hasActiveItemFilters}
          >
            {section.hasWarning ? (
              <Warning>
                <strong>Use linked code at your own risk.</strong><br/><br/>
                All code linked via this library is provided “as is,” without review, approval, or endorsement by SpecterOps, regardless of authorship. It has not been audited for accuracy, security, or fitness for any purpose.<br/><br/>

                Use at your own risk. You are solely responsible for testing, validating, and ensuring the code meets your requirements before use in any environment. SpecterOps is not responsible for any damages, losses, or security issues arising from the use of any linked code.
              </Warning>
            ) : null}
          </LibrarySection>
        ))
      ) : (
        <p className="og-empty-state">No matches. Clear the filters and try another search.</p>
      )}

      <style jsx>{`
        .og-library {
          --og-primary: var(--color-primary, #2c2677);
          --og-primary-hover: #241f63;
          --og-primary-light: var(--color-primary-light, #5465ff);
          --og-accent-text: var(--og-primary);
          --og-text: #292524;
          --og-title: #292524;
          --og-muted: #57534e;
          --og-muted-soft: #78716c;
          --og-card-bg: #fff;
          --og-border: rgba(12, 10, 9, 0.1);
          --og-callout-bg: #fff7ed;
          --og-callout-border: #fed7aa;
          --og-callout-text: #9a3412;
          --og-focus-ring: rgba(44, 38, 119, 0.24);
          color: var(--og-text);
        }

        .og-library a {
          text-decoration: none;
        }

        .og-library-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1rem;
          align-items: end;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
        }

        .og-library-hero-copy h1 {
          margin: 0;
          color: var(--og-title);
          font-size: 36px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0;
        }

        .og-library-breadcrumb {
          display: inline-flex;
          margin-bottom: 0.5rem;
          color: var(--og-accent-text);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
        }

        .og-library-hero-copy p,
        .og-section-heading p,
        .og-extension-title p,
        .og-extension-authors,
        .og-extension-description {
          color: var(--og-muted);
        }

        .og-library-hero-copy p {
          max-width: 48rem;
          margin: 0.55rem 0 0;
          font-size: 18px;
          line-height: 1.55;
        }

        .og-extension-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.4rem;
          border-radius: 999px;
          background: var(--og-primary);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
        }

        .og-extension-action:focus-visible,
        .og-extension-author-link:focus-visible {
          outline: 2px solid var(--og-focus-ring);
          outline-offset: 2px;
        }

        .og-library-section {
          margin: 0 0 2.4rem;
        }

        .og-section-heading {
          display: flex;
          justify-content: space-between;
          gap: 1.2rem;
          align-items: end;
          margin-bottom: 1rem;
        }

        .og-section-heading h2 {
          margin: 0;
          color: var(--og-title);
          font-size: 1.5rem;
          line-height: 1.25;
          font-weight: 700;
          letter-spacing: 0;
        }

        .og-section-heading p {
          max-width: 58rem;
          margin: 0.35rem 0 0;
          font-size: 1rem;
          line-height: 1.5;
        }

        .og-section-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: end;
          margin: 0 0 1rem;
        }

        .og-search-field,
        .og-filter-field {
          display: grid;
          gap: 0.35rem;
          min-width: 0;
        }

        .og-search-field {
          flex: 1 1 18rem;
        }

        .og-filter-field {
          flex: 0 1 14rem;
        }

        .og-control-label {
          color: var(--og-title);
          font-size: 0.8125rem;
          line-height: 1.3;
          font-weight: 700;
        }

        .og-search-input-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 2.5rem;
          min-width: 0;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0 0.75rem;
          background: var(--og-card-bg);
          color: var(--og-muted-soft);
        }

        .og-search-input-wrap:focus-within,
        .og-filter-field select:focus {
          border-color: var(--og-primary);
          box-shadow: 0 0 0 3px var(--og-focus-ring);
        }

        .og-search-input-wrap input,
        .og-filter-field select {
          width: 100%;
          border: 0;
          background: transparent;
          color: var(--og-text);
          font-size: 0.9375rem;
          line-height: 1.4;
          outline: 0;
        }

        .og-search-input-wrap input {
          min-width: 0;
        }

        .og-search-input-wrap input::placeholder {
          color: var(--og-muted-soft);
          opacity: 1;
        }

        .og-filter-field select {
          height: 2.5rem;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0 0.65rem;
          background: var(--og-card-bg);
        }

        .og-clear-filters {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          height: 2.5rem;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0 0.85rem;
          background: var(--og-card-bg);
          color: var(--og-accent-text);
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
        }

        .og-clear-filters:hover {
          border-color: var(--og-primary);
        }

        .og-clear-filters:focus-visible {
          outline: 2px solid var(--og-focus-ring);
          outline-offset: 2px;
        }

        .og-card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .og-empty-state {
          margin: 0;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 1rem;
          background: var(--og-card-bg);
          color: var(--og-muted);
          font-size: 0.9375rem;
          line-height: 1.5;
        }

        .og-extension-card {
          display: flex;
          min-height: 16.75rem;
          flex-direction: column;
          gap: 0.75rem;
          border: 1px solid var(--og-border);
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          background: var(--og-card-bg);
          color: inherit;
          font-weight: 400;
          transition: border-color 160ms ease;
        }

        .og-extension-card:hover {
          border-color: var(--og-primary);
        }

        .og-extension-card:hover .og-extension-action {
          background: var(--og-primary-hover);
          color: #fff;
        }

        .og-extension-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .og-extension-card-top > div {
          min-width: 0;
        }

        .og-extension-title {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .og-extension-title .og-vendor-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 0.45rem;
        }

        .og-extension-title .og-vendor-icon svg {
          width: 1.15rem;
          height: 1.15rem;
        }

        .og-extension-title .og-vendor-icon > span {
          font-size: 0.625rem;
        }

        .og-extension-card h3 {
          margin: 0;
          color: var(--og-title);
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 600;
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }

        .og-extension-title p {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        .og-extension-authors {
          margin: 0.15rem 0 0;
          font-size: 0.8125rem;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        .og-extension-authors-label {
          color: var(--og-title);
          font-weight: 600;
        }

        .og-extension-author-link {
          color: var(--og-accent-text);
          text-decoration: none;
        }

        .og-extension-author-link:hover {
          text-decoration: underline;
        }

        .og-extension-description {
          margin: 0;
          line-height: 1.5;
          font-size: 1rem;
        }

        .og-extension-action {
          width: 100%;
          margin-top: auto;
          padding: 0 1rem;
        }

        .og-vendor-icon {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          background: var(--og-card-bg);
          color: var(--og-title);
          overflow: hidden;
        }

        .og-vendor-icon > span {
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0;
        }

        .og-vendor-icon svg {
          width: 1.55rem;
          height: 1.55rem;
          fill: currentColor;
        }

        .og-vendor-icon-image {
          padding: 0.2rem;
          background: #fff;
        }

        .og-vendor-icon-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .og-vendor-icon-cyberark {
          color: #047a3d;
          font-size: 0.75rem;
        }

        .og-vendor-icon-atlassian {
          color: #0052cc;
        }

        .og-vendor-icon-aws {
          color: #ff9900;
        }

        .og-vendor-icon-gcp {
          color: #1a73e8;
        }

        .og-vendor-icon-kubernetes {
          color: #326ce5;
        }

        .og-vendor-icon-salesforce {
          color: #00a1e0;
        }

        .og-vendor-icon-snowflake {
          color: #29b5e8;
        }

        .og-vendor-icon-tailscale {
          color: #111827;
        }

        .og-vendor-icon-api {
          color: var(--og-primary);
        }

        .og-vendor-icon-servicenow {
          color: #00a94f;
        }

        .dark .og-library {
          --og-primary: var(--color-primary, #2c2677);
          --og-primary-hover: #3b32a0;
          --og-accent-text: #a5b4fc;
          --og-title: #dfdfe2;
          --og-text: #d6d3d1;
          --og-muted: #a8a29e;
          --og-muted-soft: #78716c;
          --og-card-bg: var(--color-background-dark, rgb(14, 14, 15));
          --og-border: rgba(255, 255, 255, 0.1);
          --og-callout-bg: rgba(154, 52, 18, 0.18);
          --og-callout-border: rgba(251, 146, 60, 0.35);
          --og-callout-text: #fdba74;
          --og-focus-ring: rgba(165, 180, 252, 0.28);
        }

        .dark .og-extension-card,
        .dark .og-vendor-icon,
        .dark .og-search-input-wrap,
        .dark .og-filter-field select,
        .dark .og-clear-filters,
        .dark .og-empty-state {
          background: var(--og-card-bg);
        }

        .dark .og-vendor-icon-image {
          background: #fff;
        }

        .dark .og-extension-card h3 {
          color: var(--og-title);
        }

        @media (max-width: 1100px) {
          .og-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .og-section-heading {
            align-items: start;
          }
        }

        @media (max-width: 640px) {
          .og-section-heading {
            display: grid;
            grid-template-columns: 1fr;
          }

          .og-section-controls {
            display: grid;
            grid-template-columns: 1fr;
          }

          .og-search-field,
          .og-filter-field,
          .og-clear-filters {
            width: 100%;
          }

          .og-card-grid {
            grid-template-columns: 1fr;
          }

          .og-extension-card {
            min-height: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OpenGraphLibrary;
