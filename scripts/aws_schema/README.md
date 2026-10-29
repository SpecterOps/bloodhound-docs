# AWS schema reference maintenance

The AWS reference documents the unreleased SOAWS v0.0.4 integration schema for
the BloodHound Enterprise beta. OHAWS-6 explicitly defers Community Edition
labeling until public availability. Only documentation changes belong here.

## Reproduce the reference

Check out `SpecterOps/openhound-aws` beside this repository at
`3b4c00debf30c9762222819e4b17688f1b9158b1`. Python 3 is sufficient; the
generator parses source with `ast` and does not import or execute the collector.
From `docs/`, run:

```sh
python3 ../scripts/aws_schema/generate.py --check
```

Use `--collector-root /path/to/openhound-aws` for another checkout location.
Omit `--check` to regenerate the pages and AWS navigation. The check refuses a
different collector HEAD or tracked source changes. It checks exact generated
content, page inventory, local links, and unique navigation entries. It does not
test runtime authorization or establish BloodHound release compatibility.

## Source contract

- `extension/schema.json`: schema metadata, complete kind inventory, descriptions,
  and traversability. No findings, dynamic UI templates, exploitation text, or
  remediation are copied.
- `src/openhound_aws/graph.py`: shared properties and ARN-based identifiers.
- `src/openhound_aws/models/`: resource properties and structural endpoints.
  Only fields supplied to property constructors or carrying concrete defaults
  are included; unused declarations are excluded.
- `permissions/definitions/`, `permissions/dispatcher.py`, and
  `kinds/mapping.py`: permission actions, target projection, and resource kinds.
- `kinds/meta.py`: same-target composite constituents.
- `permissions/pass_role.py`: service route operation bundles and trust rewriting.
- `notes.json`: manually verified exceptions and interpretation. `target_sources`
  identifies implementations for cross-resource composite endpoints;
  `model_endpoints` supplements federated trust emitted by `models/role.py`.
  S3 bucket/object projection also requires reviewing
  `permissions/s3_permissions.py`.

The inline-policy kind remains documented although the pinned collector does
not emit standalone nodes. SCP/RCP endpoint tables follow account-level model
emission; their schema descriptions use the broader term “Organization”.
Self-token edges constrain both endpoints to the same principal even when the
kind table contains more than one principal type.

## Update the snapshot

Review implementation changes before updating `REVISION`, inventory assertions,
or `notes.json`. Model decorators alone do not prove runtime emission. In
particular, verify account creation targets, S3 object namespaces, self-edges,
provider-to-role trust, and cross-resource composition logic. Preserve the
Enterprise/beta label until a product owner changes availability.

Regenerate and inspect the diff, then run the coverage check, `mint validate
--telemetry=false`, `mint broken-links --telemetry=false`, and `mint a11y
--telemetry=false` from `docs/`. Record existing site failures separately.
The project controller supplies the hosted preview of the reviewed commit;
do not start an ad hoc server for this task.
