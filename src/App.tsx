import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PopularCategories } from './components/PopularCategories';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TodaysSpecial } from './components/TodaysSpecial';
import { SpecialOffer } from './components/SpecialOffer';
import { StoryBanner } from './components/StoryBanner';
import { ExploreMenu } from './components/ExploreMenu';
import { AboutStory } from './components/AboutStory';
import { MeetChefs } from './components/MeetChefs';
import { Testimonials } from './components/Testimonials';
import { DownloadApp } from './components/DownloadApp';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { FloatingCart } from './components/FloatingCart';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductModal } from './components/ProductModal';
import { VideoModal } from './components/VideoModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#081711] text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950">
        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Popular Categories */}
          <PopularCategories />

          {/* 3. Why Choose Us Feature Banner */}
          <WhyChooseUs />

          {/* 4. Today's Special */}
          <TodaysSpecial />

          {/* 5. Special Offer 20% Off */}
          <SpecialOffer />

          {/* 6. Good Food Brings People Together Story Preview */}
          <StoryBanner />

          {/* 7. Explore Our Menu */}
          <ExploreMenu />

          {/* 8. Crafting Delicious Moments (About) */}
          <AboutStory />

          {/* 9. Meet Our Chefs */}
          <MeetChefs />

          {/* 10. Customer Testimonials */}
          <Testimonials />

          {/* 11. Download Our App Banner */}
          <DownloadApp />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Overlays & Modals */}
        <CartDrawer />
        <FavoritesDrawer />
        <FloatingCart />
        <CheckoutModal />
        <ProductModal />
        <VideoModal />
        <Toast />
      </div>
    </CartProvider>
  );
}
