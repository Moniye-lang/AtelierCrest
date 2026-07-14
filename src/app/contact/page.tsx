'use client';

import React, { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { CartDrawer } from '../../components/CartDrawer';
import { StyleQuiz } from '../../components/StyleQuiz';
import { Mail, Phone, Clock, MessageSquare, Check, Search, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ search state
  const [faqSearch, setFaqSearch] = useState('');

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const faqs = [
    {
      q: 'Which file formats are included in my digital download?',
      a: 'Every design package comes as a unified ZIP archive containing DST (Universal/Tajima), PES (Brother/Babylock), JEF (Janome), EXP (Bernina), VP3 (Husqvarna), and XXX formats. No need to buy formats separately.'
    },
    {
      q: 'Do I get free updates if a design is adjusted or resized?',
      a: 'Yes. Any updates we publish for a design are automatically available for re-download in your Customer Dashboard. Log in, check download history, and pull the latest assets free of charge.'
    },
    {
      q: 'What is pull compensation and why does it matter?',
      a: 'Pull compensation is calibration added during digitization to offset fabric gathering. Dense fabrics like velvet pull differently than light linen. Our files are optimized for mid-to-heavy textiles commonly used in Agbada and Senator wear.'
    },
    {
      q: 'Can I resell the digital embroidery files?',
      a: 'No. You are granted a commercial wear license which allows you to sell physical garments decorated with the designs. Selling, sharing, or re-distributing the digital DST/PES vector files themselves is strictly illegal.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navigation onNavigate={handleNavigate} activePage="contact" />

      {/* Hero Header */}
      <section className="bg-luxury-beige dark:bg-luxury-charcoal py-12 border-b border-luxury-lightgray dark:border-luxury-medgray/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[9px] text-luxury-gold tracking-[0.35em] font-bold uppercase">Atelier Communications</span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.1em] serif-heading uppercase text-luxury-charcoal dark:text-luxury-white">Contact & Support</h1>
          <p className="text-[11px] text-luxury-medgray tracking-wider max-w-xl mx-auto leading-relaxed normal-case">
            Connect with our digitization specialists or search our FAQ archives.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Form & Contacts */}
        <div className="space-y-12">
          {/* Contact Form */}
          <form onSubmit={handleContactSubmit} className="space-y-6 brutalist-block-beige">
            <h3 className="text-xs font-bold text-luxury-gold tracking-widest uppercase pb-2 border-b border-hairline">
              Transmit Inquiry Message
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-luxury-gold uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-luxury-gold uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-luxury-gold uppercase tracking-wider">Your message</label>
              <textarea 
                required
                rows={5}
                placeholder="DETAILS ON YOUR DESIGN OR FORMAT COMPATIBILITY INQUIRY"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-hairline">
              {submitted ? (
                <span className="text-[9px] text-luxury-emerald font-bold uppercase flex items-center gap-1">
                  <Check size={12} /> Message queued. Expect reply in 2 hours.
                </span>
              ) : <span />}
              <button 
                type="submit"
                className="btn-gold text-[10px] py-3.5 px-6 font-bold uppercase tracking-[0.2em]"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-hairline">
            <div className="flex items-start gap-3">
              <Mail className="text-luxury-gold shrink-0" size={16} />
              <div>
                <h4 className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider">Direct Mail</h4>
                <p className="text-xs text-luxury-medgray mt-0.5 normal-case font-light">support@ateliercrest.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-luxury-gold shrink-0" size={16} />
              <div>
                <h4 className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider">WhatsApp support</h4>
                <p className="text-xs text-luxury-medgray mt-0.5 normal-case font-light">+234 (0) 902 483 920</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="text-luxury-gold shrink-0" size={16} />
              <div>
                <h4 className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider">Business Hours</h4>
                <p className="text-xs text-luxury-medgray mt-0.5 normal-case font-light">Mon-Fri: 9AM - 6PM GMT+1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Searchable FAQ Accordion */}
        <div className="space-y-6">
          <div className="pb-4 border-b border-hairline">
            <h3 className="text-xs font-bold text-luxury-charcoal uppercase tracking-widest">Search FAQ Archive</h3>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="SEARCH FAQS..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full bg-luxury-beige border border-luxury-lightgray text-xs py-3.5 pl-4 pr-10 focus:outline-none focus:border-luxury-gold uppercase tracking-wider text-luxury-charcoal"
            />
            <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold" />
          </div>

          <div className="space-y-4 pt-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <details key={idx} className="group border border-luxury-lightgray p-5 bg-luxury-white">
                  <summary className="text-xs font-bold text-luxury-charcoal uppercase tracking-wider cursor-pointer list-none flex justify-between items-center select-none">
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className="text-luxury-gold transition duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="text-xs text-luxury-medgray mt-3 leading-relaxed normal-case pt-3 border-t border-hairline font-light">
                    {faq.a}
                  </p>
                </details>
              ))
            ) : (
              <p className="text-xs text-luxury-medgray italic text-center uppercase tracking-widest font-light">No matching FAQs.</p>
            )}
          </div>
        </div>
      </main>

      <CartDrawer onNavigate={handleNavigate} />
      <StyleQuiz onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
