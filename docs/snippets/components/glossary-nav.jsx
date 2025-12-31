export const GlossaryNav = () => {
  const [activeFilter, setActiveFilter] = React.useState(null);

  React.useEffect(() => {
    if (!activeFilter) {
      // Show all terms
      document.querySelectorAll('[data-glossary-term]').forEach((el) => {
        el.style.display = 'block';
      });
      return;
    }

    // Filter terms by letter
    document.querySelectorAll('[data-glossary-term]').forEach((el) => {
      const termName = el.getAttribute('data-glossary-term');
      const startsWithFilter = termName[0].toUpperCase() === activeFilter;
      el.style.display = startsWithFilter ? 'block' : 'none';
    });
  }, [activeFilter]);

  // Toggle filter on/off for selected letter
  const handleLetterClick = (letter) => {
    if (activeFilter === letter) {
      setActiveFilter(null);
      return;
    }
    setActiveFilter(letter);
    // Scroll to top of page when filter changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--glossary-nav-bg)',
        borderRadius: '8px',
        padding: '1rem',
        position: 'sticky',
        top: '8rem',
        // Ensure sticky nav stays above other content
        zIndex: 9999,
      }}
    >
      <p
        style={{
          margin: '0 0 1rem 0',
          fontSize: '.875rem',
          color: 'rgb(var(--text-primary)',
        }}
      >
        Filter by letter:
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          onClick={() => setActiveFilter(null)}
          style={{
            padding: '0.5rem 1rem',
            color:
              activeFilter === null
                ? 'rgb(var(--primary-light)'
                : 'rgb(var(--text-primary)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: activeFilter === null 
                ? '800'
                : '600',
            textDecoration: activeFilter === null
                ? 'underline'
                : 'none',
            transition: 'all 200ms ease',
          }}
        >
          All
        </button>
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            style={{
              padding: '0.5rem 0.75rem',
              color:
                activeFilter === letter
                  ? 'rgb(var(--primary-light)'
                  : 'rgb(var(--text-primary)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: activeFilter === letter
                  ? '800'
                  : '600',
              textDecoration: activeFilter === letter
                  ? 'underline'
                  : 'none',
              transition: 'all 200ms ease',
              minWidth: '2.5rem',
              textAlign: 'center',
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};
