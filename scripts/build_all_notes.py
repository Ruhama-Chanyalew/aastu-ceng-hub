#!/usr/bin/env python3
"""
Master Builder for AASTU Computer Engineering Lecture Notes
Compiles all 33 chapters across 6 core courses into js/notes-data.js
"""

import os
import sys
import json
import re

# Add scripts directory to path
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, script_dir)

from gen_vlsi import get_vlsi_notes
from gen_robotics import get_robotics_notes
from gen_os import get_os_notes
from gen_ml import get_ml_notes
from gen_se import get_se_notes
from gen_embedded import get_embedded_notes

def main():
    print("Compiling AASTU Lecture Notes Database...")
    
    vlsi = get_vlsi_notes()
    robotics = get_robotics_notes()
    os_notes = get_os_notes()
    ml = get_ml_notes()
    se = get_se_notes()
    embedded = get_embedded_notes()
    
    all_notes = {}
    all_notes.update(vlsi)
    all_notes.update(robotics)
    all_notes.update(os_notes)
    all_notes.update(ml)
    all_notes.update(se)
    all_notes.update(embedded)
    
    expected_courses = {
        "eceg5405": 6,
        "eceg5511": 7,
        "eceg5401": 5,
        "eceg5407": 5,
        "eceg5409": 5,
        "eceg5403": 5,
    }
    
    total_expected = sum(expected_courses.values())
    print(f"Total chapters collected: {len(all_notes)} / {total_expected}")
    
    # Verify every expected key
    missing = []
    for cid, count in expected_courses.items():
        for ch in range(1, count + 1):
            key = f"{cid}-ch{ch}"
            if key not in all_notes:
                missing.append(key)
            else:
                note = all_notes[key]
                assert "sections" in note and len(note["sections"]) >= 4, f"{key} has too few sections!"
                assert "title" in note and len(note["title"]) > 3, f"{key} missing title!"
                
    if missing:
        print(f"ERROR: Missing chapters: {missing}")
        sys.exit(1)
        
    print("All 33 chapters verified successfully! Checking word counts & formatting...")
    total_sections = sum(len(n["sections"]) for n in all_notes.values())
    total_chars = sum(sum(len(s["content"]) for s in n["sections"]) for n in all_notes.values())
    print(f"Total Sections: {total_sections}")
    print(f"Total Content Characters: {total_chars:,} (~{total_chars//5:,} words)")
    
    # Generate JavaScript file
    target_path = os.path.join(os.path.dirname(script_dir), "js", "notes-data.js")
    
    js_content = """/**
 * AASTU Computer Engineering (CENG) - Comprehensive Lecture Notes Data
 * Tailored for Addis Ababa Science and Technology University (AASTU)
 * Department of Electrical and Computer Engineering — Graduating Class (GC 2026)
 * Grounded in authoritative curriculum textbooks and Ethiopian National Exit Exam (NEE5108) benchmarks.
 */

const AASTU_NOTES = """ + json.dumps(all_notes, indent=2, ensure_ascii=False) + ";\n"
    
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Successfully generated: {target_path} ({os.path.getsize(target_path):,} bytes)")

if __name__ == "__main__":
    main()
