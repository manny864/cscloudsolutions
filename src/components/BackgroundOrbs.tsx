'use client';

import {MotionDiv} from './Motion';

type Orb = {className: string; duration: number; delay: number};

const ORBS: Orb[] = [
  {className: 'left-[6%] top-[10%] h-[260px] w-[260px]', duration: 14, delay: 0},
  {className: 'left-[62%] top-[6%] h-[320px] w-[320px]', duration: 16, delay: 0.4},
  {className: 'left-[78%] top-[52%] h-[420px] w-[420px]', duration: 18, delay: 0.8},
  {className: 'left-[10%] top-[58%] h-[360px] w-[360px]', duration: 17, delay: 0.2},
  {className: 'left-[36%] top-[34%] h-[300px] w-[300px]', duration: 15, delay: 0.6},
  {className: 'left-[44%] top-[76%] h-[240px] w-[240px]', duration: 13, delay: 1.0}
];

export function BackgroundOrbs({count = 6}: {count?: number}) {
  const slice = ORBS.slice(0, Math.max(1, Math.min(count, ORBS.length)));

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {slice.map((o, idx) => (
        <MotionDiv
          key={`orb-${idx}`}
          aria-hidden
          className={
            `absolute rounded-full blur-3xl opacity-30 mix-blend-screen ` +
            `bg-[radial-gradient(circle_at_30%_30%,rgba(0,174,239,0.95),rgba(255,107,53,0.45),rgba(11,30,61,0)_70%)] ` +
            o.className
          }
          initial={{opacity: 0}}
          animate={{
            opacity: 0.30,
            x: [-22, 22],
            y: [-14, 18],
            scale: [1, 1.08]
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
