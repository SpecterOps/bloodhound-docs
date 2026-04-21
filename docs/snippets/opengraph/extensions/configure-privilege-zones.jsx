// Must use arrow function syntax in Mintlify snippets
export const ConfigurePrivilegeZones = ({ source, slug }) => {
  return (
    <>
      <p>
        The {source} extension includes <a href={`/opengraph/extensions/${slug}/privilege-zone-rules`}>specialized queries</a> that you can use to create <a href="/analyze-data/privilege-zones/rules#cypher">Cypher-based</a> Privilege Zone rules. Use these rules to classify high-value {source} assets.
      </p>
    </>
  );
};

export default ConfigurePrivilegeZones;