'use client';

import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-luxury-white text-luxury-charcoal border-t border-hairline pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-light tracking-[0.25em] serif-heading uppercase">
            ATELIER <span className="text-luxury-gold font-medium">CREST</span>
          </h3>
          <p className="text-xs text-luxury-medgray leading-relaxed max-w-sm normal-case font-light uppercase tracking-wider">
            Curators of high-density vector stitch schematics. Melding traditional African textile patterns with precision modern file compilation.
          </p>
          <p className="text-[9px] text-luxury-gold tracking-[0.3em] font-bold uppercase">
            EST. 2026 • VAULT ARCHIVES
          </p>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-[10px] font-bold text-luxury-gold tracking-[0.3em] uppercase mb-6">Collections</h4>
          <ul className="space-y-4 text-xs text-luxury-medgray uppercase tracking-widest font-light">
            <li><button onClick={() => onNavigate('shop')} className="hover:text-luxury-charcoal transition">All Designs</button></li>
            <li><button onClick={() => onNavigate('shop')} className="hover:text-luxury-charcoal transition">Agbada Series</button></li>
            <li><button onClick={() => onNavigate('shop')} className="hover:text-luxury-charcoal transition">Senator Outlines</button></li>
            <li><button onClick={() => onNavigate('shop')} className="hover:text-luxury-charcoal transition">Kaftan Accents</button></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[10px] font-bold text-luxury-gold tracking-[0.3em] uppercase mb-6">Help Desk</h4>
          <ul className="space-y-4 text-xs text-luxury-medgray uppercase tracking-widest font-light">
            <li><button onClick={() => onNavigate('contact')} className="hover:text-luxury-charcoal transition">Search FAQs</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-luxury-charcoal transition">Contact Guild</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-luxury-charcoal transition">Usage License</button></li>
            <li><button onClick={() => onNavigate('dashboard')} className="hover:text-luxury-charcoal transition">Downloads Center</button></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-luxury-gold tracking-[0.3em] uppercase mb-2">Club Atelier</h4>
          <p className="text-xs text-luxury-medgray leading-relaxed normal-case font-light uppercase tracking-wider">
            Subscribe to receive priority notification of limited-edition digitizations.
          </p>
          <form onSubmit={handleSubscribe} className="relative">
            <input 
              type="email"
              placeholder="ENTER EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-luxury-gold/50 text-[10px] py-4 pr-10 text-luxury-charcoal focus:outline-none focus:border-luxury-gold tracking-[0.2em] uppercase placeholder-luxury-medgray/50"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-luxury-charcoal transition cursor-pointer"
              aria-label="Submit email"
            >
              <Send size={14} />
            </button>
          </form>
          {subscribed && (
            <div className="flex items-center gap-1.5 text-[9px] text-luxury-emerald font-bold uppercase tracking-widest animate-fade-in pt-1">
              <Check size={12} />
              <span>Couture entry verified.</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-hairline pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[9px] text-luxury-medgray uppercase tracking-[0.25em] text-center md:text-left font-light">
          &copy; {new Date().getFullYear()} ATELIER CREST. ALL RIGHTS RESERVED. CRAFTED FOR HAUTE COUTURE.
        </p>

        {/* Formats */}
        <div className="flex gap-4 text-[9px] text-luxury-medgray tracking-[0.2em] font-semibold uppercase border border-hairline py-2 px-4 bg-luxury-beige/50">
          <span>DST</span>
          <span className="text-luxury-gold">•</span>
          <span>PES</span>
          <span className="text-luxury-gold">•</span>
          <span>JEF</span>
          <span className="text-luxury-gold">•</span>
          <span>EXP</span>
          <span className="text-luxury-gold">•</span>
          <span>VP3</span>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-[9px] text-luxury-medgray uppercase tracking-[0.25em] font-bold">
          <a href="#" className="hover:text-luxury-gold transition">Instagram</a>
          <a href="#" className="hover:text-luxury-gold transition">Pinterest</a>
          <a href="#" className="hover:text-luxury-gold transition">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
};
