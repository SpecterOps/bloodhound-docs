// Must use arrow function syntax in Mintlify snippets
export const CollectUploadData = ({
  source,
  openHoundCollectorName,
  openHoundCollectorUrl,
  alternateCollectorName,
  alternateCollectorUrl,
}) => {
  return (
    <>
      <p>
        There are currently two ways to collect {source} data for this extension:
      </p>

      <ul>
        <li>
          <a href={openHoundCollectorUrl}>{openHoundCollectorName}</a>: The SpecterOps-supported collector for {source}.
        </li>
        <li>
          <a href={alternateCollectorUrl}>{alternateCollectorName}</a>: An alternative collector that can also produce data for the {source} extension.
        </li>
      </ul>

      <Tip>
        Use the {openHoundCollectorName} for the most current documented collection workflow.
      </Tip>
    </>
  );
};

export default CollectUploadData;