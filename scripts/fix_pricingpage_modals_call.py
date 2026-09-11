#!/usr/bin/env python3
"""
Corrige la invocación de modales en if (viewMode === 'table') dentro de PricingPage.tsx.
"""
import sys

TARGET = "/Users/manuelchavez/Documents/FinOpsProyect/src/components/PricingPage.tsx"

with open(TARGET, "r", encoding="utf-8") as f:
    content = f.read()

bad_snippet = """        <EnterpriseLeadModal
          isOpen={isEnterpriseModalOpen}
          onClose={() => setEnterpriseModalOpen(false)}
          tenantId={tenantId}
        />
        <DemoLeadModal
          isOpen={!!pendingDemoTier}
          onClose={() => setPendingDemoTier(null)}
          onSuccess={handleDemoLeadSuccess}
          tier={pendingDemoTier || 'pro'}
        />"""

good_snippet = """        <EnterpriseLeadModal
          isOpen={isEnterpriseModalOpen}
          onClose={() => setEnterpriseModalOpen(false)}
        />
        {pendingDemoTier && (
          <DemoLeadModal
            onSuccess={handleDemoLeadSuccess}
            onClose={() => setPendingDemoTier(null)}
          />
        )}"""

if bad_snippet not in content:
    print("[ERROR] bad_snippet not found")
    sys.exit(1)

content = content.replace(bad_snippet, good_snippet, 1)

with open(TARGET, "w", encoding="utf-8") as f:
    f.write(content)

print("[OK] Invocación de modales corregida.")
