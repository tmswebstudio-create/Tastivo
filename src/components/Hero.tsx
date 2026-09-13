import React, { useState } from 'react';
import { MapPin, Search, Clock, ShieldCheck, Utensils, Star, Flame, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const Hero: React.FC = () => {
  const { location, setLocation, searchQuery, setSearchQuery, setActiveCategory, showToast } = useCart();
  const [isChangingLoc, setIsChangingLoc] = useState(false);
  const [tempLoc, setTempLoc] = useState(location);
  const [heroSearch, setHeroSearch] = useState('');

  const quickCategories = [
    { name: 'Burgers', icon: '🍔' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Pasta', icon: '🍝' },
    { name: 'Healthy Bowls', icon: '🥗' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'Drinks', icon: '🥤' },
  ];

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempLoc.trim()) {
      setLocation(tempLoc.trim());
    }
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch.trim());
      showToast(`Searching "${heroSearch.trim()}" in our menu...`);
    } else {
      showToast(`Showing popular meals delivering to ${tempLoc}`);
    }
    setIsChangingLoc(false);
    const menuEl = document.getElementById('explore-menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectQuickCategory = (catName: string) => {
    setActiveCategory(catName);
    showToast(`Showing delicious ${catName}!`);
    const menuEl = document.getElementById('explore-menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative bg-gradient-to-b from-[#06261C] via-[#052017] to-[#031A13] text-white pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-white/10"
    >
      {/* Decorative ambient blurred gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF8A00]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative floating herb leaves */}
      <div className="absolute top-12 left-6 opacity-40 animate-pulse pointer-events-none">
        <span className="text-3xl">🌿</span>
      </div>
      <div className="absolute top-1/2 left-3 opacity-30 pointer-events-none transform -rotate-45">
        <span className="text-2xl">🍃</span>
      </div>
      <div className="absolute bottom-8 left-1/3 opacity-35 pointer-events-none">
        <span className="text-2xl">🌱</span>
      </div>
      <div className="absolute top-20 right-1/3 opacity-35 pointer-events-none">
        <span className="text-3xl">🍅</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Search/Order Bar & Quick Chips */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3326] border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>• GOOD FOOD • GOOD MOOD</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
                Delicious Food
              </h1>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-script text-[#FF8A00] italic font-semibold leading-none tracking-wide filter drop-shadow-md">
                Delivered to You
              </h2>
            </div>

            {/* Description Subtitle */}
            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Fresh ingredients, authentic chef-crafted recipes, and your favorite meals — delivered warm to your doorstep in 25 minutes.
            </p>

            {/* Prominent High-Conversion Food Search & Order Bar */}
            <div className="bg-[#0B3326] p-2 sm:p-2.5 rounded-3xl sm:rounded-full shadow-2xl border-2 border-emerald-600/40 max-w-xl backdrop-blur-md">
              <form
                id="hero-order-form"
                onSubmit={handleSearchOrder}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                {/* Location Picker */}
                <div className="flex items-center gap-2.5 px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-emerald-800/80 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#FF8A00]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#FF8A00]" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                      Deliver To
                    </span>
                    {isChangingLoc ? (
                      <input
                        type="text"
                        value={tempLoc}
                        onChange={(e) => setTempLoc(e.target.value)}
                        placeholder="Enter your address"
                        className="w-36 text-white text-xs font-semibold focus:outline-none bg-transparent border-b border-[#FF8A00] py-0.5"
                        autoFocus
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsChangingLoc(true)}
                        className="text-white text-xs font-bold hover:text-[#FF8A00] transition-colors truncate max-w-[140px] text-left block"
                      >
                        {location.split(',')[0]}
                      </button>
                    )}
                  </div>
                </div>

                {/* Food/Dish Search Input */}
                <div className="flex items-center gap-2 px-3 py-1.5 flex-1">
                  <Search className="w-4 h-4 text-emerald-400 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search burgers, pasta, bowls..."
                    className="w-full bg-transparent text-white text-xs placeholder:text-slate-400 font-medium focus:outline-none"
                  />
                </div>

                {/* Submit Find Food Button */}
                <button
                  id="hero-find-food-btn"
                  type="submit"
                  className="bg-gradient-to-r from-[#FF8A00] to-[#FF7000] hover:from-[#FF7000] hover:to-[#e66300] text-slate-950 font-heading font-extrabold px-6 py-3 rounded-2xl sm:rounded-full text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Quick Category Chips */}
            <div className="space-y-2 pt-1 max-w-xl">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Popular quick picks:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {quickCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleSelectQuickCategory(cat.name)}
                    className="px-3 py-1.5 rounded-full bg-[#0B3326] hover:bg-[#FF8A00] hover:text-slate-950 border border-emerald-700/60 text-xs font-semibold text-slate-200 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Value Props Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-xl border-t border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl border border-emerald-500/40 bg-[#0B3326] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#FF8A00]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-white leading-tight">25 Min Delivery</h4>
                  <p className="text-[10px] text-slate-300">Fast & Hot</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl border border-emerald-500/40 bg-[#0B3326] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-white leading-tight">100% Fresh</h4>
                  <p className="text-[10px] text-slate-300">Organic Produce</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl border border-emerald-500/40 bg-[#0B3326] flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4 text-[#FF8A00]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-white leading-tight">Master Chefs</h4>
                  <p className="text-[10px] text-slate-300">Gourmet Taste</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Circular Gourmet Dish Image with Accents */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] lg:w-[430px] lg:h-[430px]">
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/30 scale-105 animate-spin" style={{ animationDuration: '60s' }} />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FF8A00]/40 scale-110" />

              {/* Main Dish Image */}
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-[#0B3326] p-2 bg-[#041F16]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
                  alt="Delicious Healthy Gourmet Bowl"
                  className="w-full h-full rounded-full object-cover shadow-inner hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -bottom-3 -left-3 sm:left-1 bg-[#06261C]/95 backdrop-blur-md border border-emerald-600/50 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF8A00] to-amber-400 flex items-center justify-center text-slate-950 font-bold">
                  <Star className="w-5 h-5 fill-slate-950 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-heading font-extrabold text-white">4.9 / 5.0</span>
                    <span className="text-[10px] text-emerald-400">(2,450+ reviews)</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium">Loved by 50k+ Foodies</p>
                </div>
              </div>

              {/* Floating Offer Badge */}
              <div className="absolute -top-3 -right-2 bg-gradient-to-r from-[#FF8A00] to-[#FF7000] text-slate-950 font-heading font-extrabold px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 transform rotate-3">
                <Flame className="w-4 h-4 fill-slate-950" />
                <span className="text-xs uppercase tracking-wider">Free Delivery Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


