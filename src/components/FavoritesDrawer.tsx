import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ALL_MENU_ITEMS, TODAYS_SPECIALS } from '../data/mockData';
import { SafeImage } from './SafeImage';

export const FavoritesDrawer: React.FC = () => {
  const {
    favorites,
    isFavoritesOpen,
    setIsFavoritesOpen,
    toggleFavorite,
    addToCart,
    setSelectedProduct,
  } = useCart();

  if (!isFavoritesOpen) return null;

  const allItems = [...TODAYS_SPECIALS, ...ALL_MENU_ITEMS];
  const favoriteItems = allItems.filter((item, index, self) => 
    favorites.includes(item.id) && self.findIndex(t => t.id === item.id) === index
  );

  return (
    <div
      id="favorites-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end"
      onClick={() => setIsFavoritesOpen(false)}
    >
      <div
        id="favorites-drawer-container"
        className="w-full max-w-md bg-[#06261C] text-white h-full shadow-2xl flex flex-col justify-between border-l border-emerald-800/40 relative animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-emerald-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">Your Saved Favorites</h3>
              <p className="text-xs text-slate-300">
                {favoriteItems.length} {favoriteItems.length === 1 ? 'dish' : 'dishes'} saved
              </p>
            </div>
          </div>

          <button
            id="favorites-close-btn"
            onClick={() => setIsFavoritesOpen(false)}
            aria-label="Close favorites"
            className="w-8 h-8 rounded-full bg-[#0e3629] hover:bg-emerald-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Favorite Dishes List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-emerald-950/80">
          {favoriteItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#0a2e22] text-rose-400/60 mx-auto flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-slate-200 font-semibold text-sm">No favorite dishes saved yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Tap the heart icon on any dish across our menu to quickly re-order anytime!
              </p>
              <button
                onClick={() => {
                  setIsFavoritesOpen(false);
                  document.getElementById('explore-menu-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs transition-colors"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            favoriteItems.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-xl overflow-hidden border border-emerald-800/60 shrink-0 bg-slate-900 cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(item);
                    setIsFavoritesOpen(false);
                  }}
                >
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-xs sm:text-sm font-bold text-white truncate cursor-pointer hover:text-[#FF8A00]"
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsFavoritesOpen(false);
                    }}
                  >
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 truncate">{item.category}</p>
                  <p className="text-xs font-bold text-[#FF8A00] mt-0.5">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Actions: Add to Cart + Remove Favorite */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="p-2 rounded-xl bg-[#0e3629] hover:bg-[#FF8A00] hover:text-slate-950 text-white transition-all shadow-sm flex items-center gap-1 text-xs font-semibold"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                  <button
                    onClick={() => toggleFavorite(item.id, item.name)}
                    className="w-8 h-8 rounded-xl bg-[#0a2e22] hover:bg-rose-900/60 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoriteItems.length > 0 && (
          <div className="p-5 bg-[#031A13] border-t border-emerald-900/60 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-300">
              {favoriteItems.length} items ready to order
            </span>
            <button
              onClick={() => {
                favoriteItems.forEach((item) => addToCart(item, 1));
                setIsFavoritesOpen(false);
              }}
              className="bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>Add All to Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
