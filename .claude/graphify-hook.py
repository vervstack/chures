#!/usr/bin/env python3
import sys, json, os, re

try:
    data = json.load(sys.stdin)
    cmd = data.get('command', '')
    if not os.path.exists('graphify-out/graph.json'):
        sys.exit(0)
    # Block recursive grep (codebase search)
    if re.search(r'\bgrep\b[^|]*-[a-zA-Z]*r', cmd):
        print('graphify graph available — use: graphify query "<question>" instead of grep -r')
        sys.exit(1)
    # Block bare ls of source directories
    if re.match(r'\s*ls\s+(src|demo|components|hooks|lib)(/?|\s|$)', cmd):
        print('graphify graph available — use: graphify query "what is in <dir>" or graphify explain "<symbol>"')
        sys.exit(1)
except Exception:
    pass

sys.exit(0)
