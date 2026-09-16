## Getting started

Like BloodHound CE, our documentation is open-source! Perusing our docs and found a typo or an opportunity to expand the documentation? You can contribute directly to fixing and enhancing our documentation. We're incredibly grateful for any contributions, and will make sure to recognize your contribution in the next release notes, and will get you a sweet package of BloodHound swag to boot!

## Before you start

This document covers the necessary steps for contributing to our documentation. Review the [Contributing](./Contributing.md) document first for the repository-wide issue and pull request process, branch and commit conventions, and pull request etiquette.

## Contributing to our Documentation

### 0. Set up your environment

To set up your local environment for docs:

1. Create a fork of the BloodHound Docs repository.
2. Clone your fork into your local development environment.
3. Install Mintlify, our documentation publishing platform.
   1. Install node.js (version 19 or higher).
   2. Install the Mintlify CLI with `npm i -g mintlify`.

### 1. Write the docs

Write or edit docs in your fork of the BloodHound Docs repository. Before adding or moving a page, use the [information architecture guide](./.github/info-architecture.md) to choose its location and navigation group.

To edit an existing page:

1. Create a branch.
1. Go to the file you want to edit and make your changes.

To add a new page:

1. Create a branch.
1. Go to the directory where you want the page to live and create a new `.mdx` file.

   >[!TIP]
   > Look at an existing page and copy or modify its [metadata](https://mintlify.com/docs/page). Include `title` and `description` frontmatter on every new page.

1. Include the audience-specific image at the top of the page, below the metadata.

   | **If the page is for…**                                      | **Include…**                                                                                                              |
   | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
   | BloodHound Enterprise AND BloodHound Community Edition users | `<img noZoom src="/assets/enterprise-AND-community-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise and CE"/>` |
   | BloodHound Enterprise users only                             | `<img noZoom src="/assets/enterprise-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise only"/>`                 |
   | BloodHound Community Edition users only                      | `<img noZoom src="/assets/community-edition-pill-tag.svg" alt="Applies to BloodHound CE only"/>`                          |

1. Fill out the page.
1. Add your new page to the doc sidebar.
   1. Open the `docs/docs.json` file.
   1. Add your page to the corresponding group under `navigation`.

When you add, move, or remove a page, update the `docs/docs.json` file in the same change.

## 2. Review and validate the docs

To edit the docs:

1. Follow the [documentation style guide](./.github/style-guide.md) and [Mintlify guidance](./.github/mintlify-guidance.md) while writing and formatting the page.

1. From the `docs/` directory, run the required validation commands:

   ```bash
   mint validate
   mint broken-links
   ```

1. Run `mint a11y`, `mint test`, or `mint dev` when the change involves images, UI instructions, navigation, layout, runnable code blocks, or a local preview.

   If you get stuck on local development, see the [Mintlify development documentation](https://mintlify.com/docs/development).

1. Use this checklist to review your docs for quality.
   
   - **Task-ify page titles and headings**: Where possible, use task-based titles like “Create a data collection schedule” instead of “Creating a data collection schedule”.

   - **Add an introduction paragraph**: Give brief context and define new terms. Let readers know what to expect with text like, “This guide describes how to…”

   - **Improve writing quality**: Use a tool like Grammarly or a code editor extension to check your grammar. Use present tense and active voice (remove “will”).

   - **Break up any walls of words**: Incorporate [code blocks](https://mintlify.com/docs/content/components/code), [lists, tables](https://mintlify.com/docs/list-table), [images](https://mintlify.com/docs/image-embeds), [tabs](https://mintlify.com/docs/content/components/tabs), and other [visual components](https://mintlify.com/docs/content/components/accordions).

   - **Improve flow**: Use progressive disclosure: start high-level, then drill down. Put yourself in your reader’s shoes.

     Orient the content around the user journey. Add framing sentences so the content connects to the reader’s goals. Be directive and tell the reader what to do (don’t present too many options).

## 3. Get your docs reviewed

To get your docs reviewed:

1. Commit and push your changes.
1. Create a pull request.
1. Address any feedback from the reviewers.

## 4. Publish the docs

After you’ve addressed all the reviewers’ feedback and approve your PR, the reviewers will merge your changes into the main branch and they will automatically deploy!

Congratulations and thank you for your contribution!
