'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string; // Agbada, Kaftan, Senator, Sleeves, Pockets, Necklines
  style: 'Traditional' | 'Luxury' | 'Modern' | 'Minimal';
  priceUSD: number;
  priceNGN: number;
  rating: number;
  stitches: number;
  colors: number;
  hoopSize: string; // "100x100mm", "140x200mm", "200x300mm", "360x360mm"
  difficulty: 'Easy' | 'Medium' | 'Advanced' | 'Master';
  formats: string[]; // DST, PES, JEF, EXP, VP3, HUS, XXX
  imageUrl: string;
  hoverImageUrl: string;
  description: string;
  features: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  designer: string;
  colorPalette: string[];
  instantDownload: boolean;
  releaseDate: string;
}

export interface CartItem {
  product: Product;
  selectedFormat: string;
  quantity: number;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currency: 'USD' | 'NGN';
  setCurrency: (curr: 'USD' | 'NGN') => void;
  cart: CartItem[];
  addToCart: (product: Product, format: string) => void;
  removeFromCart: (productId: string, format: string) => void;
  updateCartQty: (productId: string, format: string, qty: number) => void;
  clearCart: () => void;
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  products: Product[];
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  downloadHistory: { id: string; name: string; date: string; format: string; licenseKey: string }[];
  addDownload: (product: Product, format: string) => void;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'royal-agbada-crest',
    name: 'The Royal Agbada Crest',
    category: 'Agbada',
    style: 'Luxury',
    priceUSD: 49,
    priceNGN: 73500,
    rating: 4.9,
    stitches: 85000,
    colors: 3,
    hoopSize: '200x300mm',
    difficulty: 'Advanced',
    formats: ['DST', 'PES', 'EXP', 'VP3'],
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    hoverImageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
    description: 'An elite, high-density embroidery design engineered for traditional Nigerian Agbada attire. Features intricate filigree borders and a majestic central emblem representing nobility and power.',
    features: ['Optimized for industrial and multi-needle machines', 'Includes detailed stitch map and color run layout', 'Reinforced stabilizer recommendations included'],
    isNew: true,
    isTrending: true,
    designer: 'Atelier Babatunde',
    colorPalette: ['#C9A227', '#111111', '#ECECE9'],
    instantDownload: true,
    releaseDate: '2026-06-01'
  },
  {
    id: 'imperial-kaftan-neckline',
    name: 'Imperial Kaftan Neckline',
    category: 'Kaftan',
    style: 'Traditional',
    priceUSD: 29,
    priceNGN: 43500,
    rating: 4.8,
    stitches: 22000,
    colors: 2,
    hoopSize: '140x200mm',
    difficulty: 'Medium',
    formats: ['DST', 'PES', 'JEF', 'VP3', 'HUS'],
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    hoverImageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
    description: 'An exquisite neck framing motif that blends modern minimalism with traditional Hausa embroidery lines. Designed to fit clean linen Kaftans.',
    features: ['Low thread breakage design logic', 'Symmetrical layout for easy multi-hooping alignment', 'Crisp satin stitch borders'],
    isBestSeller: true,
    designer: 'Zara Bello',
    colorPalette: ['#C9A227', '#0F5132'],
    instantDownload: true,
    releaseDate: '2026-05-15'
  },
  {
    id: 'senator-chevron-neck',
    name: 'Senator Chevron Neckline',
    category: 'Senator',
    style: 'Minimal',
    priceUSD: 19,
    priceNGN: 28500,
    rating: 4.7,
    stitches: 15500,
    colors: 1,
    hoopSize: '140x200mm',
    difficulty: 'Easy',
    formats: ['DST', 'PES', 'EXP', 'JEF', 'XXX'],
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600',
    hoverImageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    description: 'A sharp, architectural chevron-inspired neckline optimized for modern Senator wear. Best suited for clean, dark fabrics with high contrast metallic threads.',
    features: ['Single color continuous path stitching', 'Extremely fast sew-out time', 'Perfect for beginners'],
    isTrending: true,
    designer: 'Atelier Babatunde',
    colorPalette: ['#C9A227'],
    instantDownload: true,
    releaseDate: '2026-06-10'
  },
  {
    id: 'majestic-sleeve-border',
    name: 'Majestic Sleeve Border',
    category: 'Sleeves',
    style: 'Luxury',
    priceUSD: 34,
    priceNGN: 51000,
    rating: 4.9,
    stitches: 45000,
    colors: 4,
    hoopSize: '100x100mm',
    difficulty: 'Advanced',
    formats: ['DST', 'PES', 'JEF', 'VP3', 'HUS', 'XXX'],
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    hoverImageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600',
    description: 'Baroque-inspired symmetrical cuff motifs that perfectly wrap sleeves for both traditional and modern garments. Embellished with beautiful fill-patterns.',
    features: ['Seamless tiling instructions included', 'Premium geometric lattice fills', 'Multiple scale variants included in folder'],
    isNew: true,
    designer: 'Chidi Okafor',
    colorPalette: ['#C9A227', '#111111', '#8A8A85', '#F5F3EF'],
    instantDownload: true,
    releaseDate: '2026-07-01'
  },
  {
    id: 'flora-luxe-pocket',
    name: 'Flora Luxe Pocket Motif',
    category: 'Pocket Designs',
    style: 'Modern',
    priceUSD: 12,
    priceNGN: 18000,
    rating: 4.6,
    stitches: 8500,
    colors: 3,
    hoopSize: '100x100mm',
    difficulty: 'Easy',
    formats: ['DST', 'PES', 'EXP', 'VP3'],
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
    hoverImageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    description: 'A contemporary pocket accent combining clean lines with organic floral detailing. Designed specifically for linen fabric shirts.',
    features: ['High-contrast color matching', 'Minimal jump stitches', 'Fully editable color blocks'],
    isBestSeller: true,
    designer: 'Zara Bello',
    colorPalette: ['#C9A227', '#ECECE9', '#8A8A85'],
    instantDownload: true,
    releaseDate: '2026-04-20'
  },
  {
    id: 'yoruba-cap-emblem',
    name: 'Yoruba Fila Heritage Icon',
    category: 'Traditional Wear',
    style: 'Traditional',
    priceUSD: 15,
    priceNGN: 22500,
    rating: 4.8,
    stitches: 11000,
    colors: 2,
    hoopSize: '100x100mm',
    difficulty: 'Medium',
    formats: ['DST', 'PES', 'JEF', 'VP3'],
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600',
    hoverImageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    description: 'A compact, elegant cap design celebrating Yoruba heritage. Sized perfectly for custom velvet filas or pocket coordinates.',
    features: ['Optimized for heavy velvet or wool fabrics', 'High stitch volume stability', 'Traditional geometric symbols'],
    designer: 'Atelier Babatunde',
    colorPalette: ['#C9A227', '#FAFAF8'],
    instantDownload: true,
    releaseDate: '2026-03-10'
  },
  {
    id: 'queens-boubou-neck',
    name: "Queen's Boubou Collar",
    category: 'Neck Designs',
    style: 'Luxury',
    priceUSD: 39,
    priceNGN: 58500,
    rating: 4.9,
    stitches: 62000,
    colors: 3,
    hoopSize: '200x300mm',
    difficulty: 'Advanced',
    formats: ['DST', 'PES', 'EXP', 'JEF', 'VP3', 'XXX'],
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    hoverImageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    description: 'A breathtaking collar frame designed for premium silk Boubou dresses. Captures the opulent look of hand-threaded royal African embroidery.',
    features: ['Dense fill sections blended with intricate lace contours', 'Designed for lightweight silk with water-soluble stabilizers', 'Includes alternative border sizing options'],
    isTrending: true,
    designer: 'Chidi Okafor',
    colorPalette: ['#C9A227', '#0F5132', '#F5F3EF'],
    instantDownload: true,
    releaseDate: '2026-06-25'
  },
  {
    id: 'modernist-asymmetry-chest',
    name: 'Modernist Asymmetrical Chest',
    category: 'Flap Designs',
    style: 'Modern',
    priceUSD: 24,
    priceNGN: 36000,
    rating: 4.5,
    stitches: 18000,
    colors: 2,
    hoopSize: '140x200mm',
    difficulty: 'Medium',
    formats: ['DST', 'PES', 'EXP', 'VP3', 'HUS'],
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600',
    hoverImageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
    description: 'A contemporary asymmetrical embroidery design, perfect for wrapping a shirt front flap. Minimalist, architectural, and highly sophisticated.',
    features: ['Modern straight-stitch accents', 'Low tension pathing to prevent fabric gathering', 'Excellent on high-end linen'],
    isNew: true,
    designer: 'Zara Bello',
    colorPalette: ['#111111', '#C9A227'],
    instantDownload: true,
    releaseDate: '2026-07-05'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Kaftan', 'Agbada', 'Gold Lace']);
  const [downloadHistory, setDownloadHistory] = useState<AppContextType['downloadHistory']>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('ac_theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark-theme', savedTheme === 'dark');
    }
    const savedCurrency = localStorage.getItem('ac_currency') as 'USD' | 'NGN';
    if (savedCurrency) setCurrency(savedCurrency);

    const savedCart = localStorage.getItem('ac_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedWish = localStorage.getItem('ac_wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));

    const savedDownloads = localStorage.getItem('ac_downloads');
    if (savedDownloads) {
      setDownloadHistory(JSON.parse(savedDownloads));
    } else {
      // Seed initial download history for premium look
      const seedDownloads = [
        {
          id: 'imperial-kaftan-neckline',
          name: 'Imperial Kaftan Neckline',
          date: '2026-07-10',
          format: 'DST',
          licenseKey: 'LIC-79402-KAFT-8392-GOLD'
        }
      ];
      setDownloadHistory(seedDownloads);
      localStorage.setItem('ac_downloads', JSON.stringify(seedDownloads));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('ac_theme', newTheme);
    document.documentElement.classList.toggle('dark-theme', newTheme === 'dark');
  };

  const changeCurrency = (curr: 'USD' | 'NGN') => {
    setCurrency(curr);
    localStorage.setItem('ac_currency', curr);
  };

  const addToCart = (product: Product, format: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id && item.selectedFormat === format
      );
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.product.id === product.id && item.selectedFormat === format
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { product, selectedFormat: format, quantity: 1 }];
      }
      localStorage.setItem('ac_cart', JSON.stringify(newCart));
      return newCart;
    });
    setIsCartOpen(true); // Open slide out cart on add
  };

  const removeFromCart = (productId: string, format: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedFormat === format)
      );
      localStorage.setItem('ac_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateCartQty = (productId: string, format: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, format);
      return;
    }
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.product.id === productId && item.selectedFormat === format
          ? { ...item, quantity: qty }
          : item
      );
      localStorage.setItem('ac_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('ac_cart', JSON.stringify([]));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWish = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('ac_wishlist', JSON.stringify(newWish));
      return newWish;
    });
  };

  const addRecentSearch = (query: string) => {
    if (!query || query.trim() === '') return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== query.toLowerCase());
      const newRecent = [query, ...filtered].slice(0, 5);
      return newRecent;
    });
  };

  const addDownload = (product: Product, format: string) => {
    setDownloadHistory((prev) => {
      const exists = prev.some((d) => d.id === product.id && d.format === format);
      if (exists) return prev;
      const uniqueNum = Math.floor(10000 + Math.random() * 90000);
      const newDownload = {
        id: product.id,
        name: product.name,
        date: new Date().toISOString().split('T')[0],
        format,
        licenseKey: `LIC-${uniqueNum}-${product.category.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}-GOLD`
      };
      const updated = [newDownload, ...prev];
      localStorage.setItem('ac_downloads', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency: changeCurrency,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isQuizOpen,
        setIsQuizOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        products: MOCK_PRODUCTS,
        recentSearches,
        addRecentSearch,
        downloadHistory,
        addDownload
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
