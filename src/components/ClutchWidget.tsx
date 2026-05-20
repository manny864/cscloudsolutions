'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export function ClutchWidget() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-initialize the Clutch widget when navigating between pages
    const win = window as any;
    if (win.CLUTCHCO && typeof win.CLUTCHCO.Init === 'function') {
      try {
        win.CLUTCHCO.Init();
      } catch (err) {
        console.error('Error re-initializing Clutch widget:', err);
      }
    }
  }, [pathname]);

  return (
    <div className="pt-2 block min-h-[65px]">
      <Script 
        src="https://widget.clutch.co/static/js/widget.js" 
        strategy="lazyOnload"
        onLoad={() => {
          const win = window as any;
          if (win.CLUTCHCO && typeof win.CLUTCHCO.Init === 'function') {
            try {
              win.CLUTCHCO.Init();
            } catch (err) {
              console.error('Error initializing Clutch widget on load:', err);
            }
          }
        }}
      />
      <div 
        className="clutch-widget" 
        data-url="https://widget.clutch.co" 
        data-widget-type="7" 
        data-height="65" 
        data-nofollow="false" 
        data-expandifr="true" 
        data-scale="100" 
        data-clutchcompany-id="2655696"
      ></div>
    </div>
  );
}
