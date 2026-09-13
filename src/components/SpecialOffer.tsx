import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Sparkles, Tag, Flame, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const SpecialOffer: React.FC = () => {
  const { applyPromoCode, setIsCartOpen, showToast } = useCart();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAndClaim = () => {
    navigator.clipboard?.writeText('WEBBIAL20');
    applyPromoCode('WEBBIAL20');
    setIsCopied(true);
    showToast('Promo code WEBBIAL20 copied & applied! (20% off)');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleOrderNow = () => {
    applyPromoCode('WEBBIAL20');
    const menuEl = document.getElementById('explore-menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="special-offer-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-[#FF8A00] via-[#ea580c] to-[#d97706] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl relative border-2 border-[#FF8A00]/40">
        {/* Background decorative patterns */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-black/15 rounded-full blur-xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 lg:p-12 gap-8 relative z-10">
          {/* Left: Headline and Promo info */}
          <div className="lg:col-span-7 space-y-4 text-white">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-white text-xs font-heading font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>LIMITED TIME EXCLUSIVE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Get 20% Off <br />
              <span className="text-[#06261C] font-black">On Your First Order</span>
            </h2>

            <p className="text-white/90 text-sm sm:text-base max-w-lg font-medium leading-relaxed">
              Order your favorite gourmet meal now and enjoy an instant 20% discount plus free priority delivery to your doorstep.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-xs sm:text-sm font-semibold text-white/90">
                Use code at checkout:
              </span>
              <button
                id="promo-code-pill-btn"
                onClick={handleCopyAndClaim}
                className="bg-[#06261C] hover:bg-[#031A13] text-[#FF8A00] border border-white/30 px-4 py-2 rounded-2xl font-mono font-bold text-sm tracking-wider flex items-center gap-2 transition-all cursor-pointer group shadow-lg"
              >
                <Tag className="w-4 h-4 text-white" />
                <span>WEBBIAL20</span>
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-300 group-hover:text-white" />
                )}
              </button>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                id="special-offer-order-btn"
                onClick={handleOrderNow}
                className="bg-[#06261C] hover:bg-[#031A13] text-white font-heading font-extrabold px-7 py-3.5 rounded-full text-sm transition-all shadow-2xl flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Claim & Order Now</span>
                <ArrowRight className="w-4 h-4 text-[#FF8A00]" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-xs font-heading font-bold text-slate-950 underline underline-offset-4 hover:text-white transition-colors"
              >
                View Your Cart
              </button>
            </div>
          </div>

          {/* Right: Appetizing Burger, Fries & Sauces spread */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 bg-black/20">
              <SafeImage
                src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=700&q=80"
                alt="Gourmet Burger, Fries & Drinks Feast"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-[#06261C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-[#FF8A00] text-[11px] font-heading font-bold flex items-center gap-1.5 shadow-lg">
                <Flame className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Instant Auto-Discount</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
