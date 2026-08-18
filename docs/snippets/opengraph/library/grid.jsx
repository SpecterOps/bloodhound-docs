'use client';

// Must use arrow function syntax in Mintlify snippets

export const OpenGraphLibrary = ({
  libraryCategories = [],
  libraryGroups = [],
  openGraphTools = [],
}) => {
const flattenExtensions = (categories) =>
  categories.reduce((items, category) => items.concat(category.extensions), []);

const compareByOrderThenName = (left, right) =>
  left.order - right.order || left.name.localeCompare(right.name);

const technologyGroups = libraryGroups
  .map((group) => ({
    ...group,
    categories: libraryCategories
      .filter((category) => category.group === group.id)
      .sort(compareByOrderThenName),
  }))
  .filter((group) => group.categories.length > 0);

const categoryExtensionCount = (categories) =>
  flattenExtensions(categories).length;

const MaintainerBadge = ({ maintainer }) => {
  const isSpecterOps = maintainer === 'specterops';

  return (
    <span
      className={`og-maintainer-badge ${
        isSpecterOps ? 'og-maintainer-so' : 'og-maintainer-community'
      }`}
      title={isSpecterOps ? 'SpecterOps-maintained community extension' : 'Community maintainer'}
    >
      <span aria-hidden="true">
        {isSpecterOps ? (
          <SO_Icon size={36} />
        ) : (
          <Icon icon="people-group" iconType="solid" color="currentColor" size={36} />
        )}
      </span>
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
          {author.organization ? (
            <>
              {' @'}
              {author.organizationHref ? (
                <a
                  className="og-extension-author-link"
                  href={author.organizationHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {author.organization}
                </a>
              ) : (
                author.organization
              )}
            </>
          ) : null}
        </span>
      ))}
    </p>
  );
};

const ExtensionCard = ({ extension, compact = false }) => {
  const external = extension.href.startsWith('http');

  return (
    <article
      className={`og-extension-card ${compact ? 'og-extension-card-compact' : ''}`}
    >
      <div className="og-extension-card-top">
        <div>
          <h3>{extension.name}</h3>
        </div>
        {extension.maintainer ? (
          <MaintainerBadge maintainer={extension.maintainer} />
        ) : null}
      </div>
      <AuthorAttribution authors={extension.authors} />
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

const LibrarySection = ({ title, eyebrow, description, count, children }) => {
  return (
    <section className="og-library-section">
      <div className="og-section-heading">
        <div>
          <p className="og-section-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="og-section-count">{count}</span>
      </div>
      {children}
    </section>
  );
};

const LibraryHero = () => {
  return (
    <header className="og-library-hero">
      <div className="og-library-hero-copy">
        <a className="og-library-breadcrumb" href="/opengraph">
          OpenGraph
        </a>
        <h1>BloodHound Community Extensions</h1>
        <p>
          Explore extensions created by the community and SpecterOps that extend the coverage of BloodHound with OpenGraph.
        </p>
      </div>
    </header>
  );
};

const LibraryGuide = () => {
  return (
    <section className="og-library-guide" aria-label="OpenGraph Library contribution and icon guide">
      <img noZoom src="/assets/enterprise-AND-community-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise and CE" />
      <p>
        Have you built a cool extension using OpenGraph and want to feature it on this page? Is your extension already in the list and you need to update something?
      </p>
      <p>
        Click the button below to open an issue in the BloodHound Docs repository on GitHub and someone from the team will review it and get back to you!
      </p>
      <div className="og-library-guide-actions">
        <a className="og-submit-link" href="https://github.com/SpecterOps/bloodhound-docs/issues/new?template=opengraph-library-change.md" target="_blank" rel="noopener noreferrer">
          Submit a library change
        </a>
      </div>
      <div className="og-library-legend" aria-label="Maintainer icon legend">
        <div className="og-library-legend-item">
          <MaintainerBadge maintainer="community" />
          <p>
            Community icons represent community extensions that leverage OpenGraph to extend BloodHound's coverage and capabilities.
          </p>
        </div>
        <div className="og-library-legend-item">
          <MaintainerBadge maintainer="specterops" />
          <p>
            SpecterOps icons represent SpecterOps extensions that can be used as-is or serve as examples and inspiration for your own OpenGraph extensions.
          </p>
        </div>
      </div>
      <Warning>
        <strong>Use linked code at your own risk.</strong><br/><br/>
        All code linked via this library is provided “as is,” without review, approval, or endorsement by SpecterOps, regardless of authorship. It has not been audited for accuracy, security, or fitness for any purpose.<br/><br/>
        Use at your own risk. You are solely responsible for testing, validating, and ensuring the code meets your requirements before use in any environment. SpecterOps is not responsible for any damages, losses, or security issues arising from the use of any linked code.
      </Warning>
    </section>
  );
};

const CategoryGroup = ({ category }) => {
  return (
    <details className="og-category-group" id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
      <summary className="og-category-heading">
        <div>
          <h3>{category.name}</h3>
          <p>
            {category.extensions.length}{' '}
            {category.extensions.length === 1 ? 'extension' : 'extensions'}
          </p>
        </div>
        <span className="og-category-chevron" aria-hidden="true" />
      </summary>
      <div className="og-card-grid">
        {category.extensions.map((extension) => (
          <ExtensionCard key={extension.name} extension={extension} />
        ))}
      </div>
    </details>
  );
};

const LibraryFilters = ({ activeGroupId, filters, onFilterChange }) => {
  return (
    <div className="og-library-filters" aria-label="Filter OpenGraph extensions">
      {filters.map((filter) => {
        const isActive = activeGroupId === filter.id;

        return (
          <button
            key={filter.id}
            className={`og-filter-button ${isActive ? 'og-filter-button-active' : ''}`}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter.id)}
          >
            <span>{filter.name}</span>
            <span>{filter.count}</span>
          </button>
        );
      })}
    </div>
  );
};

const TechnologyGroup = ({ group }) => {
  const count = categoryExtensionCount(group.categories);

  return (
    <section className="og-technology-group">
      <div className="og-technology-heading">
        <div>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
        <span className="og-technology-heading-meta">
          <span className="og-technology-count">
            {count} {count === 1 ? 'extension' : 'extensions'}
          </span>
        </span>
      </div>
      <div className="og-category-list">
        {group.categories.map((category) => (
          <CategoryGroup key={category.name} category={category} />
        ))}
      </div>
    </section>
  );
};

  const [activeGroupId, setActiveGroupId] = useState('all');
  const fullLibraryCount = categoryExtensionCount(libraryCategories);
  const visibleTechnologyGroups = activeGroupId === 'all'
    ? technologyGroups
    : technologyGroups.filter((group) => group.id === activeGroupId);
  const filterOptions = [
    {
      id: 'all',
      name: 'All',
      count: fullLibraryCount,
    },
    ...technologyGroups.map((group) => ({
      id: group.id,
      name: group.name,
      count: categoryExtensionCount(group.categories),
    })),
  ];

  return (
    <div className="og-library">
      <LibraryHero />

      <LibraryGuide />

      <LibrarySection
        eyebrow="Collect, model, and enrich"
        title="OpenGraph Extensions"
        description="Filter extensions by the technologies they collect from, model, or use to enrich BloodHound. Use the card badge to identify whether the listed project is SpecterOps-attributed or community-maintained."
        count={`${fullLibraryCount} extensions`}
      >
        <LibraryFilters
          activeGroupId={activeGroupId}
          filters={filterOptions}
          onFilterChange={setActiveGroupId}
        />
        <div className="og-technology-list">
          {visibleTechnologyGroups.map((group) => (
            <TechnologyGroup key={group.id} group={group} />
          ))}
        </div>
      </LibrarySection>

      <LibrarySection
        eyebrow="Build and manage OpenGraph"
        title="OpenGraph Tools"
        description="Use these libraries and utilities to generate, validate, ingest, or manage OpenGraph data for BloodHound."
        count={`${openGraphTools.length} tools`}
      >
        <div className="og-card-grid">
          {openGraphTools.map((extension) => (
            <ExtensionCard key={extension.name} extension={extension} compact />
          ))}
        </div>
      </LibrarySection>

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
          --og-group-heading-bg: rgba(44, 38, 119, 0.04);
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

        .og-library-hero img {
          grid-column: 1 / -1;
          width: 204px;
          height: auto;
          margin: 0 0 0.25rem;
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
        .og-category-heading p,
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

        .og-submit-link,
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

        .og-submit-link {
          padding: 0 1.1rem;
          white-space: nowrap;
        }

        .og-submit-link:focus-visible,
        .og-extension-action:focus-visible,
        .og-extension-author-link:focus-visible,
        .og-filter-button:focus-visible {
          outline: 2px solid var(--og-focus-ring);
          outline-offset: 2px;
        }

        .og-library-section {
          margin: 0 0 2.4rem;
        }

        .og-library-guide {
          display: grid;
          gap: 1rem;
          margin: 1.5rem 0 2.4rem;
        }

        .og-library-guide > p {
          max-width: 58rem;
          margin: 0;
          color: var(--og-muted);
          font-size: 1rem;
          line-height: 1.55;
        }

        .og-library-guide-actions {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .og-library-legend {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.8rem;
        }

        .og-library-legend-item {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 0.75rem;
          align-items: start;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0.85rem;
          background: rgba(120, 113, 108, 0.06);
        }

        .og-library-legend-item p {
          margin: 0;
          color: var(--og-muted);
          font-size: 0.925rem;
          line-height: 1.45;
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

        .og-section-eyebrow {
          margin: 0 0 0.25rem;
          color: var(--og-accent-text);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .og-section-count {
          flex: 0 0 auto;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0.35rem 0.6rem;
          color: var(--og-muted-soft);
          font-size: 0.875rem;
          font-weight: 500;
          background: var(--og-card-bg);
        }

        .og-library-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 0 0 1rem;
        }

        .og-filter-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 2.25rem;
          border: 1px solid var(--og-border);
          border-radius: 999px;
          padding: 0 0.75rem;
          background: var(--og-card-bg);
          color: var(--og-muted);
          font: inherit;
          font-size: 0.875rem;
          font-weight: 600;
          line-height: 1.2;
          cursor: pointer;
          transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
        }

        .og-filter-button:hover {
          border-color: var(--og-primary);
          color: var(--og-accent-text);
        }

        .og-filter-button-active {
          border-color: var(--og-primary);
          background: var(--og-primary);
          color: #fff;
        }

        .og-filter-button-active:hover {
          color: #fff;
        }

        .og-filter-button span:last-child {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 1.45rem;
          height: 1.45rem;
          border-radius: 999px;
          padding: 0 0.4rem;
          background: rgba(120, 113, 108, 0.12);
          color: inherit;
          font-size: 0.75rem;
        }

        .og-filter-button-active span:last-child {
          background: rgba(255, 255, 255, 0.18);
        }

        .og-card-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
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

        .og-extension-card-compact {
          min-height: 14.25rem;
        }

        .og-extension-card:hover {
          border-color: var(--og-primary);
        }

        .og-extension-card:hover .og-extension-action,
        .og-submit-link:hover {
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

        .og-extension-card h3 {
          margin: 0;
          color: var(--og-title);
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 600;
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }

        .og-extension-authors {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.45;
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

        .og-maintainer-badge {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 0.4rem;
          min-height: 2.75rem;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0.35rem 0.55rem;
          background: var(--og-card-bg);
          color: var(--og-muted-soft);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .og-maintainer-badge > span:first-child {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 50%;
          color: var(--og-title);
          font-size: 0.68rem;
          line-height: 1;
        }

        .og-maintainer-so > span:first-child {
          --brand-green: #02b36c;
          --brand-light: var(--og-text);
        }

        .og-maintainer-so svg {
          width: 1.45rem;
          height: 1.45rem;
        }

        .og-maintainer-community svg {
          width: 0.95rem;
          height: 0.95rem;
        }

        .og-category-list {
          display: grid;
          gap: 1.2rem;
        }

        .og-technology-list {
          display: grid;
          gap: 1rem;
        }

        .og-technology-group {
          scroll-margin-top: 6rem;
          overflow: hidden;
          border: 1px solid var(--og-border);
          border-radius: 0.75rem;
          background: var(--og-card-bg);
        }

        .og-technology-heading {
          display: flex;
          justify-content: space-between;
          gap: 1.2rem;
          align-items: center;
          padding: 1rem 1.1rem;
          background: var(--og-group-heading-bg);
          border-bottom: 1px solid var(--og-border);
        }

        .og-technology-heading h3 {
          margin: 0;
          color: var(--og-title);
          font-size: 1.1rem;
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: 0;
        }

        .og-technology-heading p {
          max-width: 48rem;
          margin: 0.25rem 0 0;
          color: var(--og-muted);
          font-size: 0.95rem;
          line-height: 1.45;
        }

        .og-technology-heading-meta {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 0.65rem;
        }

        .og-technology-count {
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0.35rem 0.6rem;
          color: var(--og-muted-soft);
          font-size: 0.875rem;
          font-weight: 500;
          background: var(--og-card-bg);
        }

        .og-category-chevron {
          display: inline-flex;
          flex: 0 0 auto;
          width: 0.72rem;
          height: 0.72rem;
          border-right: 2px solid var(--og-muted-soft);
          border-bottom: 2px solid var(--og-muted-soft);
          transform: rotate(45deg);
          transition: transform 160ms ease;
          margin-top: 0.35rem;
        }

        .og-category-group[open] .og-category-chevron {
          transform: rotate(225deg);
          margin-top: 0.35rem;
        }

        .og-technology-group > .og-category-list {
          margin-top: 0;
          padding: 1.1rem;
        }

        .og-category-group {
          scroll-margin-top: 6rem;
        }

        .og-category-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.8rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid var(--og-border);
          cursor: pointer;
          list-style: none;
        }

        .og-category-group[open] > .og-category-heading {
          margin-bottom: 0.75rem;
        }

        .og-category-heading::-webkit-details-marker {
          display: none;
        }

        .og-category-heading h3 {
          margin: 0;
          color: var(--og-title);
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 600;
          letter-spacing: 0;
        }

        .og-category-heading p {
          margin: 0.15rem 0 0;
          font-size: 0.875rem;
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
          --og-group-heading-bg: rgba(165, 180, 252, 0.07);
          --og-border: rgba(255, 255, 255, 0.1);
          --og-callout-bg: rgba(154, 52, 18, 0.18);
          --og-callout-border: rgba(251, 146, 60, 0.35);
          --og-callout-text: #fdba74;
          --og-focus-ring: rgba(165, 180, 252, 0.28);
        }

        .dark .og-library-hero,
        .dark .og-category-heading {
          border-color: var(--og-border);
        }

        .dark .og-extension-card,
        .dark .og-maintainer-badge,
        .dark .og-section-count,
        .dark .og-filter-button {
          background: var(--og-card-bg);
        }

        .dark .og-filter-button-active {
          background: var(--og-primary);
        }

        .dark .og-library-legend-item {
          background: rgba(214, 211, 209, 0.05);
        }

        .dark .og-extension-card h3,
        .dark .og-category-heading h3,
        .dark .og-technology-heading h3 {
          color: var(--og-title);
        }

        @media (max-width: 900px) {
          .og-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .og-library-hero,
          .og-section-heading,
          .og-technology-heading {
            align-items: start;
          }
        }

        @media (max-width: 640px) {
          .og-library-hero,
          .og-section-heading,
          .og-technology-heading {
            display: grid;
            grid-template-columns: 1fr;
          }

          .og-technology-heading-meta {
            justify-content: space-between;
            width: 100%;
          }

          .og-card-grid {
            grid-template-columns: 1fr;
          }

          .og-library-hero-copy h1 {
            font-size: 1.8rem;
          }

          .og-submit-link {
            width: 100%;
          }

          .og-library-legend {
            grid-template-columns: 1fr;
          }

          .og-extension-card {
            min-height: 0;
          }

          .og-maintainer-badge > span:last-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default OpenGraphLibrary;
