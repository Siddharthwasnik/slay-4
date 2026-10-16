import React from 'react';
import { Product } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className="bg-[#fbf9f6] w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between border-l border-[#eae8e5] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#eae8e5]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">favorite</span>
              <h3 className="font-headline-md text-xl text-primary font-serif">
                Your Wishlist ({wishlist.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#eae8e5] flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto space-y-4 pr-1">
            {wishlist.length > 0 ? (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl bg-white border border-[#eae8e5] shadow-sm relative group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-20 h-26 object-cover rounded-lg bg-[#eae8e5] cursor-pointer hover:opacity-90"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="font-headline-sm text-sm text-primary font-bold line-clamp-1 cursor-pointer hover:text-secondary"
                      >
                        {product.name}
                      </h4>
                      <span className="text-xs text-[#444748]">{product.category}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-outline line-through">
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(product, product.sizes?.[0] || 'M');
                          onRemoveFromWishlist(product.id);
                        }}
                        className="flex-1 py-1 px-3 rounded-full bg-primary text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1c1b1b] transition-all flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                        <span>Move to Bag</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="w-8 h-8 rounded-full bg-[#f5f3f0] hover:text-error flex items-center justify-center transition-colors text-outline"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-[#444748] space-y-3">
                <span className="material-symbols-outlined text-4xl text-outline">favorite_border</span>
                <p className="text-sm">Your wishlist is currently empty.</p>
                <p className="text-xs text-outline">Save your dream festive silhouettes to view them anytime.</p>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#eae8e5] text-primary text-xs uppercase tracking-wider font-bold hover:bg-primary hover:text-white transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
