import React from 'react';
import { Leaf, Zap, Smartphone, Headphones, ShieldCheck, Sparkles } from 'lucide-react';
import { SafeImage } from './SafeImage';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 'feat-1',
      title: 'Quality Ingredients',
      icon: Leaf,
      description: '100% Farm Fresh',
    },
    {
      id: 'feat-2',
      title: 'Fast Delivery',
      icon: Zap,
      description: 'Under 25 Minutes',
    },
    {
      id: 'feat-3',
      title: 'Easy Ordering',
      icon: Smartphone,
      description: 'In 3 Simple Taps',
    },
    {
      id: 'feat-4',
      title: '24/7 Support',
      icon: Headphones,
      description: 'Live Concierge',
    },
  ];

  return (
    <section id="why-choose-us-section" className="py-16 sm:py-20 bg-[#06261C] text-white relative overflow-hidden border-b border-white/10">
      {/* Subtle background glow */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Plate of Fresh Pasta Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px]">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-full border border-emerald-500/20" />
              
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-[#0B3326] bg-[#041F16]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=800&q=80"
                  alt="Fresh Delicious Pasta Dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating ingredient tags */}
              <div className="absolute top-4 -right-2 bg-[#031A13]/95 backdrop-blur-md border border-emerald-600/40 text-xs px-3.5 py-1.5 rounded-full text-emerald-300 font-semibold shadow-xl">
                🌱 100% Organic Herbs
              </div>
              <div className="absolute bottom-6 -left-2 bg-[#031A13]/95 backdrop-blur-md border border-[#FF8A00]/40 text-xs px-3.5 py-1.5 rounded-full text-[#FF8A00] font-semibold shadow-xl">
                ✨ Handcrafted Daily
              </div>
            </div>
          </div>

          {/* Right: Copy & 4 Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-heading font-extrabold text-emerald-400 tracking-widest uppercase flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full inline-block" />
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
                Fresh Food, Better Life
              </h2>
            </div>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              At webbiralfood.com, we serve more than just food — we deliver extraordinary dining moments. Every dish is prepared to order with farm-to-table freshness, balanced nutrition, and chef craftsmanship.
            </p>

            {/* 4 Circular Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-3">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className="flex flex-col items-center justify-center text-center p-4 sm:p-5 rounded-3xl bg-[#0B3326]/80 border border-emerald-800/60 hover:border-[#FF8A00]/60 transition-all hover:-translate-y-1 duration-300 shadow-md h-full min-h-[140px]"
                  >
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl border border-[#FF8A00]/60 bg-[#06261C] flex items-center justify-center text-[#FF8A00] mb-3 shadow-lg shadow-orange-500/10">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-heading font-bold text-white leading-tight">
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-1 font-medium">{feat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
