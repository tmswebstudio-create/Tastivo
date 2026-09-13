import React from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const PopularCategories: React.FC = () => {
  const { setActiveCategory, activeCategory } = useCart();

  const handleSelectCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    const menuEl = document.getElementById('explore-menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-16 sm:py-20 bg-[#F8F8F5] text-slate-900 relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-heading font-extrabold text-[#06261C] tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 bg-[#FF8A00] rounded-full inline-block" />
              OUR SPECIALTIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-950 tracking-tight">
              Popular Categories
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Explore our most loved food categories made fresh daily with organic locally-sourced ingredients.
            </p>
          </div>

          <button
            id="categories-view-all-btn"
            onClick={() => handleSelectCategory('All')}
            className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#06261C] hover:text-[#FF8A00] transition-colors group cursor-pointer bg-white px-5 py-2.5 rounded-full border border-slate-300 shadow-sm"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => handleSelectCategory(cat.name)}
                className={`group bg-white border rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer relative h-full min-h-[240px] sm:min-h-[260px] ${
                  isSelected
                    ? 'border-[#FF8A00] ring-2 ring-[#FF8A00]/30 shadow-lg bg-gradient-to-b from-white to-amber-50/20'
                    : 'border-slate-200 hover:border-[#06261C]/40 shadow-sm'
                }`}
              >
                {/* Image Circle Container */}
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 shadow-md group-hover:scale-105 transition-transform duration-300 p-1 bg-slate-50 border border-slate-200">
                    <SafeImage
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base font-heading font-bold text-slate-950 group-hover:text-[#06261C] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Small Action Arrow */}
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#FF8A00] group-hover:text-slate-950 flex items-center justify-center text-slate-700 transition-colors duration-300 mt-4">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
