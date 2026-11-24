'use client';

// Mintlify snippets require arrow function components.
export const OpenGraphMarketplace = ({ catalog = [], communityExtensionsDisclaimer = '' }) => {
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
      <header id="header" data-layout-item="page-header" className="relative leading-none @container/page-header">
        <div className="mt-0.5 space-y-2.5">
          <div className="eyebrow h-5 text-primary dark:text-primary-light text-sm font-semibold">OpenGraph</div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center relative gap-2 min-w-0">
            <h1 id="page-title" className="text-3xl sm:text-4xl text-gray-900 tracking-tight dark:text-gray-200 [overflow-wrap:anywhere] font-semibold">Marketplace</h1>
          </div>
        </div>
        <div className="mt-2 text-lg prose prose-gray dark:prose-invert [&>*]:[overflow-wrap:anywhere]">
          <p className="og-marketplace-intro">Explore OpenGraph extensions and integrations available in BloodHound Enterprise and Community Edition.</p>
          <img noZoom src="/assets/enterprise-AND-community-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise and CE"/>
        </div>
      </header>
      <div className="og-marketplace-controls" role="search" aria-label="Marketplace filters">
        <label>
          <span>Search</span>
          <input type="search" value={search} placeholder="Search marketplace" onChange={(event) => setSearch(event.target.value)} />
        </label>
        <label>
          <span>Edition</span>
          <select value={edition} onChange={(event) => setEdition(event.target.value)}>
            <option value="all">All editions</option>
            {['Enterprise', 'CE'].filter((value) => optionValues('edition').includes(value)).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
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
            <div className="prose dark:prose-invert">
              <h2>{section} <span>· {items.length} item{items.length === 1 ? '' : 's'}</span></h2>
            </div>
            {isCommunity && communityExtensionsDisclaimer ? (
              <Warning>{communityExtensionsDisclaimer}</Warning>
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
                        {item.badge ? <Badge color={item.badgeColor || 'blue'}>{item.badge}</Badge> : null}
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

    </div>
  );
};
