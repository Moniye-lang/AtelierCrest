'use client';

import React, { useState } from 'react';
import { useApp, Product } from '../context/AppContext';
import { Heart, RefreshCw } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, onQuickView }) => {
  const { currency, toggleWishlist, wishlist, addToCart } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const price = currency === 'USD' ? `$${product.priceUSD}` : `₦${product.priceNGN.toLocaleString()}`;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    const defaultFormat = product.formats[0] || 'DST';
    setTimeout(() => {
      addToCart(product, defaultFormat);
      setAdding(false);
    }, 800);
  };

  return (
    <div 
      className="group relative flex flex-col bg-transparent overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Editorial Label Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-luxury-gold text-luxury-white text-[9px] tracking-[0.25em] uppercase font-semibold py-1 px-3">
            NEW
          </span>
        )}
        {product.isTrending && (
          <span className="bg-luxury-charcoal text-luxury-white text-[9px] tracking-[0.25em] uppercase font-semibold py-1 px-3">
            TRENDING
          </span>
        )}
      </div>

      {/* Luxury Wishlist Button (Borderless, round, floating) */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-4 right-4 z-10 bg-luxury-white/80 hover:bg-luxury-charcoal hover:text-luxury-white p-2.5 transition duration-500 rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md"
        aria-label="Add to Wishlist"
      >
        <Heart size={13} fill={isWishlisted ? 'var(--color-gold)' : 'none'} className={isWishlisted ? 'text-luxury-gold' : 'text-luxury-charcoal'} />
      </button>

      {/* Visual Workspace (Borderless, subtle bg separation) */}
      <div 
        className="w-full aspect-[3/4] bg-luxury-beige overflow-hidden relative cursor-pointer"
        onClick={() => onNavigate(`product/${product.id}`)}
      >
        <img 
          src={isHovered ? product.hoverImageUrl : product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
        />

        {/* Hover Quick Action Slider */}
        <div className="absolute inset-0 bg-luxury-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 p-4">
          <div className="bg-luxury-white p-3 w-[90%] flex justify-between items-center shadow-lg border border-luxury-lightgray/10 animate-slide-up [animation-duration:0.5s]">
            <button 
              onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
              className="text-[9px] font-bold tracking-[0.2em] uppercase text-luxury-charcoal hover:text-luxury-gold transition"
            >
              Quick View
            </button>
            <span className="text-luxury-gold/30">|</span>
            <button 
              onClick={handleQuickAdd}
              disabled={adding}
              className="text-[9px] font-bold tracking-[0.2em] uppercase text-luxury-charcoal hover:text-luxury-gold transition flex items-center gap-1"
            >
              {adding ? <RefreshCw size={10} className="animate-spin text-luxury-gold" /> : 'Quick Add'}
            </button>
          </div>
        </div>
      </div>

      {/* Label and Info (Borderless, Clean Spacing) */}
      <div className="pt-4 flex-1 flex flex-col justify-between bg-transparent">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[9px] text-luxury-gold tracking-[0.2em] uppercase font-semibold">
            <span>{product.category}</span>
            <span>{product.style} style</span>
          </div>
          <h4 
            onClick={() => onNavigate(`product/${product.id}`)}
            className="serif-heading text-xs font-semibold text-luxury-charcoal tracking-widest hover:text-luxury-gold cursor-pointer transition line-clamp-1"
          >
            {product.name}
          </h4>
          <p className="text-[10px] text-luxury-medgray tracking-wider font-light">
            {product.stitches.toLocaleString()} stitches • {product.formats.join(' / ')}
          </p>
        </div>
        
        <div className="flex justify-between items-end mt-4 pt-3 border-t border-luxury-lightgray/10">
          <span className="text-xs font-bold tracking-wider text-luxury-charcoal">{price}</span>
          <button 
            onClick={() => onNavigate(`product/${product.id}`)}
            className="text-[9px] text-luxury-gold hover:text-luxury-charcoal tracking-[0.2em] font-bold uppercase transition"
          >
            Explore &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
