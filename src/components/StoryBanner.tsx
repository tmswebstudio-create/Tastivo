import React from 'react';
import { Play } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const StoryBanner: React.FC = () => {
  const { setIsStoryVideoOpen } = useCart();

  const previewDishes = [
    {
      id: 'prev-1',
      title: 'Artisanal Bowl',
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'prev-2',
      title: 'Handmade Pasta',
      img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'prev-3',
      title: 'Classic Neapolitan',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <section className="bg-[#031A13] py-12 sm:py-16 text-white relative overflow-hidden border-y border-white/10">
      {/* Decorative leafy elements */}
      <div className="absolute -left-10 top-0 opacity-20 pointer-events-none">
        <span className="text-6xl">🌿</span>
      </div>
      <div className="absolute right-6 bottom-2 opacity-25 pointer-events-none">
        <span className="text-5xl">🍃</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Title */}
        <div className="max-w-md text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Good Food <br />
            <span className="font-script text-[#FF8A00] text-4xl sm:text-5xl italic font-normal">
              Brings People Together
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 font-normal">
            Every dish is prepared with community, culinary tradition, and passion.
          </p>
        </div>

        {/* 3 Circular Food Previews + Watch Story Button */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* 3 Circular Dishes */}
          <div className="flex items-center -space-x-4">
            {previewDishes.map((dish, index) => (
              <div
                key={dish.id}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#FF8A00] overflow-hidden shadow-xl bg-[#0B3326] transform hover:-translate-y-1 hover:z-20 transition-all cursor-pointer"
                style={{ zIndex: 10 - index }}
                title={dish.title}
              >
                <SafeImage
                  src={dish.img}
                  alt={dish.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Watch Our Story Button */}
          <button
            id="watch-our-story-btn"
            onClick={() => setIsStoryVideoOpen(true)}
            className="flex items-center gap-3 bg-[#0B3326] hover:bg-[#06261C] border border-emerald-500/40 text-white px-6 py-3.5 rounded-full text-xs font-heading font-bold transition-all shadow-lg hover:border-[#FF8A00] cursor-pointer group active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF8A00] text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
            </div>
            <span>Watch Our Story</span>
          </button>
        </div>
      </div>
    </section>
  );
};
