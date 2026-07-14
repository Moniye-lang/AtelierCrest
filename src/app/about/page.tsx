'use client';

import React from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { CartDrawer } from '../../components/CartDrawer';
import { StyleQuiz } from '../../components/StyleQuiz';
import { Award, Compass, ShieldCheck, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navigation onNavigate={handleNavigate} activePage="about" />

      {/* Hero Header */}
      <section className="bg-luxury-beige dark:bg-luxury-charcoal py-16 border-b border-luxury-lightgray dark:border-luxury-medgray/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[9px] text-luxury-gold tracking-[0.35em] font-bold uppercase">The Atelier Guild</span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.1em] serif-heading uppercase text-luxury-charcoal dark:text-luxury-white">Our Story & Craft</h1>
          <p className="text-[11px] text-luxury-medgray tracking-wider max-w-xl mx-auto leading-relaxed normal-case">
            How we combine ancient African fabric traditions with high-performance digital formatting.
          </p>
        </div>
      </section>

      {/* Brand values / Mission */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Section 1: Editorial Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-[9px] text-luxury-gold tracking-[0.25em] font-bold uppercase">Philosophical Cohesion</span>
            <h2 className="text-2xl font-light tracking-wide serif-heading uppercase text-luxury-charcoal dark:text-luxury-white">Digital Haute Couture</h2>
            <p className="text-xs text-luxury-medgray leading-relaxed normal-case">
              Atelier Crest was established in 2026 as a direct response to a major challenge faced by modern luxury tailoring houses: the lack of high-fidelity, tested embroidery files. Standard catalog downloads are often digitized via automated software, leading to high friction, broken threads, and misaligned panels.
            </p>
            <p className="text-xs text-luxury-medgray leading-relaxed normal-case">
              We employ professional illustrators to draft vector contours manually. Our digitization artists then calibrate individual pull compensation factors and stitch velocities to create designs that run seamlessly on single or multi-needle heads.
            </p>
          </div>
          <div className="aspect-[4/5] bg-luxury-lightgray overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600" 
              alt="Tailoring design detail" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Section 2: Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2 text-center p-4 bg-luxury-beige/30 dark:bg-luxury-charcoal/25 border border-luxury-lightgray dark:border-luxury-medgray/10">
            <Award className="text-luxury-gold mx-auto" size={24} />
            <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-charcoal dark:text-luxury-white">Uniqueness</h4>
            <p className="text-[10px] text-luxury-medgray leading-relaxed normal-case">All designs drafted from scratch; no copycats or generic shapes.</p>
          </div>
          <div className="space-y-2 text-center p-4 bg-luxury-beige/30 dark:bg-luxury-charcoal/25 border border-luxury-lightgray dark:border-luxury-medgray/10">
            <ShieldCheck className="text-luxury-gold mx-auto" size={24} />
            <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-charcoal dark:text-luxury-white">Fidelity</h4>
            <p className="text-[10px] text-luxury-medgray leading-relaxed normal-case">We guarantee files that preserve fabric integrity and prevent puckering.</p>
          </div>
          <div className="space-y-2 text-center p-4 bg-luxury-beige/30 dark:bg-luxury-charcoal/25 border border-luxury-lightgray dark:border-luxury-medgray/10">
            <Compass className="text-luxury-gold mx-auto" size={24} />
            <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-charcoal dark:text-luxury-white">Modernity</h4>
            <p className="text-[10px] text-luxury-medgray leading-relaxed normal-case">Constant optimization for the latest software and machinery models.</p>
          </div>
          <div className="space-y-2 text-center p-4 bg-luxury-beige/30 dark:bg-luxury-charcoal/25 border border-luxury-lightgray dark:border-luxury-medgray/10">
            <Heart className="text-luxury-gold mx-auto" size={24} />
            <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-charcoal dark:text-luxury-white">Community</h4>
            <p className="text-[10px] text-luxury-medgray leading-relaxed normal-case">We support tailoring guilds across Abuja, Lagos, Accra, and Paris.</p>
          </div>
        </div>

        {/* Section 3: Historical Timeline */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-[10px] text-luxury-gold font-bold tracking-[0.3em] uppercase">Chronological Progression</span>
            <h2 className="text-2xl font-light tracking-wide serif-heading uppercase text-luxury-charcoal dark:text-luxury-white mt-1">Our Timeline</h2>
            <div className="w-12 h-[1px] bg-luxury-gold mx-auto mt-4" />
          </div>

          <div className="space-y-6">
            {[
              { year: '2020', title: 'Digitization Studio Founding', desc: 'Started as a private vector drawing house catering to custom tailors in Lagos, Nigeria.' },
              { year: '2022', title: 'Global Format Optimization', desc: 'Transitioned all designs to industry-standard multi-format schematics (DST, PES, JEF, EXP).' },
              { year: '2024', title: 'Haute Couture Collaborations', desc: 'Co-developed runway capsule collections showcased during Paris & Lagos Fashion Weeks.' },
              { year: '2026', title: 'Atelier Crest Launch', desc: 'Launched the public digital marketplace, enabling immediate access to premium embroidery templates globally.' }
            ].map((milestone, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 p-6 border-b border-luxury-lightgray dark:border-luxury-medgray/10 pb-6">
                <span className="serif-heading text-xl font-bold text-luxury-gold sm:w-20 shrink-0">{milestone.year}</span>
                <div>
                  <h4 className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white uppercase tracking-wider">{milestone.title}</h4>
                  <p className="text-xs text-luxury-medgray mt-1 leading-relaxed normal-case">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CartDrawer onNavigate={handleNavigate} />
      <StyleQuiz onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
