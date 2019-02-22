#!/usr/bin/env python
import sys
import re
from pathlib import Path

src = Path(__file__).absolute().parent.parent / "src"

line_re = re.compile(r"^CATMAID_\w+\s*=.*$")

def make_export(line):
    if line_re.match(line):
        return "export let " + line
    else:
        return line

def exports(lines):
    return [make_export(line) for line in lines]

ROUTINES = [exports]

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

