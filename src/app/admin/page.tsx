'use client';

import React, { useState } from 'react';
import { useApp, Product } from '../../context/AppContext';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { CartDrawer } from '../../components/CartDrawer';
import { StyleQuiz } from '../../components/StyleQuiz';
import { DollarSign, ShoppingBag, Eye, Percent, Plus, Trash2, Check, X, BarChart3, TrendingUp, Download, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { products, currency } = useApp();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'analytics' | 'catalog' | 'coupons' | 'reviews'>('analytics');

  // Products state wrapper
  const [adminProducts, setAdminProducts] = useState<Product[]>(products);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Agbada');
  const [newProductPrice, setNewProductPrice] = useState(29);
  const [newProductStitches, setNewProductStitches] = useState(25000);

  // Coupon state
  const [coupons, setCoupons] = useState([
    { code: 'CREST20', discount: '20%', type: 'Percentage', status: 'Active' },
    { code: 'ROYAL15', discount: '15%', type: 'Percentage', status: 'Active' }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('10%');

  // Reviews mock logs
  const [reviews, setReviews] = useState([
    { id: 1, author: 'Chinedu O.', design: 'The Royal Agbada Crest', rating: 5, comment: 'Astonishing density alignment. Zero thread breakages.', status: 'Approved' },
    { id: 2, author: 'Fatima Y.', design: 'Imperial Kaftan Accent', rating: 4, comment: 'Perfect sleeve coordination. Very fast sew time.', status: 'Pending' }
  ]);

  const handleNavigate = (page: string) => {
    if (page === 'home') router.push('/');
    else router.push(`/${page}`);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName) return;
    const newProd: Product = {
      id: newProductName.toLowerCase().replace(/\s+/g, '-'),
      name: newProductName,
      category: newProductCategory,
      style: 'Luxury',
      priceUSD: newProductPrice,
      priceNGN: newProductPrice * 1500,
      rating: 5.0,
      stitches: newProductStitches,
      colors: 3,
      hoopSize: '140x200mm',
      difficulty: 'Medium',
      formats: ['DST', 'PES', 'JEF'],
      imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
      hoverImageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
      description: 'Newly compiled haute couture design by Admin.',
      features: ['Tested on commercial machines'],
      designer: 'Admin Atelier',
      colorPalette: ['#C9A227', '#111111'],
      instantDownload: true,
      releaseDate: new Date().toISOString().split('T')[0]
    };
    setAdminProducts([newProd, ...adminProducts]);
    setNewProductName('');
  };

  const handleDeleteProduct = (id: string) => {
    setAdminProducts(adminProducts.filter(p => p.id !== id));
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    setCoupons([...coupons, { code: newCouponCode.toUpperCase(), discount: newCouponDiscount, type: 'Percentage', status: 'Active' }]);
    setNewCouponCode('');
  };

  const handleApproveReview = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-luxury-white">
      <Navigation onNavigate={handleNavigate} activePage="admin" />

      {/* Header Banner */}
      <section className="bg-luxury-charcoal text-luxury-white py-16 border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="text-[9px] text-luxury-gold tracking-[0.4em] font-bold uppercase">Control Panel</span>
            <h1 className="text-3xl font-light tracking-[0.15em] serif-heading uppercase">Atelier Control</h1>
          </div>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold">
            <span>System: Online</span>
            <span>•</span>
            <span>Vault: Certified</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 w-full flex flex-col lg:flex-row gap-12">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap border-b lg:border-b-0 lg:border-r border-hairline pb-6 lg:pb-0 lg:pr-8 gap-2">
          {[
            { id: 'analytics', name: 'Atelier Stats', icon: BarChart3 },
            { id: 'catalog', name: 'Manage Vault', icon: ShoppingBag },
            { id: 'coupons', name: 'Pass Codes', icon: Percent },
            { id: 'reviews', name: 'Review Audits', icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 lg:flex-none text-left px-5 py-4 text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-3 transition border ${activeTab === tab.id ? 'bg-luxury-charcoal text-luxury-white border-luxury-charcoal' : 'border-hairline text-luxury-charcoal hover:bg-luxury-beige'}`}
              >
                <Icon size={14} /> {tab.name}
              </button>
            );
          })}
        </aside>

        {/* Content Panel */}
        <section className="flex-1 space-y-8">
          
          {/* Analytics View */}
          {activeTab === 'analytics' && (
            <div className="space-y-12 animate-fade-in">
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Gross Revenue', val: currency === 'USD' ? '$14,942.50' : '₦22,413,750', label: '+12.4% vs last week', icon: DollarSign },
                  { name: 'Orders Transacted', val: '412', label: '+8.1% vs last week', icon: ShoppingBag },
                  { name: 'Conversion Rate', val: '3.85%', label: 'Industry Avg: 1.9%', icon: Eye },
                  { name: 'Total Downloads', val: '1,824', label: '99.8% sew success', icon: Download }
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className="brutalist-block-beige space-y-4">
                      <div className="flex justify-between items-center text-luxury-gold">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{kpi.name}</span>
                        <Icon size={14} />
                      </div>
                      <p className="text-3xl font-light tracking-wide serif-heading text-luxury-charcoal">{kpi.val}</p>
                      <div className="w-8 h-[0.5px] bg-luxury-gold" />
                      <p className="text-[9px] text-luxury-medgray uppercase tracking-widest font-light">{kpi.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Chart Box */}
              <div className="brutalist-block space-y-6">
                <h3 className="text-[10px] font-bold text-luxury-gold tracking-[0.3em] uppercase">Revenue Progression (Last 6 Months)</h3>
                <div className="h-56 flex items-end justify-between gap-4 border-b border-hairline pb-4 pt-10">
                  {[
                    { month: 'FEB', val: '40%' },
                    { month: 'MAR', val: '55%' },
                    { month: 'APR', val: '75%' },
                    { month: 'MAY', val: '65%' },
                    { month: 'JUN', val: '85%' },
                    { month: 'JUL', val: '95%' }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                      <div className="w-full bg-luxury-beige h-36 relative border border-hairline">
                        <div 
                          style={{ height: bar.val }} 
                          className="w-full bg-luxury-gold absolute bottom-0 transition-all duration-1000 group-hover:bg-luxury-charcoal" 
                        />
                      </div>
                      <span className="text-[9px] font-bold text-luxury-charcoal tracking-widest uppercase">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Catalog View */}
          {activeTab === 'catalog' && (
            <div className="space-y-8 animate-fade-in">
              {/* Creator Form */}
              <form onSubmit={handleCreateProduct} className="brutalist-block-beige grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-luxury-gold uppercase tracking-[0.2em] block">Product Title</label>
                  <input 
                    type="text" 
                    placeholder="E.G. BRONZE COLLAR FRAME"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full bg-luxury-white border border-hairline text-xs py-3 px-4 focus:outline-none focus:border-luxury-gold uppercase tracking-wider"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-luxury-gold uppercase tracking-[0.2em] block">Category</label>
                  <select 
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full bg-luxury-white border border-hairline text-xs py-3 px-4 focus:outline-none focus:border-luxury-gold uppercase tracking-wider cursor-pointer"
                  >
                    <option value="Agbada">Agbada</option>
                    <option value="Kaftan">Kaftan</option>
                    <option value="Senator">Senator</option>
                    <option value="Sleeves">Sleeves</option>
                    <option value="Pocket Designs">Pocket Designs</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-luxury-gold uppercase tracking-[0.2em] block">Stitches</label>
                  <input 
                    type="number" 
                    value={newProductStitches}
                    onChange={(e) => setNewProductStitches(Number(e.target.value))}
                    className="w-full bg-luxury-white border border-hairline text-xs py-3 px-4 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-luxury-gold hover:bg-luxury-charcoal text-luxury-white py-3.5 text-[9px] font-bold uppercase tracking-[0.2em] transition flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} /> Insert Design
                </button>
              </form>

              {/* Items List */}
              <div className="brutalist-block overflow-x-auto">
                <table className="w-full text-xs text-left text-luxury-medgray">
                  <thead className="text-[9px] font-bold text-luxury-gold uppercase tracking-[0.25em] border-b border-hairline">
                    <tr>
                      <th className="pb-4">Product Name</th>
                      <th className="pb-4">Category</th>
                      <th className="pb-4">Stitches</th>
                      <th className="pb-4">Price (USD)</th>
                      <th className="pb-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminProducts.map((prod) => (
                      <tr key={prod.id} className="border-b border-hairline last:border-0 text-luxury-charcoal">
                        <td className="py-4 font-semibold uppercase tracking-wider">{prod.name}</td>
                        <td className="py-4 uppercase tracking-wider font-light">{prod.category}</td>
                        <td className="py-4">{prod.stitches.toLocaleString()}</td>
                        <td className="py-4 font-bold text-luxury-gold">${prod.priceUSD}</td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="text-luxury-medgray hover:text-luxury-softred transition p-1 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Coupons View */}
          {activeTab === 'coupons' && (
            <div className="space-y-8 animate-fade-in">
              <form onSubmit={handleAddCoupon} className="brutalist-block-beige flex gap-6 items-end max-w-xl">
                <div className="flex-1 space-y-2">
                  <label className="text-[9px] font-bold text-luxury-gold uppercase tracking-[0.2em] block">Coupon Code</label>
                  <input 
                    type="text" 
                    placeholder="E.G. COUTURE30"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full bg-luxury-white border border-hairline text-xs py-3 px-4 focus:outline-none focus:border-luxury-gold uppercase tracking-wider"
                  />
                </div>
                <div className="w-32 space-y-2">
                  <label className="text-[9px] font-bold text-luxury-gold uppercase tracking-[0.2em] block">Discount</label>
                  <input 
                    type="text" 
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    className="w-full bg-luxury-white border border-hairline text-xs py-3 px-4 focus:outline-none focus:border-luxury-gold text-center"
                  />
                </div>
                <button type="submit" className="bg-luxury-gold hover:bg-luxury-charcoal text-luxury-white px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] transition">
                  Create
                </button>
              </form>

              <div className="brutalist-block">
                <table className="w-full text-xs text-left text-luxury-medgray">
                  <thead className="text-[9px] font-bold text-luxury-gold uppercase tracking-[0.25em] border-b border-hairline">
                    <tr>
                      <th className="pb-4">Coupon Code</th>
                      <th className="pb-4">Discount</th>
                      <th className="pb-4">Type</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((c, idx) => (
                      <tr key={idx} className="border-b border-hairline last:border-0 text-luxury-charcoal">
                        <td className="py-4 font-mono font-bold text-luxury-gold">{c.code}</td>
                        <td className="py-4 tracking-wider uppercase font-light">{c.discount}</td>
                        <td className="py-4 tracking-wider uppercase font-light">{c.type}</td>
                        <td className="py-4 font-semibold text-luxury-emerald tracking-widest uppercase text-[10px]">{c.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews Moderation */}
          {activeTab === 'reviews' && (
            <div className="brutalist-block animate-fade-in">
              <table className="w-full text-xs text-left text-luxury-medgray">
                <thead className="text-[9px] font-bold text-luxury-gold uppercase tracking-[0.25em] border-b border-hairline">
                  <tr>
                    <th className="pb-4">Reviewer</th>
                    <th className="pb-4">Masterpiece</th>
                    <th className="pb-4">Snippet</th>
                    <th className="pb-4">Rating</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Approve</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r.id} className="border-b border-hairline last:border-0 text-luxury-charcoal">
                      <td className="py-4 font-semibold uppercase tracking-wider">{r.author}</td>
                      <td className="py-4 uppercase tracking-wider font-light">{r.design}</td>
                      <td className="py-4 italic font-light">"{r.comment}"</td>
                      <td className="py-4 text-luxury-gold font-bold">{r.rating}/5</td>
                      <td className="py-4 font-bold uppercase text-[9px] tracking-widest">
                        <span className={r.status === 'Approved' ? 'text-luxury-emerald' : 'text-luxury-gold'}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {r.status === 'Pending' ? (
                          <button 
                            onClick={() => handleApproveReview(r.id)}
                            className="bg-luxury-emerald hover:bg-luxury-charcoal text-luxury-white p-2 transition cursor-pointer"
                            title="Approve Review"
                          >
                            <Check size={12} />
                          </button>
                        ) : (
                          <span className="text-[9px] text-luxury-emerald uppercase font-bold tracking-widest flex items-center justify-end gap-1"><Check size={10} /> Active</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <CartDrawer onNavigate={handleNavigate} />
      <StyleQuiz onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
