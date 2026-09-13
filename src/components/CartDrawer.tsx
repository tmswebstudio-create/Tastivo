import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    deliveryFee,
    total,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError(null);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-container"
        className="w-full max-w-md bg-[#06261C] text-white h-full shadow-2xl flex flex-col justify-between border-l border-emerald-800/50 relative animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-5 border-b border-emerald-900/60 flex items-center justify-between bg-[#031A13]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0B3326] border border-emerald-600/40 flex items-center justify-center text-[#FF8A00]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">Your Order Basket</h3>
              <p className="text-xs text-slate-300 font-medium">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} ready for fresh preparation
              </p>
            </div>
          </div>

          <button
            id="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full bg-[#0B3326] hover:bg-emerald-900 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-emerald-950/80">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#0B3326] text-slate-400 mx-auto flex items-center justify-center border border-emerald-800/40">
                <ShoppingBag className="w-8 h-8 opacity-60 text-[#FF8A00]" />
              </div>
              <p className="text-white font-heading font-bold text-base">Your basket is currently empty</p>
              <p className="text-xs text-slate-300 max-w-xs mx-auto font-normal">
                Explore our chef's specials and popular categories to add delicious meals!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  document.getElementById('explore-menu-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-heading font-bold px-6 py-2.5 rounded-full text-xs transition-colors shadow-lg active:scale-95"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map(({ item, quantity, selectedOption }) => (
              <div key={item.id} className="pt-4 first:pt-0 flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-emerald-800/60 shrink-0 bg-slate-900">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-white truncate">{item.name}</h4>
                  {selectedOption && (
                    <p className="text-[10px] text-emerald-400 font-medium">{selectedOption}</p>
                  )}
                  <p className="text-xs font-heading font-bold text-[#FF8A00] mt-0.5">
                    ${(item.price * quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-[#0B3326] border border-emerald-800/80 rounded-full px-2.5 py-1 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-5 h-5 rounded-full hover:bg-emerald-800 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    {quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-400" /> : <Minus className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-xs font-bold w-4 text-center text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-5 h-5 rounded-full hover:bg-emerald-800 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code & Footer Checkout Calculations */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#031A13] border-t border-emerald-900/80 space-y-4">
            {/* Promo Code Form */}
            {appliedPromo ? (
              <div className="bg-[#0B3326] border border-emerald-500/40 p-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                  <Sparkles className="w-4 h-4 text-[#FF8A00]" />
                  <span>Code <strong>{appliedPromo}</strong> applied (-20%)</span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-xs text-slate-400 hover:text-rose-400 font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. WEBBIAL20)"
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      setPromoError(null);
                    }}
                    className="w-full bg-[#06261C] text-white text-xs pl-9 pr-3 py-2.5 rounded-2xl border border-emerald-800/80 focus:outline-none focus:border-[#FF8A00] uppercase placeholder:normal-case font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0B3326] hover:bg-[#084231] text-white text-xs font-heading font-bold px-4 py-2.5 rounded-2xl transition-colors cursor-pointer border border-emerald-700/50"
                >
                  Apply
                </button>
              </form>
            )}

            {promoError && (
              <p className="text-[11px] text-rose-400 font-medium">{promoError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-300 pt-1 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount (20%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Priority Delivery</span>
                <span>{deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-heading font-bold text-white pt-2.5 border-t border-emerald-900/60">
                <span>Total Amount</span>
                <span className="text-[#FF8A00] text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="cart-proceed-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-heading font-extrabold py-3.5 rounded-2xl text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
