import React from 'react';
import Image from 'next/image';

export interface LogoItem {
  name: string;
  src?: string;
}

export interface LogoBarProps {
  logos?: LogoItem[];
}

export function LogoBar({ logos }: LogoBarProps) {
  const defaultLogos: LogoItem[] = [
    { name: 'ESPN' },
    { name: 'NFL Network' },
    { name: 'NBA TV' },
    { name: 'MLB Network' },
    { name: 'NHL Center Ice' },
    { name: 'FOX Sports' },
    { name: 'CBS Sports' },
    { name: 'NBC Sports' },
    { name: 'HBO' },
    { name: 'ABC' },
    { name: 'Showtime' },
    { name: 'Bally Sports' },
  ];

  const displayLogos = logos && logos.length > 0 ? logos : defaultLogos;

  return (
    <section className="py-8 bg-slate-950/60 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-5">
          Stream Every Major US Sports League & Entertainment Network
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {displayLogos.map((item, i) => (
            <div
              key={i}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs sm:text-sm font-black tracking-tight text-slate-300 flex items-center gap-2 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
            >
              {item.src && (
                <div className="relative w-4 h-4 shrink-0">
                  <Image src={item.src} alt={item.name} fill sizes="16px" className="object-contain" />
                </div>
              )}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
