#!/usr/bin/env python3
"""Render/check AWS references using a pinned collector without importing it.

Run from docs/: python3 ../scripts/aws_schema/generate.py --check
See README.md alongside this script for source contracts and maintenance.
"""
import argparse
import ast
from collections import defaultdict
import hashlib
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'docs'
BASE = 'opengraph/extensions/aws'
REVISION = '3b4c00debf30c9762222819e4b17688f1b9158b1'


def keywords(call):
    return {k.arg: k.value for k in call.keywords}


def constants(path):
    result = {}
    for n in ast.parse(path.read_text()).body:
        if isinstance(n, ast.Assign) and isinstance(n.value, ast.Constant):
            for target in n.targets:
                if isinstance(target, ast.Name):
                    result[target.id] = n.value.value
    return result


def safe(value):
    return str(value).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('{', '&#123;').replace('}', '&#125;').replace('|', '&#124;').replace('\n', ' ')


def link(kind, category='nodes'):
    return f'[{kind}](/{BASE}/{category}/{kind.lower()})'


def table(headers, rows):
    return '| ' + ' | '.join(headers) + ' |\n|' + '|'.join(' --- ' for _ in headers) + '|\n' + ''.join('| ' + ' | '.join(row) + ' |\n' for row in rows) + '\n'


def page(title, description, body):
    assert len(title) <= 50 and len(description) <= 160
    return f'''---
title: {json.dumps(title)}
description: {json.dumps(description)}
---

<img noZoom src="/assets/enterprise-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise only" />

<Note>
AWS is in beta for BloodHound Enterprise. This reference covers the unreleased v0.0.4 schema; behavior may change before release.
</Note>

{body}'''


def render(collector):
    actual = subprocess.check_output(['git', '-C', str(collector), 'rev-parse', 'HEAD'], text=True).strip()
    if actual != REVISION:
        raise ValueError(f'Expected collector {REVISION}, found {actual}; review the source contract before updating.')
    subprocess.run(['git', '-C', str(collector), 'diff', '--exit-code', 'HEAD', '--', 'src', 'extension/schema.json'], check=True, capture_output=True)
    schema_path = collector / 'extension/schema.json'
    schema = json.loads(schema_path.read_text())
    src = collector / 'src/openhound_aws'
    nk = constants(src / 'kinds/nodes.py')
    ek = constants(src / 'kinds/edges.py')
    nodes = {n['name']: n for n in schema['node_kinds']}
    edges = {e['name']: e for e in schema['relationship_kinds']}
    assert len(nodes) == 22 and len(edges) == 169
    pairs = defaultdict(set)
    properties = {}
    sources = defaultdict(set)
    actions = defaultdict(set)
    constituents = {}
    routes = defaultdict(list)
    notes = json.loads((Path(__file__).parent / 'notes.json').read_text())

    def add(kind, starts, ends, source):
        if kind in edges:
            for start in starts:
                for end in ends:
                    assert start in nodes and end in nodes, (kind, start, end)
                    pairs[kind].add((start, end))
            sources[kind].add(source)

    principals = ['AWS_User', 'AWS_Role']
    for f in sorted((src / 'models').glob('*.py')):
        tree = ast.parse(f.read_text())
        classes = {n.name: n for n in tree.body if isinstance(n, ast.ClassDef)}
        for n in ast.walk(tree):
            if not isinstance(n, ast.Call):
                continue
            name = ast.unparse(n.func)
            kw = keywords(n)
            if name == 'EdgeDef' and all(k in kw for k in ('kind', 'start', 'end')):
                if all(isinstance(kw[k], ast.Attribute) for k in ('kind', 'start', 'end')):
                    kind = ek[kw['kind'].attr]
                    if kind in edges and nk[kw['start'].attr] in nodes and nk[kw['end'].attr] in nodes:
                        add(kind, [nk[kw['start'].attr]], [nk[kw['end'].attr]], f'models/{f.name}')
            if name != 'NodeDef':
                continue
            kind = nk[kw['kind'].attr]
            if kind not in nodes:
                continue
            cls = classes[kw['properties'].id]
            doc = ast.get_docstring(cls) or ''
            descriptions = dict(re.findall(r'^\s+(\w+): (.+)$', doc, re.M))
            # Only include fields supplied to the emitted property constructor or
            # concrete defaults, not unused declarations or provider input fields.
            supplied = set()
            for call in ast.walk(tree):
                if isinstance(call, ast.Call) and ast.unparse(call.func) == cls.name:
                    supplied.update(keywords(call))
            fields = []
            for field in cls.body:
                if not isinstance(field, ast.AnnAssign):
                    continue
                field_name = field.target.id
                if field_name in ('account_id', 'collected'):
                    continue
                if field_name not in supplied and field.value is None:
                    continue
                # Default None without any assignment never supplies data.
                if field_name not in supplied and isinstance(field.value, ast.Constant) and field.value.value is None:
                    continue
                text = descriptions.get(field_name, notes['properties'].get(field_name))
                if text is None:
                    raise ValueError(f'Missing property explanation: {kind}.{field_name}')
                fields.append((field_name, ast.unparse(field.annotation), text))
            properties[kind] = fields

    # Resource type mappings are declared in kinds/mapping.py.
    mapping_tree = ast.parse((src / 'kinds/mapping.py').read_text())
    mapping = {}
    for n in mapping_tree.body:
        if isinstance(n, ast.Assign) and isinstance(n.value, ast.Dict):
            mapping.update({ast.literal_eval(k): nk[v.id] for k, v in zip(n.value.keys, n.value.values)})
    for f in sorted((src / 'permissions/definitions').glob('*.py')):
        for n in ast.walk(ast.parse(f.read_text())):
            if not isinstance(n, ast.Call) or ast.unparse(n.func) != 'PermissionDefinition':
                continue
            action, kind, resources = n.args[:3]
            if not isinstance(kind, ast.Attribute):
                continue
            kind = ek[kind.attr]
            if kind not in edges:
                continue
            actions[kind].add(ast.literal_eval(action))
            # Federation is emitted from provider models, not IAM permissions.
            if kind in ('AWS_CanAssumeRoleWithSAML', 'AWS_CanAssumeRoleWithWebIdentity'):
                continue
            if kind in ('AWS_CanGetSessionToken', 'AWS_CanGetFederationToken'):
                self_kinds = principals if kind.endswith('SessionToken') else ['AWS_User']
                for p in self_kinds:
                    add(kind, [p], [p], 'permissions/dispatcher.py')
                continue
            types = ast.literal_eval(resources.args[0])
            target = keywords(n).get('target')
            if isinstance(target, ast.Call) and ast.literal_eval(keywords(target)['mode']) == 'account':
                ends = ['AWS_Account']
            elif kind in ('AWS_CanDeleteObject', 'AWS_CanGetObject', 'AWS_CanGetObjectACL', 'AWS_CanPutObject', 'AWS_CanPutObjectACL'):
                ends = ['AWS_S3Bucket', 'AWS_S3Object']
            else:
                ends = [mapping[r] for r in types]
            if ends:
                add(kind, principals, ends, f'permissions/definitions/{f.name}')

    for n in ast.walk(ast.parse((src / 'kinds/meta.py').read_text())):
        if not isinstance(n, ast.Call) or ast.unparse(n.func) != 'MetaEdgeDefinition':
            continue
        kw = keywords(n)
        kind = ek[kw['kind'].attr]
        if kind not in edges:
            continue
        resource = ast.literal_eval(kw['resource_type'])
        ends = ['AWS_S3Bucket', 'AWS_S3Object'] if resource == 's3:object' else [mapping[resource]]
        add(kind, principals, ends, 'kinds/meta.py')
        constituents[kind] = sorted(ek[v.attr] for v in kw['constituents'].args[0].elts)

    for name, ends in notes['composite_targets'].items():
        add(name, principals, ends, notes['target_sources'][name])
    for n in ast.walk(ast.parse((src / 'permissions/pass_role.py').read_text())):
        if not isinstance(n, ast.Call) or ast.unparse(n.func) != 'PassRolePath':
            continue
        service, trusted_service, required, kind = n.args[:4]
        kind = ek[kind.attr]
        add(kind, principals, ['AWS_Role'], 'permissions/pass_role.py')
        routes[kind].append((ast.literal_eval(trusted_service), ast.literal_eval(required),
                             ast.literal_eval(keywords(n).get('allow_trust_rewrite', ast.Constant(False)))))
    # Runtime role.py emits these even though the decorator does not declare them.
    for kind, starts, ends in notes['model_endpoints']:
        add(kind, starts, ends, 'models/role.py')
    assert set(pairs) == set(edges), ('Missing endpoints', sorted(set(edges) - set(pairs)))
    assert set(properties) == set(nodes) - {'AWS_InlinePolicy'}

    def yes(kind):
        return 'Yes' if edges[kind]['is_traversable'] else 'No'

    shared = [
        ('name', 'str', 'Collector-generated name used to identify the resource in context.'),
        ('displayname', 'str', 'Resource label shown in the graph.'),
        ('arn', 'str or null', 'AWS Resource Name used as the node identifier.'),
        ('account_id', 'str or null', 'AWS account associated with the resource; nullable in the shared model.'),
        ('region', 'str or null', 'AWS region, or `global` for resources without a regional scope.'),
        ('environmentid', 'str', 'Account root ARN identifying the OpenGraph environment.'),
    ]
    output = {}
    for kind, node in sorted(nodes.items()):
        body = safe(node['description']).rstrip('.') + '.\n\n'
        if kind == 'AWS_InlinePolicy':
            body += '## Collection status\n\nThis kind is defined in the schema, but the current collector does not emit standalone inline-policy nodes or attachment edges for them. Inline policy documents are stored on IAM user, group, and role nodes in `inline_policies`. There is no emitted identifier or property contract for this kind in this version.\n\n'
        else:
            identity = notes['identity'].get(kind, 'The node identifier is the resource ARN in `arn`.')
            body += '## Identifier\n\n' + identity + '\n\n'
            body += '## Properties\n\nTypes below describe collected values. `null` means the value can be unavailable; it does not make the AWS resource optional. Collection scope and API responses determine which metadata is available.\n\n'
            fields = shared + properties[kind]
            if kind == 'AWS_Account':
                fields += [('collected', 'bool', 'True for an account targeted by collection.')]
            rows = []
            for name, typ, desc in fields:
                typ = typ.replace(' | None', ' or null')
                rows.append([f'`{name}`', f'`{safe(typ)}`', safe(desc)])
            body += table(['Property', 'Type', 'Description'], rows)
        if kind in notes['nodes']:
            body += '## Interpretation\n\n' + notes['nodes'][kind] + '\n\n'
        body += '## Relationships\n\nThese tables cover relationships emitted for this kind by the AWS collector. Other extensions can define additional relationships.\n\n'
        for direction, index, other_index in [('Inbound', 1, 0), ('Outbound', 0, 1)]:
            rows = []
            for edge, endpoints in sorted(pairs.items()):
                others = sorted({p[other_index] for p in endpoints if p[index] == kind})
                if others:
                    rows.append([link(edge, 'edges'), ', '.join(link(o) for o in others), yes(edge)])
            body += f'### {direction}\n\n'
            body += table(['Edge', 'Source kind' if index == 1 else 'Destination kind', 'Traversable'], rows) if rows else 'No relationships are emitted in this direction for this kind in the current collector.\n\n'
        body += f'[AWS schema](/{BASE}/schema)\n'
        output[f'{BASE}/nodes/{kind.lower()}.mdx'] = page(kind, f'{node["display_name"]} identity, collected properties, and AWS graph relationships.', body)

    structural = set(notes['structural'])
    for kind, edge in sorted(edges.items()):
        body = safe(edge['description']).rstrip('.') + '.\n\n'
        body += '## Edge schema\n\n'
        body += table(['Source kind', 'Destination kind'], [[link(a), link(b)] for a, b in sorted(pairs[kind])])
        body += f'**Traversable:** {yes(kind)}. '
        body += ('BloodHound can include this relationship in an Attack Path.\n\n' if edge['is_traversable'] else 'This relationship supplies structural or permission evidence and does not independently form an Attack Path step.\n\n')
        if kind in notes['edges']:
            body += '## Interpretation\n\n' + notes['edges'][kind] + '\n\n'
        if actions[kind] and kind not in structural:
            body += '## Authorization evidence\n\nAssociated API action: ' + ', '.join(f'`{a}`' for a in sorted(actions[kind])) + '.\n\n'
        if kind in constituents:
            body += '## Composite requirements\n\nThe collector combines the following permission kinds for the same principal and target. Their presence must satisfy the collector\'s evaluation and resource-state checks.\n\n'
            body += ''.join(f'- {link(c, "edges")}\n' if c in edges else f'- `{c}` (internal permission evidence, not a public schema kind)\n' for c in constituents[kind]) + '\n'
        if kind in routes:
            body += '## Service route requirements\n\nThe principal needs `iam:PassRole` on the target role and one complete operation bundle below in the same account. The destination is the passed role, rather than the service resource used to authorize the operation.\n\n'
            body += table(['Trusted service', 'Required operation bundle', 'Trust rewrite supported'], [[f'`{service}`', ' + '.join(f'`{a}`' for a in required), 'Yes' if rewrite else 'No'] for service, required, rewrite in routes[kind]])
            body += 'The role must trust the listed service. Where trust rewriting is supported, `iam:UpdateAssumeRolePolicy` on that role can supply an alternative. The collector checks `iam:PassedToService` conditions and records the selected route in `methods`. This evidence contributes to ' + link('AWS_CanPassRoleToService', 'edges') + '.\n\n'
        if kind not in structural:
            body += '## Evaluation limits\n\nThis edge represents the collector\'s model of collected authorization and resource state. It does not prove that every runtime request succeeds. Inspect unresolved `conditions` and `trust_policy_conditions` when present; `has_conditions` and `has_trust_policy_conditions` indicate retained evidence. Composite edges can include `methods` or `composite_components` describing their derivation.\n\n'
        body += f'[AWS schema](/{BASE}/schema)\n'
        output[f'{BASE}/edges/{kind.lower()}.mdx'] = page(kind, f'{kind} direction, traversability, and interpretation in the AWS schema.', body)

    body = '''The AWS extension models accounts, IAM identities, resources, and their authorization relationships. Use this reference to interpret the graph produced by the [AWS collector](/openhound/collectors/aws/overview).

## Metadata

'''
    meta = schema['schema']
    body += table(['Field', 'Value'], [[safe(k), f'`{safe(v)}`'] for k, v in meta.items()] + [['Environment kind', '`AWS_Account`'], ['Platform (`source_kind`)', '`AWS`']])
    body += 'This unreleased integration reference contains **22 node kinds** and **169 edge kinds**: **36 traversable** and **133 non-traversable**. It does not establish compatibility with a released BloodHound version.\n\n'
    body += '## How to read the schema\n\nEdge direction runs from the source node to the destination node. Traversable edges can participate in Attack Paths; non-traversable edges retain structural or permission evidence. An IAM allow statement alone does not establish an unconditional Attack Path. The collector evaluates policies and can retain unresolved conditions on edges. Review the edge detail page and collected evidence before interpreting a capability.\n\n'
    body += 'Creation capabilities can end at an account because the resource does not exist yet. S3 object-operation edges can end at a bucket to describe its modeled object namespace, or at a collected object; a bucket endpoint does not assert access to every key.\n\n'
    body += '## Nodes\n\n' + table(['Node kind', 'Display name', 'Description'], [[link(k), safe(n['display_name']), safe(n['description'])] for k, n in sorted(nodes.items())])
    body += '## Edges\n\n' + table(['Relationship kind', 'Traversable', 'Description'], [[link(k, 'edges'), yes(k), safe(e['description'])] for k, e in sorted(edges.items())])
    body += '## Reference snapshot\n\nThis reference follows the SOAWS v0.0.4 collector schema snapshot. Schema SHA-256: `' + hashlib.sha256(schema_path.read_bytes()).hexdigest() + '`.\n'
    output[f'{BASE}/schema.mdx'] = page('Schema', 'AWS extension schema: node kinds, edge kinds, and traversability for the Enterprise beta.', body)
    return output, nodes, edges


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--collector-root', type=Path, default=ROOT.parent / 'openhound-aws')
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    output, nodes, edges = render(args.collector_root.resolve())
    nav_file = SITE / 'docs.json'
    nav_text = nav_file.read_text()
    nav = json.loads(nav_text)
    aws_group = {'group': 'AWS (beta)', 'pages': [f'{BASE}/schema',
                 {'group': 'Nodes', 'pages': [f'{BASE}/nodes/{k.lower()}' for k in sorted(nodes)]},
                 {'group': 'Edges', 'pages': [f'{BASE}/edges/{k.lower()}' for k in sorted(edges)]}]}

    def groups(obj):
        if isinstance(obj, dict):
            yield obj
            for value in obj.values():
                yield from groups(value)
        elif isinstance(obj, list):
            for value in obj:
                yield from groups(value)

    if not args.check:
        for path, text in output.items():
            file = SITE / path
            file.parent.mkdir(parents=True, exist_ok=True)
            file.write_text(text)
        parent = next(g for g in groups(nav) if g.get('group') == 'BloodHound Enterprise Extensions')
        parent['pages'] = [p for p in parent['pages'] if not isinstance(p, dict) or p.get('group') != 'AWS (beta)']
        parent['pages'].append(aws_group)
        # Preserve this repository's two-space JSON format.
        nav_file.write_text(json.dumps(nav, indent=2, ensure_ascii=False) + '\n')
    errors = []
    actual_files = {str(f.relative_to(SITE)) for f in (SITE / BASE).rglob('*.mdx')}
    if actual_files != set(output):
        errors.append(f'Page inventory differs: {sorted(actual_files ^ set(output))}')
    for path, expected in output.items():
        file = SITE / path
        if not file.exists() or file.read_text() != expected:
            errors.append(f'Outdated or missing: {path}')
    nav = json.loads(nav_file.read_text())
    aws = [g for g in groups(nav) if g.get('group') == 'AWS (beta)']
    if aws != [aws_group]:
        errors.append('AWS navigation inventory/order differs')

    def strings(obj):
        if isinstance(obj, str):
            yield obj
        elif isinstance(obj, dict):
            for value in obj.values():
                yield from strings(value)
        elif isinstance(obj, list):
            for value in obj:
                yield from strings(value)

    all_nav = list(strings(nav))
    for path in output:
        if all_nav.count(path.removesuffix('.mdx')) != 1:
            errors.append(f'Navigation missing/duplicate: {path}')
    for path, text in output.items():
        for target in re.findall(r'\]\((/[^)#]+)', text):
            if not any((SITE / (target.lstrip('/') + ext)).exists() for ext in ('.mdx', '.md', '')):
                errors.append(f'Broken link in {path}: {target}')
    if errors:
        raise SystemExit('\n'.join(errors))
    print('PASS: 22 nodes, 169 edges, 36 traversable/133 non-traversable; exact content, properties, endpoints, index, links and navigation match the pinned source contract.')


if __name__ == '__main__':
    main()
