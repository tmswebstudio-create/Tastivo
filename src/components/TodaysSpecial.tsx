import React, { useState } from 'react';
import { ArrowRight, Star, ShoppingBag, Check, Eye, Heart, Clock, Flame } from 'lucide-react';
import { TODAYS_SPECIALS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { FoodItem } from '../types';
import { SafeImage } from './SafeImage';

export const TodaysSpecial: React.FC = () => {
  const { addToCart, setSelectedProduct, toggleFavorite, isFavorite } = useCart();
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const handleQuickAdd = (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation();
    addToCart(item, 1);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handleToggleFav = (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation();
    toggleFavorite(item.id, item.name);
  };

  return (
    <section id="todays-special-section" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-heading font-extrabold text-[#FF8A00] tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 bg-[#FF8A00] rounded-full inline-block" />
              CHEF'S SIGNATURE PICKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Today's Specials
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Freshly prepared with artisanal perfection. Handcrafted daily by our master culinary team.
            </p>
          </div>

          <a
            href="#explore-menu-section"
            className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#06261C] hover:text-[#FF8A00] transition-colors group bg-slate-50 px-5 py-2.5 rounded-full border border-slate-200 shadow-sm"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TODAYS_SPECIALS.map((dish) => {
            const favorited = isFavorite(dish.id);
            return (
              <div
                key={dish.id}
                id={`special-card-${dish.id}`}
                onClick={() => setSelectedProduct(dish)}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#06261C]/40 p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-full relative"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-100 shadow-inner">
                    <SafeImage
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-[#FF8A00] to-[#FF7000] text-slate-950 text-[10px] font-heading font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {dish.badge || 'Chef Special'}
                    </span>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => handleToggleFav(e, dish)}
                      aria-label="Save to favorites"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          favorited ? 'fill-rose-500 text-rose-500 scale-110' : 'hover:scale-110'
                        }`}
                      />
                    </button>

                    {/* Quick View Hover Overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-slate-900 text-xs font-heading font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-[#06261C]" /> Quick Details
                      </span>
                    </div>
                  </div>

                  {/* Rating & Prep Time */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#FF8A00] text-[#FF8A00]" />
                      <span className="text-xs font-heading font-bold text-slate-900">{dish.rating}</span>
                      <span className="text-[11px] text-slate-500">({dish.reviewCount})</span>
                    </div>

                    {dish.prepTime && (
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>{dish.prepTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Dish Name & Description */}
                  <h3 className="text-base font-heading font-bold text-slate-950 group-hover:text-[#06261C] transition-colors leading-snug">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed min-h-[36px]">
                    {dish.description}
                  </p>
                </div>

                {/* Price & Add to Cart */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-lg font-heading font-extrabold text-slate-950">
                      ${dish.price.toFixed(2)}
                    </span>
                    {dish.calories && (
                      <span className="block text-[10px] text-slate-500 font-medium">
                        {dish.calories} kcal
                      </span>
                    )}
                  </div>

                  <button
                    id={`add-to-cart-${dish.id}`}
                    onClick={(e) => handleQuickAdd(e, dish)}
                    className={`text-xs font-heading font-bold px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer ${
                      addedItems[dish.id]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#06261C] hover:bg-[#0a3628] text-white hover:text-[#FF8A00]'
                    }`}
                  >
                    {addedItems[dish.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#FF8A00]" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
