import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: FoodItem, quantity?: number, selectedOption?: string, specialInstructions?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  selectedProduct: FoodItem | null;
  setSelectedProduct: (item: FoodItem | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isStoryVideoOpen: boolean;
  setIsStoryVideoOpen: (open: boolean) => void;
  location: string;
  setLocation: (loc: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  favorites: string[];
  toggleFavorite: (id: string, name?: string) => void;
  isFavorite: (id: string) => boolean;
  isFavoritesOpen: boolean;
  setIsFavoritesOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  lastAddedTimestamp: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('webbiral_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('webbiral_favorites');
      return saved ? JSON.parse(saved) : ['spec-1', 'menu-7'];
    } catch {
      return ['spec-1', 'menu-7'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<FoodItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoryVideoOpen, setIsStoryVideoOpen] = useState(false);
  const [location, setLocation] = useState('742 Evergreen Terrace, Brooklyn NY');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastAddedTimestamp, setLastAddedTimestamp] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem('webbiral_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('webbiral_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const toggleFavorite = (id: string, name?: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed ${name || 'item'} from favorites`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved ${name || 'item'} to favorites ❤️`);
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToCart = (item: FoodItem, quantity: number = 1, selectedOption?: string, specialInstructions?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.item.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selectedOption: selectedOption || next[existingIndex].selectedOption,
          specialInstructions: specialInstructions || next[existingIndex].specialInstructions,
        };
        return next;
      } else {
        return [...prev, { item, quantity, selectedOption, specialInstructions }];
      }
    });
    setLastAddedTimestamp(Date.now());
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${item.name} to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'WEBBIAL20' || trimmed === 'WEBBIAL' || trimmed === 'ANTIXOR20') {
      const codeName = 'WEBBIAL20';
      setAppliedPromo(codeName);
      showToast(`🎉 Promo code ${codeName} applied! (20% off)`);
      return { success: true, message: '20% discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try WEBBIAL20' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed');
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const discountRate = appliedPromo ? 0.2 : 0;
  const discount = subtotal * discountRate;
  const deliveryFee = subtotal > 0 ? (subtotal > 35 ? 0 : 2.99) : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const itemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        deliveryFee,
        total,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isStoryVideoOpen,
        setIsStoryVideoOpen,
        location,
        setLocation,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        favorites,
        toggleFavorite,
        isFavorite,
        isFavoritesOpen,
        setIsFavoritesOpen,
        isAccountOpen,
        setIsAccountOpen,
        lastAddedTimestamp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
