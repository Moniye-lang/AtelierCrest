'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { CartDrawer } from '../../components/CartDrawer';
import { StyleQuiz } from '../../components/StyleQuiz';
import { ShieldCheck, Mail, CreditCard, Lock, Sparkles, Download, CheckCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, currency, clearCart, addDownload } = useApp();
  const router = useRouter();

  // Step state
  const [step, setStep] = useState(1); // 1 = details & card, 2 = confirmation receipt

  // Customer Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<typeof cart>([]);

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => {
      const price = currency === 'USD' ? item.product.priceUSD : item.product.priceNGN;
      return sum + price * item.quantity;
    }, 0);
  };

  const subtotal = getSubtotal();
  const total = subtotal; // no shipping since digital, no tax in mock

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !cardNumber) return;

    setIsSubmitting(true);

    // Simulate luxury secure processing
    setTimeout(() => {
      setIsSubmitting(false);
      setPurchasedItems([...cart]);
      
      // Seed downloads into context downloadHistory
      cart.forEach((item) => {
        addDownload(item.product, item.selectedFormat);
      });

      // Clear the active cart
      clearCart();
      setStep(2);

      // Trigger Confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C9A227', '#111111', '#FAFAF8']
      });
    }, 1800);
  };

  // Mock download ZIP generator
  const triggerMockDownload = (prodName: string, format: string) => {
    // Generate text contents representing standard embroidery header instruction
    const fileContent = `ATELIER CREST EMBROIDERY FILE\nPRODUCT: ${prodName}\nFORMAT: ${format}\nLICENSE: VERIFIED AUTHENTIC COUTURE PASS\nDESIGN: high density satin borders and premium fills optimized for embroidery machine.`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prodName.toLowerCase().replace(/\s+/g, '-')}-${format.toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-luxury-white">
      <Navigation onNavigate={handleNavigate} activePage="shop" />

      {/* Hero Header */}
      <section className="bg-luxury-beige dark:bg-luxury-charcoal py-8 border-b border-luxury-lightgray dark:border-luxury-medgray/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <span className="text-[9px] text-luxury-gold tracking-[0.25em] font-bold uppercase">Atelier Crest Payment Portal</span>
            <h1 className="text-xl sm:text-2xl font-light tracking-[0.1em] serif-heading uppercase text-luxury-charcoal dark:text-luxury-white mt-0.5">
              {step === 1 ? 'Secure Checkout' : 'Couture Purchase Complete'}
            </h1>
          </div>
          <div className="flex gap-2">
            <div className={`h-2 w-10 ${step >= 1 ? 'bg-luxury-gold' : 'bg-luxury-lightgray'}`} />
            <div className={`h-2 w-10 ${step >= 2 ? 'bg-luxury-emerald' : 'bg-luxury-lightgray'}`} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {step === 1 ? (
          cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xs text-luxury-medgray uppercase tracking-widest">No items in checkout queue. Populate cart first.</p>
              <button onClick={() => router.push('/shop')} className="mt-4 bg-luxury-gold text-white px-6 py-2.5 text-xs uppercase font-bold tracking-widest">Shop Collection</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              
              {/* Left Column: Details & Card Payment Form */}
              <form onSubmit={handlePurchase} className="space-y-6 brutalist-block-beige">
                <h2 className="text-xs font-bold text-luxury-gold tracking-widest uppercase pb-2 border-b border-hairline">
                  Customer & Payment details
                </h2>

                {/* Email (Critical for digital files link delivery) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider flex items-center gap-1.5">
                    <Mail size={12} className="text-luxury-gold" /> Delivery Email Address
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                  />
                  <p className="text-[9px] text-luxury-medgray uppercase tracking-wider font-light">A unique secure download link and digital invoice will be instantly transmitted here.</p>
                </div>

                {/* Cardholder Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider flex items-center gap-1.5">
                    Cardholder Full Name
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="ENTER NAME ON CARD"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                  />
                </div>

                {/* Credit Card Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard size={12} className="text-luxury-gold" /> Card Credentials
                  </label>
                  <input 
                    type="text"
                    required
                    maxLength={19}
                    placeholder="CARD NUMBER (MOCK)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 text-center focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                    />
                    <input 
                      type="password"
                      required
                      maxLength={3}
                      placeholder="CVC"
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      className="bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 text-center focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold text-[10px] w-full py-4 tracking-[0.25em] font-bold uppercase transition flex items-center justify-center gap-2 rounded-none"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" /> Transmitting secure token...
                    </>
                  ) : (
                    <>
                      <Lock size={14} /> Finalize Order ({currency === 'USD' ? `$${total}` : `₦${total.toLocaleString()}`})
                    </>
                  )}
                </button>

                {/* Trust Seals */}
                <div className="flex items-center justify-center gap-4 text-[9px] text-luxury-medgray uppercase tracking-widest pt-4 border-t border-luxury-lightgray dark:border-luxury-medgray/10">
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-luxury-emerald" /> SSL Shield
                  </div>
                  <div>•</div>
                  <div>PCI-DSS Compliant</div>
                  <div>•</div>
                  <div>Instant Files Delivery</div>
                </div>
              </form>

              {/* Right Column: Order Summary */}
              <div className="bg-luxury-beige/10 border border-luxury-lightgray dark:border-luxury-medgray/10 p-6 space-y-6">
                <h2 className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white uppercase tracking-widest pb-2 border-b border-luxury-lightgray">
                  Order Summary
                </h2>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-luxury-lightgray overflow-hidden shrink-0">
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white truncate">{item.product.name}</p>
                        <p className="text-[10px] text-luxury-medgray mt-0.5">{item.selectedFormat} Format • Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-luxury-gold shrink-0">
                        {currency === 'USD' 
                          ? `$${(item.product.priceUSD * item.quantity).toFixed(2)}` 
                          : `₦${(item.product.priceNGN * item.quantity).toLocaleString()}`}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-luxury-lightgray pt-4 space-y-1.5 text-xs text-luxury-medgray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-luxury-charcoal dark:text-luxury-white font-semibold">
                      {currency === 'USD' ? `$${subtotal.toFixed(2)}` : `₦${subtotal.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="text-luxury-charcoal dark:text-luxury-white font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-luxury-charcoal dark:text-luxury-white pt-2 border-t border-luxury-lightgray">
                    <span className="serif-heading text-xs tracking-wider uppercase">Order Total</span>
                    <span className="text-luxury-gold">
                      {currency === 'USD' ? `$${total.toFixed(2)}` : `₦${total.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          /* Receipt / Success Screen */
          <div className="max-w-2xl mx-auto bg-luxury-beige/30 dark:bg-luxury-charcoal/20 border border-luxury-gold/30 p-8 text-center space-y-6">
            <CheckCircle className="text-luxury-emerald mx-auto" size={48} />
            <div className="space-y-2">
              <span className="text-[10px] text-luxury-gold font-bold tracking-[0.3em] uppercase">Gratitude from Atelier</span>
              <h2 className="text-2xl font-light tracking-wide serif-heading uppercase text-luxury-charcoal dark:text-luxury-white">Your Order Is Confirmed</h2>
              <p className="text-xs text-luxury-medgray leading-relaxed max-w-md mx-auto">
                Thank you for choosing Atelier Crest, {name}. A receipt has been dispatched to <span className="font-bold text-luxury-charcoal dark:text-luxury-white">{email}</span>.
              </p>
            </div>

            {/* Instant downloads grid */}
            <div className="border-t border-b border-luxury-gold/20 py-6 space-y-4 text-left">
              <h3 className="text-xs font-bold text-luxury-gold tracking-widest uppercase mb-4 text-center">Your Secure Downloads</h3>
              {purchasedItems.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-luxury-white dark:bg-luxury-charcoal/40 p-4 border border-luxury-lightgray dark:border-luxury-medgray/10">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-luxury-lightgray overflow-hidden shrink-0">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white">{item.product.name}</p>
                      <p className="text-[9px] text-luxury-medgray">License Key: LIC-{Math.floor(10000+Math.random()*90000)}-GOLD</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => triggerMockDownload(item.product.name, item.selectedFormat)}
                    className="bg-luxury-emerald hover:bg-luxury-gold text-luxury-white text-[10px] tracking-wider uppercase font-bold py-2.5 px-4 transition flex items-center gap-1.5"
                  >
                    <Download size={12} /> Download {item.selectedFormat}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-luxury-charcoal hover:bg-luxury-gold text-luxury-white py-3 px-6 text-xs font-bold uppercase tracking-widest transition"
              >
                Go to Dashboard
              </button>
              <button 
                onClick={() => router.push('/shop')}
                className="border border-luxury-charcoal text-luxury-charcoal dark:border-luxury-white dark:text-luxury-white py-3 px-6 text-xs font-bold uppercase tracking-widest transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>

      <CartDrawer onNavigate={handleNavigate} />
      <StyleQuiz onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
