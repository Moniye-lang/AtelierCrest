'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Heart, ShoppingBag, Moon, Sun, X, Menu, Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, activePage }) => {
  const {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    cart,
    wishlist,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    products,
    setIsQuizOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'garments' | 'styles' | 'curations'>('garments');

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Monitor scrolling to shrink header and add blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
      setIsSearchOpen(false);
      onNavigate('shop');
    }
  };

  const handleRecentClick = (q: string) => {
    setSearchQuery(q);
    addRecentSearch(q);
    setIsSearchOpen(false);
    onNavigate('shop');
  };

  const searchResults = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  return (
    <>
      {/* Editorial Top Info Header */}
      <div className="bg-luxury-charcoal text-luxury-white py-2 px-8 text-[9px] tracking-[0.3em] font-medium border-b border-luxury-lightgray/10 flex justify-between items-center uppercase z-50 relative">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
          <span className="hidden sm:inline">ATELIER VAULT IS SECURE</span>
        </div>
        <span className="mx-auto sm:mx-0 tracking-[0.35em]">FREE LIFETIME ARCHIVE RE-DOWNLOADS ON ALL DESIGN SCHEMATICS</span>
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => setCurrency('USD')} 
            className={`hover:text-luxury-gold transition tracking-widest ${currency === 'USD' ? 'text-luxury-gold font-bold' : ''}`}
          >
            USD ($)
          </button>
          <span className="text-luxury-medgray/40">|</span>
          <button 
            onClick={() => setCurrency('NGN')} 
            className={`hover:text-luxury-gold transition tracking-widest ${currency === 'NGN' ? 'text-luxury-gold font-bold' : ''}`}
          >
            NGN (₦)
          </button>
        </div>
      </div>

      {/* Floating Centered Modern Capsule Header */}
      <header className={`sticky top-0 z-40 transition-all duration-700 ease-in-out ${scrolled ? 'py-4' : 'py-6'} bg-transparent`}>
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${scrolled ? 'w-[96%] shadow-[0_15px_40px_rgba(11,11,10,0.06)]' : 'w-full'} bg-luxury-white/95 backdrop-blur-lg border border-hairline`}>
          <div className="h-20 flex items-center justify-between">
            
            {/* Left Hamburger (Mobile) */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="text-luxury-charcoal hover:text-luxury-gold p-1 cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu size={20} />
              </button>
            </div>

            {/* Left Logo / Branding (Clean Monogram Layout) */}
            <div className="flex-1 md:flex-none text-center md:text-left">
              <button 
                onClick={() => onNavigate('home')} 
                className="text-lg sm:text-xl font-light tracking-[0.3em] serif-heading uppercase transition hover:opacity-80 flex items-center gap-3 justify-center md:justify-start"
              >
                <span className="border-r border-hairline pr-3 text-luxury-gold font-medium text-xl">A</span>
                ATELIER <span className="text-luxury-gold font-medium">CREST</span>
              </button>
            </div>

            {/* Central Navigation Items */}
            <nav className="hidden md:flex items-center space-x-12 text-[10px] font-bold tracking-[0.25em] uppercase">
              <button 
                onClick={() => onNavigate('home')}
                className="relative py-2 text-luxury-charcoal hover:text-luxury-gold transition group"
              >
                Home
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold transition-transform duration-500 origin-left ${activePage === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
              
              {/* Mega Menu Activator */}
              <div 
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <button 
                  onClick={() => onNavigate('shop')}
                  className="relative py-2 text-luxury-charcoal hover:text-luxury-gold transition group flex items-center gap-1.5"
                >
                  Collections
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold transition-transform duration-500 origin-left ${activePage === 'shop' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </button>
              </div>

              <button 
                onClick={() => onNavigate('blog')}
                className="relative py-2 text-luxury-charcoal hover:text-luxury-gold transition group"
              >
                Editorial
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold transition-transform duration-500 origin-left ${activePage === 'blog' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="relative py-2 text-luxury-charcoal hover:text-luxury-gold transition group"
              >
                Our Story
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold transition-transform duration-500 origin-left ${activePage === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="relative py-2 text-luxury-charcoal hover:text-luxury-gold transition group"
              >
                Help Desk
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold transition-transform duration-500 origin-left ${activePage === 'contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-5">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-luxury-charcoal hover:text-luxury-gold transition cursor-pointer flex items-center justify-center"
                aria-label="Open Search"
              >
                <Search size={16} />
              </button>

              <button 
                onClick={() => onNavigate('dashboard')}
                className={`text-[9px] hidden lg:block tracking-[0.25em] font-bold uppercase hover:text-luxury-gold transition ${activePage === 'dashboard' ? 'text-luxury-gold' : 'text-luxury-charcoal'}`}
              >
                Account
              </button>

              <button 
                onClick={toggleTheme}
                className="p-2 text-luxury-charcoal hover:text-luxury-gold transition flex items-center justify-center cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              <button 
                onClick={() => onNavigate('dashboard')} 
                className="p-2 text-luxury-charcoal hover:text-luxury-gold transition relative flex items-center justify-center cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={16} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-luxury-gold text-luxury-white text-[8px] w-2 h-2 rounded-full" />
                )}
              </button>

              <button 
                onClick={() => setIsCartOpen(true)} 
                className="p-2.5 bg-luxury-charcoal text-luxury-white hover:bg-luxury-gold transition relative flex items-center justify-center cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag size={14} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-white text-[7px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold border border-luxury-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Massive Full-Screen Dynamic Mega Menu Dropdown */}
      {showMegaMenu && (
        <div 
          className="fixed left-0 right-0 top-[128px] w-[96%] mx-auto z-50 bg-luxury-white border border-hairline shadow-[0_30px_70px_rgba(11,11,10,0.15)] animate-fade-in rounded-none"
          onMouseEnter={() => setShowMegaMenu(true)}
          onMouseLeave={() => setShowMegaMenu(false)}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 p-10">
            
            {/* Column 1: Left Editorial Spotlight (3 cols) */}
            <div className="col-span-3 border-r border-hairline pr-8 flex flex-col justify-between h-72">
              <div className="space-y-3">
                <span className="text-[8px] text-luxury-gold tracking-[0.4em] font-bold uppercase">EDITORIAL SELECTION</span>
                <h4 className="serif-heading text-sm font-semibold tracking-wide text-luxury-charcoal">THE ROYAL AGBADA</h4>
                <p className="text-[10px] text-luxury-medgray leading-relaxed uppercase tracking-wider font-light">
                  Explore density-optimized vector schematics for luxury African ceremonial wear.
                </p>
              </div>
              <button 
                onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} 
                className="text-[9px] font-bold text-luxury-gold tracking-widest uppercase hover:text-luxury-charcoal transition flex items-center gap-1.5"
              >
                EXPLORE VAULT <ArrowRight size={12} />
              </button>
            </div>

            {/* Column 2: Center Category Navigation Grid (6 cols) */}
            <div className="col-span-6 px-4 space-y-6">
              <div className="flex gap-8 border-b border-hairline pb-4 text-[9px] font-bold tracking-[0.25em] uppercase">
                <button 
                  onClick={() => setActiveCategoryTab('garments')} 
                  className={`transition ${activeCategoryTab === 'garments' ? 'text-luxury-gold font-bold border-b border-luxury-gold pb-4' : 'text-luxury-medgray'}`}
                >
                  01 / GARMENTS
                </button>
                <button 
                  onClick={() => setActiveCategoryTab('styles')} 
                  className={`transition ${activeCategoryTab === 'styles' ? 'text-luxury-gold font-bold border-b border-luxury-gold pb-4' : 'text-luxury-medgray'}`}
                >
                  02 / STYLES
                </button>
              </div>

              {activeCategoryTab === 'garments' && (
                <div className="grid grid-cols-2 gap-6 animate-fade-in text-[10px] tracking-widest uppercase font-light">
                  <div className="space-y-4">
                    <button onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} className="hover:text-luxury-gold transition flex items-center gap-2">
                      <span className="text-[8px] text-luxury-gold">✦</span> AGBADA COLLECTIONS
                    </button>
                    <button onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} className="hover:text-luxury-gold transition flex items-center gap-2">
                      <span className="text-[8px] text-luxury-gold">✦</span> KAFTAN ACCENTS
                    </button>
                  </div>
                  <div className="space-y-4">
                    <button onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} className="hover:text-luxury-gold transition flex items-center gap-2">
                      <span className="text-[8px] text-luxury-gold">✦</span> SENATOR STRIPS
                    </button>
                    <button onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} className="hover:text-luxury-gold transition flex items-center gap-2">
                      <span className="text-[8px] text-luxury-gold">✦</span> SLEEVES & POCKETS
                    </button>
                  </div>
                </div>
              )}

              {activeCategoryTab === 'styles' && (
                <div className="grid grid-cols-2 gap-6 animate-fade-in text-[10px] tracking-widest uppercase font-light">
                  <div className="space-y-4">
                    <button onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} className="hover:text-luxury-gold transition flex items-center gap-2">
                      <span className="text-[8px] text-luxury-gold">✦</span> TRADITIONAL FILIGREE
                    </button>
                    <button onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} className="hover:text-luxury-gold transition flex items-center gap-2">
                      <span className="text-[8px] text-luxury-gold">✦</span> MODERN ASYMMETRICAL
                    </button>
                  </div>
                  <div className="space-y-4">
                    <button onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} className="hover:text-luxury-gold transition flex items-center gap-2">
                      <span className="text-[8px] text-luxury-gold">✦</span> MINIMALIST LINEWORK
                    </button>
                    <button onClick={() => { onNavigate('shop'); setShowMegaMenu(false); }} className="hover:text-luxury-gold transition flex items-center gap-2">
                      <span className="text-[8px] text-luxury-gold">✦</span> LIMITED SIGNATURES
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Column 3: Right Promotion Sizing Advisor (3 cols) */}
            <div className="col-span-3 border-l border-hairline pl-8 flex flex-col justify-between h-72">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-[8px] font-bold text-luxury-gold tracking-[0.3em] uppercase">
                  <Sparkles size={11} />
                  <span>Interactive Sizer</span>
                </div>
                <h4 className="serif-heading text-xs font-semibold tracking-wider text-luxury-charcoal">STYLE SELECTOR</h4>
                <p className="text-[10px] text-luxury-medgray leading-relaxed uppercase tracking-wider font-light">
                  Calibrate designs against hoop clearances and stabilizer parameters instantly.
                </p>
              </div>
              <button 
                onClick={() => { setIsQuizOpen(true); setShowMegaMenu(false); }} 
                className="w-full btn-couture text-[9px] py-3 text-center"
              >
                LAUNCH QUIZ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Full-Width Search Drawer */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-luxury-charcoal/80 backdrop-blur-sm transition-opacity duration-500 animate-fade-in flex flex-col justify-start">
          <div className="bg-luxury-white py-12 px-6 border-b border-hairline shadow-2xl relative w-full animate-slide-down [animation-duration:0.5s]">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="serif-heading text-base font-bold tracking-[0.2em] text-luxury-gold">Search Catalog</h3>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-luxury-charcoal hover:text-luxury-gold transition p-1.5 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative">
                <input 
                  type="text"
                  placeholder="Search designs by garment, format, or stitches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-luxury-beige border border-luxury-gold/30 text-xs py-4 pl-6 pr-12 tracking-widest uppercase focus:outline-none focus:border-luxury-gold rounded-none"
                  autoFocus
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold hover:text-luxury-charcoal transition">
                  <Search size={20} />
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
                <div>
                  <h4 className="text-[9px] font-bold text-luxury-gold tracking-[0.25em] mb-4 uppercase">Recent Queries</h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleRecentClick(term)}
                        className="bg-luxury-beige hover:bg-luxury-gold hover:text-luxury-white text-[9px] font-bold tracking-widest uppercase px-3 py-2 transition text-luxury-charcoal"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[9px] font-bold text-luxury-gold tracking-[0.25em] mb-4 uppercase">
                    {searchQuery ? 'Matches in Atelier' : 'Featured Collections'}
                  </h4>
                  <div className="space-y-4">
                    {(searchQuery ? searchResults : products.slice(0, 3)).map((prod) => (
                      <div 
                        key={prod.id} 
                        onClick={() => {
                          onNavigate(`product/${prod.id}`);
                          setIsSearchOpen(false);
                        }}
                        className="flex gap-4 p-2 cursor-pointer border border-transparent hover:border-luxury-gold/20 transition group"
                      >
                        <div className="w-12 h-16 relative bg-luxury-beige overflow-hidden">
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" 
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-luxury-charcoal group-hover:text-luxury-gold transition tracking-wider uppercase">{prod.name}</p>
                          <p className="text-[9px] text-luxury-medgray mt-1 tracking-widest uppercase font-light">{prod.category} • {prod.style} • {prod.stitches.toLocaleString()} stitches</p>
                          <p className="text-xs font-semibold text-luxury-gold mt-1.5">
                            {currency === 'USD' ? `$${prod.priceUSD}` : `₦${prod.priceNGN.toLocaleString()}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-luxury-charcoal/80 backdrop-blur-sm animate-fade-in flex justify-start">
          <div className="w-full max-w-xs bg-luxury-white shadow-2xl p-8 flex flex-col justify-between animate-slide-right rounded-none border-r border-hairline">
            <div>
              <div className="flex items-center justify-between mb-12">
                <span className="text-[11px] font-bold tracking-[0.3em] serif-heading text-luxury-gold">MENU</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-luxury-charcoal hover:text-luxury-gold p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 text-[10px] tracking-[0.25em] uppercase font-bold text-left">
                <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className={activePage === 'home' ? 'text-luxury-gold' : 'text-luxury-charcoal'}>Home</button>
                <button onClick={() => { onNavigate('shop'); setMobileMenuOpen(false); }} className={activePage === 'shop' ? 'text-luxury-gold' : 'text-luxury-charcoal'}>Collections</button>
                <button onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }} className={activePage === 'blog' ? 'text-luxury-gold' : 'text-luxury-charcoal'}>Editorial</button>
                <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className={activePage === 'about' ? 'text-luxury-gold' : 'text-luxury-charcoal'}>Our Story</button>
                <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className={activePage === 'contact' ? 'text-luxury-gold' : 'text-luxury-charcoal'}>Help Desk</button>
                <button onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }} className={activePage === 'dashboard' ? 'text-luxury-gold' : 'text-luxury-charcoal'}>My Account</button>
              </nav>
            </div>

            <div className="border-t border-hairline pt-8 space-y-4">
              <div className="flex justify-between items-center text-[10px] tracking-wider uppercase">
                <span className="text-luxury-medgray font-light">Currency</span>
                <div className="flex gap-4">
                  <button onClick={() => setCurrency('USD')} className={currency === 'USD' ? 'text-luxury-gold font-bold' : 'text-luxury-charcoal'}>USD</button>
                  <button onClick={() => setCurrency('NGN')} className={currency === 'NGN' ? 'text-luxury-gold font-bold' : 'text-luxury-charcoal'}>NGN</button>
                </div>
              </div>
              <button 
                onClick={() => { setIsQuizOpen(true); setMobileMenuOpen(false); }} 
                className="w-full bg-luxury-gold text-luxury-white py-3 text-[9px] tracking-widest font-bold uppercase transition"
              >
                Style Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
