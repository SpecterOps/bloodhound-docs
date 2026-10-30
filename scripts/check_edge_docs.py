#!/usr/bin/env python3
"""
Check docs coverage for edges by comparing documented edges in bloodhound-docs
with the AD and Azure relationship kinds defined in the bloodhound CUE schema.

Outputs two alphabetized manifests and prints a comparison summary.

Usage:
  python3 scripts/check_edge_docs.py [--bh-root PATH] [--edges-dir PATH] [--output-dir PATH]

Defaults assume the docs repo and the code repo are siblings in the same parent directory.
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path
from typing import Iterable, List, Set, Tuple

DOCS_EDGES_REL = "docs/resources/edges"
DEFAULT_BH_REL = "../BloodHound"
CUE_SCHEMA_REL = (
    "packages/cue/bh/ad/ad.cue",
    "packages/cue/bh/azure/azure.cue",
)
DEFAULT_OUTPUT_REL = "scripts/output"

IGNORED_DOC_FILES = {"overview.mdx", "traversable-edges.mdx"}

# These relationship kinds are present in the graph schema but are internal or
# composition-oriented and are not published as standalone edge documentation.
# Keep this list explicit and reviewed when the documentation policy changes.
NON_DOCUMENTED_RELATIONSHIPS = frozenset(
    {
        "ContainsIdentity",
        "PropagatesACEsTo",
        "GPOAppliesTo",
        "CanApplyGPO",
    }
)

FRONTMATTER_RE = re.compile(r"^---\s*(.*?)\s*---", re.DOTALL | re.MULTILINE)
TITLE_LINE_RE = re.compile(r"^title:\s*(?P<title>.+?)\s*$", re.MULTILINE)
CUE_KIND_DEF_RE = re.compile(
    r"^(?P<name>[A-Za-z][A-Za-z0-9_]*):\s*types\.#Kind\s*&\s*\{(?P<body>.*?)^\}",
    re.DOTALL | re.MULTILINE,
)
CUE_RELATIONSHIP_LIST_RE = re.compile(
    r"^RelationshipKinds:\s*\[\s*\n(?P<body>.*?)^\]",
    re.DOTALL | re.MULTILINE,
)
CUE_LIST_ITEM_RE = re.compile(r"^\s*(?P<name>[A-Za-z][A-Za-z0-9_]*)\s*,?\s*$", re.MULTILINE)
FIELD_RE_TEMPLATE = r"^\s*{field}:\s*\"(?P<value>[^\"]+)\"\s*$"


def read_file_text(path: Path) -> str:
    with path.open("r", encoding="utf-8") as f:
        return f.read()


def extract_titles_from_edges(dir_path: Path) -> List[str]:
    titles: List[str] = []
    for entry in sorted(dir_path.glob("*.mdx")):
        if entry.name in IGNORED_DOC_FILES:
            continue
        text = read_file_text(entry)
        # Extract frontmatter block
        fm_match = FRONTMATTER_RE.search(text)
        if not fm_match:
            # Skip files without frontmatter; warn to stderr
            print(f"WARN: No frontmatter in {entry}", file=sys.stderr)
            continue
        fm = fm_match.group(1)
        t_match = TITLE_LINE_RE.search(fm)
        if not t_match:
            print(f"WARN: No title in frontmatter for {entry}", file=sys.stderr)
            continue
        # Title may be quoted or unquoted; strip surrounding quotes and whitespace
        raw = t_match.group("title").strip()
        title = raw.strip('"\'')
        titles.append(title)
    titles.sort(key=str.casefold)
    return titles


def extract_edge_keys_from_cue(cue_path: Path) -> Set[str]:
    text = read_file_text(cue_path)

    definitions = {}
    for match in CUE_KIND_DEF_RE.finditer(text):
        body = match.group("body")
        symbol_match = re.search(FIELD_RE_TEMPLATE.format(field="symbol"), body, re.MULTILINE)
        representation_match = re.search(
            FIELD_RE_TEMPLATE.format(field="representation"), body, re.MULTILINE
        )
        if not symbol_match:
            continue
        definitions[match.group("name")] = (
            symbol_match.group("value"),
            representation_match.group("value") if representation_match else None,
        )

    relationship_list = CUE_RELATIONSHIP_LIST_RE.search(text)
    if not relationship_list:
        raise RuntimeError(f"Could not find RelationshipKinds in {cue_path}")

    references = [
        match.group("name") for match in CUE_LIST_ITEM_RE.finditer(relationship_list.group("body"))
    ]
    if not references:
        raise RuntimeError(f"RelationshipKinds is empty or malformed in {cue_path}")

    missing_definitions = sorted(set(references) - definitions.keys(), key=str.casefold)
    if missing_definitions:
        raise RuntimeError(
            f"RelationshipKinds references undefined kinds in {cue_path}: "
            + ", ".join(missing_definitions)
        )

    return {
        definitions[reference][1] or definitions[reference][0]
        for reference in references
    }


def write_manifest(path: Path, items: Iterable[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        for item in items:
            f.write(f"{item}\n")


def compare_lists(docs: List[str], schema: Set[str]) -> Tuple[Set[str], Set[str]]:
    docs_set = set(docs)
    return schema - docs_set, docs_set - schema


def main(argv: List[str]) -> int:
    parser = argparse.ArgumentParser(description="Check edge docs coverage vs the CUE schema")
    parser.add_argument("--bh-root", default=os.environ.get("BH_REPO_ROOT", DEFAULT_BH_REL), help="Path to bloodhound code repo root")
    parser.add_argument("--edges-dir", default=DOCS_EDGES_REL, help="Path to edges docs directory (relative or absolute)")
    parser.add_argument("--output-dir", default=DEFAULT_OUTPUT_REL, help="Directory to write manifest files")
    parser.add_argument("--no-write", action="store_true", help="Do not write manifest files, only print results")
    args = parser.parse_args(argv)

    repo_root = Path(__file__).resolve().parents[1]
    edges_dir = Path(args.edges_dir)
    if not edges_dir.is_absolute():
        edges_dir = repo_root / edges_dir

    bh_root = Path(args.bh_root)
    if not bh_root.is_absolute():
        bh_root = (repo_root / args.bh_root).resolve()

    cue_paths = [bh_root / relative_path for relative_path in CUE_SCHEMA_REL]

    if not edges_dir.exists():
        print(f"ERROR: edges directory not found: {edges_dir}", file=sys.stderr)
        return 2
    missing_cue_paths = [path for path in cue_paths if not path.exists()]
    if missing_cue_paths:
        for path in missing_cue_paths:
            print(f"ERROR: CUE schema file not found: {path}", file=sys.stderr)
        return 2

    docs_titles = extract_titles_from_edges(edges_dir)
    schema_keys = set().union(*(extract_edge_keys_from_cue(path) for path in cue_paths))

    unknown_exclusions = NON_DOCUMENTED_RELATIONSHIPS - schema_keys
    if unknown_exclusions:
        raise RuntimeError(
            "Configured non-documented relationships are not present in the CUE schema: "
            + ", ".join(sorted(unknown_exclusions, key=str.casefold))
        )
    schema_keys -= NON_DOCUMENTED_RELATIONSHIPS

    # Write manifests
    if not args.no_write:
        out_dir = Path(args.output_dir)
        if not out_dir.is_absolute():
            out_dir = repo_root / out_dir
        write_manifest(out_dir / "edges_docs_manifest.txt", docs_titles)
        write_manifest(out_dir / "edges_schema_manifest.txt", sorted(schema_keys, key=str.casefold))

    missing_in_docs, extra_in_docs = compare_lists(docs_titles, schema_keys)

    print("Edge docs coverage check")
    print(f"- Docs edges: {len(docs_titles)}")
    print(f"- Schema edges: {len(schema_keys)}")
    print(f"- Explicitly excluded schema edges: {len(NON_DOCUMENTED_RELATIONSHIPS)}")

    if not missing_in_docs and not extra_in_docs:
        print("SUCCESS: Docs coverage matches schema edges (1:1)")
        return 0

    if missing_in_docs:
        print("WARNING: Schema edges missing in docs:")
        for item in sorted(missing_in_docs, key=str.casefold):
            print(f"  - {item}")
    if extra_in_docs:
        print("WARNING: Docs edges not present in schema:")
        for item in sorted(extra_in_docs, key=str.casefold):
            print(f"  - {item}")

    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
