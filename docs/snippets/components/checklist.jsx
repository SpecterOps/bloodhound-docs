'use client';

export const Checklist = ({ checklistKey, title, children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Load saved state from localStorage
    const saved = localStorage.getItem(`checklist-${checklistKey}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setItems(parsed);
    } else {
      // Initialize based on number of list items
      const listItems = document.querySelectorAll(`[data-checklist="${checklistKey}"] li`);
      setItems(new Array(listItems.length).fill(false));
    }
  }, [checklistKey]);

  useEffect(() => {
    // Save to localStorage whenever items change
    if (items.length > 0) {
      localStorage.setItem(`checklist-${checklistKey}`, JSON.stringify(items));
    }
  }, [items, checklistKey]);

  const handleToggle = (index) => {
    setItems(prev => {
      const newItems = [...prev];
      newItems[index] = !newItems[index];
      return newItems;
    });
  };

  return (
    <div className="checklist-container" data-checklist={checklistKey}>
      {title && <h3 className="checklist-title">{title}</h3>}
      <div className="checklist-content">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === 'ul') {
            return (
              <ul className="checklist-list">
                {React.Children.map(child.props.children, (li, liIndex) => {
                  if (React.isValidElement(li) && li.type === 'li') {
                    return (
                      <li key={liIndex}>
                        <label>
                          <input
                            type="checkbox"
                            checked={items[liIndex] || false}
                            onChange={() => handleToggle(liIndex)}
                          />
                          <span className="task-text">{li.props.children}</span>
                        </label>
                      </li>
                    );
                  }
                  return li;
                })}
              </ul>
            );
          }
          return child;
        })}
      </div>
      
      <style jsx>{`
        .checklist-container {
          display: block;
          margin: 1rem 0;
          padding: 1rem;
          border-radius: 0.5rem;
          background: var(--background-secondary, #f4f4f4);
        }

        .dark .checklist-container {
          background: var(--background-secondary, #1a1a1a);
        }

        .checklist-title {
          margin-top: 0;
          margin-bottom: 1rem;
          color: var(--text-primary, #1d1b20);
        }

        .dark .checklist-title {
          color: var(--text-primary, #ffffff);
        }

        .checklist-content {
          position: relative;
        }

        .checklist-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .checklist-list li {
          margin: 0.5rem 0 !important;
          padding: 0 !important;
          list-style: none !important;
        }

        .checklist-list li::before {
          content: none !important;
        }

        label {
          display: grid;
          grid-template-columns: 1.5rem 1fr;
          gap: 0.5rem;
          align-items: start;
          padding: 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
          color: var(--text-secondary, #55595c);
          transition: all 0.2s ease;
        }

        .dark label {
          color: var(--text-secondary, #a0a0a0);
        }

        label:hover {
          background: var(--background-tertiary, #e3e7ea);
        }

        .dark label:hover {
          background: var(--background-tertiary, #2a2a2a);
        }

        input[type='checkbox'] {
          appearance: none;
          -webkit-appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid var(--border-primary, #cacfd3);
          border-radius: 0.25rem;
          margin: 0;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          position: relative;
        }

        .dark input[type='checkbox'] {
          border-color: var(--border-primary, #404040);
        }

        input[type='checkbox']:focus-visible {
          outline: 2px solid var(--accent-primary, #00aa66);
          outline-offset: 2px;
        }

        input[type='checkbox']:checked {
          background-color: var(--accent-primary, #00aa66);
          border-color: var(--accent-primary, #00aa66);
        }

        input[type='checkbox']:checked::after {
          content: '';
          position: absolute;
          display: block;
          width: 0.5rem;
          height: 0.875rem;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: translate(0.25rem, -0.125rem) rotate(45deg);
        }

        label:has(> input[type='checkbox']:checked) {
          color: var(--accent-primary, #00aa66);
          text-decoration: line-through;
          text-decoration-color: var(--accent-primary, #00aa66);
        }

        .task-text {
          line-height: 1.5;
        }
      `}
    </style>
    </div>
  );
};