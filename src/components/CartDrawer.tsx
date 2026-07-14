'use client';

import React, { useState } from 'react';
import { useApp, CartItem } from '../context/AppContext';
import { X, Trash2, ShieldCheck, ChevronRight, Bookmark } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    currency,
    isCartOpen,
    setIsCartOpen
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // decimal e.g. 0.20
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'CREST20') {
      setDiscount(0.20);
      setPromoApplied('CREST20 (20% OFF)');
      setPromoCode('');
    } else if (code === 'ROYAL15') {
      setDiscount(0.15);
      setPromoApplied('ROYAL15 (15% OFF)');
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon pass code.');
    }
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => {
      const price = currency === 'USD' ? item.product.priceUSD : item.product.priceNGN;
      return sum + price * item.quantity;
    }, 0);
  };

  const subtotal = getSubtotal();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const handleSaveForLater = (item: CartItem) => {
    setSavedForLater((prev) => [...prev, item]);
    removeFromCart(item.product.id, item.selectedFormat);
  };

  const handleMoveToCart = (item: CartItem) => {
    useApp().addToCart(item.product, item.selectedFormat);
    setSavedForLater((prev) => prev.filter((i) => !(i.product.id === item.product.id && i.selectedFormat === item.selectedFormat)));
  };

  return (
    <div className="fixed inset-0 z-50 bg-luxury-charcoal/80 backdrop-blur-sm animate-fade-in flex justify-end">
      <div 
        className="w-full max-w-md bg-luxury-white h-full shadow-2xl flex flex-col justify-between animate-slide-left rounded-none border-l border-hairline"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-8 border-b border-hairline flex justify-between items-center bg-luxury-beige/30">
          <div>
            <h3 className="serif-heading text-base font-bold tracking-[0.25em] text-luxury-charcoal">Your Cart</h3>
            <p className="text-[9px] text-luxury-medgray tracking-[0.15em] uppercase mt-1 font-light">Digital Couture Marketplace</p>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-luxury-charcoal hover:text-luxury-gold transition p-1.5 cursor-pointer"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 && savedForLater.length === 0 ? (
            <div className="text-center py-24 space-y-6">
              <div className="w-16 h-16 border border-luxury-gold/30 rounded-none flex items-center justify-center mx-auto">
                <span className="text-luxury-gold font-light text-2xl serif-heading">C</span>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold tracking-[0.2em] text-luxury-charcoal uppercase">Cart is Empty</p>
                <p className="text-[11px] text-luxury-medgray leading-relaxed normal-case max-w-xs mx-auto font-light">
                  Browse our high-density vector files engineered for premium custom tailoring.
                </p>
              </div>
              <button 
                onClick={() => { setIsCartOpen(false); onNavigate('shop'); }}
                className="btn-couture text-[9px] py-3 px-6"
              >
                Shop Collection
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-6 border-b border-hairline group">
                    <div className="w-20 h-24 bg-luxury-beige overflow-hidden relative shrink-0 border border-hairline">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-luxury-charcoal tracking-wide uppercase">{item.product.name}</h4>
                          <span className="text-xs font-bold text-luxury-gold tracking-wide">
                            {currency === 'USD' 
                              ? `$${(item.product.priceUSD * item.quantity).toFixed(2)}` 
                              : `₦${(item.product.priceNGN * item.quantity).toLocaleString()}`}
                          </span>
                        </div>
                        <p className="text-[9px] text-luxury-medgray tracking-[0.15em] uppercase mt-1 font-light">
                          Format: {item.selectedFormat} • {item.product.stitches.toLocaleString()} Stitches
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {/* Quantity picker */}
                        <div className="flex items-center border border-hairline">
                          <button 
                            onClick={() => updateCartQty(item.product.id, item.selectedFormat, item.quantity - 1)}
                            className="px-3 py-1 text-xs text-luxury-medgray hover:text-luxury-gold transition font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-luxury-charcoal bg-luxury-beige/50">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateCartQty(item.product.id, item.selectedFormat, item.quantity + 1)}
                            className="px-3 py-1 text-xs text-luxury-medgray hover:text-luxury-gold transition font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                          <button 
                            onClick={() => handleSaveForLater(item)}
                            className="text-luxury-medgray hover:text-luxury-gold transition p-1"
                            title="Save for Later"
                          >
                            <Bookmark size={13} />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.selectedFormat)}
                            className="text-luxury-medgray hover:text-luxury-softred transition p-1"
                            title="Remove"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saved items list */}
              {savedForLater.length > 0 && (
                <div className="mt-10 pt-8 border-t border-dashed border-luxury-border">
                  <h4 className="text-[10px] font-bold text-luxury-gold tracking-[0.25em] uppercase mb-4">Saved For Later ({savedForLater.length})</h4>
                  <div className="space-y-4">
                    {savedForLater.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-luxury-beige border border-hairline rounded-none">
                        <div className="w-12 h-16 bg-luxury-beige overflow-hidden">
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <p className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider">{item.product.name}</p>
                            <p className="text-[9px] text-luxury-medgray mt-0.5 uppercase tracking-widest font-light">Format: {item.selectedFormat}</p>
                          </div>
                          <button 
                            onClick={() => handleMoveToCart(item)}
                            className="text-[9px] text-luxury-gold hover:text-luxury-charcoal font-bold tracking-widest uppercase transition"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 border-t border-hairline bg-luxury-beige/30">
            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} className="mb-6">
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="COUPON PASS (E.G. CREST20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-luxury-white border border-hairline text-[9px] tracking-[0.25em] px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold"
                />
                <button 
                  type="submit"
                  className="bg-luxury-charcoal text-luxury-white px-5 text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-luxury-gold transition"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[9px] text-luxury-softred mt-2 font-bold uppercase tracking-wider">{promoError}</p>}
              {promoApplied && <p className="text-[9px] text-luxury-emerald mt-2 font-bold uppercase tracking-wider">Couture Pass Active: {promoApplied}</p>}
            </form>

            {/* Invoicing info */}
            <div className="space-y-2 text-[10px] text-luxury-medgray uppercase tracking-widest font-light mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-luxury-charcoal">
                  {currency === 'USD' ? `$${subtotal.toFixed(2)}` : `₦${subtotal.toLocaleString()}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-luxury-emerald font-semibold">
                  <span>Couture Pass Discount</span>
                  <span>
                    -{currency === 'USD' ? `$${discountAmount.toFixed(2)}` : `₦${discountAmount.toLocaleString()}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Digital Delivery</span>
                <span className="text-luxury-emerald font-semibold">Instant Access</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-luxury-charcoal pt-4 border-t border-hairline">
                <span className="serif-heading text-[10px] tracking-wider uppercase font-semibold">Total Amount</span>
                <span className="text-luxury-gold">
                  {currency === 'USD' ? `$${total.toFixed(2)}` : `₦${total.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Check button */}
            <button 
              onClick={() => { setIsCartOpen(false); onNavigate('checkout'); }}
              className="w-full btn-gold text-xs shadow-2xl flex items-center justify-center gap-2"
            >
              Secure Checkout <ChevronRight size={14} />
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-4 text-[9px] text-luxury-medgray uppercase tracking-[0.2em] font-light">
              <ShieldCheck size={11} className="text-luxury-emerald" />
              <span>SSL SECURE ENCRYPTED TRANSACTION</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
