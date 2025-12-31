export const GlossaryNav = () => {
  const [activeFilter, setActiveFilter] = React.useState(null);
  const [letters, setLetters] = React.useState([]);

  // Extract H2 elements, add data attributes and classes
  React.useEffect(() => {
    let debounceTimer;
    
    const setupGlossary = () => {
      const elements = Array.from(document.querySelectorAll('h2'));
      
      if (elements.length === 0) return;
      
      const uniqueLetters = new Set();
      
      elements.forEach((h2) => {
        const termName = h2.textContent.trim();
        if (termName && termName.length > 0) {
          // Find first alphabetic character (skip zero-width spaces and other non-letter chars)
          const match = termName.match(/[A-Z]/i);
          if (match) {
            const firstLetter = match[0].toUpperCase();
            uniqueLetters.add(firstLetter);
            
            // Add data attribute and class to H2 and its siblings (one-time setup)
            if (!h2.dataset.glossaryLetter) {
              h2.dataset.glossaryLetter = firstLetter;
              h2.classList.add('glossary-term');
              h2.classList.add(`glossary-letter-${firstLetter}`);
              
              let sibling = h2.nextElementSibling;
              while (sibling && sibling.tagName !== 'H2') {
                sibling.dataset.glossaryLetter = firstLetter;
                sibling.classList.add('glossary-term');
                sibling.classList.add(`glossary-letter-${firstLetter}`);
                sibling = sibling.nextElementSibling;
              }
            }
          }
        }
      });
      
      const sortedLetters = Array.from(uniqueLetters).sort();
      if (sortedLetters.length > 0) {
        setLetters(sortedLetters);
      }
    };

    // Initial setup with delay for MDX rendering
    const timer = setTimeout(setupGlossary, 100);
    
    // Watch for DOM changes with debouncing
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(setupGlossary, 300);
    });
    
    // Observe only the main content area, not entire document
    const contentArea = document.querySelector('main') || document.body;
    observer.observe(contentArea, {
      childList: true,
      subtree: true,
    });
    
    return () => {
      clearTimeout(timer);
      clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, []);

  // Apply filter class to content area
  React.useEffect(() => {
    const contentArea = document.querySelector('main') || document.body;
    
    if (!activeFilter) {
      contentArea.classList.remove('glossary-filtered');
      contentArea.removeAttribute('data-active-letter');
    } else {
      contentArea.classList.add('glossary-filtered');
      contentArea.setAttribute('data-active-letter', activeFilter);
    }
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
        backgroundColor: 'var(--glossary-nav-bg))',
        borderRadius: '8px',
        padding: '1rem',
        position: 'sticky',
        top: '7rem',
        // Ensure sticky nav stays above other content
        zIndex: 9999,
      }}
    >
      <p
        style={{
          margin: '0 0 1rem 0',
          fontSize: '.875rem',
          color: 'rgb(var(--text-primary))',
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
                ? 'rgb(var(--primary-light))'
                : 'rgb(var(--text-primary))',
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
                  ? 'rgb(var(--primary-light))'
                  : 'rgb(var(--text-primary))',
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
