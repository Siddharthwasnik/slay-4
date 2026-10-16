import React from 'react';

interface ScreenSwitcherProps {
  currentScreen: 'home' | 'shop-all' | 'pdp' | 'bag';
  onSwitchScreen: (screen: 'home' | 'shop-all' | 'pdp' | 'bag') => void;
  cartCount: number;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSwitchScreen,
  cartCount,
}) => {
  const screens = [
    { id: 'home' as const, label: 'Screen 1: Home', icon: 'home', desc: 'Midnight Euphoria & Edits' },
    { id: 'shop-all' as const, label: 'Screen 2: Collections', icon: 'grid_view', desc: 'Shop All & Filters' },
    { id: 'pdp' as const, label: 'Screen 3: Product Detail', icon: 'apparel', desc: 'Chaahvi Corset Kurti Set' },
    { id: 'bag' as const, label: `Screen 4: Bag & Checkout (${cartCount})`, icon: 'shopping_bag', desc: 'Bag & Instant UPI Pay' },
  ];

  return (
    <aside aria-label="Screen Navigation" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1b1c1a]/95 text-white backdrop-blur-md px-3 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-1.5 max-w-[95vw] overflow-x-auto no-scrollbar">
      <span className="text-[10px] uppercase font-bold tracking-widest text-[#fe8357] px-2 hidden sm:inline-block">
        Screens:
      </span>
      {screens.map((s) => {
        const isActive = currentScreen === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSwitchScreen(s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${
              isActive
                ? 'bg-white text-black font-bold shadow-md scale-105'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title={s.desc}
          >
            <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        );
      })}
    </aside>
  );
};
