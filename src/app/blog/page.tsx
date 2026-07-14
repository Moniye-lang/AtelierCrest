'use client';

import React, { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { CartDrawer } from '../../components/CartDrawer';
import { StyleQuiz } from '../../components/StyleQuiz';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const articles = [
    {
      title: 'Minimizing Thread Breaks on Large Density Agbada Fills',
      slug: 'agbada-density-fills',
      category: 'TUTORIALS & CODE',
      excerpt: 'Industrial embroidery machines often suffer thread splits during wide satin stitches. Discover the speed settings and pull-compensation calibrations for perfect Agbada files.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
      date: 'June 28, 2026',
      author: 'Atelier Digitizer Guild',
      readTime: '6 min read'
    },
    {
      title: 'Decoding Symmetries: The Hausa Lineage in Modern Kaftans',
      slug: 'hausa-symmetries-kaftans',
      category: 'DESIGN HISTORY',
      excerpt: 'Traditional Northern Nigerian embroidery centers on geometric medallions and interlocking paths. We map the historical narratives woven into our latest Kaftan border collection.',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
      date: 'June 15, 2026',
      author: 'Bello S.',
      readTime: '8 min read'
    },
    {
      title: 'The Elite Tailor Guide: Coordinating Silk, Velvet & Stabilizers',
      slug: 'fabric-stabilizer-cohesion',
      category: 'FABRIC SCIENCE',
      excerpt: 'Heavy gold threads on fine silk Boubous or thick velvet Senator tunics require distinct stabilization matrices. Learn when to employ water-soluble vs tear-away stabilizers.',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
      date: 'May 30, 2026',
      author: 'Master Tailor Babatunde',
      readTime: '5 min read'
    }
  ];

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navigation onNavigate={handleNavigate} activePage="blog" />

      {/* Hero Header */}
      <section className="bg-luxury-beige dark:bg-luxury-charcoal py-12 border-b border-luxury-lightgray dark:border-luxury-medgray/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[9px] text-luxury-gold tracking-[0.35em] font-bold uppercase">Atelier Editorial</span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.1em] serif-heading uppercase text-luxury-charcoal dark:text-luxury-white">The Crest Magazine</h1>
          <p className="text-[11px] text-luxury-medgray tracking-wider max-w-xl mx-auto leading-relaxed normal-case">
            Chronicles of embroidery history, machine logic, stabilization practices, and designer viewpoints.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <input 
            type="text" 
            placeholder="SEARCH ARTICLES..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-luxury-beige/40 dark:bg-luxury-charcoal/20 border border-luxury-gold/30 text-xs py-3 px-4 focus:outline-none focus:border-luxury-gold uppercase tracking-wider text-center"
          />
          <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold" />
        </div>

        {/* Article Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((art, idx) => (
              <article 
                key={idx}
                className="group flex flex-col bg-luxury-white dark:bg-luxury-charcoal border border-luxury-lightgray dark:border-luxury-medgray/10 hover:shadow-xl transition duration-300"
              >
                {/* Visual Area */}
                <div className="aspect-[16/10] overflow-hidden bg-luxury-lightgray">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" 
                  />
                </div>

                {/* Details Area */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] text-luxury-gold tracking-[0.25em] font-bold uppercase">{art.category}</span>
                    <h3 className="serif-heading text-base font-semibold text-luxury-charcoal dark:text-luxury-white group-hover:text-luxury-gold transition duration-300 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-luxury-medgray leading-relaxed normal-case line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-luxury-lightgray dark:border-luxury-medgray/10 flex justify-between items-center text-[9px] text-luxury-medgray uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} /> {art.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} /> {art.readTime}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-xs text-luxury-medgray uppercase tracking-widest font-semibold">
            No editorial posts match your search query.
          </div>
        )}
      </main>

      <CartDrawer onNavigate={handleNavigate} />
      <StyleQuiz onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
