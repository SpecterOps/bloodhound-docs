#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <source-file>" >&2
  exit 1
fi

source_file="$1"

if [ ! -f "$source_file" ]; then
  echo "File not found: $source_file" >&2
  exit 1
fi

case "${source_file##*.}" in
  pdf|PDF)
    exec pdftotext -layout "$source_file" -
    ;;
  docx|DOCX)
    exec textutil -convert txt -stdout "$source_file"
    ;;
  txt|TXT|md|MD|mdx|MDX)
    exec cat "$source_file"
    ;;
  *)
    echo "Unsupported file type: $source_file" >&2
    echo "Supported extensions: .pdf, .docx, .txt, .md, .mdx" >&2
    exit 2
    ;;
esac
