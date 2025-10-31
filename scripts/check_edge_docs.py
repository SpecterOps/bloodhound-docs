#!/usr/bin/env python3
"""
Check docs coverage for edges by comparing documented edges in bloodhound-docs
with EdgeInfoComponents defined in the bloodhound code.

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
HELP_TEXTS_INDEX_REL = "packages/javascript/bh-shared-ui/src/components/HelpTexts/index.tsx"
DEFAULT_OUTPUT_REL = "scripts/output"

IGNORED_DOC_FILES = {"overview.mdx", "traversable-edges.mdx"}

FRONTMATTER_RE = re.compile(r"^---\s*(.*?)\s*---", re.DOTALL | re.MULTILINE)
TITLE_LINE_RE = re.compile(r"^title:\s*(?P<title>.+?)\s*$", re.MULTILINE)


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


def extract_edge_keys_from_code(index_path: Path) -> List[str]:
    text = read_file_text(index_path)
    # Find the EdgeInfoComponents object literal
    start = text.find("const EdgeInfoComponents = {")
    if start == -1:
        raise RuntimeError("Could not find 'const EdgeInfoComponents = {' in index.tsx")
    # Slice from the opening brace
    brace_start = text.find("{", start)
    if brace_start == -1:
        raise RuntimeError("Malformed EdgeInfoComponents declaration")
    # Collect lines until the closing '};' for this object
    remainder = text[brace_start + 1 :]
    lines = remainder.splitlines()
    keys: List[str] = []
    for line in lines:
        if line.strip().startswith("};"):
            break
        # Strip inline comments and trailing commas
        # Match patterns like: "    KeyName: Value,"
        # Handle keys with hyphens, quotes, and more whitespace variations
        m = re.match(r'\s*["\']?([A-Za-z0-9_-]+)["\']?\s*:\s*', line)
        if m:
            keys.append(m.group(1))
    keys = sorted(set(keys), key=str.casefold)
    return keys


def write_manifest(path: Path, items: Iterable[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        for item in items:
            f.write(f"{item}\n")


def compare_lists(docs: List[str], code: List[str]) -> Tuple[Set[str], Set[str]]:
    # Create case-insensitive lookup maps
    docs_lower = {item.lower(): item for item in docs}
    code_lower = {item.lower(): item for item in code}
    
    missing_keys = set(code_lower.keys()) - set(docs_lower.keys())
    extra_keys = set(docs_lower.keys()) - set(code_lower.keys())
    
    # Return original-case items for display
    missing_in_docs = {code_lower[k] for k in missing_keys}
    extra_in_docs = {docs_lower[k] for k in extra_keys}
    
    return missing_in_docs, extra_in_docs


def main(argv: List[str]) -> int:
    parser = argparse.ArgumentParser(description="Check Edge docs coverage vs code registry")
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

    index_path = bh_root / HELP_TEXTS_INDEX_REL

    if not edges_dir.exists():
        print(f"ERROR: edges directory not found: {edges_dir}", file=sys.stderr)
        return 2
    if not index_path.exists():
        print(f"ERROR: index.tsx not found: {index_path}", file=sys.stderr)
        return 2

    docs_titles = extract_titles_from_edges(edges_dir)
    code_keys = extract_edge_keys_from_code(index_path)

    # Write manifests
    if not args.no_write:
        out_dir = Path(args.output_dir)
        if not out_dir.is_absolute():
            out_dir = repo_root / out_dir
        write_manifest(out_dir / "edges_docs_manifest.txt", docs_titles)
        write_manifest(out_dir / "edges_code_manifest.txt", code_keys)

    missing_in_docs, extra_in_docs = compare_lists(docs_titles, code_keys)

    print("Edge docs coverage check")
    print(f"- Docs edges: {len(docs_titles)}")
    print(f"- Code edges: {len(code_keys)}")

    if not missing_in_docs and not extra_in_docs:
        print("SUCCESS: Docs coverage matches code edges (1:1)")
        return 0

    if missing_in_docs:
        print("WARNING: Edges present in code but missing in docs:")
        for item in sorted(missing_in_docs, key=str.casefold):
            print(f"  - {item}")
    if extra_in_docs:
        print("WARNING: Edges present in docs but not in code:")
        for item in sorted(extra_in_docs, key=str.casefold):
            print(f"  - {item}")

    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
