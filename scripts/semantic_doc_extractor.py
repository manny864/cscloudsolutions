import os
import re
import json
from pathlib import Path

def extract_semantic_from_docs():
    detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding="utf-8"))
    doc_files = detect.get('files', {}).get('document', []) + detect.get('files', {}).get('paper', [])
    
    nodes = []
    edges = []
    seen_nodes = set()

    for file_path_str in doc_files:
        p = Path(file_path_str)
        if not p.exists() or p.suffix not in ['.md', '.txt', '.pdf']:
            continue
        
        try:
            content = p.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        
        doc_id = f"doc:{p.name}"
        if doc_id not in seen_nodes:
            seen_nodes.add(doc_id)
            nodes.append({
                "id": doc_id,
                "label": p.name,
                "type": "document",
                "source_file": str(p),
                "description": f"Documentation file {p.name}"
            })
            
        # Extract markdown headers as topic nodes
        headers = re.findall(r'^(#{1,3})\s+(.+)$', content, re.MULTILINE)
        for level, header_text in headers:
            header_clean = header_text.strip().replace('`', '').replace('*', '')
            if len(header_clean) < 3 or len(header_clean) > 60:
                continue
            topic_id = f"topic:{header_clean.lower().replace(' ', '_')}"
            if topic_id not in seen_nodes:
                seen_nodes.add(topic_id)
                nodes.append({
                    "id": topic_id,
                    "label": header_clean,
                    "type": "concept",
                    "source_file": str(p),
                    "description": f"Section in {p.name}: {header_clean}"
                })
            edges.append({
                "source": doc_id,
                "target": topic_id,
                "relation": "DEFINES",
                "weight": 1.0,
                "confidence": "EXTRACTED"
            })
            
        # Extract cross-references (links and keywords)
        links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
        for text, link in links:
            if link.startswith('http') or link.startswith('#'):
                continue
            target_name = Path(link).name
            if target_name:
                target_doc_id = f"doc:{target_name}"
                edges.append({
                    "source": doc_id,
                    "target": target_doc_id,
                    "relation": "REFERENCES",
                    "weight": 1.0,
                    "confidence": "EXTRACTED"
                })

    semantic_result = {
        "nodes": nodes,
        "edges": edges,
        "hyperedges": [],
        "input_tokens": 0,
        "output_tokens": 0
    }
    
    Path('graphify-out/.graphify_semantic.json').write_text(
        json.dumps(semantic_result, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
    print(f"Extracted {len(nodes)} semantic nodes and {len(edges)} semantic edges.")

if __name__ == "__main__":
    extract_semantic_from_docs()
