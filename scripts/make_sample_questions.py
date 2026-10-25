"""Writes placeholder question banks (refs start with SAMPLE) for exam apps that don't have real data yet.

Usage: python3 scripts/make_sample_questions.py
Existing files are never overwritten, so real banks are safe.
"""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "content" / "questions"

DRIVING = [
    "Alertness", "Attitude", "Safety and your vehicle", "Safety margins", "Hazard awareness",
    "Vulnerable road users", "Other types of vehicle", "Vehicle handling", "Motorway rules",
    "Rules of the road", "Road and traffic signs", "Documents", "Incidents, accidents and emergencies", "Vehicle loading",
]
LGV = [
    "Vehicle weights and dimensions", "Drivers' hours and rest periods", "Braking systems", "The driver",
    "Carrying loads", "Restricted view", "Leaving the vehicle", "Vehicle condition", "Accidents",
    "Essential documents", "Environmental issues", "Other road users", "Road and traffic signs", "Motorway driving",
]
PCV = [
    "Vehicle weights and dimensions", "Drivers' hours and rest periods", "Braking systems", "The driver",
    "Carrying passengers", "Restricted view", "Leaving the vehicle", "Vehicle condition", "Accidents",
    "Essential documents", "Environmental issues", "Other road users", "Road and traffic signs", "Motorway driving",
]

BANKS = {
    "driving-theory": ("DT", DRIVING, 5, 3),
    "motorcycle-theory": ("MT", DRIVING, 5, 3),
    "lgv-hgv-theory": ("LGV", LGV, 5, 3),
    "pcv-bus-theory": ("PCV", PCV, 5, 3),
    "a-plus-core-1": ("A1", ["Mobile devices", "Networking", "Hardware", "Virtualization and cloud computing", "Hardware and network troubleshooting"], 8, 6),
    "a-plus-core-2": ("A2", ["Operating systems", "Security", "Software troubleshooting", "Operational procedures"], 9, 6),
    "network-plus": ("NP", ["Networking concepts", "Network implementation", "Network operations", "Network security", "Network troubleshooting"], 8, 6),
    "security-plus": ("SP", ["General security concepts", "Threats, vulnerabilities and mitigations", "Security architecture", "Security operations", "Security program management and oversight"], 8, 6),
    "cysa-plus": ("CY", ["Security operations", "Vulnerability management", "Incident response and management", "Reporting and communication"], 9, 6),
}


def bank(prefix, topics, free, premium):
    out, n = [], 0
    for t_id, label in enumerate(topics, 1):
        slug = label.lower().replace(",", "").replace("'", "").replace(" ", "_")
        for k in range(free + premium):
            n += 1
            q = f"[Sample] Question {k + 1} about {label}?"
            out.append({
                "id": n, "ref": f"SAMPLE-{prefix}{n:03d}", "topic_id": t_id, "topic_slug": slug,
                "question": q, "variants": [q, f"[Sample] Variant wording for question {k + 1} on {label}?"],
                "options": ["Sample answer A", "Sample answer B", "Sample answer C", "Sample answer D"],
                "correct_index": n % 4, "correct_option": "ABCD"[n % 4],
                "explanation": "Placeholder explanation. Replace this file with the real question bank from the app.",
                "source_chapter": f"Topic {t_id}: {label}", "difficulty": "medium", "updated_year": 2026,
                "is_premium": k >= free,
            })
    return out


for slug, (prefix, topics, free, premium) in BANKS.items():
    path = OUT / f"{slug}.json"
    if path.exists():
        print("skip (exists)", path.name)
        continue
    path.write_text(json.dumps(bank(prefix, topics, free, premium), indent=2, ensure_ascii=False) + "\n")
    print("wrote", path.name)
