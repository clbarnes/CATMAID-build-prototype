#!/usr/bin/env python
import sys
from pathlib import Path

src = Path(__file__).parent.parent / "src"

ROUTINES = []

def process_file(path: Path, dry_run=False):
    txt = path.read_text()
    lines = txt.split('\n')
    for routine in ROUTINES:
        lines = routine(lines)
    new_txt = '\n'.join(lines)
    if dry_run:
        inter = "not " if new_txt == txt else ""
        print(f"Would {inter}change {path}")
    else:
        path.write_text(new_txt)

def main(dry_run=False):
    for path in src.rglob("*.js"):
        process_file(path, dry_run)


if __name__ == "__main__":
    main(sys.argv[-1] == "-d")

