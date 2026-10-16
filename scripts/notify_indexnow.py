#!/usr/bin/env python3
"""
Script para notificar a IndexNow (Bing, Yandex, etc.) sobre URLs nuevas o actualizadas
en cscloudsolutions.com.ar.
"""

import sys
import json
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET

API_ENDPOINT = "https://cscloudsolutions.com.ar/api/indexnow"
SITEMAP_URL = "https://cscloudsolutions.com.ar/sitemap.xml"
DEFAULT_HEADERS = {
    "Content-Type": "application/json; charset=utf-8",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 CSCloud/1.0",
}


def submit_urls(urls):
    if not urls:
        print("[!] No se proporcionaron URLs para notificar.")
        return False

    payload = json.dumps({"urls": urls}).encode("utf-8")
    req = urllib.request.Request(
        API_ENDPOINT,
        data=payload,
        headers=DEFAULT_HEADERS,
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            res_body = response.read().decode("utf-8")
            data = json.loads(res_body)
            print(f"[✓] Éxito (HTTP {response.status} - IndexNow {data.get('status')}): {data.get('message')}")
            print(f"    URLs enviadas ({len(data.get('urls', []))}):")
            for u in data.get("urls", []):
                print(f"     - {u}")
            return True
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        print(f"[✗] Error HTTP {e.code}: {err_body}")
        return False
    except Exception as e:
        print(f"[✗] Error inesperado: {str(e)}")
        return False


def submit_slug(slug):
    payload = json.dumps({"slug": slug}).encode("utf-8")
    req = urllib.request.Request(
        API_ENDPOINT,
        data=payload,
        headers=DEFAULT_HEADERS,
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            res_body = response.read().decode("utf-8")
            data = json.loads(res_body)
            print(f"[✓] Éxito: Post '{slug}' notificado a IndexNow en todos sus idiomas.")
            for u in data.get("urls", []):
                print(f"     - {u}")
            return True
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        print(f"[✗] Error HTTP {e.code}: {err_body}")
        return False
    except Exception as e:
        print(f"[✗] Error al notificar slug '{slug}': {str(e)}")
        return False


def submit_all_from_sitemap():
    print(f"[*] Descargando sitemap desde {SITEMAP_URL}...")
    try:
        req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": DEFAULT_HEADERS["User-Agent"]})
        with urllib.request.urlopen(req, timeout=20) as response:
            xml_data = response.read()

        root = ET.fromstring(xml_data)
        namespace = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        loc_elements = root.findall(".//ns:loc", namespace)
        if not loc_elements:
            loc_elements = root.findall(".//loc")

        urls = [loc.text.strip() for loc in loc_elements if loc.text]
        print(f"[*] Encontradas {len(urls)} URLs en el sitemap de producción.")
        return submit_urls(urls)
    except Exception as e:
        print(f"[✗] Error leyendo sitemap: {str(e)}")
        return False


if __name__ == "__main__":
    args = sys.argv[1:]

    if not args or "--help" in args or "-h" in args:
        print("Uso del script de IndexNow:")
        print("  python3 scripts/notify_indexnow.py --all                # Envía todas las URLs del sitemap.xml")
        print("  python3 scripts/notify_indexnow.py --slug [nombre-post] # Notifica un post en todos sus idiomas")
        print("  python3 scripts/notify_indexnow.py [url1] [url2] ...   # Envía una o más URLs específicas")
        sys.exit(0)

    if "--all" in args:
        submit_all_from_sitemap()
    elif "--slug" in args:
        idx = args.index("--slug")
        if idx + 1 < len(args):
            submit_slug(args[idx + 1])
        else:
            print("[!] Debe especificar un slug.")
    else:
        submit_urls(args)
