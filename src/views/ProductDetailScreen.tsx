import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { SizeGuideModal } from '../components/SizeGuideModal';

interface ProductDetailScreenProps {
  product?: Product;
  onNavigateScreen: (screen: 'home' | 'shop-all' | 'pdp' | 'bag', category?: string) => void;
  onAddToCart: (product: Product, size: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onNavigateScreen,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
}) => {
  // Chaahvi Set fallback images from HTML
  const galleryImages = product?.gallery && product.gallery.length > 0
    ? product.gallery
    : [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAPtCnQrB8tzR8vSSVKhZlUginp9vMh_FiMKPsa1YF5rvfz4v9Xp83M3fkGlPZCOC5xzP4eau84PGA1YDLN2_rnNFIIU3HiqJWAUGuaR1nSq6naBueg5AM73wdIwZXlKkZ3z_kHFTRIYDUnl1ev3lIakh0jj3m8O4KuSmR0kQHkNNYY0Ge7MYa7eTIjYDD4jX1Z0pLRLCLt3hzzt0A4mcgDzJQPByEdE_CaxMy7yGR6gIom11JODE6m',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCC6s0ndcvcXbCB9wZ8JfP3iFmYt6J_GUTz0LIrMEaellGD_8ZjuyVW9PtyTTnSqyEPT-XoDU98qX_Yd6EF0CLyg322DVpPVakQu22ijkQWMIX_gc9CzWP2YClnJWUYAU5MZjQbHqptu9ulIOTnIXGWoqP9C2hKjza01DVOvUuLS9PKwG87JjQZwWbRk_OkZCrTL8tPJkTEp7iw51BbTBmnxv5gSQ-nCpMqVWUc3s7ScWJ_hpCsNfny',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC8bhUAi3NuyPvV0HYIrdFEZ2BWMO1gN9IpBKCZ6Cx4UYYOq_5iwSzdth8_3fTMRhXTDk4VPIoSVKY1bj1X-dth6RgHOtSjd3gA1ve-ovEvaXxpSLGsJ3A7B628OhxOrHOn0GUIW1ff5fmY-MT6Xsaet0fVK1yeffhjtocadVWXe9bVR0rE83tuKhlmyraRaGVE619WuBFMDptnQLrEYvgE9X4me_wLCXAdICtlDiLB4n83tp1ZTe3d',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQoJT_KPaaC_Ek0slR9mK6UHIngV6VrrYVw691i9skrbMkL7VtiR0gE8CBmXXAiwJVrwHxuyVkolPLfh8dVNML-Kz-fyxvHxXcNpjAxd8l35g_zlZu1G5P93wXK0of1-WF_o4iI9cHpA4HXWxKUyMj6_-HLdxTO_clEMgvhjU0cpeJ-nyyRupZcgN7TdueMwVKF0UX7lWvP-oyNkeYUVwJPflctYhk6-EQDedsc8aCk4uE045HwPq',
      ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Warm Sandstone');
  const [selectedSize, setSelectedSize] = useState('M');
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  // Accordion toggles
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    acc1: true,
    acc2: false,
    acc3: false,
  });

  // Countdown timer for Leaving Soon
  const [countdownSeconds, setCountdownSeconds] = useState(
    4 * 86400 + 18 * 3600 + 36 * 60 + 50
  );

  useEffect(() => {
    const t = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const cdDays = Math.floor(countdownSeconds / 86400);
  const cdHours = Math.floor((countdownSeconds % 86400) / 3600);
  const cdMins = Math.floor((countdownSeconds % 3600) / 60);
  const cdSecs = countdownSeconds % 60;

  const toggleAccordion = (id: string) => {
    setAccordionOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentItem: Product = product || {
    id: 'chaahvi-corset-set',
    name: 'Chaahvi Corset Kurti & Flared Pant Set',
    sku: 'SLY-SLY-24-CHS',
    price: 2499,
    originalPrice: 3299,
    discountBadge: '24% Off',
    category: 'Sets',
    badge: 'New In',
    image: galleryImages[0],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  };

  const handleAdd = () => {
    onAddToCart(currentItem, selectedSize, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleInstantCheckout = () => {
    onAddToCart(currentItem, selectedSize, selectedColor);
    onNavigateScreen('bag');
  };

  return (
    <div className="flex flex-col w-full bg-[#fbf9f6] min-h-screen">
      {/* Toast Notification */}
      {copyToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1a] text-white px-4 py-2 rounded-full text-xs font-label-md shadow-xl flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
          <span>Product link copied to clipboard!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pt-4 sm:pt-8 pb-24 md:pb-16">
        {/* Breadcrumb Ribbon */}
        <nav className="flex items-center gap-1 text-[#444748] font-label-md text-[11px] sm:text-xs uppercase tracking-wider mb-4 sm:mb-8 overflow-x-auto no-scrollbar">
          <button type="button" onClick={() => onNavigateScreen('home')} className="hover:text-primary transition-colors shrink-0">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <button type="button" onClick={() => onNavigateScreen('shop-all', 'festive-edit')} className="hover:text-primary transition-colors shrink-0">
            Festive Edit
          </button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <button type="button" onClick={() => onNavigateScreen('shop-all', 'sets')} className="hover:text-primary transition-colors shrink-0">
            Sets
          </button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-bold shrink-0">{currentItem.name.split(' ')[0]} Set</span>
        </nav>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left Column: Multi-Angle Editorial Gallery (55% / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-3 sm:gap-4 sticky lg:top-48">
            {/* Thumbnails Column */}
            <div className="flex md:flex-col gap-2 sm:gap-3 overflow-x-auto no-scrollbar md:overflow-visible shrink-0 pb-1 md:pb-0">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-22 sm:w-20 sm:h-28 rounded-lg overflow-hidden bg-[#eae8e5] transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'ring-2 ring-primary opacity-100 shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Hero Stage Container */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-[#f5f3f0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] aspect-[3/4] group border border-[#eae8e5]">
              {/* Floating Status Pills */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex flex-col gap-1.5 sm:gap-2">
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/90 backdrop-blur-md rounded-full font-label-xs text-[9px] sm:text-[10px] tracking-widest uppercase text-primary shadow-sm font-bold">
                  New In
                </span>
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-primary text-white rounded-full font-label-xs text-[9px] sm:text-[10px] tracking-widest uppercase shadow-sm font-bold">
                  Handcrafted Mul
                </span>
              </div>

              {/* Wishlist & Share action buttons */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Add to Wishlist"
                  onClick={() => onToggleWishlist(currentItem)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm transition-all active:scale-95 ${
                    isWishlisted ? 'text-secondary bg-white' : 'text-on-surface hover:text-secondary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">favorite</span>
                </button>
                <button
                  type="button"
                  aria-label="Share Piece"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: currentItem.name, url: window.location.href }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      setCopyToast(true);
                      setTimeout(() => setCopyToast(false), 2500);
                    }
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary shadow-sm transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">share</span>
                </button>
              </div>

              {/* Active Display Image */}
              <img
                src={galleryImages[activeImageIndex]}
                alt={currentItem.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Zoom Hint Overlay */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#444748] font-label-xs text-[10px] shadow-sm pointer-events-none font-bold">
                <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                <span>Hover to explore weave</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Purchase Dossier (45% / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Eyebrow & Brand */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-label-xs text-[10px] tracking-[0.2em] uppercase text-secondary font-bold">
                  SLAYVANA ATELIER
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4c7c7]"></span>
                <span className="font-label-xs text-[10px] tracking-[0.15em] uppercase text-[#444748] font-bold">
                  SLAYVANA EDIT
                </span>
              </div>
              <h1 className="font-headline-lg text-2xl lg:text-3xl text-primary tracking-tight font-serif">
                {currentItem.name}
              </h1>
              <p className="font-body-sm text-xs text-[#444748]">
                Style SKU: {currentItem.sku}
              </p>
            </div>

            {/* Pricing & Value Proposition */}
            <div className="p-5 rounded-xl bg-[#f5f3f0] flex flex-col gap-2 border border-[#eae8e5]">
              <div className="flex items-baseline gap-3">
                <span className="font-price-sale text-2xl lg:text-[28px] leading-tight text-primary font-bold">
                  Rs. {currentItem.price.toLocaleString()}.00
                </span>
                {currentItem.originalPrice && (
                  <span className="font-price-regular text-sm line-through text-outline">
                    Rs. {currentItem.originalPrice.toLocaleString()}.00
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-xs text-[10px] uppercase font-bold tracking-wide">
                  {currentItem.discountBadge || '24% Off'}
                </span>
              </div>
              <p className="font-body-sm text-xs text-[#444748] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                Inclusive of all taxes. Free express courier delivery across India.
              </p>
            </div>

            {/* Colorway Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
                  Color: <span className="font-normal text-[#444748]">{selectedColor}</span>
                </label>
                <span className="font-label-xs text-[10px] uppercase text-[#444748] font-semibold">
                  3 Shades Available
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedColor('Warm Sandstone')}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full transition-all text-xs font-semibold ${
                    selectedColor === 'Warm Sandstone'
                      ? 'bg-[#eae8e5] ring-2 ring-primary text-black'
                      : 'bg-[#f5f3f0] hover:bg-[#eae8e5] text-on-surface'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#f4ecd8] shadow-inner border border-black/10"></span>
                  <span>Warm Sandstone</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedColor('Rust Terracotta')}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full transition-all text-xs font-semibold ${
                    selectedColor === 'Rust Terracotta'
                      ? 'bg-[#eae8e5] ring-2 ring-primary text-black'
                      : 'bg-[#f5f3f0] hover:bg-[#eae8e5] text-on-surface'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-secondary shadow-inner"></span>
                  <span>Rust Terracotta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedColor('Mughal Ivory')}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full transition-all text-xs font-semibold ${
                    selectedColor === 'Mughal Ivory'
                      ? 'bg-[#eae8e5] ring-2 ring-primary text-black'
                      : 'bg-[#f5f3f0] hover:bg-[#eae8e5] text-on-surface'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-inner border border-black/10"></span>
                  <span>Mughal Ivory</span>
                </button>
              </div>
            </div>

            {/* Size Selection & Interactive Size Guide */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
                    Select Size
                  </label>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdbcf] text-[#390c00] font-label-xs text-[9px] font-bold">
                    True to Size
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSizeModalOpen(true)}
                  className="flex items-center gap-1 font-label-md text-xs text-secondary hover:underline transition-all font-bold"
                >
                  <span className="material-symbols-outlined text-[16px]">straighten</span>
                  <span>Size Guide &amp; Fits</span>
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-lg font-label-md text-xs uppercase text-center transition-all ${
                      selectedSize === sz
                        ? 'bg-primary text-white font-bold shadow-sm'
                        : 'bg-[#f5f3f0] text-on-surface hover:bg-[#eae8e5]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Stock Alert Notification */}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#eae8e5] text-on-surface">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <p className="font-body-sm text-xs">
                  <span className="font-bold text-secondary">Only 4 pieces remaining</span> in size {selectedSize}. Order within the hour for priority dispatch.
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 px-6 rounded-full bg-primary text-white font-label-lg text-xs uppercase tracking-widest hover:bg-[#1c1b1b] transition-all flex items-center justify-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.14)] active:scale-[0.99] font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {addedToast ? 'check_circle' : 'shopping_bag'}
                </span>
                <span>
                  {addedToast ? 'Added to Bag!' : `Add to Shopping Bag • Rs. ${currentItem.price.toLocaleString()}`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleInstantCheckout}
                className="w-full py-3.5 px-6 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-[0.99] font-bold shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                <span>Instant Checkout via UPI / COD</span>
              </button>
            </div>

            {/* Value Proposition Micro-cards */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-lg bg-[#f5f3f0] flex flex-col items-center text-center gap-1 border border-[#eae8e5]">
                <span className="material-symbols-outlined text-secondary text-[22px]">dry_cleaning</span>
                <span className="font-label-xs text-[10px] font-bold uppercase tracking-wider text-on-surface">
                  100% Breathable
                </span>
                <span className="font-body-sm text-[11px] text-[#444748]">Artisanal Mul</span>
              </div>
              <div className="p-3 rounded-lg bg-[#f5f3f0] flex flex-col items-center text-center gap-1 border border-[#eae8e5]">
                <span className="material-symbols-outlined text-secondary text-[22px]">water_drop</span>
                <span className="font-label-xs text-[10px] font-bold uppercase tracking-wider text-on-surface">
                  Pre-Washed
                </span>
                <span className="font-body-sm text-[11px] text-[#444748]">Zero Shrinkage</span>
              </div>
              <div className="p-3 rounded-lg bg-[#f5f3f0] flex flex-col items-center text-center gap-1 border border-[#eae8e5]">
                <span className="material-symbols-outlined text-secondary text-[22px]">published_with_changes</span>
                <span className="font-label-xs text-[10px] font-bold uppercase tracking-wider text-on-surface">
                  7-Day Return
                </span>
                <span className="font-body-sm text-[11px] text-[#444748]">Easy Exchange</span>
              </div>
            </div>

            {/* Product Accordions & Disclosures */}
            <div className="space-y-2 pt-4">
              {/* Accordion 1 */}
              <div className="rounded-lg bg-[#f5f3f0] overflow-hidden border border-[#eae8e5]">
                <button
                  type="button"
                  onClick={() => toggleAccordion('acc1')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-bold"
                >
                  <span className="font-headline-sm text-sm text-primary">Fabric, Craft &amp; Artisanal Details</span>
                  <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${accordionOpen.acc1 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {accordionOpen.acc1 && (
                  <div className="px-5 pb-5 space-y-3 text-[#444748] font-body-sm text-xs leading-relaxed">
                    <p>
                      Constructed from handwoven 100% pure cotton mulmul sourced directly from artisan collectives in Sanganer. The kurti features structured interior boning wrapped in double-layered breathable voile with an adjustable criss-cross lace fastening at the spine for customizable waist sculpt.
                    </p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Silhouette: Strapless corset bodice with high-waisted wide-flare palazzo bottoms</li>
                      <li>Fastening: Concealed side zipper with rear back tie-up eyelets</li>
                      <li>Lining: 100% organic unbleached cotton mul throughout</li>
                      <li>Artisanal touch: Hand-embroidered resham edge stitch details</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2 */}
              <div className="rounded-lg bg-[#f5f3f0] overflow-hidden border border-[#eae8e5]">
                <button
                  type="button"
                  onClick={() => toggleAccordion('acc2')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-bold"
                >
                  <span className="font-headline-sm text-sm text-primary">Size, Fit Advice &amp; Model Stats</span>
                  <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${accordionOpen.acc2 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {accordionOpen.acc2 && (
                  <div className="px-5 pb-5 space-y-2 text-[#444748] font-body-sm text-xs leading-relaxed">
                    <p>
                      Tailored for a snug, structured contour across the bust and midriff, relaxing into an effortless fluid fall through the palazzo hem. If between bust cup sizes, we recommend sizing up as the rear corset lacing allows up to 2.5 inches of waist reduction.
                    </p>
                    <p className="font-semibold text-primary pt-1">
                      Model Measurements: Height: 5'8" / 173 cm | Bust: 33" | Waist: 25" | Hips: 36" (Wearing Size S)
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3 */}
              <div className="rounded-lg bg-[#f5f3f0] overflow-hidden border border-[#eae8e5]">
                <button
                  type="button"
                  onClick={() => toggleAccordion('acc3')}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-bold"
                >
                  <span className="font-headline-sm text-sm text-primary">Delivery, Returns &amp; COD Availability</span>
                  <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${accordionOpen.acc3 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {accordionOpen.acc3 && (
                  <div className="px-5 pb-5 space-y-2 text-[#444748] font-body-sm text-xs leading-relaxed">
                    <p>
                      Metro cities (Delhi, Mumbai, Bengaluru) delivered within 48 to 72 hours. All other pin codes fulfilled within 3-5 business days. Cash on delivery accepted across 24,000+ PIN codes with automated WhatsApp status tracking.
                    </p>
                    <p>Hassle-free 7-day pickup exchange service straight from your doorstep.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Curated "Complete the Look" / Pair With Section */}
        <section className="mt-20 pt-12 border-t border-[#eae8e5]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-label-xs text-xs uppercase tracking-widest text-secondary font-bold">
                Artisanal Pairings
              </span>
              <h2 className="font-headline-md text-2xl text-primary mt-1 font-serif">
                Complete the Slayvana Look
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateScreen('shop-all')}
              className="font-label-md text-xs uppercase tracking-wider text-on-surface hover:text-secondary flex items-center gap-1 transition-colors font-bold"
            >
              <span>Explore All Pairings</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pairing 1: White Linen Loose Fitting Pants */}
            <div className="group flex flex-col space-y-3">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#f5f3f0]">
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full font-label-xs text-[10px] tracking-wider uppercase text-on-surface font-semibold shadow-sm">
                  Essential
                </span>
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAht0RGOH9PHQB8dA_FsbmDw_iyanHtXKGr3zFN-ivSYOv3dAUKDo5cF4hlwGv2FusUO5M3NRAy6GioeMvYOlalNfNob7Rx-6FCLY1ZnkgtpnRJ4AHxOw2EHqlN9Lx_NCEGdvR6qDbAux0s2Nj6TnQ68ZSy9mxlYVhUcenbw_23sMZWx1FGluBrqdO921d2H-sDTIqMvbCYfaLVfh_IB94rCMtq8Dlf_3gm4MPN4u5wr3f19L_OV6Yq"
                  alt="White Linen Loose Fitting Pants"
                />
                <button
                  type="button"
                  onClick={() => {
                    const item = PRODUCTS.find((p) => p.id === 'white-linen-pants');
                    if (item) onAddToCart(item, 'M');
                    alert('White Linen Loose Fitting Pants added to bag!');
                  }}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 text-on-surface font-label-md text-xs uppercase tracking-wider shadow-md hover:bg-primary hover:text-white transition-all font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add</span>
                </button>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-headline-sm text-sm text-primary font-bold">White Linen Loose Fitting Pants</h3>
                  <p className="font-price-sale text-xs text-[#444748] mt-0.5">Rs. 1,395.00</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const item = PRODUCTS.find((p) => p.id === 'white-linen-pants');
                    if (item) onToggleWishlist(item);
                  }}
                  className="text-outline hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
            </div>

            {/* Pairing 2: Chunar Embroidered Bralette */}
            <div className="group flex flex-col space-y-3">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#f5f3f0]">
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full font-label-xs text-[10px] tracking-wider uppercase text-on-surface font-semibold shadow-sm">
                  Festive Bestseller
                </span>
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf7p70uUQbOczrjoXTkAcDnjgxZTa_nHmhCuX3I8hPaOm9ImTmV87-EdwH3UmD8Z_tybi7gxUDfFK4aedkgKnhJZyty2xQfrVL1SM3_hTRSOD3rYkRxpmQ35JTZQocOd9zkbZWbdMQrtrtWbrBjiDmWQWPWxjPYxJ0mKZAUQU_x3MLlHQM9RsaP-qTo_LLNxHVBte3bL64evGvbT3Xoc3V2jKxJymJF2W98MYm2FRAkaU8FDYS-Hnh"
                  alt="Chunar Embroidered Bralette"
                />
                <button
                  type="button"
                  onClick={() => {
                    const item = PRODUCTS.find((p) => p.id === 'chunar-bralette');
                    if (item) onAddToCart(item, 'S');
                    alert('Chunar Embroidered Bralette added to bag!');
                  }}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 text-on-surface font-label-md text-xs uppercase tracking-wider shadow-md hover:bg-primary hover:text-white transition-all font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add</span>
                </button>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-headline-sm text-sm text-primary font-bold">Chunar Embroidered Bralette</h3>
                  <p className="font-price-sale text-xs text-[#444748] mt-0.5">Rs. 1,299.00</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const item = PRODUCTS.find((p) => p.id === 'chunar-bralette');
                    if (item) onToggleWishlist(item);
                  }}
                  className="text-outline hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
            </div>

            {/* Pairing 3: Dabu Halter Neck Corset Kurti */}
            <div className="group flex flex-col space-y-3">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#f5f3f0]">
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full font-label-xs text-[10px] tracking-wider uppercase text-on-surface font-semibold shadow-sm">
                  Trending
                </span>
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE0DgzpHGB1ilte77gwr-kbp1oP3OkvOrsFXRNs6Uwu8PPe5Dxn60N7sSDgDGb7YHccD48Xi_zGOUijMl6_MzhayQaENCdmBIzwjECKTBF4nphxs1exe7jZeJNfYeRdrOBa18idGOgswWtH1uYWAufYAnEvplM1cooDcHjdFJXNJ64Pij7xsxt1X0PaM4QF53gfHu3Fg84SdU6lLS7EDhAHibs9McDA__uBrZxYvKeNkCP6xKetut7"
                  alt="Dabu Halter Neck Corset Kurti"
                />
                <button
                  type="button"
                  onClick={() => {
                    const item = PRODUCTS.find((p) => p.id === 'dabu-halter-corset');
                    if (item) onAddToCart(item, 'M');
                    alert('Dabu Halter Neck Corset Kurti added to bag!');
                  }}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 text-on-surface font-label-md text-xs uppercase tracking-wider shadow-md hover:bg-primary hover:text-white transition-all font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add</span>
                </button>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-headline-sm text-sm text-primary font-bold">Dabu Halter Neck Corset Kurti</h3>
                  <p className="font-price-sale text-xs text-[#444748] mt-0.5">Rs. 1,395.00</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const item = PRODUCTS.find((p) => p.id === 'dabu-halter-corset');
                    if (item) onToggleWishlist(item);
                  }}
                  className="text-outline hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Sale Counter Banner ("Leaving Soon") */}
        <div className="mt-20 p-8 rounded-2xl bg-[#efeeeb] flex flex-col md:flex-row items-center justify-between gap-6 border border-[#eae8e5]">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-label-xs text-xs uppercase tracking-widest text-secondary font-bold">
              Limited Festive Window
            </span>
            <h3 className="font-headline-md text-2xl text-primary font-serif">
              Leaving Soon • Slayvana 2024
            </h3>
            <p className="font-body-sm text-xs text-[#444748]">
              Exclusive seasonal pricing expires once festival inventory exhausts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-[#eae8e5]">
              <span className="font-price-sale text-xl text-primary font-bold">
                {cdDays < 10 ? `0${cdDays}` : cdDays}
              </span>
              <span className="font-label-xs text-[10px] uppercase text-outline font-semibold">Days</span>
            </div>
            <span className="text-primary font-bold text-xl">:</span>

            <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-[#eae8e5]">
              <span className="font-price-sale text-xl text-primary font-bold">
                {cdHours < 10 ? `0${cdHours}` : cdHours}
              </span>
              <span className="font-label-xs text-[10px] uppercase text-outline font-semibold">Hours</span>
            </div>
            <span className="text-primary font-bold text-xl">:</span>

            <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-[#eae8e5]">
              <span className="font-price-sale text-xl text-primary font-bold">
                {cdMins < 10 ? `0${cdMins}` : cdMins}
              </span>
              <span className="font-label-xs text-[10px] uppercase text-outline font-semibold">Mins</span>
            </div>
            <span className="text-primary font-bold text-xl">:</span>

            <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-[#eae8e5]">
              <span className="font-price-sale text-xl text-secondary font-bold">
                {cdSecs < 10 ? `0${cdSecs}` : cdSecs}
              </span>
              <span className="font-label-xs text-[10px] uppercase text-outline font-semibold">Secs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
        selectedSize={selectedSize}
      />

      {/* Sticky Mobile Bottom Purchase Bar (Thumb Zone) */}
      <aside aria-label="Quick Add to Bag" className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#eae8e5] p-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-sm font-bold text-primary">
              ₹{currentItem.price.toLocaleString()}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f5f3f0] text-[#444748] font-bold">
              Size {selectedSize}
            </span>
          </div>
          <span className="text-[10px] text-secondary font-medium">Free Express Delivery</span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 max-w-[200px] h-11 px-4 rounded-full bg-primary text-white font-label-md text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">
            {addedToast ? 'check' : 'shopping_bag'}
          </span>
          <span>{addedToast ? 'Added' : 'Add to Bag'}</span>
        </button>
      </aside>
    </div>
  );
};
