#!/usr/bin/env python3
"""
Corrige la posición de proFeatures, businessFeatures y enterpriseFeatures
para que se declaren después de 'const t = useTranslations(...)'.
"""
import sys

TARGET_FILE = "/Users/manuelchavez/Documents/FinOpsProyect/src/components/PricingPage.tsx"

with open(TARGET_FILE, "r", encoding="utf-8") as f:
    content = f.read()

bad_block = """  const [expandedPro, setExpandedPro] = useState(false);
  const [expandedBusiness, setExpandedBusiness] = useState(false);
  const [expandedEnterprise, setExpandedEnterprise] = useState(false);

  const proFeatures = (t.raw('pro.features') as string[]) || [];
  const businessFeatures = (t.raw('business.features') as string[]) || [];
  const enterpriseFeatures = (t.raw('enterprise.features') as string[]) || [];
  const t = useTranslations('pricing');
  const tf = useTranslations('Footer');
  const locale = useLocale();"""

good_block = """  const [expandedPro, setExpandedPro] = useState(false);
  const [expandedBusiness, setExpandedBusiness] = useState(false);
  const [expandedEnterprise, setExpandedEnterprise] = useState(false);

  const t = useTranslations('pricing');
  const tf = useTranslations('Footer');
  const locale = useLocale();

  const proFeatures = (t.raw('pro.features') as string[]) || [];
  const businessFeatures = (t.raw('business.features') as string[]) || [];
  const enterpriseFeatures = (t.raw('enterprise.features') as string[]) || [];"""

if bad_block in content:
    content = content.replace(bad_block, good_block, 1)
    with open(TARGET_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print("[OK] Orden de variables corregido exitosamente.")
else:
    print("[WARN] bad_block not found.")
    sys.exit(1)
