// Must use arrow function syntax in Mintlify snippets
export const ImportCypherQueries = ({ source, slug, environment }) => {
  return (
    <>
      <p>
        The {source} extension provides Cypher queries to help identify attack paths and misconfigurations in your {source} {environment}.
      </p>

      <p>
        You can find links to download JSON files for each query from GitHub in the <a href={`/opengraph/extensions/${slug}/queries`}>query documentation</a>. Import these files into BloodHound using the <a href="/analyze-data/explore/cypher-search#import-and-export">query import workflow</a>.
      </p>

      <Note>
        Cypher queries that reference node or edge kinds not present in the database will fail without the extension schema.
      </Note>
    </>
  );
};

export default ImportCypherQueries;