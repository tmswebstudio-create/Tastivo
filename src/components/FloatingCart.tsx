import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingCart: React.FC = () => {
  const { itemCount, subtotal, setIsCartOpen, lastAddedTimestamp } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating cart when scrolled down past 280px and cart has items
      if (window.scrollY > 280 && itemCount > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [itemCount]);

  useEffect(() => {
    if (lastAddedTimestamp > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 800);
      return () => clearTimeout(timer);
    }
  }, [lastAddedTimestamp]);

  if (!isVisible || itemCount === 0) return null;

  return (
    <div
      id="floating-sticky-cart-bar"
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
        isBouncing ? 'scale-105 shadow-2xl shadow-amber-500/40' : 'scale-100 shadow-xl shadow-black/40'
      }`}
    >
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center gap-3 bg-[#06261C] hover:bg-[#0a3528] border-2 border-[#FF8A00] text-white px-5 py-3.5 rounded-full backdrop-blur-md transition-all group cursor-pointer active:scale-95"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-[#FF8A00] text-slate-950 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5 text-slate-950" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-slate-950 text-[11px] font-black rounded-full flex items-center justify-center border border-slate-950 shadow-sm">
            {itemCount}
          </span>
        </div>

        <div className="text-left pr-1">
          <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            Your Basket
          </span>
          <span className="block text-sm font-heading font-extrabold text-[#FF8A00]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#FF8A00] group-hover:text-slate-950 text-white flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </button>
    </div>
  );
};
