'use client';

import React, { useState } from 'react';
import { useApp, Product } from '../context/AppContext';
import { X, Award, Sparkles, Check, ChevronRight } from 'lucide-react';

interface StyleQuizProps {
  onNavigate: (page: string) => void;
}

export const StyleQuiz: React.FC<StyleQuizProps> = ({ onNavigate }) => {
  const { isQuizOpen, setIsQuizOpen, products, currency } = useApp();
  const [step, setStep] = useState(1);
  const [garmentType, setGarmentType] = useState('');
  const [hoopSize, setHoopSize] = useState('');
  const [occasion, setOccasion] = useState('');

  if (!isQuizOpen) return null;

  const handleClose = () => {
    setIsQuizOpen(false);
    setStep(1);
    setGarmentType('');
    setHoopSize('');
    setOccasion('');
  };

  const getRecommendedProducts = (): Product[] => {
    return products.filter((prod) => {
      if (garmentType && prod.category.toLowerCase() !== garmentType.toLowerCase()) {
        return false;
      }
      if (hoopSize === 'small' && prod.hoopSize !== '100x100mm') return false;
      if (hoopSize === 'medium' && prod.hoopSize === '200x300mm') return false;
      if (occasion === 'royal' && prod.style !== 'Luxury' && prod.style !== 'Traditional') return false;
      if (occasion === 'minimal' && prod.style !== 'Minimal' && prod.style !== 'Modern') return false;
      return true;
    }).slice(0, 3);
  };

  const recommended = getRecommendedProducts();

  return (
    <div className="fixed inset-0 z-50 bg-luxury-charcoal/80 backdrop-blur-sm animate-fade-in flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-luxury-white border border-hairline p-8 relative max-h-[90vh] overflow-y-auto rounded-none shadow-2xl space-y-6">
        {/* Close */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 text-luxury-charcoal hover:text-luxury-gold transition p-1.5 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-block p-3.5 bg-luxury-beige border border-hairline rounded-none">
            <Sparkles className="text-luxury-gold" size={24} />
          </span>
          <h3 className="serif-heading text-base font-bold tracking-[0.25em] text-luxury-charcoal">Style Advisor</h3>
          <div className="w-8 h-[0.5px] bg-luxury-gold mx-auto my-2" />
          <p className="text-[9px] text-luxury-medgray tracking-[0.15em] uppercase font-light leading-relaxed">
            Specify apparel needs and machine constraints to isolate perfect designs.
          </p>
        </div>

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-[1px] w-12 transition-all duration-500 ${s <= step ? 'bg-luxury-gold' : 'bg-luxury-border'}`}
              />
            ))}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-luxury-charcoal uppercase text-center">1. SELECT GARMENT CATEGORY</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Agbada', desc: 'Grand African traditional attire' },
                { name: 'Kaftan', desc: 'Classic outlines & collar trims' },
                { name: 'Senator', desc: 'Asymmetrical geometric chest strips' },
                { name: 'Sleeves', desc: 'Repeating cuffs & frame borders' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setGarmentType(item.name);
                    setStep(2);
                  }}
                  className="p-5 border border-hairline bg-luxury-beige/30 hover:bg-luxury-beige hover:border-luxury-gold transition text-left space-y-1.5"
                >
                  <p className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider">{item.name}</p>
                  <p className="text-[9px] text-luxury-medgray font-light uppercase tracking-wide leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-luxury-charcoal uppercase text-center">2. MAXIMUM MACHINE HOOP CLEARANCE</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'small', title: 'Small Hoop (100x100mm)', desc: 'Perfect for sleeves, caps, pockets' },
                { id: 'medium', title: 'Medium Hoop (140x200mm)', desc: 'Standard necklines, cuffs, motifs' },
                { id: 'large', title: 'Large Hoop (200x300mm+)', desc: 'Large Agbada panels, heavy outlines' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setHoopSize(item.id);
                    setStep(3);
                  }}
                  className="p-5 border border-hairline bg-luxury-beige/30 hover:bg-luxury-beige hover:border-luxury-gold transition text-left flex justify-between items-center group"
                >
                  <div>
                    <p className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider">{item.title}</p>
                    <p className="text-[9px] text-luxury-medgray font-light uppercase tracking-wide mt-1">{item.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-luxury-medgray group-hover:text-luxury-gold transition" />
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(1)} 
              className="text-[9px] text-luxury-medgray hover:text-luxury-gold tracking-widest uppercase block mx-auto pt-2 underline font-bold"
            >
              Back to step 1
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-luxury-charcoal uppercase text-center">3. EMBROIDERY STYLE MOOD</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'royal', title: 'Royal & Opulent', desc: 'Dense fill motifs, heavy gold' },
                { id: 'minimal', title: 'Modern Minimalist', desc: 'Architectural lines & outlines' },
                { id: 'heritage', title: 'Traditional Heritage', desc: 'Historical African heraldry' },
                { id: 'all', title: 'Surprise Me', desc: 'Show all configurations' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setOccasion(item.id);
                    setStep(4);
                  }}
                  className="p-5 border border-hairline bg-luxury-beige/30 hover:bg-luxury-beige hover:border-luxury-gold transition text-left space-y-1.5"
                >
                  <p className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-wider">{item.title}</p>
                  <p className="text-[9px] text-luxury-medgray font-light uppercase tracking-wide leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(2)} 
              className="text-[9px] text-luxury-medgray hover:text-luxury-gold tracking-widest uppercase block mx-auto pt-2 underline font-bold"
            >
              Back to step 2
            </button>
          </div>
        )}

        {/* Recommendations */}
        {step === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center bg-luxury-beige p-5 border border-hairline space-y-1">
              <Award className="text-luxury-gold mx-auto" size={24} />
              <p className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-[0.2em]">Couture Matches Found</p>
              <p className="text-[9px] text-luxury-medgray uppercase tracking-widest font-light">Based on your parameters.</p>
            </div>

            <div className="space-y-4">
              {recommended.length > 0 ? (
                recommended.map((prod) => (
                  <div key={prod.id} className="flex gap-4 p-4 border border-hairline items-center bg-luxury-beige/10">
                    <div className="w-16 h-20 bg-luxury-beige overflow-hidden shrink-0 border border-hairline">
                      <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-luxury-charcoal uppercase tracking-wider truncate">{prod.name}</p>
                      <p className="text-[9px] text-luxury-medgray tracking-widest uppercase font-light mt-0.5">{prod.hoopSize} • {prod.style}</p>
                      <p className="text-xs font-bold text-luxury-gold mt-1.5">
                        {currency === 'USD' ? `$${prod.priceUSD}` : `₦${prod.priceNGN.toLocaleString()}`}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        onNavigate(`product/${prod.id}`);
                        handleClose();
                      }}
                      className="bg-luxury-charcoal text-luxury-white hover:bg-luxury-gold text-[9px] tracking-widest uppercase font-bold py-2.5 px-4 transition"
                    >
                      View
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-luxury-medgray text-center italic uppercase font-light tracking-wide">No exact matches found. Explore shop.</p>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleClose}
                className="flex-1 btn-couture text-[9px]"
              >
                Close Advisor
              </button>
              <button 
                onClick={() => {
                  onNavigate('shop');
                  handleClose();
                }}
                className="flex-1 btn-gold text-[9px]"
              >
                Browse Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
