'use client';

import { useEffect } from 'react';

// Conecta la calculadora del HTML estático (ids calc-* / res-*).
export function PartnersCalculator({ locale }: { locale: string }) {
  useEffect(() => {
    const $ = (id: string) => document.getElementById(id) as HTMLInputElement;
    const fmt = (n: number) => '$' + Math.round(n).toLocaleString(locale) + ' USD';
    const update = () => {
      const prof = parseInt($('calc-prof').value) || 0;
      const biz = parseInt($('calc-biz').value) || 0;
      const rate = parseFloat($('calc-mode').value) || 0.15;
      const volume = prof * 299.99 * 12 + biz * 999.99 * 12;
      $('res-volume').innerText = fmt(volume);
      $('res-total').innerText = fmt(volume * rate);
      $('res-monthly').innerText = fmt((volume * rate) / 12);
    };
    const ids = ['calc-prof', 'calc-biz', 'calc-mode'];
    ids.forEach((id) => $(id).addEventListener('input', update));
    update();
    return () => ids.forEach((id) => $(id).removeEventListener('input', update));
  }, [locale]);
  return null;
}
