'use client';

import React, { useState } from 'react';
import { useApp, Product } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { StyleQuiz } from '../components/StyleQuiz';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Download, Star, Award, Compass, RefreshCw, X, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { products, currency, setIsQuizOpen, addToCart } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('DST');
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const trendingProducts = products.filter(p => p.isTrending);
  const newArrivals = products.filter(p => p.isNew);

  const handleQuickView = (prod: Product) => {
    setQuickViewProduct(prod);
    setSelectedFormat(prod.formats[0] || 'DST');
  };

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, selectedFormat);
      setQuickViewProduct(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-luxury-white">
      <Navigation onNavigate={handleNavigate} activePage="home" />

      {/* Luxury Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-luxury-charcoal overflow-hidden border-b border-hairline">
        {/* Deep Couture Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-luxury-charcoal via-luxury-charcoal to-luxury-gold/5 opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10 space-y-8 animate-slide-up">
          <span className="text-[10px] font-bold tracking-[0.5em] text-luxury-gold uppercase block">
            ATELIER CREST • ARCHIVES OF HAUTE COUTURE
          </span>
          <h1 className="text-4xl sm:text-7xl font-light tracking-[0.15em] text-luxury-white serif-heading leading-[1.15] uppercase">
            Premium Embroidery <br />
            <span className="font-semibold text-luxury-gold tracking-[0.1em]">Designs</span>
          </h1>
          <div className="w-16 h-[0.5px] bg-luxury-gold mx-auto" />
          <p className="text-xs sm:text-sm text-luxury-medgray tracking-[0.12em] max-w-2xl mx-auto font-light leading-relaxed uppercase">
            Exquisite digitizations curated for modern tailors and haute houses. High-fidelity schematics optimized for Agbada, Kaftan, and Senator wear.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
            <button 
              onClick={() => handleNavigate('shop')}
              className="w-full sm:w-auto btn-gold text-xs shadow-2xl"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="w-full sm:w-auto btn-couture text-xs text-luxury-white border-luxury-gold/30 hover:border-luxury-white hover:text-luxury-charcoal"
            >
              Style Quiz Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Infinite Horizontal Announcement Marquee */}
      <div className="bg-luxury-beige py-5 border-b border-hairline overflow-hidden">
        <div className="marquee-container text-[10px] font-bold text-luxury-gold uppercase tracking-[0.3em]">
          <div className="marquee-content flex gap-16">
            <span>✦ HAUTE COUTURE SCHEMATICS ✦</span>
            <span>✦ ZERO THREAD BREAKAGE LOGIC ✦</span>
            <span>✦ SEW-TESTED COMMERCIAL VECTORS ✦</span>
            <span>✦ INSTANT DIGITAL DELIVERIES (.DST / .PES / .JEF) ✦</span>
            <span>✦ HAUTE COUTURE SCHEMATICS ✦</span>
            <span>✦ ZERO THREAD BREAKAGE LOGIC ✦</span>
            <span>✦ SEW-TESTED COMMERCIAL VECTORS ✦</span>
            <span>✦ INSTANT DIGITAL DELIVERIES (.DST / .PES / .JEF) ✦</span>
          </div>
        </div>
      </div>

      {/* Luxury Category Cards */}
      <section className="py-24 bg-luxury-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-3">
            <span className="text-[10px] text-luxury-gold font-bold tracking-[0.4em] uppercase">Visual Index</span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-[0.2em] serif-heading text-luxury-charcoal">Design Directory</h2>
            <div className="w-12 h-[0.5px] bg-luxury-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: '01', name: 'Agbada Masterpieces', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600', desc: 'Opulent configurations for grand traditional regalia.' },
              { id: '02', name: 'Kaftan Borders', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600', desc: 'Symmetrical necklines and cuff border guides.' },
              { id: '03', name: 'Senator Accents', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600', desc: 'Architectural lines and minimalist front chest flaps.' },
              { id: '04', name: 'Sleeve Coordinates', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600', desc: 'Detailed sleeve frame wrap motifs.' },
              { id: '05', name: 'Pocket & Crest Motifs', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600', desc: 'Compact pocket shields and decorative heraldry.' },
              { id: '06', name: 'Collar & Neck Frames', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600', desc: 'Intricate neckline boundaries and lace contours.' }
            ].map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => handleNavigate('shop')}
                className="group relative h-96 overflow-hidden cursor-pointer border border-hairline card-couture"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-luxury-charcoal/30 to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8 text-luxury-white space-y-3">
                  <span className="serif-heading text-xs font-bold text-luxury-gold tracking-[0.2em]">{cat.id}</span>
                  <h3 className="serif-heading text-lg font-medium tracking-[0.12em] uppercase">{cat.name}</h3>
                  <p className="text-[11px] text-luxury-lightgray/80 font-light normal-case leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-24 bg-luxury-beige/30 border-t border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left space-y-2">
              <span className="text-[10px] text-luxury-gold tracking-[0.4em] font-bold uppercase">Curated Masterpieces</span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-[0.15em] serif-heading text-luxury-charcoal">Featured Collections</h2>
            </div>
            <button 
              onClick={() => handleNavigate('shop')}
              className="text-[10px] font-bold text-luxury-gold tracking-[0.25em] uppercase hover:text-luxury-charcoal transition border-b border-luxury-gold pb-1.5 flex items-center gap-2"
            >
              Explore Full Collection <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.slice(0, 4).map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                onNavigate={handleNavigate} 
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Style Quiz Banner */}
      <section className="py-28 bg-luxury-charcoal text-luxury-white relative overflow-hidden border-b border-hairline">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-charcoal via-luxury-charcoal to-luxury-gold/5 opacity-90" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8 z-10">
          <span className="inline-block p-3 bg-luxury-white/5 border border-luxury-gold/20 rounded-none mb-2">
            <Sparkles className="text-luxury-gold" size={28} />
          </span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.2em] serif-heading">
            Personal Styling Advisor
          </h2>
          <div className="w-12 h-[0.5px] bg-luxury-gold mx-auto" />
          <p className="text-xs sm:text-sm text-luxury-medgray max-w-2xl mx-auto leading-relaxed uppercase tracking-wider font-light">
            Match high-density embroidery files with your specific fabric qualities and machinery hoop tolerances in under 2 minutes.
          </p>
          <button 
            onClick={() => setIsQuizOpen(true)}
            className="btn-gold text-xs shadow-2xl mt-4"
          >
            Launch Advisor Quiz
          </button>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 bg-luxury-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-3">
            <span className="text-[10px] text-luxury-gold font-bold tracking-[0.4em] uppercase">Latest Schematics</span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-[0.2em] serif-heading text-luxury-charcoal">New Creations</h2>
            <div className="w-12 h-[0.5px] bg-luxury-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.slice(0, 4).map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                onNavigate={handleNavigate} 
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Testimonials / Couture Workshop Report */}
      <section className="py-24 bg-luxury-beige/20 border-t border-hairline">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-[10px] text-luxury-gold tracking-[0.4em] font-bold uppercase block">Couture Workshop Audits</span>
          <h2 className="serif-heading text-2xl sm:text-3xl font-light tracking-[0.15em] text-luxury-charcoal">Tailor Verifications</h2>
          
          <div className="p-8 bg-luxury-white border border-hairline rounded-none relative space-y-6 shadow-2xl">
            <div className="flex justify-center gap-1.5 text-luxury-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--color-gold)" className="text-luxury-gold" />)}
            </div>
            <p className="text-xs sm:text-sm text-luxury-charcoal italic font-light leading-relaxed normal-case max-w-2xl mx-auto">
              "The density adjustments on the Agbada templates are impeccable. Commercial runs usually suffer severe thread splits with embroidery threads this heavy, but the pull-compensation inside this design runs perfectly on our Tajima heads. Truly luxury quality."
            </p>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.2em]">Alhaji Ibrahim K. • Verified Buyer</p>
              <p className="text-[9px] text-luxury-medgray uppercase tracking-widest font-light">Director, Haute Tailoring Guild (Abuja)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal Overlay */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-luxury-charcoal/80 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-luxury-white border border-hairline p-8 relative flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute right-4 top-4 text-luxury-charcoal hover:text-luxury-gold transition p-1.5 z-10 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 aspect-square bg-luxury-beige overflow-hidden border border-hairline">
              <img src={quickViewProduct.imageUrl} alt={quickViewProduct.name} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[9px] text-luxury-gold tracking-[0.25em] font-bold uppercase">{quickViewProduct.category} COLLECTION</span>
                <h3 className="serif-heading text-lg font-medium tracking-wider text-luxury-charcoal mt-2">{quickViewProduct.name}</h3>
                <p className="text-sm font-semibold text-luxury-gold tracking-[0.1em] mt-2">
                  {currency === 'USD' ? `$${quickViewProduct.priceUSD}` : `₦${quickViewProduct.priceNGN.toLocaleString()}`}
                </p>
                <div className="w-8 h-[0.5px] bg-luxury-gold my-4" />
                <p className="text-xs text-luxury-medgray leading-relaxed normal-case">{quickViewProduct.description}</p>

                <div className="mt-6 space-y-2 text-[10px] text-luxury-charcoal uppercase tracking-widest font-light">
                  <p>Stitches: <span className="font-semibold text-luxury-gold">{quickViewProduct.stitches.toLocaleString()}</span></p>
                  <p>Hoop Area: <span className="font-semibold text-luxury-gold">{quickViewProduct.hoopSize}</span></p>
                  <p>Formats: <span className="font-semibold text-luxury-gold">{quickViewProduct.formats.join(' / ')}</span></p>
                </div>

                <div className="mt-6">
                  <label className="text-[9px] font-bold text-luxury-gold tracking-widest uppercase block mb-2">Selected Export Format</label>
                  <div className="flex gap-2">
                    {quickViewProduct.formats.map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`text-[9px] px-3 py-1.5 transition border tracking-widest font-bold ${selectedFormat === fmt ? 'bg-luxury-gold text-luxury-white border-luxury-gold' : 'border-hairline hover:border-luxury-gold text-luxury-charcoal'}`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full btn-gold text-xs shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CartDrawer onNavigate={handleNavigate} />
      <StyleQuiz onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
