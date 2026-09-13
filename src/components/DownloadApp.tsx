import React from 'react';
import { Smartphone, Navigation, ShieldCheck, Apple, Play } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const DownloadApp: React.FC = () => {
  const { showToast } = useCart();

  const handleDownloadClick = (platform: string) => {
    showToast(`Tastivo Food ${platform} app download initiated!`);
  };

  return (
    <section id="download-app-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      <div className="bg-gradient-to-br from-[#031A13] via-[#06261C] to-[#041F16] rounded-3xl sm:rounded-[40px] p-8 sm:p-12 lg:p-14 text-white border border-emerald-900/60 shadow-2xl relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF8A00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Heading & Store Buttons */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <span className="text-xs font-heading font-extrabold text-[#FF8A00] tracking-widest uppercase flex items-center justify-center lg:justify-start gap-1.5">
              <span className="w-2 h-2 bg-[#FF8A00] rounded-full inline-block" />
              MOBILE EXPERIENCE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Order Food <br />
              Anytime, Anywhere
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Get app-exclusive discounts, track your courier in real-time GPS, and reorder your comfort food in just two taps.
            </p>

            {/* App Store & Google Play Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {/* App Store */}
              <button
                id="app-store-download-btn"
                onClick={() => handleDownloadClick('iOS')}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-700/80 px-5 py-3 rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              >
                <Apple className="w-6 h-6 text-white" />
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 leading-none">Download on the</span>
                  <span className="block text-xs font-heading font-bold text-white leading-tight">App Store</span>
                </div>
              </button>

              {/* Google Play */}
              <button
                id="google-play-download-btn"
                onClick={() => handleDownloadClick('Android')}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-700/80 px-5 py-3 rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              >
                <Play className="w-6 h-6 text-[#FF8A00] fill-[#FF8A00]" />
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 leading-none">GET IT ON</span>
                  <span className="block text-xs font-heading font-bold text-white leading-tight">Google Play</span>
                </div>
              </button>
            </div>
          </div>

          {/* Center Column: Phone Mockup with Tastivo screen */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative w-56 h-[380px] bg-slate-950 rounded-[38px] p-2.5 border-4 border-slate-800 shadow-2xl ring-1 ring-emerald-500/20">
              {/* Camera notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-black rounded-full" />
              </div>

              {/* Screen inside */}
              <div className="w-full h-full bg-[#06261C] rounded-[30px] overflow-hidden flex flex-col p-3 pt-7 text-white text-center justify-between border border-emerald-700/40">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#FF8A00] font-heading font-bold">Tastivo Food</span>
                  <p className="text-[11px] font-heading font-bold leading-tight">Special 20% Off</p>
                </div>

                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#FF8A00] shadow-lg">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
                    alt="Tastivo App Screen"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="bg-[#0B3326] py-1.5 px-3 rounded-xl text-[10px] font-medium text-emerald-300">
                    🚚 Arriving in 18 Mins
                  </div>
                  <div className="bg-[#FF8A00] text-slate-950 font-heading font-bold py-1.5 rounded-full text-[10px]">
                    Track Live Order
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Feature Bullets */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-4 bg-[#06261C]/80 border border-emerald-800/50 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#FF8A00]/20 text-[#FF8A00] flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold text-white">Instant 1-Tap Reorder</h4>
                <p className="text-xs text-slate-400">Save custom meals to favorites</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#06261C]/80 border border-emerald-800/50 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold text-white">Live GPS Courier Tracking</h4>
                <p className="text-xs text-slate-400">Second-by-second estimated arrival</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#06261C]/80 border border-emerald-800/50 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold text-white">Secure Encrypted Payments</h4>
                <p className="text-xs text-slate-400">Apple Pay, Google Pay & Cards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
