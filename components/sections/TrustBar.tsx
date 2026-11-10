import React from 'react';
import { ShieldCheck, Zap, Server, Headphones, LucideIcon } from 'lucide-react';
import { SITE } from '@/lib/data/site';

export interface TrustBarItem {
  icon?: string;
  title: string;
  description: string;
}

export interface TrustBarProps {
  items?: TrustBarItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Server,
  Zap,
  ShieldCheck,
  Headphones,
};

export function TrustBar({ items }: TrustBarProps) {
  const defaultItems: TrustBarItem[] = [
    {
      icon: 'Server',
      title: `${SITE.stats.liveChannels} Channels`,
      description: 'USA local affiliates & global feeds',
    },
    {
      icon: 'Zap',
      title: 'Anti-Freeze™ 9.2',
      description: 'Zero buffering at peak sports hours',
    },
    {
      icon: 'ShieldCheck',
      title: `${SITE.stats.guaranteePeriod} Guarantee`,
      description: '100% risk-free money-back policy',
    },
    {
      icon: 'Headphones',
      title: '24/7 Human Support',
      description: 'Direct WhatsApp & ticket engineering',
    },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="border-y border-slate-800 bg-slate-900/40 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayItems.map((item, idx) => {
            const Icon = (item.icon && ICON_MAP[item.icon]) ? ICON_MAP[item.icon] : ShieldCheck;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-100 text-sm sm:text-base tracking-tight">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
