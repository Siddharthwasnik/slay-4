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
    { id: 'home' as const, label: 'Home', fullLabel: 'Screen 1: Home', icon: 'home', desc: 'Midnight Euphoria & Edits' },
    { id: 'shop-all' as const, label: 'Shop All', fullLabel: 'Screen 2: Collections', icon: 'grid_view', desc: 'Shop All & Filters' },
    { id: 'pdp' as const, label: 'Chaahvi Set', fullLabel: 'Screen 3: Product Detail', icon: 'apparel', desc: 'Chaahvi Corset Kurti Set' },
    { id: 'bag' as const, label: `Bag (${cartCount})`, fullLabel: `Screen 4: Bag & Checkout (${cartCount})`, icon: 'shopping_bag', desc: 'Bag & Instant UPI Pay' },
  ];

  return (
    <>
      {/* MOBILE BOTTOM NAVIGATION BAR (Thumb Zone, Pattern 1) */}
      <nav
        aria-label="Mobile Navigation Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fbf9f6]/95 backdrop-blur-md border-t border-[#eae8e5] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]"
      >
        <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto px-2">
          {screens.map((s) => {
            const isActive = currentScreen === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSwitchScreen(s.id)}
                className={`relative flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-colors select-none ${
                  isActive ? 'text-secondary font-bold' : 'text-[#747878] hover:text-[#1b1c1a]'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span className={`material-symbols-outlined text-[22px] transition-transform ${isActive ? 'scale-110' : ''}`}>
                    {s.icon}
                  </span>
                  {s.id === 'bag' && cartCount > 0 && (
                    <span className="absolute -top-1 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-secondary text-white text-[9px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                  {s.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-secondary" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* DESKTOP PERSISTENT SCREEN SWITCHER PILL DOCK */}
      <aside
        aria-label="Desktop Screen Navigation"
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1b1c1a]/95 text-white backdrop-blur-md px-3 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 items-center gap-1.5 max-w-[95vw]"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#fe8357] px-2">
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
              <span>{s.fullLabel}</span>
            </button>
          );
        })}
      </aside>
    </>
  );
};
