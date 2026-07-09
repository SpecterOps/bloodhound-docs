// Must use arrow function syntax in Mintlify snippets
export const ConfigurePrivilegeZones = ({ source, slug }) => {
  return (
    <>
      <p>
        The {source} extension includes <a href={`/opengraph/extensions/${slug}/privilege-zone-rules`}>specialized queries</a> that you can use to create <a href="/analyze-data/privilege-zones/rules#cypher">Cypher-based</a> Privilege Zone rules. Use these rules to classify high-value {source} assets.
      </p>
      <p>
        When you write or adapt these queries, search for Tier Zero objects with <code>MATCH (n:Tag_Tier_Zero)</code> instead of inspecting <code>system_tags</code> properties with patterns such as <code>coalesce(n.system_tags, [])</code>. This is the preferred pattern for extension-provided Privilege Zone rules and related Explore queries.
      </p>
    </>
  );
};

export default ConfigurePrivilegeZones;
