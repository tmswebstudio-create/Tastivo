import React, { useState, useMemo } from 'react';
import { Plus, Check, Star, Filter, Sparkles, ArrowRight, Search, Heart, Clock, SlidersHorizontal, Leaf, X, LayoutGrid, List } from 'lucide-react';
import { ALL_MENU_ITEMS, TODAYS_SPECIALS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { FoodItem } from '../types';
import { SafeImage } from './SafeImage';

export const ExploreMenu: React.FC = () => {
  const { activeCategory, setActiveCategory, addToCart, setSelectedProduct, searchQuery, setSearchQuery, isFavorite, toggleFavorite } = useCart();
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'prepTime'>('featured');
  const [vegOnly, setVegOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'Healthy Bowls', 'Salad', 'Drinks', 'Desserts'];

  // Combine menu items and deduplicate if necessary
  const allDishes = useMemo(() => {
    const combined = [...ALL_MENU_ITEMS, ...TODAYS_SPECIALS];
    const map = new Map<string, FoodItem>();
    combined.forEach((item) => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    });
    return Array.from(map.values());
  }, []);

  // Filter and sort items
  const filteredDishes = useMemo(() => {
    let result = allDishes.filter((dish) => {
      const matchesCategory =
        activeCategory === 'All' ||
        dish.category.toLowerCase().includes(activeCategory.toLowerCase());
      const matchesSearch =
        !searchQuery ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !vegOnly || dish.isVegetarian === true;
      return matchesCategory && matchesSearch && matchesVeg;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'prepTime') {
      result.sort((a, b) => {
        const timeA = parseInt(a.prepTime || '30');
        const timeB = parseInt(b.prepTime || '30');
        return timeA - timeB;
      });
    }

    return result;
  }, [allDishes, activeCategory, searchQuery, vegOnly, sortBy]);

  const handleAddDish = (e: React.MouseEvent, dish: FoodItem) => {
    e.stopPropagation();
    addToCart(dish, 1);
    setAddedItemIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  const handleToggleFav = (e: React.MouseEvent, dish: FoodItem) => {
    e.stopPropagation();
    toggleFavorite(dish.id, dish.name);
  };

  return (
    <section id="explore-menu-section" className="py-16 sm:py-24 bg-[#F8F8F5] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-heading font-extrabold text-[#06261C] tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 bg-[#FF8A00] rounded-full inline-block" />
              EXPLORE OUR KITCHEN
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Delicious Menu
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              From gourmet chef burgers to wood-fired artisan pizza and wholesome bowls — curated for pure delight.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
              Showing <strong className="text-slate-900">{filteredDishes.length}</strong> delicious meals
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm mb-8 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#06261C] text-[#FF8A00] shadow-md shadow-emerald-950/20'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-950'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: Search, Veg Toggle, Sorting & View Mode */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            {/* In-Menu Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish, ingredient or keyword..."
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#06261C]/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Veg Toggle */}
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-heading font-bold border transition-colors cursor-pointer ${
                  vegOnly
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-600'
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vegetarian Only</span>
              </button>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-heading font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Top Rated ★</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="prepTime">Fastest Delivery</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4 text-[#FF8A00]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-heading font-bold text-slate-900">No dishes match your filters</h3>
            <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
              Try adjusting your search query, selecting another category, or turning off the vegetarian filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setVegOnly(false);
                setSortBy('featured');
              }}
              className="mt-4 px-5 py-2.5 bg-[#06261C] text-[#FF8A00] rounded-full text-xs font-heading font-bold shadow-md hover:bg-[#093325] transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Layout (2 cols on md, 3 cols on lg) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const isAdded = addedItemIds[dish.id];
              const favorited = isFavorite(dish.id);

              return (
                <div
                  key={dish.id}
                  id={`menu-item-${dish.id}`}
                  onClick={() => setSelectedProduct(dish)}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#06261C]/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-full group relative"
                >
                  <div>
                    {/* Dish Image */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3.5 bg-slate-100 shadow-inner">
                      <SafeImage
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Dietary / Special Tag */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        {dish.isVegetarian && (
                          <span className="bg-emerald-700 text-white text-[9px] font-heading font-extrabold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                            <Leaf className="w-2.5 h-2.5" /> Veg
                          </span>
                        )}
                        {dish.isSpecial && (
                          <span className="bg-[#FF8A00] text-slate-950 text-[9px] font-heading font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                            Special
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => handleToggleFav(e, dish)}
                        aria-label="Toggle favorite"
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            favorited ? 'fill-rose-500 text-rose-500 scale-110' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Rating & Prep Time Bar */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#FF8A00] text-[#FF8A00]" />
                        <span className="text-xs font-heading font-bold text-slate-900">{dish.rating}</span>
                        <span className="text-[10px] text-slate-500">({dish.reviewCount})</span>
                      </div>

                      {dish.prepTime && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>{dish.prepTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Dish Title & Description */}
                    <h3 className="text-base font-heading font-bold text-slate-950 group-hover:text-[#06261C] transition-colors leading-snug truncate">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed min-h-[36px]">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-heading font-extrabold text-slate-950">
                        ${dish.price.toFixed(2)}
                      </span>
                      {dish.calories && (
                        <span className="block text-[10px] text-slate-500 font-medium">
                          {dish.calories} kcal
                        </span>
                      )}
                    </div>

                    <button
                      id={`menu-add-btn-${dish.id}`}
                      onClick={(e) => handleAddDish(e, dish)}
                      aria-label={`Add ${dish.name} to cart`}
                      className={`px-4 py-2 rounded-full text-xs font-heading font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white scale-105'
                          : 'bg-[#06261C] hover:bg-[#0a3a2a] text-white hover:text-[#FF8A00] active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#FF8A00]" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDishes.map((dish) => {
              const isAdded = addedItemIds[dish.id];

              return (
                <div
                  key={dish.id}
                  id={`menu-item-list-${dish.id}`}
                  onClick={() => setSelectedProduct(dish)}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#06261C]/40 p-3.5 sm:p-4 flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <SafeImage
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm sm:text-base font-heading font-bold text-slate-950 group-hover:text-[#06261C] transition-colors truncate">
                        {dish.name}
                      </h3>
                      {dish.isVegetarian && (
                        <Leaf className="w-3 h-3 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {dish.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-sm sm:text-base font-heading font-extrabold text-slate-950">
                        ${dish.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Star className="w-3 h-3 fill-[#FF8A00] text-[#FF8A00]" />
                        <span className="font-bold text-slate-800">{dish.rating}</span>
                      </div>
                      {dish.prepTime && (
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                          {dish.prepTime}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    id={`menu-add-list-${dish.id}`}
                    onClick={(e) => handleAddDish(e, dish)}
                    aria-label={`Add ${dish.name} to cart`}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white scale-110'
                        : 'bg-[#06261C] hover:bg-[#0a3a2a] text-white active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#FF8A00]" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
