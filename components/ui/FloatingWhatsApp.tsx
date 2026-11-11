'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { SITE } from '@/lib/data/site';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Show teaser bubble after 3 seconds on first visit
    const timer = setTimeout(() => {
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasDismissed]);

  const defaultMessage = encodeURIComponent(
    `Hello ${SITE.name}! I would like to get a 24-hour test line or subscribe to Best IPTV USA.`
  );
  const whatsappUrl = `https://wa.me/212625218443?text=${defaultMessage}`;

  if (!isClient) return null;

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 select-none">
      {/* Expandable Chat Greeting Bubble */}
      {isOpen && (
        <div className="relative w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-emerald-500/30 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Close teaser */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setHasDismissed(true);
            }}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close message"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 ring-2 ring-emerald-400/40 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{SITE.name} Support</span>
                <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Average reply: &lt; 2 minutes</p>
            </div>
          </div>

          {/* Body */}
          <div className="py-3 text-xs text-slate-300 space-y-2">
            <p className="leading-relaxed">
              👋 Hi there! Need help setting up on Firestick, Smart TV, or want an instant <strong>24-Hour Free Trial</strong>?
            </p>
            <p className="text-slate-400 text-[11px]">
              Our streaming engineers are online 24/7 to activate your line.
            </p>
          </div>

          {/* CTA Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative flex items-center gap-2">
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Best IPTV USA on WhatsApp (Online 24/7)"
          className="relative group flex items-center gap-2.5 py-3 px-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-emerald-300/40"
        >
          <div className="relative flex items-center justify-center">
            <svg
              className="w-6 h-6 fill-slate-950"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 0C5.396 0 0 5.391 0 12.024c0 2.115.552 4.181 1.602 6.002L.065 24l6.16-1.616a11.97 11.97 0 0 0 5.806 1.492h.005c6.632 0 12.028-5.391 12.028-12.024A12.03 12.03 0 0 0 12.031 0zm0 21.874h-.004a9.96 9.96 0 0 1-5.078-1.39l-.364-.216-3.774.99.1-3.676-.238-.378a9.964 9.964 0 0 1-1.528-5.28c0-5.504 4.48-9.982 9.987-9.982a9.94 9.94 0 0 1 7.07 2.924 9.93 9.93 0 0 1 2.923 7.07c0 5.504-4.48 9.982-9.987 9.982zm5.474-7.472c-.3-.15-1.777-.876-2.052-.976-.276-.1-.476-.15-.677.15-.2.3-.776.976-.951 1.176-.176.2-.351.226-.652.076-.3-.15-1.267-.467-2.413-1.488-.893-.797-1.496-1.782-1.671-2.082-.176-.3-.019-.462.131-.611.135-.135.3-.351.451-.527.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.628-.926-2.228-.244-.585-.492-.505-.677-.515-.175-.008-.375-.01-.576-.01s-.525.075-.801.375c-.275.3-1.051 1.026-1.051 2.503 0 1.477 1.076 2.903 1.227 3.104.15.2 2.118 3.235 5.132 4.537.717.31 1.277.495 1.714.634.72.229 1.375.197 1.893.12.577-.087 1.777-.726 2.027-1.427.25-.701.25-1.302.175-1.427-.075-.125-.275-.2-.576-.35z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-200 border-2 border-emerald-600 animate-pulse" />
          </div>

          <span className="hidden sm:inline font-black tracking-tight text-slate-950">
            WhatsApp 24/7 Desk
          </span>

          <span className="sm:hidden font-black text-slate-950 text-xs">
            WhatsApp
          </span>

          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-950/20 text-slate-950 text-[10px] font-black">
            1
          </span>
        </a>
      </div>
    </aside>
  );
}

