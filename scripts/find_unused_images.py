#!/usr/bin/env python3
"""
Find image files under docs/assets and docs/images that are no longer
referenced anywhere in the repo.

References are looked for by filename (e.g. "foo.png") across .mdx, .md,
.json, .jsx, .tsx, .ts, .js, and .css files, since Mintlify docs reference
images by absolute path (e.g. "/assets/foo.svg").

Usage:
  python3 scripts/find_unused_images.py [--repo-root PATH] [--image-dirs DIR [DIR ...]] [--ext EXT [EXT ...]]

Exits with status 1 if any unused images are found, 0 otherwise.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Iterable, List, Set

DEFAULT_IMAGE_DIRS = ["docs/assets", "docs/images"]
DEFAULT_IMAGE_EXTS = {
    ".gif", ".ico", ".jpg", ".jpeg", ".png", ".svg", ".webp", ".avif", ".bmp", ".tiff",
}
SEARCH_EXTS = {".mdx", ".md", ".json", ".jsx", ".tsx", ".ts", ".js", ".mjs", ".cjs", ".css"}
EXCLUDED_DIR_NAMES = {".git", "node_modules", "__pycache__", "output", ".next", "dist", "build"}


def iter_image_files(repo_root: Path, image_dirs: Iterable[str], exts: Set[str]) -> List[Path]:
    files: List[Path] = []
    for rel_dir in image_dirs:
        base = repo_root / rel_dir
        if not base.exists():
            print(f"WARN: image directory not found: {base}", file=sys.stderr)
            continue
        for path in sorted(base.rglob("*")):
            if path.is_file() and path.suffix.lower() in exts:
                files.append(path)
    return files


def iter_searchable_files(repo_root: Path) -> List[Path]:
    files: List[Path] = []
    for path in repo_root.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in SEARCH_EXTS:
            continue
        if any(part in EXCLUDED_DIR_NAMES for part in path.parts):
            continue
        files.append(path)
    return files


def read_text_safe(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except OSError as exc:
        print(f"WARN: could not read {path}: {exc}", file=sys.stderr)
        return ""


def find_unused_images(repo_root: Path, image_dirs: Iterable[str], exts: Set[str]) -> List[Path]:
    image_files = iter_image_files(repo_root, image_dirs, exts)
    searchable_files = iter_searchable_files(repo_root)

    print(
        f"Scanning {len(image_files)} image files against {len(searchable_files)} text files...",
        file=sys.stderr,
    )

    contents = [read_text_safe(f) for f in searchable_files]

    unused: List[Path] = []
    for image_path in image_files:
        name = image_path.name
        if not any(name in text for text in contents):
            unused.append(image_path)
    return unused


def main() -> int:
    parser = argparse.ArgumentParser(description="Find unused image assets in bloodhound-docs")
    parser.add_argument("--repo-root", default=".", help="Path to repo root (default: current directory)")
    parser.add_argument(
        "--image-dirs", nargs="+", default=DEFAULT_IMAGE_DIRS,
        help="Directories (relative to repo root) to scan for images",
    )
    parser.add_argument(
        "--ext", nargs="+", default=None,
        help="Image extensions to check, e.g. png svg (default: common image formats)",
    )
    parser.add_argument(
        "--delete", action="store_true",
        help="Delete the unused images that are found (use with care)",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    raw_exts = args.ext or DEFAULT_IMAGE_EXTS
    exts = {(e if e.startswith(".") else f".{e}").lower() for e in raw_exts}

    unused = find_unused_images(repo_root, args.image_dirs, exts)

    if not unused:
        print("No unused images found.")
        return 0

    print(f"Found {len(unused)} unused image(s):")
    for path in sorted(unused):
        print(f"  {path.relative_to(repo_root)}")

    if args.delete:
        for path in unused:
            path.unlink()
        print(f"Deleted {len(unused)} unused image(s).")

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
