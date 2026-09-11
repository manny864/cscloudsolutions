#!/usr/bin/env python3
"""
Sincroniza la sección 'finopsPopup' y la clave 'pricing.compareFullscreen'
desde cscloudsolutions hacia FinOpsProyect en es.json, en.json y pt-BR.json.
"""
import json

LOCALES = ['es', 'en', 'pt-BR']
SRC_DIR = '/Users/manuelchavez/Documents/cscloudsolutions/cscloudsolutions/messages'
DST_DIR = '/Users/manuelchavez/Documents/FinOpsProyect/messages'

COMPARE_FULLSCREEN = {
    'es': 'Comparar todas las capacidades en pantalla completa',
    'en': 'Compare all capabilities in full screen',
    'pt-BR': 'Comparar todas as capacidades em tela cheia'
}

for loc in LOCALES:
    src_file = f'{SRC_DIR}/{loc}.json'
    dst_file = f'{DST_DIR}/{loc}.json'
    
    with open(src_file, 'r', encoding='utf-8') as sf:
        src_data = json.load(sf)
    
    with open(dst_file, 'r', encoding='utf-8') as df:
        dst_data = json.load(df)
        
    finops_popup_data = src_data.get('finopsPopup', {})
    dst_data['finopsPopup'] = finops_popup_data
    
    if 'pricing' in dst_data:
        dst_data['pricing']['compareFullscreen'] = COMPARE_FULLSCREEN[loc]
        
    with open(dst_file, 'w', encoding='utf-8') as df:
        json.dump(dst_data, df, indent=2, ensure_ascii=False)
        df.write('\n')
        
    print(f'[OK] Sincronizado {loc}.json en FinOpsProyect: finopsPopup añadido ({len(finops_popup_data.get("matrix", {}).get("items", {}))} items de matriz).')
