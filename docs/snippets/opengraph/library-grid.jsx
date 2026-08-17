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

const vendorIconMap = {
  onepassword: { src: '/assets/icons/vendor/onepassword.svg', wide: false },
  ansible: { src: '/assets/icons/vendor/ansible.svg', wide: false },
  microsoft: { src: '/assets/icons/vendor/microsoft.svg', wide: false },
  aws: { src: '/assets/icons/vendor/aws.svg', wide: true },
  atlassian: { src: '/assets/icons/vendor/atlassian.svg', wide: false },
  cisco: { src: '/assets/icons/vendor/cisco.svg', wide: false },
  cyberark: { src: '/assets/icons/vendor/cyberark.svg', wide: true },
  freeipa: { src: '/assets/icons/vendor/freeipa.svg', wide: false },
  github: { src: '/assets/icons/vendor/github.svg', wide: false },
  gitlab: { src: '/assets/icons/vendor/gitlab.svg', wide: true },
  gcp: { src: '/assets/icons/vendor/gcp.svg', wide: false },
  jamf: { src: '/assets/icons/vendor/jamf.svg', wide: false },
  kubernetes: { src: '/assets/icons/vendor/kubernetes.svg', wide: false },
  okta: { src: '/assets/icons/vendor/okta.svg', wide: false },
  oracle: { src: '/assets/icons/vendor/oracle.svg', wide: true },
  ping: { src: '/assets/icons/vendor/ping.svg', wide: true },
  mainframe: { src: '/assets/icons/vendor/ibm.svg', wide: true },
  runzero: { src: '/assets/icons/vendor/runzero.svg', wide: true },
  salesforce: { src: '/assets/icons/vendor/salesforce.svg', wide: false },
  snowflake: { src: '/assets/icons/vendor/snowflake.svg', wide: false },
  tailscale: { src: '/assets/icons/vendor/tailscale.svg', wide: false },
  vmware: { src: '/assets/icons/vendor/vmware.svg', wide: true },
  windows: { src: '/assets/icons/vendor/windows.svg', wide: false },
  mitre: { src: '/assets/icons/vendor/mitre.svg', wide: true },
};

const CategoryIcon = ({ icon }) => {
  const vendorIcon = vendorIconMap[icon.type];

  if (vendorIcon) {
    return (
      <span
        className={`og-category-icon og-category-icon-image ${
          vendorIcon.wide ? 'og-category-icon-image-wide' : ''
        }`}
        aria-label={`${icon.label} category`}
      >
        <img src={vendorIcon.src} alt="" loading="lazy" />
      </span>
    );
  }

  if (icon.type === 'microsoft') {
    return (
      <span className="og-category-icon og-category-icon-microsoft" aria-label={`${icon.label} category`}>
        <span />
        <span />
        <span />
        <span />
      </span>
    );
  }

  if (icon.type === 'github') {
    return (
      <span className="og-category-icon og-category-icon-github" aria-label="GitHub category">
        <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
          <path d="M8 .2a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-.9-2.7-.9-.3-.8-.9-1-.9-1-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.6 3.9.3.3.6.8.6 1.6v2.3c0 .2.1.5.6.4A8 8 0 0 0 8 .2Z" />
        </svg>
      </span>
    );
  }

  if (icon.type === 'key') {
    return (
      <span className="og-category-icon og-category-icon-key" aria-label="Credentials category">
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M8.2 14.4a5.4 5.4 0 1 1 4.1-4.1l8.7 8.7v3h-3v-2h-2v-2h-2l-5.8-5.6Zm-.8-3.1a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z" />
        </svg>
      </span>
    );
  }

  if (icon.type === 'cross-platform') {
    return (
      <span className="og-category-icon" aria-label={`${icon.label} category`}>
        <Icon icon="diagram-project" iconType="solid" color="currentColor" size={24} />
      </span>
    );
  }

  if (icon.type === 'terminal') {
    return (
      <span className="og-category-icon" aria-label={`${icon.label} category`}>
        <Icon icon="terminal" iconType="solid" color="currentColor" size={24} />
      </span>
    );
  }

  if (icon.type === 'jamf') {
    return (
      <span className="og-category-icon og-category-icon-jamf" aria-label="Jamf category">
        <span />
        <span />
      </span>
    );
  }

  if (icon.type === 'okta') {
    return (
      <span className="og-category-icon og-category-icon-okta" aria-label="Okta category">
        <span />
      </span>
    );
  }

  return (
    <span
      className={`og-category-icon og-category-icon-${icon.type}`}
      aria-label={`${icon.label} category`}
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
          <p className="og-extension-vendor">{extension.vendor}</p>
        </div>
        {extension.maintainer ? (
          <MaintainerBadge maintainer={extension.maintainer} />
        ) : (
          <CategoryIcon icon={extension.icon} />
        )}
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
    <section className="og-category-group" id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
      <div className="og-category-heading">
        <CategoryIcon icon={category.icon} />
        <div>
          <h3>{category.name}</h3>
          <p>
            {category.extensions.length}{' '}
            {category.extensions.length === 1 ? 'extension' : 'extensions'}
          </p>
        </div>
      </div>
      <div className="og-card-grid">
        {category.extensions.map((extension) => (
          <ExtensionCard key={extension.name} extension={extension} />
        ))}
      </div>
    </section>
  );
};

const TechnologyGroup = ({ group }) => {
  const count = categoryExtensionCount(group.categories);

  return (
    <details className="og-technology-group">
      <summary className="og-technology-heading">
        <div>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
        <span className="og-technology-heading-meta">
          <span className="og-technology-count">
            {count} {count === 1 ? 'extension' : 'extensions'}
          </span>
          <span className="og-technology-chevron" aria-hidden="true" />
        </span>
      </summary>
      <div className="og-category-list">
        {group.categories.map((category) => (
          <CategoryGroup key={category.name} category={category} />
        ))}
      </div>
    </details>
  );
};

  const fullLibraryCount = categoryExtensionCount(libraryCategories);
  return (
    <div className="og-library">
      <LibraryHero />

      <LibraryGuide />

      <LibrarySection
        eyebrow="Collect, model, and enrich"
        title="OpenGraph Extensions"
        description="Browse extensions by the technologies they collect from, model, or use to enrich BloodHound. Use the card badge to identify whether the listed project is SpecterOps-attributed or community-maintained."
        count={`${fullLibraryCount} extensions`}
      >
        <div className="og-technology-list">
          {technologyGroups.map((group) => (
            <TechnologyGroup key={group.name} group={group} />
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
        .og-extension-vendor,
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
        .og-extension-author-link:focus-visible {
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

        .og-extension-vendor {
          margin: 0.25rem 0 0;
          font-size: 0.875rem;
          line-height: 1.25;
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
          cursor: pointer;
          list-style: none;
        }

        .og-technology-group[open] .og-technology-heading {
          border-bottom: 1px solid var(--og-border);
        }

        .og-technology-heading::-webkit-details-marker {
          display: none;
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

        .og-technology-chevron {
          display: inline-flex;
          width: 0.72rem;
          height: 0.72rem;
          border-right: 2px solid var(--og-muted-soft);
          border-bottom: 2px solid var(--og-muted-soft);
          transform: rotate(45deg);
          transition: transform 160ms ease;
          margin-top: 0.35rem;
        }

        .og-technology-group[open] .og-technology-chevron {
          transform: rotate(225deg);
          margin-top: 0.7rem;
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
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.75rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid var(--og-border);
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

        .og-category-icon {
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

        .og-category-icon > span {
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0;
        }

        .og-category-icon svg {
          width: 1.55rem;
          height: 1.55rem;
          fill: currentColor;
        }

        .og-category-icon-image {
          padding: 0.45rem;
          background: #fff;
        }

        .og-category-icon-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .og-category-icon-image-wide {
          width: 4.6rem;
        }

        .og-category-icon-microsoft {
          display: grid;
          grid-template-columns: repeat(2, 0.8rem);
          grid-template-rows: repeat(2, 0.8rem);
          gap: 0.12rem;
          padding: 0;
        }

        .og-category-icon-microsoft span:nth-child(1) {
          background: #f25022;
        }

        .og-category-icon-microsoft span:nth-child(2) {
          background: #7fba00;
        }

        .og-category-icon-microsoft span:nth-child(3) {
          background: #00a4ef;
        }

        .og-category-icon-microsoft span:nth-child(4) {
          background: #ffb900;
        }

        .og-category-icon-github {
          color: #24292f;
        }

        .og-category-icon-jamf {
          position: relative;
          background: #f8fbff;
        }

        .og-category-icon-jamf span {
          position: absolute;
          width: 1rem;
          height: 1rem;
          border-radius: 2px;
          background: #0b65d8;
        }

        .og-category-icon-jamf span:first-child {
          transform: translate(-0.25rem, -0.15rem);
        }

        .og-category-icon-jamf span:last-child {
          transform: translate(0.25rem, 0.2rem);
          opacity: 0.82;
        }

        .og-category-icon-okta {
          background: #14161a;
        }

        .og-category-icon-okta span {
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 50%;
          border: 0.22rem solid #fff;
          box-shadow: 0 0 0 0.18rem rgba(255, 255, 255, 0.42) inset;
        }

        .og-category-icon-scim {
          color: #008b78;
        }

        .og-category-icon-cyberark {
          width: 4.6rem;
          color: #047a3d;
          font-size: 0.75rem;
        }

        .og-category-icon-atlassian {
          color: #0052cc;
        }

        .og-category-icon-aws {
          color: #ff9900;
        }

        .og-category-icon-gcp {
          color: #1a73e8;
        }

        .og-category-icon-kubernetes {
          color: #326ce5;
        }

        .og-category-icon-salesforce {
          color: #00a1e0;
        }

        .og-category-icon-snowflake {
          color: #29b5e8;
        }

        .og-category-icon-tailscale {
          color: #111827;
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
        .dark .og-category-icon,
        .dark .og-section-count {
          background: var(--og-card-bg);
        }

        .dark .og-category-icon-image {
          background: #fff;
        }

        .dark .og-library-legend-item {
          background: rgba(214, 211, 209, 0.05);
        }

        .dark .og-extension-card h3,
        .dark .og-category-heading h3,
        .dark .og-technology-heading h3 {
          color: var(--og-title);
        }

        .dark .og-category-icon-okta {
          background: #030712;
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
