import React from 'react';
import { ArrowRight, Award, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const AboutStory: React.FC = () => {
  const { setIsStoryVideoOpen } = useCart();

  return (
    <section id="about-section" className="py-16 sm:py-20 bg-[#06261C] text-white relative overflow-hidden border-b border-white/10">
      {/* Decorative ambient lighting */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-heading font-extrabold text-emerald-400 tracking-widest uppercase flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full inline-block" />
                ABOUT OUR CULINARY JOURNEY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
                Crafting Delicious <br />
                Moments Every Day
              </h2>
            </div>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              At webbiralfood.com, we believe food is more than nourishment — it is joy and connection. We bring together organic farm produce, world-class chefs, and fiery dedication to serve you pure deliciousness.
            </p>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-[#0B3326]/80 p-4 rounded-2xl border border-emerald-800/60 h-full">
                <Award className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-white">Award-Winning Recipes</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5 font-medium">Crafted by culinary masters</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#0B3326]/80 p-4 rounded-2xl border border-emerald-800/60 h-full">
                <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-white">Ethically Sourced</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5 font-medium">Local organic farms</p>
                </div>
              </div>
            </div>

            {/* Our Story Button */}
            <div className="pt-2">
              <button
                id="about-our-story-btn"
                onClick={() => setIsStoryVideoOpen(true)}
                className="inline-flex items-center gap-2 bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-heading font-extrabold px-7 py-3.5 rounded-full text-sm transition-all shadow-xl shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Chef Plating Image with Floating Handwritten Script Badge */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-800/50 bg-[#041F16]">
              <SafeImage
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80"
                alt="Chef Crafting Signature Gourmet Dish"
                className="w-full h-full object-cover"
              />

              {/* Gradient Dark Overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating "Freshly Cooked with Love" script badge in corner */}
              <div className="absolute top-4 right-4 bg-[#031A13]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-400/40 text-center shadow-2xl">
                <span className="font-script text-[#FF8A00] text-xl sm:text-2xl font-bold leading-none block">
                  Freshly Cooked
                </span>
                <span className="font-script text-white text-lg sm:text-xl font-medium leading-none block">
                  with Love ❤️
                </span>
              </div>

              {/* Bottom Kitchen Tag */}
              <div className="absolute bottom-4 left-4 bg-[#031A13]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                ✨ Live Kitchen Hygiene Standard A+
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
