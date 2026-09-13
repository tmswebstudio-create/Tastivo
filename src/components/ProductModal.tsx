import React, { useState } from 'react';
import { X, Star, Clock, Flame, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [portion, setPortion] = useState<'Regular' | 'Large'>('Regular');
  const [specialNote, setSpecialNote] = useState('');

  if (!selectedProduct) return null;

  const extraCost = portion === 'Large' ? 2.50 : 0;
  const unitPrice = selectedProduct.price + extraCost;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(selectedProduct, quantity, portion, specialNote);
    setSelectedProduct(null);
    setQuantity(1);
    setPortion('Regular');
    setSpecialNote('');
  };

  return (
    <div
      id="product-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        id="product-modal-container"
        className="bg-[#06261C] border border-emerald-800/60 rounded-3xl max-w-lg w-full text-white shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          <SafeImage
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06261C] via-transparent to-transparent" />
          <span className="absolute bottom-3 left-5 bg-[#FF8A00] text-slate-950 text-[10px] font-heading font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {selectedProduct.category}
          </span>
        </div>

        {/* Details Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">{selectedProduct.name}</h3>
              <p className="text-xs text-slate-300 mt-1">{selectedProduct.description}</p>
            </div>
            <span className="text-xl font-heading font-extrabold text-[#FF8A00]">
              ${unitPrice.toFixed(2)}
            </span>
          </div>

          {/* Key Metrics */}
          <div className="flex items-center gap-4 py-2 border-y border-emerald-900/60 text-xs text-slate-300">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#FF8A00] text-[#FF8A00]" />
              <span className="font-heading font-bold text-white">{selectedProduct.rating}</span>
              <span className="text-[10px] text-slate-400">({selectedProduct.reviewCount})</span>
            </div>
            {selectedProduct.calories && (
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>{selectedProduct.calories} kcal</span>
              </div>
            )}
            {selectedProduct.prepTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{selectedProduct.prepTime}</span>
              </div>
            )}
          </div>

          {/* Ingredients list if present */}
          {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
            <div>
              <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Ingredients & Toppings
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-[#0B3326] text-slate-200 border border-emerald-800/60 px-2.5 py-1 rounded-xl"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Portion Size Selection */}
          <div>
            <span className="text-[11px] font-heading font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Portion Size
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPortion('Regular')}
                className={`py-2 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  portion === 'Regular'
                    ? 'bg-[#0B3326] border-[#FF8A00] text-white'
                    : 'bg-[#041F16] border-emerald-900/60 text-slate-400'
                }`}
              >
                <span>Regular Portion</span>
                <span className="text-emerald-400 font-bold">Standard</span>
              </button>
              <button
                type="button"
                onClick={() => setPortion('Large')}
                className={`py-2 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  portion === 'Large'
                    ? 'bg-[#0B3326] border-[#FF8A00] text-white'
                    : 'bg-[#041F16] border-emerald-900/60 text-slate-400'
                }`}
              >
                <span>Large Portion</span>
                <span className="text-[#FF8A00] font-bold">+ $2.50</span>
              </button>
            </div>
          </div>

          {/* Quantity and Add to Cart Action */}
          <div className="pt-2 flex items-center gap-3">
            <div className="flex items-center gap-3 bg-[#0B3326] border border-emerald-800/80 rounded-2xl px-3 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-slate-300 hover:text-white font-bold text-sm w-4 cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-bold text-white w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-slate-300 hover:text-white font-bold text-sm w-4 cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              className="flex-1 bg-[#FF8A00] hover:bg-[#FF7000] text-slate-950 font-heading font-extrabold py-3.5 px-5 rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Basket (${totalPrice.toFixed(2)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
