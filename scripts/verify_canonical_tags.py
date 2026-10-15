import os
from pathlib import Path

WORKSPACE = Path("/Users/manuelchavez/Documents/cscloudsolutions/cscloudsolutions")
APP_LOCALE = WORKSPACE / "src/app/[locale]"

pages = []
for root, _, files in os.walk(APP_LOCALE):
    for f in files:
        if f == "page.tsx":
            pages.append(Path(root) / f)

print(f"Total pages in src/app/[locale]: {len(pages)}")

for p in sorted(pages):
    rel = p.relative_to(APP_LOCALE)
    content = p.read_text(encoding="utf-8")
    has_generate_metadata = "generateMetadata" in content
    has_metadata = "export const metadata" in content
    has_create_page_metadata = "createPageMetadata" in content
    has_alternates = "alternates" in content

    status = "OK" if (has_create_page_metadata or has_alternates) else "MISSING CANONICAL"
    print(f"[{status:17}] {str(rel):45} (genMeta: {has_generate_metadata}, staticMeta: {has_metadata})")
