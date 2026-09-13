import React from 'react';
import { ArrowRight, Instagram, Facebook, Twitter, Award, Sparkles } from 'lucide-react';
import { CHEFS } from '../data/mockData';
import { SafeImage } from './SafeImage';

export const MeetChefs: React.FC = () => {
  return (
    <section id="chefs-section" className="py-16 sm:py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-heading font-extrabold text-[#06261C] tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 bg-[#FF8A00] rounded-full inline-block" />
              CULINARY ARTISANS
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              Meet Our Master Chefs
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl font-normal">
              Our talented chefs bring decades of culinary excellence, passion, and Michelin-tier craftsmanship to every dish.
            </p>
          </div>

          <a
            href="#chefs-section"
            className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#06261C] hover:text-[#FF8A00] transition-colors group"
          >
            <span>View All Masters</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 4 Chef Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHEFS.map((chef) => (
            <div
              key={chef.id}
              id={`chef-card-${chef.id}`}
              className="bg-[#FCFDFD] border border-slate-200/90 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-full"
            >
              {/* Chef Photo */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                <SafeImage
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-[#FF8A00] font-heading font-bold">{chef.specialty}</span>
                </div>
              </div>

              {/* Chef Info */}
              <div className="p-5 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 group-hover:text-[#06261C] transition-colors">
                    {chef.name}
                  </h3>
                  <p className="text-xs font-heading font-bold text-[#FF8A00] mt-0.5">
                    {chef.role}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">
                    {chef.experience}
                  </p>
                </div>

                {/* Social Icons matching design */}
                <div className="flex items-center justify-center gap-2.5 pt-4 mt-auto border-t border-slate-100">
                  <a
                    href="#"
                    aria-label={`${chef.name} Instagram`}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF8A00] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    aria-label={`${chef.name} Facebook`}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    aria-label={`${chef.name} X`}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-black hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
