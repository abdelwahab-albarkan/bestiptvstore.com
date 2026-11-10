import React from 'react';
import { Tv, Zap, Layers, Film, MonitorPlay, Headphones, LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeatureItem } from '@/lib/data/types';
import { getFeatures } from '@/lib/data/loaders';
import { SITE } from '@/lib/data/site';

export interface FeatureGridProps {
  features?: FeatureItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Tv,
  Zap,
  Layers,
  Film,
  MonitorPlay,
  Headphones,
};

export function FeatureGrid({ features }: FeatureGridProps) {
  const displayFeatures = features && features.length > 0 ? features : getFeatures();

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="default" className="text-xs uppercase font-bold tracking-wider">
            Engineered For Performance
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Best IPTV USA Infrastructure & Anti-Freeze Features
          </h2>
          <h3 className="text-base font-semibold text-emerald-400">
            Best IPTV USA Anti-Freeze™ Server Infrastructure
          </h3>
          <p className="text-slate-400 text-base leading-relaxed">
            As the verified Best IPTV USA platform, our servers are built from the ground up to replace outdated cable packages with pristine 8K streaming,
            massive channel catalogs, and zero buffering during peak events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayFeatures.map((feat) => {
            const Icon = (feat.icon && ICON_MAP[feat.icon]) ? ICON_MAP[feat.icon] : Tv;
            return (
              <Card
                key={feat.id}
                className="group border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all duration-300"
              >
                <CardHeader className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-[11px] font-medium text-slate-300">
                      {feat.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
