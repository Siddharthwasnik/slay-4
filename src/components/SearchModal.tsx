import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 6);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div 
        className="bg-[#fbf9f6] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4 border border-[#eae8e5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#eae8e5]">
          <div className="flex items-center gap-3 w-full">
            <span className="material-symbols-outlined text-[24px] text-[#444748]">search</span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kurtis, corset tops, co-ords, linen pants..."
              className="w-full bg-transparent text-lg text-primary outline-none placeholder:text-outline font-sans"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eae8e5] flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all ml-2"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Quick searches */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-outline uppercase text-[10px] font-bold">Trending:</span>
          {['Chaahvi Set', 'Corset Kurti', 'Halter Top', 'Linen Pants', 'Navratri'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded-full bg-[#f5f3f0] hover:bg-[#eae8e5] text-[#1b1c1a] font-medium"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#efeeeb] pr-1">
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center gap-4 hover:bg-[#f5f3f0] px-2 rounded-lg cursor-pointer transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-18 object-cover rounded-md bg-[#eae8e5] shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-primary">{product.name}</h4>
                  <span className="text-xs text-[#444748]">{product.category} • {product.sku}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-outline line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-outline">arrow_forward</span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-[#444748] text-sm">
              No garments found matching "{query}". Try browsing Shop All.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
