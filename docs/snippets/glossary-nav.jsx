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

  const handleLetterClick = (letter) => {
    if (activeFilter === letter) {
      setActiveFilter(null);
      return;
    }
    setActiveFilter(letter);

    // Scroll to first term with that letter
    setTimeout(() => {
      const firstTerm = glossaryTerms.find((term) => term[0].toUpperCase() === letter);
      if (firstTerm) {
        const element = document.querySelector(
          `[data-glossary-term="${firstTerm}"]`
        );
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 50);
  };

  return (
    <div
      style={{
        margin: '2rem 0',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '8px',
      }}
    >
      <p
        style={{
          margin: '0 0 1rem 0',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
        }}
      >
        Filter by letter:
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          onClick={() => setActiveFilter(null)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor:
              activeFilter === null
                ? 'var(--brand-green)'
                : 'var(--bg-tertiary)',
            color:
              activeFilter === null
                ? 'white'
                : 'var(--text-primary)',
            border: '1px solid var(--border-secondary)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: activeFilter === null ? '600' : '400',
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
              backgroundColor:
                activeFilter === letter
                  ? 'var(--brand-green)'
                  : 'var(--bg-tertiary)',
              color:
                activeFilter === letter
                  ? 'white'
                  : 'var(--text-primary)',
              border: '1px solid var(--border-secondary)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: activeFilter === letter ? '600' : '400',
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
