import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FAQItem } from '@/lib/data/types';
import { getFaqs } from '@/lib/data/loaders';
import { faqSchema } from '@/lib/seo/schema';
import { SITE } from '@/lib/data/site';

export interface FAQProps {
  faqs?: FAQItem[];
  showCategories?: boolean;
}

export function FAQ({ faqs, showCategories = true }: FAQProps) {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : getFaqs();
  const faqJsonLd = faqSchema(
    displayFaqs.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  );

  // Group by category if requested and if items count > 6
  const categories = Array.from(new Set(displayFaqs.map((f) => f.category || 'general')));
  const shouldGroup = showCategories && displayFaqs.length > 6 && categories.length > 1;

  const categoryTitles: Record<string, string> = {
    general: 'General Questions',
    devices: 'Hardware & Device Setup',
    channels: 'Channels & Streaming Quality',
    billing: 'Plans, Free Trial & Guarantee',
    troubleshooting: 'Troubleshooting & Support',
  };

  return (
    <section className="py-20 bg-slate-900/30 border-t border-slate-900" id="faq">
      {/* FAQPage JSON-LD SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <Badge variant="cyan" className="text-xs uppercase font-bold tracking-wider">
            Got Questions?
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions About IPTV USA
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Everything you need to know about our {SITE.stats.liveChannels} channels, streaming hardware, setup process, and {SITE.stats.guaranteePeriod} guarantee.
          </p>
        </div>

        {shouldGroup ? (
          <div className="space-y-10">
            {categories.map((catKey) => {
              const catFaqs = displayFaqs.filter((f) => (f.category || 'general') === catKey);
              if (catFaqs.length === 0) return null;

              return (
                <div key={catKey} className="space-y-4">
                  <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>{categoryTitles[catKey] || catKey.toUpperCase()}</span>
                  </h3>
                  <div className="space-y-4">
                    {catFaqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden group transition-all"
                      >
                        <summary className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer list-none hover:text-emerald-400 transition-colors">
                          <span className="font-bold text-base sm:text-lg text-white pr-2">
                            {faq.question}
                          </span>
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-emerald-400" />
                        </summary>
                        <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {displayFaqs.map((faq) => (
              <details
                key={faq.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden group transition-all"
              >
                <summary className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer list-none hover:text-emerald-400 transition-colors">
                  <span className="font-bold text-base sm:text-lg text-white pr-2">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-emerald-400" />
                </summary>
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
