import React from 'react';
import { X, Play, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const VideoModal: React.FC = () => {
  const { isStoryVideoOpen, setIsStoryVideoOpen } = useCart();

  if (!isStoryVideoOpen) return null;

  return (
    <div
      id="video-story-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={() => setIsStoryVideoOpen(false)}
    >
      <div
        className="bg-[#06261C] border border-emerald-700/50 rounded-3xl max-w-2xl w-full text-white shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsStoryVideoOpen(false)}
          aria-label="Close video"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Video simulation preview */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
            alt="Culinary kitchen story"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06261C] via-transparent to-transparent" />

          {/* Centered Pulsing Play Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#FF8A00] text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 transform group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-7 h-7 fill-slate-950 ml-1" />
            </div>
            <span className="text-xs font-heading font-bold tracking-widest text-white uppercase bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
              Watch 2-Minute Culinary Film
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8A00]" /> The Webbiral Farm-to-Table Promise
            </span>
            <span className="text-slate-400 font-medium">HD • 1080p</span>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="p-6 space-y-3 bg-[#031A13]">
          <h3 className="text-lg font-heading font-extrabold text-white">Behind Every Plate: Our Journey</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Founded with a singular passion: bringing restaurant-grade culinary craft straight to busy households without ever compromising on ingredient purity, ethical farming, and warm hospitality. Every meal you order supports local organic farmers and sustainable kitchen practices.
          </p>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setIsStoryVideoOpen(false)}
              className="bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-heading font-bold px-5 py-2.5 rounded-2xl text-xs transition-colors cursor-pointer shadow-md active:scale-95"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
