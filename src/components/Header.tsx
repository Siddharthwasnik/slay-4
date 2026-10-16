import React from 'react';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eae8e5]/60">
      <div className="h-44 flex flex-col justify-between max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top announcement & quick utilities */}
        <div className="h-8 flex items-center justify-between text-[#444748] font-label-xs text-[10px] uppercase tracking-widest pt-2">
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
                    alert('Link copied to clipboard!');
                  }
                }}
                className="hover:text-primary transition-colors flex items-center"
                title="Share Slayvana"
              >
                <span className="material-symbols-outlined text-[16px] text-[#444748] hover:text-[#1b1c1a]">share</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Shipping across India & International destinations')}
                className="hover:text-primary transition-colors flex items-center"
                title="Currency & Destination: INR (India)"
              >
                <span className="material-symbols-outlined text-[16px] text-[#444748] hover:text-[#1b1c1a]">public</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenSearch}
                className="text-[#1b1c1a] hover:text-secondary transition-colors flex items-center"
                title="Search garments"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
              </button>

              <button
                type="button"
                onClick={onOpenWishlist}
                className="relative text-[#1b1c1a] hover:text-secondary transition-colors flex items-center"
                title="Wishlist"
              >
                <span className="material-symbols-outlined text-[18px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-secondary text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => alert('Atelier Concierge: iamsiddharthwasnik@gmail.com')}
                className="text-[#1b1c1a] hover:text-secondary transition-colors flex items-center"
                title="Account"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateScreen('bag')}
                className={`flex items-center gap-1 transition-colors px-2 py-0.5 rounded-full ${
                  currentScreen === 'bag' ? 'bg-[#1b1c1a] text-white' : 'text-[#1b1c1a] hover:text-secondary'
                }`}
                title="Shopping Bag"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span className="font-label-md text-label-md font-bold">({cartCount})</span>
              </button>

              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:opacity-90">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Monogram / Masthead */}
        <div className="h-20 flex items-center justify-center">
          <button
            type="button"
            onClick={() => onNavigateScreen('home')}
            className="font-headline-lg text-[32px] md:text-[38px] tracking-[0.25em] text-primary uppercase select-none hover:opacity-90 transition-opacity focus:outline-none"
          >
            SLAYVANA
          </button>
        </div>

        {/* Bottom category navigation ribbon */}
        <div className="h-16 flex items-center justify-center overflow-x-auto no-scrollbar pb-1">
          <nav className="flex items-center gap-2 py-1">
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
                  className={`px-4 py-1.5 rounded-full font-label-md text-label-md tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
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
