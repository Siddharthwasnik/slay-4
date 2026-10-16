import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '../data/products';

interface ShopAllScreenProps {
  initialCategory?: string;
  onNavigateScreen: (screen: 'home' | 'shop-all' | 'pdp' | 'bag', category?: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
}

export const ShopAllScreen: React.FC<ShopAllScreenProps> = ({
  initialCategory = 'all',
  onNavigateScreen,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M']);
  const [selectedPriceTier, setSelectedPriceTier] = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('Featured & Trending');
  const [activeTagFestive, setActiveTagFestive] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewCount, setViewCount] = useState<number>(24);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Dropdown states
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [paletteDropdownOpen, setPaletteDropdownOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'shop-all') {
      if (selectedCategory === 'kurti') {
        list = list.filter((p) => p.category === 'Kurtis');
      } else if (selectedCategory === 'tops') {
        list = list.filter((p) => p.category === 'Tops');
      } else if (selectedCategory === 'sets') {
        list = list.filter((p) => p.category === 'Sets');
      } else if (selectedCategory === 'bottom') {
        list = list.filter((p) => p.category === 'Bottoms');
      } else if (selectedCategory === 'festive-edit') {
        list = list.filter((p) => p.badge?.includes('Festive') || p.subtitle?.includes('Festive') || p.price > 1500);
      } else if (selectedCategory === 'new-in') {
        list = list.filter((p) => p.badge === 'New In');
      } else if (selectedCategory === 'trending') {
        list = list.filter((p) => p.badge === 'Trending' || p.badge === 'Bestseller' || p.isSale);
      }
    }

    if (selectedPriceTier === 'under1500') {
      list = list.filter((p) => p.price < 1500);
    } else if (selectedPriceTier === '1500to2500') {
      list = list.filter((p) => p.price >= 1500 && p.price <= 2500);
    } else if (selectedPriceTier === 'above2500') {
      list = list.filter((p) => p.price > 2500);
    }

    // Sort
    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'New Arrivals First') {
      list.sort((a, b) => (b.badge === 'New In' ? 1 : 0) - (a.badge === 'New In' ? 1 : 0));
    }

    return list;
  }, [selectedCategory, selectedPriceTier, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleQuickAdd = (product: Product, size: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(product, size);
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1400);
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedPriceTier(null);
    setSelectedPalette(null);
    setActiveTagFestive(false);
    setSelectedCategory('all');
  };

  return (
    <div className="flex flex-col w-full bg-[#fbf9f6] min-h-screen">
      {/* Collection Breadcrumb & Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-6 sm:pb-8 w-full">
        <div className="flex items-center gap-1.5 text-[#444748] font-label-md text-xs uppercase tracking-wider mb-3 sm:mb-4">
          <button type="button" onClick={() => onNavigateScreen('home')} className="hover:text-primary transition-colors">
            Home
          </button>
          <span className="text-outline">/</span>
          <button type="button" onClick={() => setSelectedCategory('all')} className="hover:text-primary transition-colors">
            Collections
          </button>
          <span className="text-outline">/</span>
          <span className="text-primary font-bold">Shop All &amp; Co-ords</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eae8e5] text-on-surface font-label-xs text-[10px] tracking-widest uppercase font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              48 Curated Designs In Stock
            </span>
            <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary tracking-tight font-serif">
              The Contemporary Ethnic Edit
            </h1>
            <p className="font-body-md text-xs sm:text-sm text-[#444748] leading-relaxed">
              Breathable silhouettes, artisanal block prints, and handcrafted festive sets tailored for sunset soirees, diwali festivities, and destination celebrations.
            </p>
          </div>

          {/* Quick Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-label-md text-xs uppercase tracking-wider whitespace-nowrap transition-transform active:scale-95 ${
                selectedCategory === 'all' || selectedCategory === 'shop-all'
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-[#f5f3f0] text-[#444748] hover:bg-[#eae8e5] hover:text-on-surface'
              }`}
            >
              All (48)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('sets')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-label-md text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === 'sets'
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-[#f5f3f0] text-[#444748] hover:bg-[#eae8e5] hover:text-on-surface'
              }`}
            >
              Sets (16)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('kurti')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-label-md text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === 'kurti'
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-[#f5f3f0] text-[#444748] hover:bg-[#eae8e5] hover:text-on-surface'
              }`}
            >
              Kurtis (18)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('tops')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-label-md text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === 'tops'
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-[#f5f3f0] text-[#444748] hover:bg-[#eae8e5] hover:text-on-surface'
              }`}
            >
              Tops (9)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('bottom')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full font-label-md text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === 'bottom'
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-[#f5f3f0] text-[#444748] hover:bg-[#eae8e5] hover:text-on-surface'
              }`}
            >
              Bottoms (5)
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar & Utility Tray */}
      <section className="sticky top-24 md:top-44 z-30 bg-[#fbf9f6]/95 backdrop-blur-md shadow-sm border-y border-[#eae8e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* Filter Dropdown Trigger Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Size Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setSizeDropdownOpen(!sizeDropdownOpen);
                  setPriceDropdownOpen(false);
                  setPaletteDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors shadow-sm ${
                  selectedSizes.length > 0 ? 'bg-primary text-white' : 'bg-white text-on-surface hover:bg-[#eae8e5]'
                }`}
              >
                <span>Size {selectedSizes.length > 0 && `(${selectedSizes.join(', ')})`}</span>
                <span className={`material-symbols-outlined text-[16px] transition-transform ${sizeDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {sizeDropdownOpen && (
                <div className="flex flex-col absolute top-full left-0 mt-1 p-2 rounded-lg bg-white shadow-xl min-w-[150px] z-50 space-y-1 border border-[#eae8e5]">
                  {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                    <label key={s} className="flex items-center gap-2 px-2 py-1 text-on-surface text-xs cursor-pointer hover:bg-[#f5f3f0] rounded">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(s)}
                        onChange={() => toggleSize(s)}
                        className="accent-primary"
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setPriceDropdownOpen(!priceDropdownOpen);
                  setSizeDropdownOpen(false);
                  setPaletteDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors shadow-sm ${
                  selectedPriceTier ? 'bg-primary text-white' : 'bg-white text-on-surface hover:bg-[#eae8e5]'
                }`}
              >
                <span>Price Range</span>
                <span className={`material-symbols-outlined text-[16px] transition-transform ${priceDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {priceDropdownOpen && (
                <div className="flex flex-col absolute top-full left-0 mt-1 p-2 rounded-lg bg-white shadow-xl min-w-[170px] z-50 space-y-1 border border-[#eae8e5]">
                  <button
                    type="button"
                    onClick={() => { setSelectedPriceTier(selectedPriceTier === 'under1500' ? null : 'under1500'); setPriceDropdownOpen(false); }}
                    className={`text-left px-2 py-1 text-xs rounded ${selectedPriceTier === 'under1500' ? 'font-bold bg-[#eae8e5]' : 'hover:bg-[#f5f3f0]'}`}
                  >
                    Under ₹1,500
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedPriceTier(selectedPriceTier === '1500to2500' ? null : '1500to2500'); setPriceDropdownOpen(false); }}
                    className={`text-left px-2 py-1 text-xs rounded ${selectedPriceTier === '1500to2500' ? 'font-bold bg-[#eae8e5]' : 'hover:bg-[#f5f3f0]'}`}
                  >
                    ₹1,500 - ₹2,500
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedPriceTier(selectedPriceTier === 'above2500' ? null : 'above2500'); setPriceDropdownOpen(false); }}
                    className={`text-left px-2 py-1 text-xs rounded ${selectedPriceTier === 'above2500' ? 'font-bold bg-[#eae8e5]' : 'hover:bg-[#f5f3f0]'}`}
                  >
                    ₹2,500 &amp; Above
                  </button>
                </div>
              )}
            </div>

            {/* Palette Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setPaletteDropdownOpen(!paletteDropdownOpen);
                  setSizeDropdownOpen(false);
                  setPriceDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors shadow-sm ${
                  selectedPalette ? 'bg-primary text-white' : 'bg-white text-on-surface hover:bg-[#eae8e5]'
                }`}
              >
                <span>Palette</span>
                <span className={`material-symbols-outlined text-[16px] transition-transform ${paletteDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {paletteDropdownOpen && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white shadow-xl min-w-[190px] z-50 absolute top-full left-0 mt-1 border border-[#eae8e5]">
                  {[
                    { name: 'Terracotta Rust', hex: '#a23e18' },
                    { name: 'Sandstone Ivory', hex: '#eae8e5' },
                    { name: 'Mustard Ochre', hex: '#e1c198' },
                    { name: 'Midnight Jet', hex: '#1b1c1a' },
                    { name: 'Festive Vermillion', hex: '#fe8357' },
                  ].map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      title={color.name}
                      onClick={() => {
                        setSelectedPalette(selectedPalette === color.name ? null : color.name);
                        setPaletteDropdownOpen(false);
                      }}
                      style={{ backgroundColor: color.hex }}
                      className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform border border-black/10 ${
                        selectedPalette === color.name ? 'ring-2 ring-primary scale-110' : ''
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveTagFestive(!activeTagFestive)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-label-xs text-[10px] uppercase tracking-wider transition-colors font-bold ${
                activeTagFestive ? 'bg-primary text-white' : 'bg-[#f5f3f0] text-[#444748] hover:text-secondary'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">tune</span>
              <span>{activeTagFestive ? 'Festive Filtered' : 'Festive Only'}</span>
            </button>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#444748] font-label-md text-xs">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products by"
                className="bg-transparent text-primary font-bold outline-none cursor-pointer pr-1"
              >
                <option>Featured &amp; Trending</option>
                <option>New Arrivals First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Loved (Wishlisted)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="font-label-xs text-[10px] uppercase tracking-wider text-outline font-bold shrink-0">Active:</span>
          {selectedSizes.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eae8e5] text-on-surface font-label-xs text-[10px] font-semibold shrink-0">
              Size: {selectedSizes.join(', ')}
              <button type="button" onClick={() => setSelectedSizes([])} className="hover:text-secondary ml-0.5">
                ✕
              </button>
            </span>
          )}
          {activeTagFestive && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eae8e5] text-on-surface font-label-xs text-[10px] font-semibold shrink-0">
              Festive &amp; Casual Ready
              <button type="button" onClick={() => setActiveTagFestive(false)} className="hover:text-secondary ml-0.5">
                ✕
              </button>
            </span>
          )}
          {selectedPriceTier && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eae8e5] text-on-surface font-label-xs text-[10px] font-semibold shrink-0">
              Price: {selectedPriceTier}
              <button type="button" onClick={() => setSelectedPriceTier(null)} className="hover:text-secondary ml-0.5">
                ✕
              </button>
            </span>
          )}
          {selectedPalette && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eae8e5] text-on-surface font-label-xs text-[10px] font-semibold shrink-0">
              Palette: {selectedPalette}
              <button type="button" onClick={() => setSelectedPalette(null)} className="hover:text-secondary ml-0.5">
                ✕
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={clearAllFilters}
            className="font-label-xs text-[10px] uppercase text-secondary hover:underline tracking-wider ml-1 font-bold shrink-0"
          >
            Clear All
          </button>
        </div>
      </section>

      {/* Responsive Product Merchandising Grid: 2 columns on mobile, 4 columns on desktop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 gap-y-6 sm:gap-y-10">
          {filteredProducts.slice(0, 8).map((product) => {
            const isWish = wishlistIds.includes(product.id);
            const isJustAdded = quickAddedId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#efeeeb] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.image}
                    alt={product.name}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-label-xs text-[8px] sm:text-[9px] uppercase tracking-wider font-bold shadow-sm ${
                        product.badge.includes('Off')
                          ? 'bg-secondary text-white'
                          : 'bg-white/90 backdrop-blur-sm text-primary'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button (min 36-44px touch target) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm active:scale-90 ${
                      isWish ? 'text-secondary bg-white' : 'text-[#1b1c1a] hover:text-secondary hover:bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">favorite</span>
                  </button>

                  {/* Quick Size Hover Drawer (Desktop) */}
                  <div className="hidden md:flex absolute bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 items-center justify-between border-t border-[#eae8e5]">
                    <span className="font-label-xs text-[9px] text-[#444748] uppercase tracking-wider font-bold">
                      Quick Size:
                    </span>
                    <div className="flex items-center gap-1">
                      {(product.sizes || ['XS', 'S', 'M', 'L']).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={(e) => handleQuickAdd(product, sz, e)}
                          className="w-6 h-6 rounded bg-[#efeeeb] hover:bg-primary hover:text-white font-label-xs text-[9px] font-bold transition-colors flex items-center justify-center"
                          title={`Add size ${sz}`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta Bar */}
                <div className="pt-2 sm:pt-3 flex flex-col gap-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-headline-sm text-xs sm:text-sm leading-tight text-primary font-semibold line-clamp-1 pr-1">
                      {product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(product, product.sizes?.[0] || 'M', e)}
                      className={`flex items-center justify-center gap-0.5 sm:gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs transition-colors shrink-0 font-semibold self-start sm:self-auto min-h-[30px] sm:min-h-[32px] ${
                        isJustAdded
                          ? 'bg-primary text-white'
                          : 'bg-[#eae8e5] hover:bg-primary hover:text-white text-on-surface active:scale-95'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
                        {isJustAdded ? 'check' : 'add'}
                      </span>
                      <span>{isJustAdded ? 'Added' : 'Add'}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 font-price-regular text-[11px] sm:text-xs">
                    <span className={`font-bold ${product.isSale ? 'text-secondary' : 'text-primary'}`}>
                      Rs. {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-outline line-through text-[10px] sm:text-[11px]">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mid-Catalog Campaign Break: "The Seasonal Lookbook" */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-6 w-full">
        <div className="relative rounded-2xl overflow-hidden bg-[#eae8e5] shadow-sm border border-[#c4c7c7]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center space-y-4 z-10">
              <span className="font-label-xs text-xs uppercase tracking-widest text-secondary font-bold">
                The Seasonal Lookbook
              </span>
              <h2 className="font-headline-md text-2xl lg:text-3xl text-primary font-serif">
                Artisanal Roots, Tailored for Now.
              </h2>
              <p className="font-body-md text-sm text-[#444748] max-w-sm leading-relaxed">
                Each Slayvana silhouette is hand-dyed and cut in small batches in Mumbai, preserving slow fashion techniques with breathable hand-spun cotton.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('festive-edit')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-label-md text-xs uppercase tracking-wider hover:bg-[#1c1b1b] transition-colors shadow-md font-bold"
                >
                  <span>Explore The Edit</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 relative min-h-[260px] lg:min-h-auto">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCka49qifps8WHMhzPLgz5JqxwGmSOptG9cR2ySIjnsbcvBMX8JRC_tEJSYqr6DU2zxDwOWi506oZ7q6nUXgyqjxlvcDEQSltmOiOYkv6tNjQkiY2yA1OvHlBu9HXD1zHcqDBcwK3zDcdZdO6X088742FcEEUAfF6hBHpI1QJFd-79eJDpqWUBhTO8o3_ON6ui4-RZFSCAhNk6-TtQ3ZWO5-9N8nuuyOfPv3LxWBUH2JB-YijFakPO4"
                alt="Friends celebrating Diwali in handloom co-ords"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Numbered Pagination Module */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body-sm text-xs text-[#444748]">
          Showing <span className="font-bold text-primary">1–8</span> of <span className="font-bold text-primary">48</span> products
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-full bg-[#efeeeb] flex items-center justify-center text-outline hover:text-on-surface hover:bg-[#eae8e5] transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          {[1, 2, 3, 4].map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`w-9 h-9 rounded-full font-label-md text-xs font-bold transition-all ${
                currentPage === pageNum
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-[#f5f3f0] hover:bg-[#eae8e5] text-on-surface'
              }`}
            >
              {pageNum}
            </button>
          ))}
          <span className="px-1 text-outline font-label-md text-xs">...</span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
            className="w-9 h-9 rounded-full bg-[#efeeeb] flex items-center justify-center text-on-surface hover:bg-[#eae8e5] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-label-xs text-[10px] uppercase tracking-wider text-outline font-bold">View:</span>
          {[24, 48].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setViewCount(v)}
              className={`px-2.5 py-1 rounded-full font-label-xs text-[10px] font-bold ${
                viewCount === v ? 'bg-[#eae8e5] text-primary' : 'bg-[#f5f3f0] text-[#444748] hover:text-on-surface'
              }`}
            >
              {v}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setViewCount(99)}
            className={`px-2.5 py-1 rounded-full font-label-xs text-[10px] font-bold ${
              viewCount === 99 ? 'bg-[#eae8e5] text-primary' : 'bg-[#f5f3f0] text-[#444748] hover:text-on-surface'
            }`}
          >
            All
          </button>
        </div>
      </section>

      {/* Artisanal Trust Strip */}
      <section className="w-full bg-[#f5f3f0] py-8 border-t border-[#eae8e5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-secondary shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-sm font-bold text-primary">100% Breathable Mul &amp; Cotton</h4>
              <p className="font-body-sm text-xs text-[#444748]">Naturally dyed, hypoallergenic fabrics tailored for Indian climates.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-secondary shrink-0">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-sm font-bold text-primary">Pan-India Express Dispatch</h4>
              <p className="font-body-sm text-xs text-[#444748]">Shipped within 24–48 hours with door-to-door tracking.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-secondary shrink-0">
              <span className="material-symbols-outlined text-[24px]">sync</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-sm font-bold text-primary">7-Day Seamless Exchanges</h4>
              <p className="font-body-sm text-xs text-[#444748]">Hassle-free size and silhouette swaps with free doorstep pickup.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
