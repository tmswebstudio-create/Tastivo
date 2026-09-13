import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { SafeImage } from './SafeImage';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials-section" className="py-16 sm:py-20 bg-[#F9FAF9] text-slate-900 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Carousel Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-heading font-extrabold text-[#06261C] tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 bg-[#FF8A00] rounded-full inline-block" />
              CUSTOMER EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              What Our Diners Say
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl font-normal">
              Real people. Real gourmet culinary moments. Here is what 50,000+ satisfied food lovers cherish about webbiral.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-[#06261C] hover:bg-[#031A13] flex items-center justify-center text-white transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, index) => (
            <div
              key={test.id}
              id={`testimonial-card-${test.id}`}
              className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                index === currentIndex ? 'border-[#FF8A00] ring-2 ring-[#FF8A00]/30 shadow-md' : 'border-slate-200'
              }`}
            >
              <div>
                {/* User Header */}
                <div className="flex items-center justify-between gap-3.5 mb-4">
                  <div className="flex items-center gap-3.5">
                    <SafeImage
                      src={test.avatar}
                      alt={test.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600/30"
                    />
                    <div>
                      <h4 className="text-sm font-heading font-bold text-slate-900">{test.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{test.location}</p>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-emerald-100 shrink-0" />
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#FF8A00]">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF8A00]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-600 leading-relaxed italic font-normal">
                  "{test.comment}"
                </p>
              </div>

              {/* Order Favorite Badge */}
              {test.orderFavorite && (
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-auto">
                  <span>Favorite dish:</span>
                  <span className="font-heading font-bold text-[#06261C]">{test.orderFavorite}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

