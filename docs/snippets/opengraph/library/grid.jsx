'use client';

// Mintlify snippets require arrow function components.
export const OpenGraphLibrary = ({ catalog = [], communityExtensionsDisclaimer = '' }) => {
  const [search, setSearch] = useState('');
  const [edition, setEdition] = useState('all');
  const [type, setType] = useState('all');
  const [publisher, setPublisher] = useState('all');
  const [availability, setAvailability] = useState('all');
  const query = search.trim().toLowerCase();

  const filteredCatalog = catalog.filter((item) => {
    const searchText = [item.name, item.author, item.description, item.publisher, item.section]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return (
      (edition === 'all' || item.edition === edition) &&
      (type === 'all' || item.type === type) &&
      (publisher === 'all' || item.publisher === publisher) &&
      (availability === 'all' || item.availability === availability) &&
      (!query || searchText.includes(query))
    );
  });

  const sections = Array.from(new Set(filteredCatalog.map((item) => item.section)));
  const optionValues = (key) => Array.from(new Set(catalog.map((item) => item[key]).filter(Boolean))).sort();

  return (
    <div className="og-marketplace">
      <header className="og-marketplace-hero">
        <a href="/opengraph">OpenGraph</a>
        <h1>BloodHound Marketplace</h1>
        <p>Explore OpenGraph extensions and integrations listed in the BloodHound applications.</p>
      </header>

      <img noZoom src="/assets/enterprise-AND-community-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise and CE"/>

      <div className="og-marketplace-controls" role="search" aria-label="Marketplace filters">
        <label>
          <span>Search</span>
          <input type="search" value={search} placeholder="Search marketplace" onChange={(event) => setSearch(event.target.value)} />
        </label>
        <label>
          <span>Edition</span>
          <select value={edition} onChange={(event) => setEdition(event.target.value)}>
            <option value="all">All editions</option>
            {optionValues('edition').map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label>
          <span>Type</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">All types</option>
            <option value="extension">Extensions</option>
            <option value="integration">Integrations</option>
          </select>
        </label>
        <label>
          <span>Publisher</span>
          <select value={publisher} onChange={(event) => setPublisher(event.target.value)}>
            <option value="all">All publishers</option>
            {optionValues('publisher').map((value) => (
              <option key={value} value={value}>
                {{ specterops: 'SpecterOps', community: 'Community', partner: 'Integration Partners' }[value] || value}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Availability</span>
          <select value={availability} onChange={(event) => setAvailability(event.target.value)}>
            <option value="all">All availability</option>
            {optionValues('availability').map((value) => (
              <option key={value} value={value}>
                {{ general: 'Generally Available', 'early-access': 'Early Access', 'coming-soon': 'Coming Soon' }[value] || value}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sections.length ? sections.map((section) => {
        const items = filteredCatalog.filter((item) => item.section === section);
        const isCommunity = section.toLowerCase().includes('community extensions');

        return (
          <section className="og-marketplace-section" key={section}>
            <h2>{section} <span>· {items.length} item{items.length === 1 ? '' : 's'}</span></h2>
            {isCommunity && communityExtensionsDisclaimer ? (
              <aside className="og-marketplace-disclaimer">{communityExtensionsDisclaimer}</aside>
            ) : null}
            <div className="og-marketplace-grid">
              {items.map((item) => {
                const external = /^https?:\/\//i.test(item.href);
                return (
                  <article className="og-marketplace-card" key={`${item.edition}-${item.section}-${item.name}`}>
                    <div className="og-marketplace-card-heading">
                      <img src={item.logo} alt="" loading="lazy" />
                      <div>
                        <h3>{item.name}</h3>
                        {item.badge ? <span className={`og-marketplace-badge og-marketplace-badge-${item.badgeColor || 'blue'}`}>{item.badge}</span> : null}
                        <p>{item.author}</p>
                      </div>
                    </div>
                    <p className="og-marketplace-description">{item.description}</p>
                    <footer>
                      <span>{item.categoryLabel}</span>
                      <a href={item.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
                        {item.linkLabel}
                      </a>
                    </footer>
                  </article>
                );
              })}
            </div>
          </section>
        );
      }) : <p className="og-marketplace-empty">No Marketplace items match your search and filters.</p>}

      <style jsx>{`
        .og-marketplace {
          --og-primary: #2c2677;
          --og-primary-hover: #241f63;
          --og-text: #292524;
          --og-title: #292524;
          --og-muted: #57534e;
          --og-muted-soft: #78716c;
          --og-card-bg: #fff;
          --og-border: rgba(12, 10, 9, 0.12);
          --og-focus-ring: rgba(44, 38, 119, 0.24);
          color: var(--og-text);
        }
        .og-marketplace a { text-decoration: none; }
        .og-marketplace-hero { margin-bottom: 1.5rem; }
        .og-marketplace-hero > a { color: var(--og-primary); font-weight: 700; }
        .og-marketplace-hero h1 { margin: .4rem 0; color: var(--og-title); font-size: 2.25rem; }
        .og-marketplace-hero p, .og-marketplace-card p { color: var(--og-muted); }
        .og-marketplace-controls { display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.5rem 0 2rem; }
        .og-marketplace-controls label { display: grid; gap: .35rem; min-width: 10rem; color: var(--og-title); }
        .og-marketplace-controls label:first-child { flex: 1 1 18rem; }
        .og-marketplace-controls span { font-size: .85rem; font-weight: 600; }
        .og-marketplace-controls input, .og-marketplace-controls select { min-height: 2.5rem; border: 1px solid var(--og-border); border-radius: .25rem; padding: .4rem .65rem; background: var(--og-card-bg); color: var(--og-text); font-size: .9375rem; }
        .og-marketplace-controls input:focus, .og-marketplace-controls select:focus { outline: 0; border-color: var(--og-primary); box-shadow: 0 0 0 3px var(--og-focus-ring); }
        .og-marketplace-controls input::placeholder { color: var(--og-muted-soft); opacity: 1; }
        .og-marketplace-section { margin: 2rem 0; }
        .og-marketplace-section h2 { margin-bottom: 1rem; color: var(--og-title); }
        .og-marketplace-section h2 span { color: var(--og-muted-soft); font-size: 1rem; font-weight: 400; }
        .og-marketplace-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        .og-marketplace-card { display: flex; flex-direction: column; gap: .8rem; min-height: 16rem; border: 1px solid var(--og-border); border-radius: .35rem; padding: 1rem; background: var(--og-card-bg); color: var(--og-text); transition: border-color 160ms ease; }
        .og-marketplace-card:hover { border-color: var(--og-primary); }
        .og-marketplace-card-heading { display: flex; align-items: flex-start; gap: .7rem; }
        .og-marketplace-card-heading img { width: 2rem; height: 2rem; flex: 0 0 2rem; object-fit: contain; border: 1px solid var(--og-border); border-radius: .25rem; padding: .2rem; background: #fff; }
        .og-marketplace-card h3 { margin: 0 0 .2rem; color: var(--og-title); font-size: 1rem; line-height: 1.4; }
        .og-marketplace-card-heading p { margin: .3rem 0 0; font-size: .875rem; }
        .og-marketplace-badge { display: inline-block; border-radius: 999px; padding: .15rem .5rem; font-size: .75rem; font-weight: 700; }
        .og-marketplace-badge-blue { background: #dbeafe; color: #1e40af; }
        .og-marketplace-badge-orange { background: #ffedd5; color: #9a3412; }
        .og-marketplace-description { flex: 1; margin: 0; font-size: .9375rem; line-height: 1.5; }
        .og-marketplace-card footer { display: flex; flex-direction: column; gap: .6rem; color: var(--og-muted-soft); font-size: .8125rem; }
        .og-marketplace-card footer a { border-radius: .25rem; padding: .5rem .75rem; background: var(--og-primary); color: white; text-align: center; font-size: .875rem; font-weight: 700; }
        .og-marketplace-card footer a:hover { background: var(--og-primary-hover); }
        .og-marketplace-card footer a:focus-visible { outline: 2px solid var(--og-focus-ring); outline-offset: 2px; }
        .og-marketplace-disclaimer { margin: 0 0 1rem; border: 1px solid #f59e0b; border-radius: .4rem; padding: 1rem; background: #fffbeb; color: #78350f; }
        .og-marketplace-empty { padding: 3rem 0; text-align: center; }
        @media (max-width: 1100px) { .og-marketplace-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .og-marketplace-grid { grid-template-columns: 1fr; } .og-marketplace-card { min-height: 0; } }
        .dark .og-marketplace {
          --og-primary: #766aff;
          --og-primary-hover: #8e84ff;
          --og-text: #d6d3d1;
          --og-title: #f3f4f6;
          --og-muted: #c3c5cc;
          --og-muted-soft: #a0a3ad;
          --og-card-bg: #17171e;
          --og-border: rgba(255, 255, 255, 0.14);
          --og-focus-ring: rgba(165, 180, 252, 0.3);
        }
        .dark .og-marketplace-disclaimer { border-color: rgba(251, 146, 60, .4); background: rgba(154, 52, 18, .2); color: #fdba74; }
      `}</style>
    </div>
  );
};
