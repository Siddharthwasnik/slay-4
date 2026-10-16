import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { HomeScreen } from './views/HomeScreen';
import { ShopAllScreen } from './views/ShopAllScreen';
import { ProductDetailScreen } from './views/ProductDetailScreen';
import { BagCheckoutScreen } from './views/BagCheckoutScreen';
import { PRODUCTS, Product, CartItem } from './data/products';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'shop-all' | 'pdp' | 'bag'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Default selected product for PDP is the Chaahvi Corset Set from Screen 1
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    PRODUCTS.find((p) => p.id === 'chaahvi-corset-set') || PRODUCTS[0]
  );

  // Initial Cart with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('slayvana_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        product: PRODUCTS.find((p) => p.id === 'chaahvi-corset-set') || PRODUCTS[0],
        size: 'M (38)',
        color: 'Raw Ivory',
        quantity: 1,
      },
      {
        product: PRODUCTS.find((p) => p.id === 'diya-halter-top') || PRODUCTS[2],
        size: 'S (36)',
        color: 'Vermillion Rust',
        quantity: 1,
      },
    ];
  });

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('slayvana_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      PRODUCTS.find((p) => p.id === 'chunar-bralette') || PRODUCTS[1],
    ];
  });

  // Persist cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('slayvana_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('slayvana_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const handleClearCart = () => {
    setCart([]);
  };

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Scroll to top whenever screen changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleNavigateScreen = (screen: 'home' | 'shop-all' | 'pdp' | 'bag', category?: string) => {
    if (category) {
      setActiveCategory(category);
    }
    setCurrentScreen(screen);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('pdp');
  };

  const handleAddToCart = (product: Product, size = 'M', color = 'Raw Ivory') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, color, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveToWishlist = (cartItem: CartItem) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === cartItem.product.id)) return prev;
      return [...prev, cartItem.product];
    });
    setCart((prev) => prev.filter((item) => item !== cartItem));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistIds = wishlist.map((p) => p.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f6] text-[#1b1c1a] antialiased">
      {/* Top Main Navigation Header */}
      <Header
        currentScreen={currentScreen}
        activeCategory={activeCategory}
        onNavigateScreen={handleNavigateScreen}
        cartCount={cartTotalItems}
        wishlistCount={wishlist.length}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full pt-24 md:pt-44 pb-32 md:pb-12">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigateScreen={handleNavigateScreen}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentScreen === 'shop-all' && (
          <ShopAllScreen
            initialCategory={activeCategory}
            onNavigateScreen={handleNavigateScreen}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentScreen === 'pdp' && (
          <ProductDetailScreen
            product={selectedProduct}
            onNavigateScreen={handleNavigateScreen}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentScreen === 'bag' && (
          <BagCheckoutScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onMoveToWishlist={handleMoveToWishlist}
            onNavigateScreen={handleNavigateScreen}
            onAddToCart={handleAddToCart}
            onClearCart={handleClearCart}
          />
        )}
      </main>

      {/* Brand Footer */}
      <Footer onNavigateScreen={handleNavigateScreen} />

      {/* Persistent Quick Screen Switcher Pill Dock */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSwitchScreen={(screen) => setCurrentScreen(screen)}
        cartCount={cartTotalItems}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}
