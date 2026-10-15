import os
import re

BLOG_DIR = os.path.join(os.getcwd(), 'src/content/blog')
TARGET_DATE_MODIFIED = "2026-10-14"

def update_post_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if not content.startswith('---'):
        print(f"Skipping (no frontmatter): {filepath}")
        return False

    parts = content.split('---', 2)
    if len(parts) < 3:
        print(f"Skipping (malformed frontmatter): {filepath}")
        return False

    frontmatter = parts[1]
    body = parts[2]

    # Extract date
    date_match = re.search(r'^date:\s*["\']?([^"\']+)["\']?', frontmatter, re.MULTILINE)
    published_date = date_match.group(1).strip() if date_match else "2025-09-01"

    # Ensure author is corporate or clean
    author_match = re.search(r'^author:\s*["\']?([^"\']+)["\']?', frontmatter, re.MULTILINE)
    author = author_match.group(1).strip() if author_match else "CSCloudSolutions"

    # Update or add datePublished
    if re.search(r'^datePublished:', frontmatter, re.MULTILINE):
        frontmatter = re.sub(r'^datePublished:.*$', f'datePublished: "{published_date}"', frontmatter, flags=re.MULTILINE)
    else:
        frontmatter += f'\ndatePublished: "{published_date}"'

    # Update or add dateModified
    if re.search(r'^dateModified:', frontmatter, re.MULTILINE):
        frontmatter = re.sub(r'^dateModified:.*$', f'dateModified: "{TARGET_DATE_MODIFIED}"', frontmatter, flags=re.MULTILINE)
    else:
        frontmatter += f'\ndateModified: "{TARGET_DATE_MODIFIED}"'

    # Ensure author is set
    if not author_match:
        frontmatter += f'\nauthor: "CSCloudSolutions"'

    # Clean empty lines in frontmatter
    cleaned_lines = [line for line in frontmatter.split('\n') if line.strip()]
    new_frontmatter = '\n' + '\n'.join(cleaned_lines) + '\n'

    new_content = f"---{new_frontmatter}---{body}"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def main():
    total_updated = 0
    for root, dirs, files in os.walk(BLOG_DIR):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                if update_post_file(filepath):
                    total_updated += 1
                    print(f"Updated freshness in: {os.path.relpath(filepath, os.getcwd())}")

    print(f"\nTotal posts updated: {total_updated}")

if __name__ == '__main__':
    main()
