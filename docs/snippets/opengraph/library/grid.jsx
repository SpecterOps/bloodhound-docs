'use client';

// Must use arrow function syntax in Mintlify snippets

export const OpenGraphLibrary = ({
  libraryCategories = [],
  openGraphTools = [],
}) => {
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

const compareByOrderThenName = (left, right) =>
  left.order - right.order || left.name.localeCompare(right.name);

const sortedLibraryCategories = [...libraryCategories].sort(compareByOrderThenName);

const compareByName = (left, right) => left.name.localeCompare(right.name);

const communityExtensions = flattenExtensions(sortedLibraryCategories)
  .filter((extension) => extension.maintainer === 'specterops')
  .sort(compareByName);

const tools = openGraphTools
  .map((tool) => ({
    ...tool,
    icon: tool.icon || { type: 'terminal', label: 'Tool' },
    vendorName: tool.vendorName || 'OpenGraph tool',
  }))
  .sort(compareByName);

const enterpriseExtensions = [
  {
    name: 'GitHub Extension',
    vendorName: 'GitHub',
    icon: { type: 'github', label: 'GH' },
    description:
      'Models GitHub organizations, identities, repositories, workflows, secrets, roles, and related relationships as structured OpenGraph data.',
    href: '/opengraph/extensions/github/getting-started',
    action: 'Setup via OpenHound',
  },
  {
    name: 'Jamf Extension',
    vendorName: 'Jamf',
    icon: { type: 'jamf', label: 'J' },
    description:
      'Models Jamf Pro devices, users, groups, sites, policies, API integrations, and related relationships as BloodHound OpenGraph data.',
    href: '/opengraph/extensions/jamf/getting-started',
    action: 'Setup via OpenHound',
  },
  {
    name: 'Okta Extension',
    vendorName: 'Okta',
    icon: { type: 'okta', label: 'O' },
    description:
      'Models Okta users, groups, applications, roles, policies, and related relationships as structured graph data in BloodHound.',
    href: '/opengraph/extensions/okta/getting-started',
    action: 'Setup via OpenHound',
  },
  {
    name: 'SCIM Extension',
    vendorName: 'SCIM',
    icon: { type: 'scim', label: 'SCIM' },
    description:
      'Provides a technology-neutral schema for SCIM-provisioned users, groups, and roles so identities can connect across supported OpenGraph extensions.',
    href: '/opengraph/extensions/scim/overview',
    action: 'Setup via OpenHound',
  },
];

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

const VendorIcon = ({ icon }) => {
  if (!icon) {
    return null;
  }

  const vendorIcon = vendorIconMap[icon.type];

  if (vendorIcon) {
    return (
      <span
        className={`og-vendor-icon og-vendor-icon-image ${
          vendorIcon.wide ? 'og-vendor-icon-image-wide' : ''
        }`}
        aria-label={`${icon.label} icon`}
      >
        <img src={vendorIcon.src} alt="" loading="lazy" />
      </span>
    );
  }

  if (icon.type === 'microsoft') {
    return (
      <span className="og-vendor-icon og-vendor-icon-microsoft" aria-label={`${icon.label} icon`}>
        <span />
        <span />
        <span />
        <span />
      </span>
    );
  }

  if (icon.type === 'github') {
    return (
      <span className="og-vendor-icon og-vendor-icon-github" aria-label="GitHub icon">
        <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
          <path d="M8 .2a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-.9-2.7-.9-.3-.8-.9-1-.9-1-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.6 3.9.3.3.6.8.6 1.6v2.3c0 .2.1.5.6.4A8 8 0 0 0 8 .2Z" />
        </svg>
      </span>
    );
  }

  if (icon.type === 'key') {
    return (
      <span className="og-vendor-icon og-vendor-icon-key" aria-label="Credentials icon">
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M8.2 14.4a5.4 5.4 0 1 1 4.1-4.1l8.7 8.7v3h-3v-2h-2v-2h-2l-5.8-5.6Zm-.8-3.1a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z" />
        </svg>
      </span>
    );
  }

  if (icon.type === 'cross-platform') {
    return (
      <span className="og-vendor-icon" aria-label={`${icon.label} icon`}>
        <Icon icon="diagram-project" iconType="solid" color="currentColor" size={24} />
      </span>
    );
  }

  if (icon.type === 'terminal') {
    return (
      <span className="og-vendor-icon" aria-label={`${icon.label} icon`}>
        <Icon icon="terminal" iconType="solid" color="currentColor" size={24} />
      </span>
    );
  }

  if (icon.type === 'jamf') {
    return (
      <span className="og-vendor-icon og-vendor-icon-jamf" aria-label="Jamf icon">
        <span />
        <span />
      </span>
    );
  }

  if (icon.type === 'okta') {
    return (
      <span className="og-vendor-icon og-vendor-icon-okta" aria-label="Okta icon">
        <span />
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
    </header>
  );
};

  return (
    <div className="og-library">
      <LibraryHero />

      <section className="og-library-section">
        <div className="og-section-heading">
          <div>
            <h2>Enterprise Extensions</h2>
            <p>
              Enterprise extensions are maintained by SpecterOps and managed through BloodHound Enterprise.
            </p>
            <p>{enterpriseExtensions.length} enterprise extensions</p>
          </div>
        </div>
        <div className="og-card-grid">
          {enterpriseExtensions.map((extension) => (
            <ExtensionCard key={extension.name} extension={extension} />
          ))}
        </div>
      </section>

      <section className="og-library-section">
        <div className="og-section-heading">
          <div>
            <h2>Community Extensions</h2>
            <p>
              Extensions add node and edge types to the BloodHound graph.
            </p>
            <p>
              {communityExtensions.length} extensions from SpecterOps-attributed maintainers
            </p>
          </div>
        </div>
        <Warning>
          <strong>Use linked code at your own risk.</strong><br/><br/>
          All code linked via this library is provided “as is,” without review, approval, or endorsement by SpecterOps, regardless of authorship. It has not been audited for accuracy, security, or fitness for any purpose.<br/><br/>

          Use at your own risk. You are solely responsible for testing, validating, and ensuring the code meets your requirements before use in any environment. SpecterOps is not responsible for any damages, losses, or security issues arising from the use of any linked code.
        </Warning>
        <div className="og-card-grid">
          {communityExtensions.map((extension) => (
            <ExtensionCard key={extension.name} extension={extension} />
          ))}
        </div>
      </section>

      <section className="og-library-section">
        <div className="og-section-heading">
          <div>
            <h2>Tools</h2>
            <p>
              Use these libraries and utilities to generate, validate, ingest, or manage OpenGraph data for BloodHound.
            </p>
            <p>{tools.length} tools</p>
          </div>
        </div>
        <div className="og-card-grid">
          {tools.map((extension) => (
            <ExtensionCard key={extension.name} extension={extension} />
          ))}
        </div>
      </section>

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

        .og-extension-action:focus-visible {
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

        .og-section-note {
          margin: 0 0 1rem;
          border: 1px solid var(--og-callout-border);
          border-radius: 0.25rem;
          padding: 0.85rem 1rem;
          background: var(--og-callout-bg);
          color: var(--og-callout-text);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .og-card-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
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
          align-items: center;
          gap: 0.65rem;
        }

        .og-extension-title .og-vendor-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 0.45rem;
        }

        .og-extension-title .og-vendor-icon-image-wide {
          width: 3.35rem;
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
          padding: 0.45rem;
          background: #fff;
        }

        .og-vendor-icon-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .og-vendor-icon-image-wide {
          width: 4.6rem;
        }

        .og-vendor-icon-microsoft {
          display: grid;
          grid-template-columns: repeat(2, 0.8rem);
          grid-template-rows: repeat(2, 0.8rem);
          gap: 0.12rem;
          padding: 0;
        }

        .og-vendor-icon-microsoft span:nth-child(1) {
          background: #f25022;
        }

        .og-vendor-icon-microsoft span:nth-child(2) {
          background: #7fba00;
        }

        .og-vendor-icon-microsoft span:nth-child(3) {
          background: #00a4ef;
        }

        .og-vendor-icon-microsoft span:nth-child(4) {
          background: #ffb900;
        }

        .og-vendor-icon-github {
          color: #24292f;
        }

        .og-vendor-icon-jamf {
          position: relative;
          background: #f8fbff;
        }

        .og-vendor-icon-jamf span {
          position: absolute;
          width: 1rem;
          height: 1rem;
          border-radius: 2px;
          background: #0b65d8;
        }

        .og-vendor-icon-jamf span:first-child {
          transform: translate(-0.25rem, -0.15rem);
        }

        .og-vendor-icon-jamf span:last-child {
          transform: translate(0.25rem, 0.2rem);
          opacity: 0.82;
        }

        .og-vendor-icon-okta {
          background: #14161a;
        }

        .og-vendor-icon-okta span {
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 50%;
          border: 0.22rem solid #fff;
          box-shadow: 0 0 0 0.18rem rgba(255, 255, 255, 0.42) inset;
        }

        .og-vendor-icon-scim {
          color: #008b78;
        }

        .og-vendor-icon-cyberark {
          width: 4.6rem;
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
        .dark .og-vendor-icon {
          background: var(--og-card-bg);
        }

        .dark .og-vendor-icon-image {
          background: #fff;
        }

        .dark .og-extension-card h3 {
          color: var(--og-title);
        }

        .dark .og-vendor-icon-okta {
          background: #030712;
        }

        @media (max-width: 1100px) {
          .og-card-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .og-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .og-section-heading {
            align-items: start;
          }
        }

        @media (max-width: 640px) {
          .og-section-heading {
            display: grid;
            grid-template-columns: 1fr;
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
