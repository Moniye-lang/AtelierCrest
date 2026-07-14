'use client';

import React, { useState } from 'react';
import { useApp, Product } from '../../context/AppContext';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { CartDrawer } from '../../components/CartDrawer';
import { StyleQuiz } from '../../components/StyleQuiz';
import { Download, History, Heart, User, Check, ShieldCheck, Mail, Settings, RefreshCw, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CustomerDashboard() {
  const { downloadHistory, wishlist, products, toggleWishlist, addToCart, currency } = useApp();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'downloads' | 'history' | 'wishlist' | 'settings'>('downloads');
  const [profileName, setProfileName] = useState('Alhaji Ibrahim');
  const [profileEmail, setProfileEmail] = useState('ibrahim.k@couture.com');
  const [machinePreference, setMachinePreference] = useState('Tajima TME-S');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Resolve products in wishlist
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const triggerDownload = (prodName: string, format: string) => {
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
    <div className="min-h-screen flex flex-col justify-between">
      <Navigation onNavigate={handleNavigate} activePage="dashboard" />

      {/* Dashboard Banner */}
      <section className="bg-luxury-beige dark:bg-luxury-charcoal py-10 border-b border-luxury-lightgray dark:border-luxury-medgray/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-luxury-gold/10 border border-luxury-gold rounded-full flex items-center justify-center">
              <span className="serif-heading text-luxury-gold text-2xl font-bold">{profileName.charAt(0)}</span>
            </div>
            <div>
              <span className="text-[9px] text-luxury-gold tracking-[0.25em] font-bold uppercase">Welcome Back</span>
              <h1 className="text-xl font-light tracking-wide serif-heading uppercase text-luxury-charcoal dark:text-luxury-white">{profileName}</h1>
              <p className="text-[10px] text-luxury-medgray">{profileEmail} • Member since 2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-[9px] border border-luxury-emerald text-luxury-emerald px-2.5 py-1 font-bold uppercase rounded-sm flex items-center gap-1">
              <ShieldCheck size={10} /> Certified Tailor
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-60 shrink-0 space-y-1">
          {[
            { id: 'downloads', name: 'My Downloads', icon: Download },
            { id: 'history', name: 'Purchase History', icon: History },
            { id: 'wishlist', name: 'My Wishlist', icon: Heart },
            { id: 'settings', name: 'Profile & Settings', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-3 text-xs tracking-wider uppercase font-bold flex items-center gap-3 transition border-l-2 ${activeTab === tab.id ? 'bg-luxury-beige dark:bg-luxury-charcoal border-luxury-gold text-luxury-gold' : 'border-transparent text-luxury-medgray hover:bg-luxury-beige/50 dark:hover:bg-luxury-charcoal/30 hover:text-luxury-charcoal dark:hover:text-luxury-white'}`}
              >
                <Icon size={16} /> {tab.name}
              </button>
            );
          })}
        </aside>

        {/* Content Panel */}
        <section className="flex-1 min-h-[400px]">
          
          {/* My Downloads */}
          {activeTab === 'downloads' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-luxury-lightgray dark:border-luxury-medgray/25">
                <h2 className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white uppercase tracking-widest">Digital Design Vault</h2>
                <span className="text-[9px] text-luxury-medgray uppercase">All links secure and active</span>
              </div>

              {downloadHistory.length > 0 ? (
                <div className="space-y-4">
                  {downloadHistory.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-luxury-beige/25 dark:bg-luxury-charcoal/40 p-4 border border-luxury-lightgray dark:border-luxury-medgray/10 group">
                      <div>
                        <h3 className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white">{item.name}</h3>
                        <p className="text-[9px] text-luxury-medgray mt-1 uppercase">Purchased: {item.date} • Format Preference: {item.format}</p>
                        <p className="text-[9px] text-luxury-gold mt-0.5 uppercase select-all font-mono font-semibold">License: {item.licenseKey}</p>
                      </div>
                      <button 
                        onClick={() => triggerDownload(item.name, item.format)}
                        className="bg-luxury-gold text-luxury-white hover:bg-luxury-charcoal hover:text-luxury-white dark:hover:bg-luxury-white dark:hover:text-luxury-charcoal py-2.5 px-4 text-[10px] tracking-wider font-bold uppercase transition flex items-center justify-center gap-1.5 rounded-sm"
                      >
                        <Download size={12} /> Download {item.format}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-luxury-gold/20">
                  <p className="text-xs text-luxury-medgray uppercase tracking-widest">No purchased embroidery files found.</p>
                  <button onClick={() => router.push('/shop')} className="mt-4 bg-luxury-gold text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest">Browse Catalog</button>
                </div>
              )}
            </div>
          )}

          {/* Purchase History */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-luxury-lightgray dark:border-luxury-medgray/25">
                <h2 className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white uppercase tracking-widest">Receipts & Invoices</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-luxury-medgray">
                  <thead className="bg-luxury-beige dark:bg-luxury-charcoal/50 text-[10px] font-bold text-luxury-gold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Invoice ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Details</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {downloadHistory.map((item, idx) => (
                      <tr key={idx} className="border-b border-luxury-lightgray dark:border-luxury-medgray/10 text-luxury-charcoal dark:text-luxury-white">
                        <td className="p-3 font-mono">INV-839{idx}-CUST</td>
                        <td className="p-3">{item.date}</td>
                        <td className="p-3">{item.name} ({item.format})</td>
                        <td className="p-3 font-semibold text-luxury-gold">
                          {currency === 'USD' ? '$29.00' : '₦43,500'}
                        </td>
                        <td className="p-3">
                          <button className="text-[10px] text-luxury-gold underline hover:text-luxury-charcoal transition uppercase font-semibold">PDF Receipt</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-luxury-lightgray dark:border-luxury-medgray/25">
                <h2 className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white uppercase tracking-widest">Saved Masterpieces</h2>
              </div>

              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlistProducts.map((prod) => (
                    <div key={prod.id} className="flex gap-4 p-4 border border-luxury-lightgray dark:border-luxury-medgray/10 group bg-luxury-beige/10">
                      <div className="w-16 h-16 bg-luxury-lightgray overflow-hidden shrink-0 relative cursor-pointer" onClick={() => router.push(`/product/${prod.id}`)}>
                        <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h3 onClick={() => router.push(`/product/${prod.id}`)} className="text-xs font-bold text-luxury-charcoal dark:text-luxury-white hover:text-luxury-gold cursor-pointer transition truncate">{prod.name}</h3>
                          <p className="text-[9px] text-luxury-medgray mt-0.5">{prod.hoopSize} • {prod.style}</p>
                          <p className="text-xs font-semibold text-luxury-gold mt-1">
                            {currency === 'USD' ? `$${prod.priceUSD}` : `₦${prod.priceNGN.toLocaleString()}`}
                          </p>
                        </div>
                        <div className="flex gap-3 mt-2">
                          <button 
                            onClick={() => addToCart(prod, prod.formats[0])}
                            className="bg-luxury-charcoal text-luxury-white text-[9px] tracking-wider uppercase font-bold py-1.5 px-3 hover:bg-luxury-gold transition flex items-center gap-1"
                          >
                            <ShoppingBag size={10} /> Add
                          </button>
                          <button 
                            onClick={() => toggleWishlist(prod.id)}
                            className="text-[9px] text-luxury-softred underline uppercase font-bold transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-luxury-gold/20">
                  <p className="text-xs text-luxury-medgray uppercase tracking-widest">No saved designs found.</p>
                  <button onClick={() => router.push('/shop')} className="mt-4 bg-luxury-gold text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest">Explore Catalog</button>
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 brutalist-block-beige">
              <div className="pb-4 border-b border-hairline">
                <h2 className="text-xs font-bold text-luxury-charcoal uppercase tracking-widest">Atelier Profile Settings</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">Profile Name</label>
                  <input 
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">Embroidery Machine Model</label>
                  <input 
                    type="text"
                    value={machinePreference}
                    onChange={(e) => setMachinePreference(e.target.value)}
                    className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">Preferred File Format</label>
                  <select 
                    className="w-full bg-luxury-white border border-luxury-lightgray text-xs px-4 py-3 uppercase focus:outline-none focus:border-luxury-gold text-luxury-charcoal cursor-pointer"
                  >
                    <option value="DST">DST (Commercial Tajima/Universal)</option>
                    <option value="PES">PES (Brother/Babylock)</option>
                    <option value="JEF">JEF (Janome)</option>
                    <option value="EXP">EXP (Bernina)</option>
                    <option value="VP3">VP3 (Husqvarna/Viking)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-hairline">
                {saveSuccess ? (
                  <span className="text-[10px] text-luxury-emerald font-bold uppercase flex items-center gap-1">
                    <Check size={12} /> Profile metrics stored successfully
                  </span>
                ) : <span />}
                <button 
                  type="submit"
                  className="btn-gold text-[10px] py-3.5 px-6 font-bold uppercase tracking-[0.2em]"
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}
        </section>
      </main>

      <CartDrawer onNavigate={handleNavigate} />
      <StyleQuiz onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
