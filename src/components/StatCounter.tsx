'use client';

import { useEffect, useState, useRef } from 'react';
import { useLocale } from 'next-intl';

interface Props {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function StatCounter({ target, duration = 2000, suffix = '', prefix = '', decimals = 0 }: Props) {
  const locale = useLocale();
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Usamos IntersectionObserver para que la animación solo ocurra
    // cuando el usuario ve los números en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Función de easing (easeOutQuart) para que se desacelere al final
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentCount = easeProgress * target;
            
            setCount(currentCount);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target); // Aseguramos llegar al número exacto al final
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}