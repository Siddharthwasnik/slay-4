import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product } from '../data/products';

interface HomeScreenProps {
  onNavigateScreen: (screen: 'home' | 'shop-all' | 'pdp' | 'bag', category?: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateScreen,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectProduct,
}) => {
  // Live Countdown state for Leaving soon
  const [totalSeconds, setTotalSeconds] = useState(
    15 * 86400 + 12 * 3600 + 54 * 60 + 28
  );
  const [curatedTab, setCuratedTab] = useState<'Restocked' | 'Bottoms' | 'Tops' | 'Dresses'>('Restocked');
  const [addedPopupId, setAddedPopupId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes?.[0] || 'M');
    setAddedPopupId(product.id);
    setTimeout(() => setAddedPopupId(null), 1500);
  };

  const navratriProducts = PRODUCTS.filter((p) =>
    ['chunar-bralette', 'ramla-top', 'aarti-top', 'umang-kurta'].includes(p.id)
  );

  const newInsProducts = PRODUCTS.filter((p) =>
    ['apsara-set', 'chashni-set', 'rangoli-corset-set', 'jharna-sheer-kurti'].includes(p.id)
  );

  const mostWantedProducts = PRODUCTS.filter((p) =>
    ['white-linen-pants', 'beige-cotton-pants', 'gunj-mul-cover-up', 'dabu-halter-corset'].includes(p.id)
  );

  const festiveProducts = PRODUCTS.filter((p) =>
    ['liza-halterneck-skirt-set', 'eleena-corset-top', 'delilah-handblock-set', 'karishma-mul-set'].includes(p.id)
  );

  const leavingSoonProducts = PRODUCTS.filter((p) =>
    ['diya-halter-top', 'meera-deep-back-kurti', 'mausam-top', 'kaya-halter-top'].includes(p.id)
  );

  // 5-Column lookbook images
  const curatedFits = [
    {
      id: 'fit-1',
      tag: 'Restocked',
      name: 'Artisanal Floral Mul Strap Kurti',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7VxEXd_0Jvtr7c-5j2tFKKQvLZ4mIJr39DAUQZL2ZMECnCqi_1TV7tV_MPLP_PyzI7bog2kxxS7z_E7FGROt5eHe2w0pqDzpT-QVu67XGjlfHpGW4-cTWRgXtYHpiCI-KODg1wZylzWRV1OnUhepe8IbS9H3NsVnYIzU5pXG9e8G5ZsRkyY4QbdlzRRqAM7UhfM5JYqe27BudpZ-G1s4Eb9XEjdBAXobqu553h5Zw59mQyXxRvLXO',
      category: 'Tops'
    },
    {
      id: 'fit-2',
      tag: 'Dresses',
      name: 'Sand Mul Tiered Mini Dress',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKHi5TvNITbNkmFc56ybtdzilXK8CIy4_biG-vLRF8rcyiLdH_fJMioxfOZM9bzc1cKzR-ipbYvTUiuYKmXXvP4u0ORXE9tNC6eRc0pusEnm_VSkfwBIkf5njiORUpsdgfd1Hh4bVqbUYkkU-nJZr79ba9mOycQpAEuVEqT06Smpjwr3bwzCnMQ7Xu3LNfeArVrt87gZf9Rzr6zq25s-ci3cnprAfVuYQ0veDgDJbi5j5lraPaGHz-',
      category: 'Dresses'
    },
    {
      id: 'fit-3',
      tag: 'Bottoms',
      name: 'Sheer Lace Flared Palazzo Pants',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzvVe384jmSKw8iKqYLmXFyFjrpCjaWYw4oV98CTDpl3nMw-R8aWiHyzPm87xbwes9TicdkXRp64jfBQ_rEw_ijOl7XEeOmXZ5dao2d0FxW_5eqJZFkwSK7hIocexloDS_Ch_PL9HJpWJgFew2ml43ngibcuJBEX49fn_CH5qwMerjdoxYevu51-3irUQC6c23FND_yZ31B6bcIF4-FfJWnwu4gbdqZS1fYfqpERTjHcs9ZI31CZRk',
      category: 'Bottoms'
    },
    {
      id: 'fit-4',
      tag: 'Tops',
      name: 'Indigo Dabu Fitted Kurti Top',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvNcLp6kOVVdHYcVrOrA8FJXJHY6jqWp5EO--0mGRLYIeKwHDPm4_CdwgHusFIDW9dNnG8YjTrXVefbcitjmcnKWMIsvmAXBs4BI6bysziDi-kku4qP_5_am3bO5c_pHED8boC4a1yf6NxVjalotI4v2pExPEemRtYSQPc5RO_qGiDiTRbAQJwQ80obfvBWNhF16lB00Upozau_su3cSDZ052S9HH1cRjjj4qtTzLI_1yGTBvyQkR7',
      category: 'Tops'
    },
    {
      id: 'fit-5',
      tag: 'Restocked',
      name: 'Rust Terracotta Halter Neck Top',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLoP1S4WRCRKsyyO3dhpJ3CZhYWXhpU_nxhG72G0eGzHmgS3hXI5WfUevj9PpPPELvTqWRswJ-xCkgPNEiZTD4mqWJCZgBiCiuH82KcSVpzT1KDp-5JfN-WF9nipks_siWaj7ylqrsSQTRsqg5E6UjIy-BOkoCYsDRVhKfJSsRyjHb9vfE3wP9rAZCytXURuXeSNADsHyNh2MPGewzpPHdVoirN-mpDpIkgndpwCwDA8aVVDEG_P68',
      category: 'Tops'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#fbf9f6]">
      {/* 1. GRAND CINEMATIC HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-black -mt-24 md:-mt-44 pt-24 md:pt-44">
        <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[901px] min-h-[460px] md:min-h-[640px] flex items-center justify-center">
          {/* Background Lifestyle Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpkwgmlCeVOZwkzLzIFqe8ZODBGFBEVggho90INPS-3DseTWmTOxF6VWA0MiP6HHLGLr_UaZM99FozMH0IygqxPnJo6twkdcvmPOIaSuTvY1FqUq4e4g-PuQbmH-jHcTADWRmozhYnjYBSMZas3vGcQGNre9FiwE2R9R-beVqVK6wXngWsI1y0Xy1H2Yvj_P-B1siJpjSWjlpx_bxofXK_h5TFMJKiPIzM9cUhqg3U4G0FUmwGtyHr')`,
            }}
          />
          {/* Soft editorial scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Hero Floating Elements */}
          <div className="relative z-10 flex flex-col items-center justify-end h-full pb-10 sm:pb-16 px-4 sm:px-6 text-center max-w-4xl mx-auto">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4 rounded-full bg-white/20 backdrop-blur-md text-white font-label-md text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold border border-white/20">
              Festive Soiree 2024 / Capsule 01
            </span>
            <h1 className="font-display-hero text-2xl sm:text-4xl md:text-6xl text-white tracking-tight uppercase mb-3 sm:mb-4 drop-shadow-md text-balance">
              Midnight Euphoria
            </h1>
            <p className="font-body-lg text-sm sm:text-base md:text-lg text-[#eae8e5] max-w-lg mb-6 sm:mb-8 opacity-90 leading-relaxed font-sans px-2">
              Modern silhouettes adorned with heritage block-prints, artisanal zari cords, and sun-spun chanderi silks.
            </p>

            {/* CTA Pill (with 48px min height on touch) */}
            <button
              type="button"
              onClick={() => onNavigateScreen('shop-all', 'trending')}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 min-h-[48px] bg-white text-black rounded-full font-label-lg text-xs uppercase tracking-widest shadow-2xl hover:bg-[#eae8e5] active:scale-95 transition-all font-bold"
            >
              <span>Most Wanted</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 mt-6 sm:mt-8">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SLAYVANA - NAVRATRI EDIT */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="font-label-xs text-xs uppercase tracking-widest text-secondary block mb-1 font-bold">
              Capsule Preview
            </span>
            <h2 className="font-headline-md text-2xl text-primary tracking-wide font-serif">
              Slayvana – Navratri Edit
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateScreen('shop-all', 'festive-edit')}
            className="group flex items-center gap-1 font-label-md text-xs uppercase tracking-wider text-[#444748] hover:text-primary transition-colors font-bold"
          >
            <span>Discover More</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {navratriProducts.map((p) => {
            const isWish = wishlistIds.includes(p.id);
            return (
              <div key={p.id} className="group flex flex-col cursor-pointer" onClick={() => onSelectProduct(p)}>
                <div className="relative w-full aspect-[3/4] bg-[#efeeeb] rounded-lg overflow-hidden mb-2 shadow-sm">
                  {p.badge && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-primary font-label-xs text-[9px] uppercase tracking-wider shadow-sm font-bold">
                        {p.badge}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(p);
                    }}
                    className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
                      isWish ? 'text-secondary bg-white' : 'text-[#1b1c1a] hover:text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </button>
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={p.image}
                    alt={p.name}
                  />
                </div>
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <h3 className="font-headline-sm text-sm text-primary line-clamp-1 font-bold">
                      {p.name}
                    </h3>
                    <span className="font-price-regular text-xs text-[#444748]">
                      Rs. {p.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(p, e)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-0.5 shadow-sm shrink-0 ${
                      addedPopupId === p.id
                        ? 'bg-primary text-white'
                        : 'bg-[#f5f3f0] hover:bg-primary hover:text-white text-primary'
                    }`}
                  >
                    {addedPopupId === p.id ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. NEW INS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="font-label-xs text-xs uppercase tracking-widest text-secondary block mb-1 font-bold">
              Fresh Arrivals
            </span>
            <h2 className="font-headline-md text-2xl text-primary tracking-wide font-serif">
              New Ins
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateScreen('shop-all', 'new-in')}
            className="group flex items-center gap-1 font-label-md text-xs uppercase tracking-wider text-[#444748] hover:text-primary transition-colors font-bold"
          >
            <span>Discover More</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {newInsProducts.map((p) => (
            <div key={p.id} className="group flex flex-col cursor-pointer" onClick={() => onSelectProduct(p)}>
              <div className="relative w-full aspect-[3/4] bg-[#efeeeb] rounded-lg overflow-hidden mb-2 shadow-sm">
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-primary font-label-xs text-[9px] uppercase tracking-wider shadow-sm font-bold">
                    New In
                  </span>
                </div>
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={p.image}
                  alt={p.name}
                />
              </div>
              <div className="flex items-start justify-between gap-1">
                <div>
                  <h3 className="font-headline-sm text-sm text-primary line-clamp-1 font-bold">
                    {p.name}
                  </h3>
                  <span className="font-price-regular text-xs text-[#444748]">
                    Rs. {p.price.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(p, e)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-0.5 shadow-sm shrink-0 ${
                    addedPopupId === p.id
                      ? 'bg-primary text-white'
                      : 'bg-[#f5f3f0] hover:bg-primary hover:text-white text-primary'
                  }`}
                >
                  {addedPopupId === p.id ? '✓ Added' : '+ Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EDITORIAL COLLAGE & FESTIVE ATMOSPHERE BANNER */}
      <section id="lookbook-section" className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          {/* Main Party Image */}
          <div className="md:col-span-7 relative rounded-xl overflow-hidden aspect-[4/3] md:aspect-auto min-h-[460px] shadow-sm group">
            <img
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf6q1MFt4pUscmsvDUr_eQDZcm2RNZOckxCBoRDlauDg9veakghusGymR5a4zoLxdAp2LBzAtBiipGTezpMRgyn68rempbj_aZvwN8-l8FASh0gGbOCDl-mifdKH-FKSaesAUdMkguQ2xP7aLeOZ3yg26bmG8cpVOGLUafaETtPOW1O0CDKzSVvv3_3eGt6dvpUn-9ynzqAJZgqeLVSRbKVbPR9KeHY0hc6T8cngzt_p8TreU3dKs_"
              alt="Festive Indian celebration with friends"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <span className="font-label-md text-xs uppercase tracking-[0.2em] text-[#ffdbcf] font-bold">
                Desi Romance 2024
              </span>
              <h3 className="font-headline-lg text-2xl md:text-3xl max-w-md mt-1 font-serif">
                Stories Spun in Stitches &amp; Celebration
              </h3>
            </div>
          </div>

          {/* Right Mosaic Grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden aspect-square bg-[#efeeeb] shadow-sm group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgzKjgmKJZpRRrJm84N6EYOUyLTzTNI3drz2TuI6lCYQSxL_HSldg_B6gllTj6lqwY2zKX_SPDY4U6-NdtXXJGv-19_q9_fOECSkUM__M0Ibs-2FoOAtTu3ysMega54s1RvT989gejwRMj2pRP_w1e1Dt0aHs6LLisHqStgFfFBdAUsl3_WS2iidcJb-vxICa01Lj_mppUWAv1rVlCtT3hbt4UYvN1h6SJDidwBkS4h9DJ-K3kXBIm"
                alt="Ivory hand-spun tunics"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-[#efeeeb] shadow-sm group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrCNBfLmnqhKKH_dqI-dEaxoyg9_fKZjnUddpIPX7_3Sychfr5UBRzxMzkdWuIfUebcyKXcRMw9wzOSrddBZiPxY1dre4Ht0uULV9FtrM5Kg0ZrOqy0tIiFMh0yhAdWMDfcgDbgQ05dGGFXmqM8iSdjTd13hYtvrcVhP-zwHmUvvb2THrf62Khbv5YIJmrTYKXMnskhzz3H5lFyjQFk2pPByKC8noeF-bbDvrPUbG75viJLhJmunM_"
                alt="Models on antique daybed"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-[#efeeeb] shadow-sm group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa2QKAmHmRXhZz9vudaXOAaP4hmQ_vViiIZVrCYCC5DcMhrUiRoEuSaoluRATx_hspz0PaPVzbhisBRdODVRufrvuiTr2EJOZxX3uHhZ3H0QlgZU3wcmOiAkvnLaraoEyU1-7t01iJlT8G8XR_ewVSPBiReQ_R8R8OVaup9vzayq-aN9Kr8q8XI7EzxdF2pBl9ifdA5H1AddNwVMrF72mpVdWFvTtsxOrF90HXR1Zhn7YUjCvNxo5Z"
                alt="Candid laughter at sunset"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-[#efeeeb] shadow-sm group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDECzazTrCd6dDiZKlzYOmfTnfLuovKbgzUm4t5d8-iaTsOFnLkPu4ZR_sIAH0fcQR_eKdLCMkA6F4F0FlYj6kPA2Bd1harSm-LOn42qdL91-BEHR25zCHG1zECyrzlqE1dFPiKJtvXS9OxcG9T5YN_hi6RofB0LLOz-_qd8mQjp-o-oBTT3wVgUARARiX2XMx_o61Xy9RxY3DxwNnp9r4txuQ4EPNg4YHXvn8Fb2DPnOOpuZU68wug"
                alt="Opulent black chikankari"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. MOST WANTED SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="font-label-xs text-xs uppercase tracking-widest text-secondary block mb-1 font-bold">
              Crowd Favorites
            </span>
            <h2 className="font-headline-md text-2xl text-primary tracking-wide font-serif">
              Most Wanted
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateScreen('shop-all', 'trending')}
            className="group flex items-center gap-1 font-label-md text-xs uppercase tracking-wider text-[#444748] hover:text-primary transition-colors font-bold"
          >
            <span>Discover More</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>

        {/* 4-Column Best Sellers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {mostWantedProducts.map((p) => (
            <div key={p.id} className="group flex flex-col cursor-pointer" onClick={() => onSelectProduct(p)}>
              <div className="relative w-full aspect-[3/4] bg-[#efeeeb] rounded-lg overflow-hidden mb-2 shadow-sm">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={p.image}
                  alt={p.name}
                />
              </div>
              <div className="flex items-start justify-between gap-1">
                <div>
                  <h3 className="font-headline-sm text-sm text-primary line-clamp-1 font-bold">
                    {p.name}
                  </h3>
                  <span className="font-price-regular text-xs text-[#444748]">
                    Rs. {p.price.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(p, e)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-0.5 shadow-sm shrink-0 ${
                    addedPopupId === p.id
                      ? 'bg-primary text-white'
                      : 'bg-[#f5f3f0] hover:bg-primary hover:text-white text-primary'
                  }`}
                >
                  {addedPopupId === p.id ? '✓ Added' : '+ Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FULL-BLEED ARCHITECTURAL / DESERT CAMPAIGN BANNER */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-102"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5a1YpwB8ORKYUWUqiQ6Tt7BNaquHirwXYcA1AyX4YwCN-95H_5LA2r998cIaFLyDO3v4KiQwNBBmcdjSPp4QdG8Ic8kUuqwJhvalZjZNZF03VujkBGROeEzXmJQd-ijsGYGXk9-GVlRPczv13Q6nWKEbdrFfBFWt3c5tXnTE2gUqA9z6mvdnc8397HTfQ4La8nBnd2zQlAFJ0p9OheXX16MXGTRyQCW88huTGwKXiTov0rYA3wFf5')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Center CTA Button */}
          <div className="relative z-10 flex flex-col items-center">
            <button
              type="button"
              onClick={() => onNavigateScreen('shop-all')}
              className="px-10 py-4 bg-white text-black rounded-full font-label-lg text-xs uppercase tracking-widest shadow-2xl hover:bg-black hover:text-white transition-all transform hover:scale-105 font-bold"
            >
              Shop All
            </button>
          </div>
        </div>
      </section>

      {/* 7. FESTIVE EDITORIAL HIGHLIGHT COLLECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-md text-2xl text-primary tracking-wide font-serif">
              Festive Collection
            </h2>
            <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
          </div>
          <button
            type="button"
            onClick={() => onNavigateScreen('shop-all', 'festive-edit')}
            className="group flex items-center gap-1 font-label-md text-xs uppercase tracking-wider text-[#444748] hover:text-primary transition-colors font-bold"
          >
            <span>Discover More</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>

        {/* 4-Column Festive Outfits */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {festiveProducts.map((p) => (
            <div key={p.id} className="group flex flex-col cursor-pointer" onClick={() => onSelectProduct(p)}>
              <div className="relative w-full aspect-[3/4] bg-[#efeeeb] rounded-lg overflow-hidden mb-2 shadow-sm">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={p.image}
                  alt={p.name}
                />
              </div>
              <div className="flex items-start justify-between gap-1">
                <div>
                  <h3 className="font-headline-sm text-sm text-primary line-clamp-1 font-bold">
                    {p.name}
                  </h3>
                  <span className="font-price-regular text-xs text-[#444748]">
                    Rs. {p.price.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(p, e)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-0.5 shadow-sm shrink-0 ${
                    addedPopupId === p.id
                      ? 'bg-primary text-white'
                      : 'bg-[#f5f3f0] hover:bg-primary hover:text-white text-primary'
                  }`}
                >
                  {addedPopupId === p.id ? '✓ Added' : '+ Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CURATED FITS FOR YOU (5-COLUMN LOOKBOOK) */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="bg-[#f5f3f0] rounded-2xl p-6 lg:p-10 shadow-sm border border-[#eae8e5]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-label-xs text-xs uppercase tracking-widest text-secondary block mb-1 font-bold">
                Personalized Style
              </span>
              <h2 className="font-headline-md text-2xl text-primary tracking-wide font-serif">
                Curated Fits for you
              </h2>
            </div>

            {/* Category Pills Filter Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {(['Restocked', 'Bottoms', 'Tops', 'Dresses'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCuratedTab(tab)}
                  className={`px-4 py-1.5 rounded-full font-label-md text-xs uppercase tracking-wider transition-all ${
                    curatedTab === tab
                      ? 'bg-primary text-white font-bold shadow-sm'
                      : 'bg-white text-[#444748] hover:text-primary shadow-sm'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 5-Column Density Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {curatedFits.map((fit) => (
              <div
                key={fit.id}
                onClick={() => onNavigateScreen('pdp')}
                className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#efeeeb] group shadow-sm cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={fit.image}
                  alt={fit.name}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                  <span className="w-full text-center py-1.5 bg-white/95 backdrop-blur-sm rounded-full font-label-xs text-[10px] uppercase tracking-wider text-primary shadow-sm font-bold">
                    Quick View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. "LEAVING SOON" COUNTDOWN URGENCY MODULE */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Countdown Pill Slab Container */}
        <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-md mb-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#eae8e5]">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-headline-lg text-2xl md:text-3xl text-primary tracking-tight font-serif">
              Leaving <span className="italic font-normal text-secondary">soon</span>
            </h3>
            <p className="font-body-md text-sm text-secondary font-semibold">
              Get 30% Off on our seasonal sale!
            </p>
          </div>

          {/* Live Dynamic Countdown Blocks */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#f5f3f0] flex items-center justify-center shadow-inner border border-[#eae8e5]">
                <span className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold">
                  {days < 10 ? `0${days}` : days}
                </span>
              </div>
              <span className="font-label-xs text-[10px] uppercase tracking-wider text-[#444748] mt-1.5 font-bold">
                Days
              </span>
            </div>
            <span className="font-headline-md text-xl text-[#444748] -mt-5 font-bold">:</span>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#f5f3f0] flex items-center justify-center shadow-inner border border-[#eae8e5]">
                <span className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold">
                  {hours < 10 ? `0${hours}` : hours}
                </span>
              </div>
              <span className="font-label-xs text-[10px] uppercase tracking-wider text-[#444748] mt-1.5 font-bold">
                Hours
              </span>
            </div>
            <span className="font-headline-md text-xl text-[#444748] -mt-5 font-bold">:</span>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#f5f3f0] flex items-center justify-center shadow-inner border border-[#eae8e5]">
                <span className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold">
                  {mins < 10 ? `0${mins}` : mins}
                </span>
              </div>
              <span className="font-label-xs text-[10px] uppercase tracking-wider text-[#444748] mt-1.5 font-bold">
                Minutes
              </span>
            </div>
            <span className="font-headline-md text-xl text-[#444748] -mt-5 font-bold">:</span>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#f5f3f0] flex items-center justify-center shadow-inner border border-[#eae8e5]">
                <span className="font-headline-lg text-2xl sm:text-3xl text-secondary font-bold">
                  {secs < 10 ? `0${secs}` : secs}
                </span>
              </div>
              <span className="font-label-xs text-[10px] uppercase tracking-wider text-[#444748] mt-1.5 font-bold">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Product Discount Cards */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-headline-md text-2xl text-primary tracking-wide font-serif">
            Leaving Soon
          </h2>
          <button
            type="button"
            onClick={() => onNavigateScreen('shop-all')}
            className="group flex items-center gap-1 font-label-md text-xs uppercase tracking-wider text-[#444748] hover:text-primary transition-colors font-bold"
          >
            <span>Discover More</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {leavingSoonProducts.map((p) => (
            <div key={p.id} className="group flex flex-col cursor-pointer" onClick={() => onSelectProduct(p)}>
              <div className="relative w-full aspect-[3/4] bg-[#efeeeb] rounded-lg overflow-hidden mb-2 shadow-sm">
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary text-white font-label-xs text-[9px] uppercase tracking-wider shadow-sm font-bold">
                    {p.discountBadge || 'Sale'}
                  </span>
                </div>
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={p.image}
                  alt={p.name}
                />
              </div>
              <div className="flex items-start justify-between gap-1">
                <div>
                  <h3 className="font-headline-sm text-sm text-primary line-clamp-1 font-bold">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-price-sale text-xs text-secondary font-bold">
                      Rs. {p.price.toLocaleString()}
                    </span>
                    {p.originalPrice && (
                      <span className="font-price-regular text-xs text-outline line-through">
                        Rs. {p.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(p, e)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-0.5 shadow-sm shrink-0 ${
                    addedPopupId === p.id
                      ? 'bg-primary text-white'
                      : 'bg-[#f5f3f0] hover:bg-primary hover:text-white text-primary'
                  }`}
                >
                  {addedPopupId === p.id ? '✓ Added' : '+ Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ARTISAN WOODBLOCK CRAFTSMANSHIP BANNER */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#eae8e5] p-6 lg:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#c4c7c7]/40">
          <div className="max-w-xl space-y-4">
            <span className="font-label-xs text-xs uppercase tracking-[0.2em] text-secondary font-bold">
              Artisanal Lineage
            </span>
            <h2 className="font-headline-lg text-2xl lg:text-3xl text-primary tracking-tight font-serif">
              Rooted in Hand-Carved Tradition
            </h2>
            <p className="font-body-md text-sm text-[#444748] leading-relaxed">
              Every single motif across our collections begins as a hand-chiseled teak wood block in the artisan villages of Sanganer and Bagru. Hand-stamped onto airy mulmuls and raw silks with natural non-toxic plant pigments.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div>
                <span className="block font-headline-md text-2xl text-primary font-bold">100%</span>
                <span className="font-label-xs text-[10px] text-[#444748] uppercase tracking-wider font-semibold">
                  Natural Pigments
                </span>
              </div>
              <div className="w-px h-10 bg-[#c4c7c7]"></div>
              <div>
                <span className="block font-headline-md text-2xl text-primary font-bold">48+</span>
                <span className="font-label-xs text-[10px] text-[#444748] uppercase tracking-wider font-semibold">
                  Artisan Families
                </span>
              </div>
              <div className="w-px h-10 bg-[#c4c7c7]"></div>
              <div>
                <span className="block font-headline-md text-2xl text-primary font-bold">Zero</span>
                <span className="font-label-xs text-[10px] text-[#444748] uppercase tracking-wider font-semibold">
                  Plastic Polymers
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden bg-[#efeeeb] shadow-md">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3wb8vVvbiQcuzofUAm8rAJnzeAXUx5l506Y90Dm8-OmAtp6IDHE9uQL1Pm2554FoaDJczWrjk8qgxxjKEoLl5rHBHtf6jUV8MYPfVMFmSG6jXVlLJaWPfl7k_XV0AP6VyUKYlCh40rgvc2cFf2P603RM75LPCXTvrNTc2Z5kmA5dYgPBSLocT_2JdvLckqjEpyOoJ3VvVUW170IKtTz8IZcwHB3gxKeCy1YNaJ2Uy_TrrlAP6jVQH"
              alt="Elderly Indian master woodblock artisan stamping intricate floral motifs"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
