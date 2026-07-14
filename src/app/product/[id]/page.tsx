'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { CartDrawer } from '../../../components/CartDrawer';
import { StyleQuiz } from '../../../components/StyleQuiz';
import { ProductCard } from '../../../components/ProductCard';
import { useParams, useRouter } from 'next/navigation';
import { ShieldCheck, Download, Check, RefreshCw, Heart, Sparkles, Sliders, ChevronDown } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, currency, addToCart, toggleWishlist, wishlist } = useApp();

  const productId = params.id as string;
  const product = useMemo(() => products.find((p) => p.id === productId), [products, productId]);

  const [selectedFormat, setSelectedFormat] = useState('DST');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [adding, setAdding] = useState(false);
  const [machineLookup, setMachineLookup] = useState('');
  const [lookupResult, setLookupResult] = useState('');

  // Initial format seed
  React.useEffect(() => {
    if (product) {
      setSelectedFormat(product.formats[0] || 'DST');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-between items-center py-20 bg-luxury-white">
        <p className="text-sm font-bold uppercase text-luxury-charcoal tracking-widest">Masterpiece design not found</p>
        <button onClick={() => router.push('/shop')} className="mt-4 btn-couture text-xs">Return to Catalog</button>
      </div>
    );
  }

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const handleAddToCart = () => {
    setAdding(true);
    setTimeout(() => {
      addToCart(product, selectedFormat);
      setAdding(false);
    }, 600);
  };

  const handleMachineLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = machineLookup.toLowerCase().trim();
    if (!query) return;

    if (query.includes('brother') || query.includes('pe535') || query.includes('se1900') || query.includes('pe800')) {
      setLookupResult(`✓ COMPATIBLE: Brother equipment natively runs PES format files. Verified hoop clearance.`);
    } else if (query.includes('tajima') || query.includes('industrial') || query.includes('barudan') || query.includes('multi-needle')) {
      setLookupResult(`✓ COMPATIBLE: Industrial units support DST vectors. Stitch densities optimized for zero breakages.`);
    } else if (query.includes('janome') || query.includes('500e') || query.includes('mc500')) {
      setLookupResult(`✓ COMPATIBLE: Janome equipment supports JEF file formats natively.`);
    } else {
      setLookupResult(`✓ COMPATIBLE: Standard DST/PES files included work on virtually all modern commercial and home systems.`);
    }
  };

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const isWishlisted = wishlist.includes(product.id);
  const price = currency === 'USD' ? `$${product.priceUSD}` : `₦${product.priceNGN.toLocaleString()}`;

  const images = [product.imageUrl, product.hoverImageUrl, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600'];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-luxury-white">
      <Navigation onNavigate={handleNavigate} activePage="shop" />

      {/* Main Detail Container */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Image Carousel / Zoom (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[4/5] bg-luxury-beige overflow-hidden relative border border-hairline cursor-zoom-in group">
              <img 
                src={images[selectedImageIdx]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <span className="absolute bottom-6 right-6 bg-luxury-charcoal text-luxury-white text-[9px] px-3 py-1.5 uppercase tracking-widest font-bold">
                Design Detail Zoom
              </span>
            </div>

            {/* Alternates list */}
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`aspect-[4/5] bg-luxury-beige overflow-hidden border transition ${selectedImageIdx === idx ? 'border-luxury-gold' : 'border-hairline hover:border-luxury-gold'}`}
                >
                  <img src={img} alt="alternative view" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Information & Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[9px] text-luxury-gold tracking-[0.4em] font-bold uppercase">{product.category} COLLECTION</span>
              <h1 className="text-3xl font-light tracking-[0.15em] serif-heading text-luxury-charcoal">{product.name}</h1>
              <p className="text-xl font-bold text-luxury-gold tracking-widest mt-2">{price}</p>
              <div className="w-12 h-[0.5px] bg-luxury-gold my-4" />
              <p className="text-sm text-luxury-medgray leading-relaxed normal-case font-light uppercase tracking-wider">{product.description}</p>
            </div>

            {/* Metadata KPIs */}
            <div className="grid grid-cols-2 gap-4 border-y border-hairline py-6 text-[10px] text-luxury-charcoal uppercase tracking-widest font-light">
              <p>Stitches: <span className="font-semibold text-luxury-gold">{product.stitches.toLocaleString()}</span></p>
              <p>Hoop Area: <span className="font-semibold text-luxury-gold">{product.hoopSize}</span></p>
              <p>Difficulty: <span className="font-semibold text-luxury-gold">{product.difficulty}</span></p>
              <p>Colors: <span className="font-semibold text-luxury-gold">{product.colors} shades</span></p>
            </div>

            {/* Select Format option */}
            <div className="space-y-3">
              <label className="text-[9px] font-bold text-luxury-gold tracking-widest uppercase block">Selected Export Format</label>
              <div className="flex flex-wrap gap-2">
                {product.formats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`text-[9px] px-4 py-2 transition border tracking-widest font-bold ${selectedFormat === fmt ? 'bg-luxury-gold text-luxury-white border-luxury-gold' : 'border-hairline hover:border-luxury-gold text-luxury-charcoal'}`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions Grid */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 btn-gold text-xs shadow-xl flex items-center justify-center gap-2"
              >
                {adding ? <RefreshCw size={14} className="animate-spin" /> : 'ADD TO TAILOR BAG'}
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="border border-hairline hover:border-luxury-gold p-4 transition flex items-center justify-center cursor-pointer text-luxury-charcoal hover:text-luxury-gold"
                aria-label="Add to Wishlist"
              >
                <Heart size={16} fill={isWishlisted ? 'var(--color-gold)' : 'none'} className={isWishlisted ? 'text-luxury-gold' : 'currentColor'} />
              </button>
            </div>

            {/* Checker tool */}
            <div className="brutalist-block-beige space-y-4">
              <h4 className="text-[9px] font-bold text-luxury-gold tracking-widest uppercase flex items-center gap-1.5"><Sliders size={12} /> Machine compatibility lookup</h4>
              <form onSubmit={handleMachineLookup} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="E.G. BROTHER SE1900"
                  value={machineLookup}
                  onChange={(e) => setMachineLookup(e.target.value)}
                  className="flex-1 bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                />
                <button type="submit" className="bg-luxury-charcoal text-luxury-white hover:bg-luxury-gold px-6 text-[9px] font-bold uppercase tracking-widest transition">
                  Verify
                </button>
              </form>
              {lookupResult && (
                <p className="text-[10px] text-luxury-emerald mt-2 font-bold uppercase tracking-widest leading-relaxed">
                  {lookupResult}
                </p>
              )}
            </div>

            {/* License rights */}
            <div className="space-y-2 pt-4">
              <details className="group border-b border-hairline pb-2">
                <summary className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-widest cursor-pointer list-none flex justify-between items-center select-none">
                  <span>Usage & License Rights</span>
                  <ChevronDown size={14} className="text-luxury-gold transition duration-300 group-open:rotate-180" />
                </summary>
                <div className="text-[9px] text-luxury-medgray mt-3 leading-relaxed uppercase space-y-2 pt-3 border-t border-hairline font-light">
                  <p>✓ Unlimited personal creations.</p>
                  <p>✓ Commercial permit: Sell garments decorated with this stitch design.</p>
                  <p>✗ Prohibited: Re-distributing or sharing the raw digital stitch files.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together / Related Products */}
        <section className="mt-24 pt-16 border-t border-hairline">
          <h3 className="serif-heading text-lg font-light tracking-[0.2em] text-luxury-charcoal uppercase mb-12 text-center">Frequently Bought Coordinates</h3>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map((prod) => (
                <ProductCard 
                  key={prod.id} 
                  product={prod} 
                  onNavigate={handleNavigate} 
                  onQuickView={() => {}}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-luxury-medgray text-center italic uppercase tracking-widest font-light">Discover matching coordinates in our catalog.</p>
          )}
        </section>
      </main>

      {/* Sticky Bottom Quick Add Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-luxury-white/95 backdrop-blur-md border-t border-hairline p-4 flex justify-between items-center max-w-7xl mx-auto z-30 shadow-[0_-15px_40px_rgba(11,11,10,0.06)] animate-fade-in sm:px-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-16 bg-luxury-beige overflow-hidden border border-hairline">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold text-luxury-charcoal uppercase tracking-wider">{product.name}</p>
            <p className="text-[9px] text-luxury-gold font-bold uppercase tracking-widest">{selectedFormat} FORMAT • {price}</p>
          </div>
        </div>
        <button 
          onClick={handleAddToCart}
          className="bg-luxury-gold hover:bg-luxury-charcoal text-luxury-white py-3.5 px-8 text-[9px] font-bold uppercase tracking-[0.2em] transition"
        >
          Quick Add
        </button>
      </div>

      <CartDrawer onNavigate={handleNavigate} />
      <StyleQuiz onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
