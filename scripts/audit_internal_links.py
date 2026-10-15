import os
import re
from pathlib import Path

WORKSPACE = Path("/Users/manuelchavez/Documents/cscloudsolutions/cscloudsolutions")
SRC = WORKSPACE / "src"

VALID_STATIC_ROUTES = {
    "/",
    "/microsoft-365",
    "/azure",
    "/seguridad",
    "/modern-workplace",
    "/power-platform",
    "/soporte",
    "/automations",
    "/agentic-ai",
    "/finops",
    "/finops/plataforma",
    "/finops/guia",
    "/nosotros",
    "/blog",
    "/partners",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
    "/politica-de-reembolso",
    "/admin",
    "/admin/login",
    "/admin/media",
    "/admin/posts",
    "/admin/posts/new",
}

# Collect all valid blog slugs across locales
BLOG_SLUGS = set()
for lang in ["es", "en", "pt-BR"]:
    blog_dir = SRC / f"content/blog/{lang}"
    if blog_dir.exists():
        for f in blog_dir.glob("*.md"):
            BLOG_SLUGS.add(f.stem)

print(f"Known Blog Slugs ({len(BLOG_SLUGS)}): {BLOG_SLUGS}")

pattern = re.compile(r'href=[\'"{`](/[^\'"`}\s>]+)[\'"`}]')

issues = []

for root, _, files in os.walk(SRC):
    for f in files:
        if f.endswith((".tsx", ".ts", ".md")):
            p = Path(root) / f
            try:
                content = p.read_text(encoding="utf-8")
            except Exception:
                continue

            for m in pattern.finditer(content):
                raw_link = m.group(1).split("#")[0].split("?")[0].rstrip("/")
                if not raw_link:
                    raw_link = "/"

                # Ignore external-like assets or API
                if raw_link.startswith(("/_next", "/api", "/images", "/fonts", "/favicon", "/icon", "/opengraph")):
                    continue

                # Strip locale prefix if present to check root path
                clean = raw_link
                has_es_prefix = clean == "/es" or clean.startswith("/es/")
                if has_es_prefix:
                    issues.append((f"Hardcoded /es prefix: {raw_link}", str(p.relative_to(WORKSPACE))))
                    continue

                for loc in ["/en", "/pt-BR"]:
                    if clean == loc:
                        clean = "/"
                        break
                    elif clean.startswith(f"{loc}/"):
                        clean = clean[len(loc):]
                        break

                if clean == "":
                    clean = "/"

                # Check if it's blog post
                if clean.startswith("/blog/"):
                    slug = clean[len("/blog/"):]
                    if slug and slug not in BLOG_SLUGS and not slug.startswith("${") and not slug.startswith("["):
                        issues.append((f"Unknown blog slug: {clean}", str(p.relative_to(WORKSPACE))))
                elif clean not in VALID_STATIC_ROUTES and not clean.startswith(("/admin/posts/", "${")):
                    issues.append((f"Route not found (possible 404): {clean} (raw: {raw_link})", str(p.relative_to(WORKSPACE))))

print(f"\n--- ISSUES ENCONTRADOS ({len(issues)}) ---")
for issue, src_file in issues:
    print(f"❌ {issue:65} -> en {src_file}")
