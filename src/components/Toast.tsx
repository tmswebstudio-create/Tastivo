import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      id="toast-notification"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0d271f] text-white px-5 py-3.5 rounded-full shadow-2xl border border-emerald-500/30 transition-all duration-300 animate-bounce"
    >
      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
    </div>
  );
};
