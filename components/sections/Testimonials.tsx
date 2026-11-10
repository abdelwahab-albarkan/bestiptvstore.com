import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Testimonial } from '@/lib/data/types';
import { getTestimonials } from '@/lib/data/loaders';
import { SITE } from '@/lib/data/site';

export interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const displayReviews = testimonials && testimonials.length > 0 ? testimonials : getTestimonials();

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="gold" className="text-xs uppercase font-bold tracking-wider">
            Verified Customer Reviews
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Over {SITE.stats.activeSubscribers} American Streamers
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Rated {SITE.stats.customerRating} out of 5 stars across {SITE.stats.reviewCount.toLocaleString()}+ verified subscriber reviews. Here is what real
            customers say about our streaming stability and customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayReviews.map((rev) => (
            <Card
              key={rev.id}
              className="border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <CardHeader className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">{rev.date}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  "{rev.title}"
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </CardHeader>

              <CardContent className="p-6 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 shrink-0">
                    <Image
                      src={rev.avatar}
                      alt={rev.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </div>
                    <div className="text-xs text-slate-400 truncate">{rev.location}</div>
                    <div className="text-[11px] text-emerald-400 font-mono truncate">{rev.device}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
