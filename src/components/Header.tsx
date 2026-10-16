import React, { useState } from 'react';

interface HeaderProps {
  currentScreen: 'home' | 'shop-all' | 'pdp' | 'bag';
  activeCategory: string;
  onNavigateScreen: (screen: 'home' | 'shop-all' | 'pdp' | 'bag', category?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  activeCategory,
  onNavigateScreen,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenWishlist,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const navItems = [
    { label: 'New In', path: 'new-in' },
    { label: 'Shop All', path: 'shop-all' },
    { label: 'Kurti', path: 'kurti' },
    { label: 'Trending', path: 'trending' },
    { label: 'Tops', path: 'tops' },
    { label: 'Bottom', path: 'bottom' },
    { label: 'Festive Edit', path: 'festive-edit' },
    { label: 'Lookbook', path: 'lookbook' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eae8e5]/80">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1a] text-white px-4 py-1.5 rounded-full text-xs font-label-md shadow-lg animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px] text-secondary">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* DESKTOP TOP UTILITY BAR (Hidden on mobile) */}
      <div className="hidden md:block border-b border-[#eae8e5]/50">
        <div className="h-8 flex items-center justify-between text-[#444748] font-label-xs text-[10px] uppercase tracking-widest max-w-7xl mx-auto px-6 lg:px-12">
          <span className="font-semibold tracking-[0.2em]">YOU know where to GET IT</span>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'Slayvana', url: window.location.href }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Link copied to clipboard!');
                  }
                }}
                className="hover:text-primary transition-colors flex items-center p-1"
                title="Share Slayvana"
              >
                <span className="material-symbols-outlined text-[16px] text-[#444748] hover:text-[#1b1c1a]">share</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Shipping across India & International destinations')}
                className="hover:text-primary transition-colors flex items-center p-1"
                title="Currency & Destination: INR (India)"
              >
                <span className="material-symbols-outlined text-[16px] text-[#444748] hover:text-[#1b1c1a]">public</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => showToast('Atelier Concierge: iamsiddharthwasnik@gmail.com')}
                className="text-[#1b1c1a] hover:text-secondary transition-colors flex items-center text-xs"
                title="Account"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER CONTAINER: Compact 56px on mobile, spacious on desktop */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        <div className="h-14 md:h-20 flex items-center justify-between">
          {/* Mobile Quick Action / Search */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-10 h-10 min-w-[40px] flex items-center justify-center text-[#1b1c1a] hover:text-secondary transition-colors rounded-full active:bg-[#eae8e5]"
              title="Search garments"
              aria-label="Search garments"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
          </div>

          {/* Central Monogram / Masthead */}
          <div className="flex-1 md:flex-none flex items-center justify-center md:justify-start px-1">
            <button
              type="button"
              onClick={() => onNavigateScreen('home')}
              className="font-headline-lg text-xl sm:text-[28px] md:text-[36px] tracking-[0.16em] sm:tracking-[0.25em] text-primary uppercase select-none hover:opacity-90 transition-opacity focus:outline-none whitespace-nowrap"
            >
              SLAYVANA
            </button>
          </div>

          {/* Right Action Icons (with 44px touch targets on mobile) */}
          <div className="flex items-center gap-0.5 sm:gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              className="hidden md:flex w-10 h-10 items-center justify-center text-[#1b1c1a] hover:text-secondary transition-colors rounded-full"
              title="Search garments"
              aria-label="Search garments"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative w-11 h-11 flex items-center justify-center text-[#1b1c1a] hover:text-secondary transition-colors rounded-full active:bg-[#eae8e5]"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-1.5 w-4 h-4 rounded-full bg-secondary text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigateScreen('bag')}
              className={`relative min-h-[44px] flex items-center gap-1.5 transition-colors px-2.5 sm:px-3 py-1 rounded-full ${
                currentScreen === 'bag' ? 'bg-[#1b1c1a] text-white' : 'text-[#1b1c1a] hover:text-secondary active:bg-[#eae8e5]'
              }`}
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="font-label-md text-xs font-bold">({cartCount})</span>
            </button>

            <div className="hidden md:flex w-8 h-8 rounded-full bg-primary items-center justify-center text-white cursor-pointer hover:opacity-90 ml-1">
              <span className="material-symbols-outlined text-on-primary text-[16px]">person</span>
            </div>
          </div>
        </div>

        {/* Category Navigation Ribbon (Compact horizontal scroll on mobile, refined on desktop) */}
        <div className="h-10 md:h-14 flex items-center overflow-x-auto no-scrollbar pb-1">
          <nav className="flex items-center gap-1.5 sm:gap-2 py-0.5 mx-auto md:mx-0">
            {navItems.map((item) => {
              const isActive =
                (currentScreen === 'shop-all' && activeCategory === item.path) ||
                (currentScreen === 'home' && item.path === 'new-in' && activeCategory === 'new-in') ||
                (currentScreen === 'pdp' && item.path === 'kurti');

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => {
                    if (item.path === 'shop-all' || item.path === 'kurti' || item.path === 'tops' || item.path === 'bottom' || item.path === 'trending' || item.path === 'festive-edit') {
                      onNavigateScreen('shop-all', item.path);
                    } else if (item.path === 'lookbook') {
                      onNavigateScreen('home');
                      const el = document.getElementById('lookbook-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onNavigateScreen('home', item.path);
                    }
                  }}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-label-md text-[11px] sm:text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-[#f5f3f0] text-on-surface-variant hover:bg-[#eae8e5] hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
