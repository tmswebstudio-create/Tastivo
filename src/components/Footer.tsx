import React from 'react';
import { UtensilsCrossed, Facebook, Instagram, Twitter, Linkedin, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#031A13] text-slate-400 pt-16 pb-12 border-t border-emerald-950/80 relative overflow-hidden">
      {/* Decorative leaf motifs */}
      <div className="absolute right-4 bottom-8 opacity-25 pointer-events-none">
        <span className="text-6xl">🌿</span>
      </div>
      <div className="absolute left-6 top-8 opacity-20 pointer-events-none">
        <span className="text-4xl">🍃</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/40">
          {/* Col 1: Brand & Bio (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start group cursor-pointer shrink-0">
              <div className="flex items-center -mb-1">
                <span className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FF7000] relative drop-shadow-sm group-hover:scale-105 transition-transform origin-bottom">
                  T
                </span>
                <span className="text-3xl font-heading font-extrabold text-white drop-shadow-sm group-hover:scale-105 transition-transform origin-bottom delay-75">
                  ast
                </span>
                <span className="text-3xl font-heading font-extrabold text-white relative drop-shadow-sm group-hover:scale-105 transition-transform origin-bottom delay-100">
                  i
                  <span className="absolute -top-1.5 -right-1 text-[#FF8A00]">
                    <svg className="w-3 h-3 fill-current rotate-45" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C7.5 2 4 5.5 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.5 16.5 2 12 2Z"/>
                    </svg>
                  </span>
                </span>
                <span className="text-3xl font-heading font-extrabold text-white drop-shadow-sm group-hover:scale-105 transition-transform origin-bottom delay-150">
                  vo
                </span>
              </div>
              <span className="text-[9px] text-slate-300 font-semibold tracking-[0.2em] uppercase ml-0.5">
                Fresh Food. Delivered.
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed font-normal">
              Delivering high-quality, chef-crafted meals made from fresh, locally sourced ingredients straight to your doorstep in minutes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-400 font-medium">Customer Care:</span>
              <a href="tel:+18005553663" className="text-xs font-heading font-bold text-white hover:text-[#FF8A00] transition-colors">
                +1 (800) 555-FOOD
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold text-white tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#hero-section" className="hover:text-[#FF8A00] transition-colors">Home</a>
              </li>
              <li>
                <a href="#categories-section" className="hover:text-[#FF8A00] transition-colors">Popular Categories</a>
              </li>
              <li>
                <a href="#todays-special-section" className="hover:text-[#FF8A00] transition-colors">Chef's Specials</a>
              </li>
              <li>
                <a href="#special-offer-section" className="hover:text-[#FF8A00] transition-colors">Promos & Offers</a>
              </li>
              <li>
                <a href="#explore-menu-section" className="hover:text-[#FF8A00] transition-colors">Full Menu</a>
              </li>
              <li>
                <a href="#about-section" className="hover:text-[#FF8A00] transition-colors">Our Story & About</a>
              </li>
              <li>
                <a href="#chefs-section" className="hover:text-[#FF8A00] transition-colors">Master Chefs</a>
              </li>
              <li>
                <a href="#testimonials-section" className="hover:text-[#FF8A00] transition-colors">Customer Reviews</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Help & Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold text-white tracking-wider">Help & Support</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#download-app-section" className="hover:text-[#FF8A00] transition-colors">Live Order Tracking</a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-[#FF8A00] transition-colors">Delivery Guarantee</a>
              </li>
              <li>
                <a href="#special-offer-section" className="hover:text-[#FF8A00] transition-colors">Promos & Discounts</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF8A00] transition-colors">Privacy & Security</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FF8A00] transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold text-white tracking-wider">Stay Connected</h4>
            <p className="text-xs text-slate-300 font-normal">
              Join 50,000+ food lovers for secret discount vouchers and seasonal chef recipes.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#06261C] hover:bg-[#FF8A00] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#06261C] hover:bg-[#FF8A00] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter X"
                className="w-8 h-8 rounded-full bg-[#06261C] hover:bg-[#FF8A00] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#06261C] hover:bg-[#FF8A00] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Tastivo. All rights reserved.</p>

          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for culinary lovers everywhere</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-9 h-9 rounded-full bg-[#06261C] hover:bg-[#FF8A00] text-slate-200 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
