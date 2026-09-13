import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, UtensilsCrossed, Heart, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ALL_MENU_ITEMS, TODAYS_SPECIALS } from '../data/mockData';
import { SafeImage } from './SafeImage';

interface NavLinkItem {
  id: string;
  label: string;
  badge?: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'hero-section', label: 'Home' },
  { id: 'categories-section', label: 'Categories' },
  { id: 'todays-special-section', label: 'Specials' },
  { id: 'special-offer-section', label: 'Offers', badge: '20%' },
  { id: 'explore-menu-section', label: 'Menu' },
  { id: 'about-section', label: 'About' },
  { id: 'chefs-section', label: 'Chefs' },
  { id: 'testimonials-section', label: 'Reviews' },
];

export const Navbar: React.FC = () => {
  const {
    itemCount,
    subtotal,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
    setActiveCategory,
    favorites,
    setIsFavoritesOpen,
    isAccountOpen,
    setIsAccountOpen,
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero-section');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Navbar offset

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(link.id);
            return;
          }
        }
      }
      setActiveSection('hero-section');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Combine items for quick search autocomplete
  const allItems = [...TODAYS_SPECIALS, ...ALL_MENU_ITEMS];
  const searchResults = searchQuery.trim()
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-[#06261C]/95 backdrop-blur-md border-b border-white/10 transition-all shadow-lg"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          id="nav-logo"
          href="#"
          className="flex flex-col items-start group cursor-pointer shrink-0"
        >
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
                  <path d="M12 2C7.5 2 4 5.5 4 10C4 14.5 9 19 12 22C15 19 20 14.5 20 10C20 5.5 16.5 2 12 2ZM11 16V10H9L12 5L15 10H13V16H11Z" opacity="0" />
                  <path d="M21.41 11.58C21.41 11.58 20.33 4.29 13.06 2.1C13.06 2.1 13.56 5.8 15.65 8.16C17.65 10.42 21.41 11.58 21.41 11.58ZM2.59 11.58C2.59 11.58 3.67 4.29 10.94 2.1C10.94 2.1 10.44 5.8 8.35 8.16C6.35 10.42 2.59 11.58 2.59 11.58Z" opacity="0"/>
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
        </a>

        {/* Desktop Navigation Links with Active Section Highlight */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-semibold">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-1.5 transition-all duration-200 cursor-pointer flex items-center gap-1 group ${
                  isActive
                    ? 'text-[#FF8A00] font-bold scale-105'
                    : 'text-slate-200 hover:text-[#FF8A00]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-[#FF8A00] text-slate-950 shadow-sm'
                        : 'bg-[#FF8A00] text-slate-950 group-hover:bg-[#FF8A00]'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
                {/* Active Underline Pill */}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#FF8A00] rounded-full shadow-sm shadow-orange-500/50 transition-all duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Search Bar */}
        <div className="relative hidden md:block w-56 lg:w-68">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-emerald-400/80" />
            <input
              id="header-search-input"
              type="text"
              placeholder="Search dishes or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              className="w-full bg-[#0B3326] text-white text-xs pl-9 pr-8 py-2.5 rounded-full border border-emerald-800/60 focus:outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 transition-all placeholder:text-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div
              id="search-dropdown-results"
              className="absolute top-12 left-0 w-full bg-[#031A13] border border-emerald-700/60 rounded-2xl shadow-2xl overflow-hidden py-1.5 z-50 backdrop-blur-xl"
            >
              <div className="px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Matching Dishes
              </div>
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedProduct(item);
                    setSearchQuery('');
                  }}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-[#0B3326] text-left transition-colors cursor-pointer"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{item.category} • {item.prepTime}</p>
                  </div>
                  <span className="text-xs font-extrabold text-[#FF8A00]">${item.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions: Favorites, Account & Cart */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Favorites Wishlist Trigger */}
          <button
            id="nav-favorites-button"
            onClick={() => setIsFavoritesOpen(true)}
            aria-label="Favorite Dishes"
            className="relative w-10 h-10 rounded-full bg-[#0B3326] border border-emerald-800/60 flex items-center justify-center text-slate-200 hover:text-rose-400 hover:border-rose-500/40 transition-all cursor-pointer group"
          >
            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {favorites.length > 0 && (
              <span
                id="nav-favorites-badge"
                className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm"
              >
                {favorites.length}
              </span>
            )}
          </button>

          {/* User Account Trigger */}
          <button
            id="nav-user-button"
            onClick={() => setIsAccountOpen(true)}
            aria-label="User Account"
            className="w-10 h-10 rounded-full bg-[#0B3326] border border-emerald-800/60 flex items-center justify-center text-slate-200 hover:text-[#FF8A00] hover:border-[#FF8A00]/40 transition-all cursor-pointer group"
          >
            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>

          {/* Cart Trigger */}
          <button
            id="nav-cart-button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 bg-[#0B3326] hover:bg-[#0E4030] border border-emerald-800/80 hover:border-[#FF8A00]/70 px-3.5 sm:px-4 py-2 rounded-full text-white transition-all cursor-pointer shadow-md group active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#FF8A00]" />
              {itemCount > 0 && (
                <span
                  id="nav-cart-badge"
                  className="absolute -top-2 -right-2 w-4 h-4 bg-[#FF8A00] text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[9px] text-emerald-400 font-bold leading-none uppercase">Cart</span>
              <span className="text-xs font-heading font-extrabold text-white leading-tight">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="lg:hidden w-10 h-10 rounded-xl bg-[#0B3326] text-slate-200 border border-emerald-800/60 flex items-center justify-center cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="lg:hidden bg-[#031A13] border-b border-emerald-800/60 px-4 pt-3 pb-6 space-y-3 shadow-2xl"
        >
          {/* Mobile Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-400/80" />
            <input
              type="text"
              placeholder="Search dishes or cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B3326] text-white text-xs pl-9 pr-4 py-2.5 rounded-full border border-emerald-800/60"
            />
          </div>

          {/* Mobile Nav items */}
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#06261C] text-[#FF8A00] font-bold border border-[#FF8A00]/30'
                      : 'text-slate-200 hover:text-[#FF8A00] hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-[#FF8A00] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection('download-app-section')}
              className="flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-[#FF8A00] hover:bg-white/5"
            >
              <span>Download App</span>
              <span className="text-[10px] text-emerald-400 font-bold">iOS / Android</span>
            </button>
          </div>
        </div>
      )}

      {/* User Login / Account Preview Modal */}
      {isAccountOpen && (
        <div
          id="user-account-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setIsAccountOpen(false)}
        >
          <div
            className="bg-[#06261C] border border-emerald-700/50 rounded-3xl p-6 max-w-sm w-full text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAccountOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0B3326] text-slate-300 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF8A00] to-[#FF7000] flex items-center justify-center text-slate-950 font-heading font-black text-lg">
                TW
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">tmswebstudio@gmail.com</h3>
                <span className="text-xs text-[#FF8A00] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> VIP Gold Member
                </span>
              </div>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300 border-t border-emerald-900/60 pt-4">
              <div className="flex justify-between py-1 bg-[#0B3326] px-3 rounded-xl border border-emerald-900/40">
                <span className="text-slate-400">Default Address:</span>
                <span className="text-white font-medium">742 Evergreen Terrace</span>
              </div>
              <div className="flex justify-between py-1 bg-[#0B3326] px-3 rounded-xl border border-emerald-900/40">
                <span className="text-slate-400">Loyalty Rewards:</span>
                <span className="text-[#FF8A00] font-bold">520 pts ($5.20 off)</span>
              </div>
              <div className="flex justify-between py-1 bg-[#0B3326] px-3 rounded-xl border border-emerald-900/40">
                <span className="text-slate-400">Payment:</span>
                <span className="text-white font-medium">Apple Pay / Visa •••• 4242</span>
              </div>
              <div className="flex justify-between py-1 bg-[#0B3326] px-3 rounded-xl border border-emerald-900/40">
                <span className="text-slate-400">Total Orders:</span>
                <span className="text-emerald-400 font-bold">14 Completed</span>
              </div>
            </div>
            <button
              onClick={() => setIsAccountOpen(false)}
              className="mt-5 w-full py-3 bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-heading font-bold rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
