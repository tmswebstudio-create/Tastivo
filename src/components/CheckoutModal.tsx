import React, { useState } from 'react';
import { X, CheckCircle2, Clock, MapPin, CreditCard, DollarSign, Bike, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    total,
    subtotal,
    discount,
    deliveryFee,
    location,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'cash'>('card');
  const [deliveryTiming, setDeliveryTiming] = useState<'asap' | 'later'>('asap');
  const [aptNote, setAptNote] = useState('Apt 4B, ring doorbell twice');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `WEB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(orderId);
    setIsSuccess(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        id="checkout-modal-container"
        className="bg-[#06261C] border border-emerald-700/50 rounded-3xl max-w-lg w-full text-white shadow-2xl overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-emerald-900/60 flex items-center justify-between bg-[#031A13]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF8A00] to-[#FF7000] flex items-center justify-center text-slate-950 font-bold shadow-md">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">
              {isSuccess ? 'Order Status' : 'Complete Your Order'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="w-8 h-8 rounded-full bg-[#0B3326] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          /* Order Confirmed Celebration View */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-heading font-extrabold text-[#FF8A00] uppercase tracking-wider">
                Order #{orderNumber}
              </span>
              <h4 className="text-2xl font-heading font-extrabold text-white">Your Meal is Being Prepared!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                Our chef is carefully crafting your order with farm-fresh ingredients. Estimated arrival in <strong>20-25 mins</strong>.
              </p>
            </div>

            {/* Live Progress Tracker Steps */}
            <div className="bg-[#031A13] border border-emerald-800/60 p-4 rounded-2xl space-y-3 text-left text-xs">
              <div className="flex items-center gap-3 text-emerald-400 font-semibold">
                <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Order Placed & Confirmed</span>
              </div>
              <div className="flex items-center gap-3 text-[#FF8A00] font-semibold">
                <div className="w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center shrink-0 animate-pulse">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Kitchen Preparing Fresh Meal</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 font-medium">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Bike className="w-3.5 h-3.5" />
                </div>
                <span>Courier Pickup & Delivery to {location}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-heading font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-5">
            {/* Delivery Address */}
            <div className="space-y-2">
              <label className="text-xs font-heading font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" /> Delivery Address
              </label>
              <div className="bg-[#031A13] p-3.5 rounded-2xl border border-emerald-800/60 text-xs text-slate-200">
                <p className="font-semibold text-white">{location}</p>
                <input
                  type="text"
                  value={aptNote}
                  onChange={(e) => setAptNote(e.target.value)}
                  placeholder="Apartment, suite, or delivery instructions"
                  className="w-full mt-2 bg-[#06261C] px-3 py-2 rounded-xl border border-emerald-800/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8A00]"
                />
              </div>
            </div>

            {/* Timing Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryTiming('asap')}
                className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  deliveryTiming === 'asap'
                    ? 'bg-[#0B3326] border-[#FF8A00] text-white ring-1 ring-[#FF8A00]'
                    : 'bg-[#031A13] border-emerald-800/60 text-slate-400'
                }`}
              >
                <span className="block font-heading font-bold text-white">⚡ ASAP</span>
                <span className="text-[11px] text-emerald-400 font-medium">20 - 30 mins</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryTiming('later')}
                className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  deliveryTiming === 'later'
                    ? 'bg-[#0B3326] border-[#FF8A00] text-white ring-1 ring-[#FF8A00]'
                    : 'bg-[#031A13] border-emerald-800/60 text-slate-400'
                }`}
              >
                <span className="block font-heading font-bold text-white">🕒 Schedule</span>
                <span className="text-[11px] text-slate-400">Choose custom time</span>
              </button>
            </div>

            {/* Payment Options */}
            <div className="space-y-2">
              <label className="text-xs font-heading font-bold text-slate-300 uppercase tracking-wider">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#0B3326] border-[#FF8A00] text-white ring-1 ring-[#FF8A00]'
                      : 'bg-[#031A13] border-emerald-800/60 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#FF8A00]" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-2.5 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'apple'
                      ? 'bg-[#0B3326] border-[#FF8A00] text-white ring-1 ring-[#FF8A00]'
                      : 'bg-[#031A13] border-emerald-800/60 text-slate-400'
                  }`}
                >
                  <span className="text-white font-bold"> / G-Pay</span>
                  <span className="text-[10px] text-slate-400">Instant</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2.5 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'bg-[#0B3326] border-[#FF8A00] text-white ring-1 ring-[#FF8A00]'
                      : 'bg-[#031A13] border-emerald-800/60 text-slate-400'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Cash</span>
                </button>
              </div>
            </div>

            {/* Summary Row */}
            <div className="bg-[#031A13] p-4 rounded-2xl border border-emerald-800/60 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Items ({cart.length})</span>
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
              <div className="flex justify-between font-heading font-bold text-sm text-white pt-2 border-t border-emerald-800/60">
                <span>Final Price</span>
                <span className="text-[#FF8A00] text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="confirm-place-order-btn"
              type="submit"
              className="w-full bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-heading font-extrabold py-3.5 rounded-2xl text-sm transition-all shadow-xl shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              Confirm & Place Order (${total.toFixed(2)})
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
