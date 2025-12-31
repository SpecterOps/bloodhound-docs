export const GlossaryNav = () => {
  const [activeFilter, setActiveFilter] = React.useState(null);
  const [letters, setLetters] = React.useState([]);

  // Extract unique letters from H2 elements on mount
  React.useEffect(() => {
    const extractLetters = () => {
      const h2Elements = document.querySelectorAll('h2');
      const uniqueLetters = new Set();
      
      h2Elements.forEach((h2) => {
        const termName = h2.textContent.trim();
        if (termName && termName.length > 0) {
          // Find first alphabetic character (skip zero-width spaces and other non-letter chars)
          const match = termName.match(/[A-Z]/i);
          if (match) {
            const firstLetter = match[0].toUpperCase();
            uniqueLetters.add(firstLetter);
          }
        }
      });
      
      const sortedLetters = Array.from(uniqueLetters).sort();
      if (sortedLetters.length > 0) {
        setLetters(sortedLetters);
      }
    };

    // Initial extraction with delay for MDX rendering
    const timer = setTimeout(extractLetters, 100);
    
    // Watch for DOM changes in case content loads later
    const observer = new MutationObserver(() => {
      extractLetters();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const h2Elements = document.querySelectorAll('h2');
    
    if (!activeFilter) {
      // Show all terms
      h2Elements.forEach((h2) => {
        h2.style.display = 'block';
        // Show all siblings until next H2
        let sibling = h2.nextElementSibling;
        while (sibling && sibling.tagName !== 'H2') {
          sibling.style.display = 'block';
          sibling = sibling.nextElementSibling;
        }
      });
      return;
    }

    // Filter terms by letter
    h2Elements.forEach((h2) => {
      const termName = h2.textContent.trim();
      // Find first alphabetic character (skip zero-width spaces and other non-letter chars)
      const match = termName.match(/[A-Z]/i);
      const startsWithFilter = match && match[0].toUpperCase() === activeFilter;
      
      // Show/hide H2 and all siblings until next H2
      h2.style.display = startsWithFilter ? 'block' : 'none';
      let sibling = h2.nextElementSibling;
      while (sibling && sibling.tagName !== 'H2') {
        sibling.style.display = startsWithFilter ? 'block' : 'none';
        sibling = sibling.nextElementSibling;
      }
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
