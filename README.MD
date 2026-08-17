<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="img/BH_Vertical_BlackField.svg">
        <img src="img/BH_Vertical_BlackField.svg" alt="BloodHound Community Edition" width='400' />
    </picture>
</p>

<hr />

[BloodHound Community Edition](https://github.com/SpecterOps/BloodHound) (BHCE) uses graph theory to reveal the hidden and often unintended relationships within an Active Directory or Azure environment. Attackers can use BloodHound to quickly identify highly complex attack paths that would otherwise be impossible to find. Defenders can use BloodHound to identify and eliminate those same attack paths. Both red and blue teams can use BloodHound to better understand privileged relationships in an Active Directory or Azure environment.

[BloodHound Community Edition](https://github.com/SpecterOps/BloodHound) and [BloodHound Enterprise](https://specterops.io/bloodhound-overview/) are created and maintained by [SpecterOps](https://specterops.io/). The original BloodHound was created by [@\_wald0](https://www.twitter.com/_wald0), [@CptJesus](https://twitter.com/CptJesus), and [@harmj0y](https://twitter.com/harmj0y).

## Useful Links

- [BloodHound Documentation](https://bloodhound.specterops.io/)
- [BloodHound Community Edition Quickstart Guide](https://bloodhound.specterops.io/get-started/quickstart/community-edition-quickstart)
- [BloodHound Slack](https://ghst.ly/BHSlack)

## Getting started

Like BloodHound CE, our documentation is open-source! Perusing our docs and found a typo or an opportunity to expand the documentation? You can contribute directly to fixing and enhancing our documentation. We're incredibly grateful for any contributions, and will make sure to recognize your contribution in the next release notes, and will get you a sweet package of BloodHound swag to boot!

## Before you start

Expectations for overall contribution to our codebase are covered in the [Contributing](./Contributing.md) document. Please be sure to review that page first for expectations on issue linking, commit signing, and Pull Request etiquette.

For instructions on how to specifically contribute to our docs, check out the [Contributing to Docs](./Contributing-To-Docs.md) document.

## Generate OpenGraph library data

The OpenGraph library page uses JSON source files for easier maintenance. To add or update a library entry, edit the files in `docs/snippets/opengraph/library/categories/` or `docs/snippets/opengraph/library/tools.json`.

Each category JSON file must include a `group` value that matches an `id` in `docs/snippets/opengraph/library/groups.json` and an integer `order` value that controls the category's position within that group. Edit `groups.json` to add or reorder groups. The generator fails when a category references an unknown group.

After editing the JSON files, regenerate the JSX data bridge that Mintlify imports:

```bash
just generate-opengraph-library
```

This updates `docs/snippets/opengraph/library/data.generated.jsx`. Do not edit that generated file directly.

## Contact

Please check out the [Contact page](https://github.com/SpecterOps/BloodHound/wiki/Contact) in our wiki for details on how to reach out with questions and suggestions.

## Licensing

```
Copyright 2025 Specter Ops, Inc.

Licensed under the Apache License, Version 2.0
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

Unless otherwise annotated by a lower-level LICENSE file or license header, all files in this repository are released
under the `Apache-2.0` license. A full copy of the license may be found in the top-level [LICENSE](LICENSE) file.
