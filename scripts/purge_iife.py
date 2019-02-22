#!/usr/bin/env python
import sys
from pathlib import Path

src = Path("../src")

def start_end(lines):
    start_line = [idx for idx, line in enumerate(lines) if str_eq(line, "(function(CATMAID) {")][0]
    end_line = [idx for idx, line in enumerate(lines) if str_eq(line, "})(CATMAID);")][0]
    return start_line, end_line

def blank_line_near(lst, idx):
    if lst[idx-1] == "":
        return [idx-1, idx]
    if lst[idx+1] == "":
        return [idx, idx + 1]
    else:
        return [idx]

def is_strict_line(s):
    strict = "use strict"
    return s[1:1+len(strict)] == strict

def is_strict(lst):
    return bool(sum(is_strict_line(line) for line in lst))

def replace_global(lst):
    return [line.replace("CATMAID.", "CATMAID_") for line in lst]

def no_space(s):
    return ''.join(c for c in s if c != " ")

def str_eq(s1, s2):
    return no_space(s1) == no_space(s2)

def purge_iife(lst):
    try:
        start, end = start_end(lst)
    except IndexError:
        return lst

    before = lst[:start+1]
    after = lst[end:]

    middle = [line[2:] if line.startswith("  ") else line for line in lst[start+1:end]]
    lst = before + middle + after

    to_remove = sorted(blank_line_near(lst, start) + blank_line_near(lst, end), reverse=True)
    for idx in to_remove:
        lst.pop(idx)

    return lst

def get_first_noncomment_line(lines):
    """does not handle multiline comments"""
    starters = ["#!", "//", "/*"]
    for idx, line in enumerate(lines):
        if any(line.startswith(starter) for starter in starters):
            continue
        return idx

def make_strict(lines):
    if not is_strict(lines):
        return lines
    strict_line = [idx for idx, line in enumerate(lines) if is_strict_line(line)][0]
    lines.pop(strict_line)
    lines.insert(get_first_noncomment_line(lines), '"use strict";')
    return lines

def process_file(path: Path, dry_run=False):
    txt = path.read_text()
    lines = txt.split('\n')
    for routine in [purge_iife, make_strict, replace_global]:
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

