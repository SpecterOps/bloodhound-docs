// Must use arrow function syntax in Mintlify snippets
export const GitHubJsonCodeblock = ({
  sourceUrl,
  title = 'JSON',
  showSourceLink = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [codeText, setCodeText] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    const fetchSchema = async () => {
      setIsLoading(true);
      setErrorMessage('');
      setCodeText('');

      try {
        const response = await fetch(sourceUrl, {
          signal: abortController.signal,
          headers: {
            Accept: 'application/json, text/plain;q=0.9,*/*;q=0.8',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch JSON (${response.status})`);
        }

        const payload = await response.text();
        const parsedPayload = JSON.parse(payload);
        const prettyPrintedJson = JSON.stringify(parsedPayload, null, 2);
        setCodeText(prettyPrintedJson);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        setErrorMessage(error.message || 'Failed to load JSON content.');
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchSchema();

    return () => {
      abortController.abort();
    };
  }, [sourceUrl]);

  const fileName = useMemo(() => {
    if (!sourceUrl) {
      return title;
    }

    const sourcePathSegments = sourceUrl.split('/').filter(Boolean);
    const maybeFileName = sourcePathSegments[sourcePathSegments.length - 1];
    return maybeFileName || title;
  }, [sourceUrl, title]);

  const renderCode = (language, filename, text) => {
    return (
      <CodeBlock language={language} filename={filename}>
        {text}
      </CodeBlock>
    );
  };

  if (isLoading) {
    return renderCode('text', title, 'Loading JSON from GitHub...');
  }

  if (errorMessage) {
    const message = `Unable to render JSON from ${sourceUrl}: ${errorMessage}`;
    return renderCode('text', title, message);
  }

  return (
    <>
      {showSourceLink && sourceUrl && (
        <p>
          Source: <a href={sourceUrl}>{fileName}</a>
        </p>
      )}
      {renderCode('json', fileName, codeText)}
    </>
  );
};

export default GitHubJsonCodeblock;
