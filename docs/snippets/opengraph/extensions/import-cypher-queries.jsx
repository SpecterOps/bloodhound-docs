// Must use arrow function syntax in Mintlify snippets
export const ImportCypherQueries = ({ source, slug, environment }) => {
  return (
    <>
      <p>
        The {source} extension includes <a href={`/opengraph/extensions/${slug}/queries`}>Cypher queries</a> to help identify attack paths and misconfigurations in your {source} {environment}. Import the {source} query JSON files into BloodHound using the <a href="/analyze-data/explore/cypher-search#import-and-export">query import workflow</a>.
      </p>

      <p>
        You can then run the imported queries on the <strong>Explore</strong> page.
      </p>

      <Note>
        Cypher queries that reference node or edge kinds not present in the database will fail without the extension schema.
      </Note>
    </>
  );
};

export default ImportCypherQueries;