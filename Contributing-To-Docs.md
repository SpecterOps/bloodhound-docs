## Getting started

Like BloodHound CE, our documentation is open-source! Perusing our docs and found a typo or an opportunity to expand the documentation? You can contribute directly to fixing and enhancing our documentation. We're incredibly grateful for any contributions, and will make sure to recognize your contribution in the next release notes, and will get you a sweet package of BloodHound swag to boot!

## Before you start

This document will specifically cover the necessary steps for contributing to our documentation. Expectations for overall contribution to our codebase are covered in the [Contributing](./Contributing.md) document. Please be sure to review that page first for expectations on issue linking, commit signing, and Pull Request etiquette.

## Contributing to our Documentation

### 0. Set up your environment
To set up your local environment for docs:

1. Create a fork of the BloodHound Docs repository.
2. Clone your fork into your local development environment.
3. Install Mintlify, our document publishling platform.
   1. Install node.js (version 19 or higher).
   2. Install the Mintlify CLI with `npm i -g mintlify`.

### 1. Write the docs
Write or edit docs in your fork of the BloodHound repo.

To edit an existing page:

1. Create a branch.
2. Go to the file you want to edit and make your changes.

To add a new page:

1. Create a branch.
2. Go to the directory where you want the page to live and create a new .mdx file.

*Hint: Look at an existing page and copy/modify what's there for your pages [metadata](https://mintlify.com/docs/page)*

3. Include the audience-specific image at the top of the page, below the metadata.

| **If the page is for…** | **Include…** |
|------|------|
| BloodHound Enterprise AND BloodHound Community Edition users | `<img noZoom src="/assets/enterprise-AND-community-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise and CE"/>` |
| BloodHound Enterprise users only | `<img noZoom src="/assets/enterprise-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise only"/>` |
| BloodHound Community Edition users only | `<img noZoom src="/assets/community-edition-pill-tag.svg" alt="Applies to BloodHound CE only"/>` |

4. Fill out the page.
5. Add your new page to the doc sidebar.
   1. Open docs/docs.json.
   2. Add your page to the corresponding group under `navigation`.

## 2. Edit the Docs
To edit the docs:
1. Preview the docs locally to ensure they look great. Go to the /docs directory and run `mintlify dev` to generate a site where you can preview your changes.

*If you get stuck on this step, go to https://mintlify.com/docs/development.*

2. Use this checklist to review your docs for quality.
    - **Task-ify page titles and headings**: Where possible, use task-based titles like “Create a data collection schedule” instead of  “Creating a data collection schedule”.
    - **Add an introduction paragraph**: Give brief context and define new terms. Let readers know what to expect with text like, “This guide describes how to…”
    - **Improve writing quality**: Use a tool like Grammarly or a code editor extension to check your grammar. Use present tense and active voice (remove “will”).
    - **Break up any walls of words**: Incorporate [code blocks](https://mintlify.com/docs/content/components/code), [lists, tables](https://mintlify.com/docs/list-table), [images](https://mintlify.com/docs/image-embeds), [tabs](https://mintlify.com/docs/content/components/tabs), and other [visual components](https://mintlify.com/docs/content/components/accordions).
    - **Improve flow**: Use progressive disclosure: start high-level, then drill down. Put yourself in your reader’s shoes. Orient the content around the user journey. Add framing sentences so the content connects to the reader’s goals. Be directive and tell the reader what to do (don’t present too many options).

## 3. Get your docs reviewed
To get your docs reviewed:

1. Commit and push your changes. You must sign all your commits!
2. Create a pull request.
3. Address any feedback from the reviewers.

## 4. Publish the docs
After you’ve addressed all the reviewers’ feedback and approve your PR, the reviewers will merge your changes into the main branch and they will automatically deploy! Congratulations and thank you for your contribution!
