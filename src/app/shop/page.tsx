'use client';

import React, { useState, useMemo } from 'react';
import { useApp, Product } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { CartDrawer } from '../../components/CartDrawer';
import { StyleQuiz } from '../../components/StyleQuiz';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown, Check, X, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShopPage() {
  const { products, currency, addToCart } = useApp();
  const router = useRouter();

  // Filters State
  const [selectedGarment, setSelectedGarment] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedHoop, setSelectedHoop] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [priceRange, setPriceRange] = useState<number>(60); // USD
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // price-asc, price-desc, stitches-desc, newest

  // Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [qvFormat, setQvFormat] = useState('DST');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const handleQuickView = (prod: Product) => {
    setQuickViewProduct(prod);
    setQvFormat(prod.formats[0] || 'DST');
  };

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, qvFormat);
      setQuickViewProduct(null);
    }
  };

  const garments = ['All', 'Agbada', 'Kaftan', 'Senator', 'Sleeves', 'Pocket Designs', 'Neck Designs', 'Traditional Wear'];
  const styles = ['All', 'Traditional', 'Luxury', 'Modern', 'Minimal'];
  const formats = ['All', 'DST', 'PES', 'JEF', 'EXP', 'VP3', 'HUS', 'XXX'];
  const hoops = ['All', '100x100mm', '140x200mm', '200x300mm'];
  const difficulties = ['All', 'Easy', 'Medium', 'Advanced'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedGarment !== 'All' && p.category !== selectedGarment) return false;
        if (selectedStyle !== 'All' && p.style !== selectedStyle) return false;
        if (selectedFormat !== 'All' && !p.formats.includes(selectedFormat)) return false;
        if (selectedHoop !== 'All' && p.hoopSize !== selectedHoop) return false;
        if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
        if (p.priceUSD > priceRange) return false;
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.designer.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'stitches-desc') return b.stitches - a.stitches;
        if (sortBy === 'newest') {
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        }
        return 0;
      });
  }, [products, selectedGarment, selectedStyle, selectedFormat, selectedHoop, selectedDifficulty, priceRange, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedGarment('All');
    setSelectedStyle('All');
    setSelectedFormat('All');
    setSelectedHoop('All');
    setSelectedDifficulty('All');
    setPriceRange(60);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-luxury-white">
      <Navigation onNavigate={handleNavigate} activePage="shop" />

      {/* Header Banner */}
      <section className="bg-luxury-beige py-16 border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] text-luxury-gold tracking-[0.4em] font-bold uppercase">Atelier Catalog</span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.2em] serif-heading text-luxury-charcoal">Design Archives</h1>
          <div className="w-12 h-[0.5px] bg-luxury-gold mx-auto my-3" />
          <p className="text-xs text-luxury-medgray tracking-[0.1em] max-w-xl mx-auto leading-relaxed uppercase font-light">
            Examine our high-density vector files engineered for zero thread breakages. Filter by hoop clearance, machine specifications, and formats.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 hidden lg:block space-y-8 bg-luxury-white p-6 border border-hairline">
          <div className="flex justify-between items-center pb-4 border-b border-hairline">
            <h3 className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-[0.25em] flex items-center gap-2">
              <SlidersHorizontal size={12} /> Filter Vault
            </h3>
            <button onClick={clearAllFilters} className="text-[9px] text-luxury-gold underline uppercase font-bold hover:text-luxury-charcoal transition">
              Reset
            </button>
          </div>

          {/* Garment Type */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-bold text-luxury-gold tracking-[0.25em] uppercase">Garment Type</h4>
            <div className="flex flex-col gap-2">
              {garments.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGarment(g)}
                  className={`text-left text-xs py-1 transition flex items-center justify-between tracking-wide uppercase font-light ${selectedGarment === g ? 'text-luxury-charcoal font-bold' : 'text-luxury-medgray hover:text-luxury-gold'}`}
                >
                  <span>{g}</span>
                  {selectedGarment === g && <Check size={12} className="text-luxury-gold" />}
                </button>
              ))}
            </div>
          </div>

          {/* Embroidery Style */}
          <div className="space-y-3 pt-6 border-t border-hairline">
            <h4 className="text-[9px] font-bold text-luxury-gold tracking-[0.25em] uppercase">Embroidery Style</h4>
            <div className="flex flex-col gap-2">
              {styles.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStyle(s)}
                  className={`text-left text-xs py-1 transition flex items-center justify-between tracking-wide uppercase font-light ${selectedStyle === s ? 'text-luxury-charcoal font-bold' : 'text-luxury-medgray hover:text-luxury-gold'}`}
                >
                  <span>{s}</span>
                  {selectedStyle === s && <Check size={12} className="text-luxury-gold" />}
                </button>
              ))}
            </div>
          </div>

          {/* Machine Format */}
          <div className="space-y-3 pt-6 border-t border-hairline">
            <h4 className="text-[9px] font-bold text-luxury-gold tracking-[0.25em] uppercase">Machine Format</h4>
            <div className="flex flex-wrap gap-2">
              {formats.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFormat(f)}
                  className={`text-[9px] px-3 py-1.5 transition border tracking-widest font-bold ${selectedFormat === f ? 'bg-luxury-gold border-luxury-gold text-luxury-white' : 'border-hairline text-luxury-medgray hover:border-luxury-gold'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-6 border-t border-hairline">
            <div className="flex justify-between items-center text-[9px] font-bold text-luxury-gold tracking-[0.25em] uppercase">
              <span>Price Threshold</span>
              <span className="text-xs text-luxury-charcoal font-bold">
                {currency === 'USD' ? `$${priceRange}` : `₦${(priceRange * 1500).toLocaleString()}`}
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="60" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-luxury-gold bg-luxury-beige cursor-pointer"
            />
          </div>
        </aside>

        {/* Products Column */}
        <section className="flex-1 space-y-8">
          
          {/* Top Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-luxury-beige/30 p-4 border border-hairline">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Search embroidery catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-luxury-white border border-hairline text-xs py-3 pl-4 pr-10 focus:outline-none focus:border-luxury-gold uppercase tracking-wider"
              />
              <Search size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-luxury-gold" />
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-luxury-gold" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-luxury-white border border-hairline text-[9px] font-bold tracking-[0.2em] uppercase py-3 px-4 focus:outline-none focus:border-luxury-gold cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stitches-desc">Stitches: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center text-[10px] text-luxury-medgray uppercase tracking-[0.2em] font-bold border-b border-hairline pb-2">
            <span>Displaying {filteredProducts.length} pieces</span>
            <span>Digital Delivery</span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => (
                <ProductCard 
                  key={prod.id} 
                  product={prod} 
                  onNavigate={handleNavigate} 
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-hairline bg-luxury-beige/10 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-luxury-charcoal">No matching master designs found</p>
              <button 
                onClick={clearAllFilters}
                className="btn-couture text-xs mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Quick View Modal */}
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
                        onClick={() => setQvFormat(fmt)}
                        className={`text-[9px] px-3 py-1.5 transition border tracking-widest font-bold ${qvFormat === fmt ? 'bg-luxury-gold text-luxury-white border-luxury-gold' : 'border-hairline hover:border-luxury-gold text-luxury-charcoal'}`}
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
