# Page Templates

Use these templates as starting structures. Adapt them to the source instead of filling every heading mechanically.

## Source intake checklist

Before outlining pages:

- Identify the source format: PDF, `.docx`, or another text-friendly format
- Extract plain text with the least lossy available method
- Prefer `scripts/extract_vendor_source.sh <file>` when it supports the source format
- Skim for obvious structure: prerequisites, install, configure, use, troubleshoot, reference material
- Note artifacts to remove: page headers, footers, figure numbers, revision notes, comments, vendor delivery language
- Decide whether the content fits two pages or needs three or more

## Configure page

Typical frontmatter:

```yaml
---
title: Integrate BloodHound Enterprise with <Product>
description: Learn how to install and configure the BloodHound Enterprise integration for <Product>.
sidebarTitle: Install and configure
---
```

Typical structure:

```mdx
<img noZoom src="/assets/enterprise-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise only" />

Short intro paragraph.

Use this integration to:

- Outcome one
- Outcome two
- Outcome three

## Prerequisites

- Requirement one
- Requirement two

## Install or import the integration

<Steps>
  <Step title="...">
    1. ...
  </Step>
</Steps>

## Configure the integration

<Steps>
  <Step title="...">
    1. ...
  </Step>
</Steps>

## Verify the configuration

Short verification guidance.

## Next steps

Point to `use` or `troubleshoot`.
```

## Use page

Typical frontmatter:

```yaml
---
title: Use <Product> with BloodHound Enterprise
description: Learn how to investigate or manage BloodHound Enterprise findings in <Product>.
sidebarTitle: <Task-oriented label>
---
```

Typical structure:

```mdx
<img noZoom src="/assets/enterprise-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise only" />

Short intro paragraph with link back to configuration.

## Understand the data model

Use a table if the integration creates objects such as cases, alerts, events, incidents, or tickets.

## Perform the primary investigation workflow

<Steps>
  <Step title="...">
    1. ...
  </Step>
</Steps>

## Run actions or playbooks

Use a flat list or table for supported actions.
```

## Troubleshoot page

Typical frontmatter:

```yaml
---
title: Troubleshoot the <Product> integration
description: Learn how to diagnose and resolve common <Product> integration issues with BloodHound Enterprise.
sidebarTitle: Troubleshoot
---
```

Typical structure:

```mdx
<img noZoom src="/assets/enterprise-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise only" />

Short intro paragraph.

## Integration or connector test fails

Numbered steps to validate config and logs.

## API authentication (401 Unauthorized)

Possible causes include the following:

- ...

To resolve the issue:

1. ...
```

## Overview card checklist

When updating `docs/integrations/overview.mdx`, include:

- The product name
- One accurate sentence about what the integration does
- Supported actions that are explicitly supported by the source
- Common use cases that are grounded in the source
- A link to the configure or install page

Do not include speculative benefits or unsupported feature claims.

## Conversion checklist

Before you finish:

- Remove page numbers, figure numbers, and publication artifacts
- Remove Word export artifacts such as revision remnants or malformed bullets
- Replace vague references like “this folder” with reader-usable wording
- Split setup and usage if the draft is becoming long
- Confirm all page titles are task-oriented
- Confirm `description` is concise
- Check links in `Next steps`
- Check `docs/docs.json`
- Check `docs/integrations/overview.mdx`
