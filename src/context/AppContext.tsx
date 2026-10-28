import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, CustomizationOptions, User, Order, DeliveryType } from '../types';

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginDemoUser: () => void;
  logout: () => void;
  registerUser: (data: { name: string; email: string; phone: string; birthday: string }) => void;
  loginUser: (email: string) => boolean;

  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, customizations?: CustomizationOptions) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;

  orders: Order[];
  createOrder: (data: {
    deliveryType: DeliveryType;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    address?: string;
    pickupOrDineinTime?: string;
    guestCount?: number;
    paymentMethod: 'credit_card' | 'line_pay' | 'apple_pay' | 'counter';
    usePoints?: boolean;
  }) => Order;

  couponCode: string;
  appliedDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // UI state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (open: boolean) => void;

  deliveryType: DeliveryType;
  setDeliveryType: (type: DeliveryType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'usr_demo_882',
  name: '林沐晨',
  email: 'muchen.lin@salon.com',
  phone: '0988-123-456',
  tier: 'gold',
  points: 1280,
  birthday: '10-28',
  joinDate: '2025-06-15',
  savedAddresses: ['台北市大安區敦化南路一段 188 號 12 樓', '新北市板橋區縣民大道二段 7 號'],
  favorites: ['set-versailles', 'pastry-millefeuille', 'baked-scones'],
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('mdt_user');
      return saved ? JSON.parse(saved) : DEMO_USER; // Default to demo user for a rich immediate experience!
    } catch {
      return DEMO_USER;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mdt_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mdt_favorites');
      return saved ? JSON.parse(saved) : (DEMO_USER.favorites || []);
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mdt_orders');
      if (saved) return JSON.parse(saved);
      // Pre-seed 1 realistic past order for demo
      return [
        {
          id: 'ord_initial_1092',
          orderNumber: 'MDT-20261024-889',
          createdAt: '2026-10-24 14:35',
          items: [
            {
              cartId: 'c_init_1',
              item: {
                id: 'pastry-millefeuille',
                name: '馬達加斯加香草覆盆子千層派',
                frenchName: 'Mille-Feuille à la Vanille Bourbon',
                description: '焦糖酥皮與馬達加斯加波旁香草奶餡',
                price: 260,
                category: 'patisserie',
                categoryName: '法式甜品',
                image: '/src/assets/images/pastry_french_millefeuille_1793167579052.jpg',
                flavorNotes: ['香草', '千層酥'],
                allowedCustomizations: {},
              },
              quantity: 2,
              customizations: { sweetness: '微甜 Low Sugar' },
              unitPrice: 260,
              totalPrice: 520,
            },
          ],
          deliveryType: 'delivery',
          status: 'completed',
          customerName: '林沐晨',
          customerPhone: '0988-123-456',
          customerEmail: 'muchen.lin@salon.com',
          address: '台北市大安區敦化南路一段 188 號 12 樓',
          subtotal: 520,
          discount: 50,
          pointsUsed: 0,
          deliveryFee: 0,
          totalAmount: 470,
          paymentMethod: 'credit_card',
          paymentStatus: 'paid',
        },
      ];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('mdt_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mdt_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mdt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mdt_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('mdt_orders', JSON.stringify(orders));
  }, [orders]);

  // Auth operations
  const loginDemoUser = () => {
    setUser(DEMO_USER);
    setFavorites(DEMO_USER.favorites);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsProfileOpen(false);
  };

  const registerUser = (data: { name: string; email: string; phone: string; birthday: string }) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      birthday: data.birthday,
      tier: 'bronze',
      points: 200, // Welcome gift points
      joinDate: new Date().toISOString().split('T')[0],
      savedAddresses: [],
      favorites: [],
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const loginUser = (email: string): boolean => {
    if (!email) return false;
    const existing: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0] || '尊榮會員',
      email,
      phone: '0912-345-678',
      birthday: '05-20',
      tier: 'gold',
      points: 850,
      joinDate: '2025-08-01',
      savedAddresses: ['台北市信義區忠孝東路五段 68 號'],
      favorites: ['set-versailles'],
    };
    setUser(existing);
    setIsAuthModalOpen(false);
    return true;
  };

  // Cart operations
  const addToCart = (
    item: MenuItem,
    quantity: number = 1,
    customizations: CustomizationOptions = {}
  ) => {
    let unitExtra = 0;
    if (customizations.clottedCream) unitExtra += 45;
    if (customizations.extraJam) unitExtra += 35;
    if (customizations.giftPackaging) unitExtra += 60;

    const unitPrice = item.price + unitExtra;
    const totalPrice = unitPrice * quantity;

    // Check if duplicate with same customizations
    const customKey = JSON.stringify(customizations);
    const existingIndex = cart.findIndex(
      (c) => c.item.id === item.id && JSON.stringify(c.customizations) === customKey
    );

    if (existingIndex > -1) {
      setCart((prev) =>
        prev.map((c, idx) => {
          if (idx === existingIndex) {
            const nextQty = c.quantity + quantity;
            return {
              ...c,
              quantity: nextQty,
              totalPrice: c.unitPrice * nextQty,
            };
          }
          return c;
        })
      );
    } else {
      const newItem: CartItem = {
        cartId: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        item,
        quantity,
        customizations,
        unitPrice,
        totalPrice,
      };
      setCart((prev) => [...prev, newItem]);
    }

    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((c) => c.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.cartId === cartId) {
            const nextQty = c.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...c,
              quantity: nextQty,
              totalPrice: c.unitPrice * nextQty,
            };
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setAppliedDiscount(0);
  };

  const cartCount = cart.reduce((acc, c) => acc + c.quantity, 0);
  const cartSubtotal = cart.reduce((acc, c) => acc + c.totalPrice, 0);

  // Favorites
  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(itemId);
      const next = exists ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      if (user) {
        setUser({ ...user, favorites: next });
      }
      return next;
    });
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

  // Coupons
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AFTERNOON10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setCouponCode('AFTERNOON10');
      setAppliedDiscount(discount);
      return { success: true, message: '已套用午後限定 9 折專屬優惠！' };
    } else if (clean === 'GOLDEN50') {
      setCouponCode('GOLDEN50');
      setAppliedDiscount(50);
      return { success: true, message: '已折抵 NT$50 午茶甜心金！' };
    } else if (clean === 'WELCOMEVIP') {
      const discount = Math.round(cartSubtotal * 0.15);
      setCouponCode('WELCOMEVIP');
      setAppliedDiscount(discount);
      return { success: true, message: 'VIP 新友特惠 85 折已折抵！' };
    }
    return { success: false, message: '查無此優惠碼或已過期，請確認後重試。' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedDiscount(0);
  };

  // Orders
  const createOrder = (data: {
    deliveryType: DeliveryType;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    address?: string;
    pickupOrDineinTime?: string;
    guestCount?: number;
    paymentMethod: 'credit_card' | 'line_pay' | 'apple_pay' | 'counter';
    usePoints?: boolean;
  }): Order => {
    const subtotal = cartSubtotal;
    let pointsDiscount = 0;
    let pointsUsed = 0;

    if (data.usePoints && user && user.points >= 100) {
      pointsUsed = Math.min(user.points, Math.floor(subtotal * 0.5)); // Can offset up to 50%
      pointsDiscount = pointsUsed;
    }

    const discount = appliedDiscount + pointsDiscount;
    const deliveryFee = data.deliveryType === 'delivery' && subtotal < 1200 ? 120 : 0;
    const totalAmount = Math.max(0, subtotal - discount + deliveryFee);

    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate()
    ).padStart(2, '0')}`;
    const randCode = Math.floor(100 + Math.random() * 900);
    const orderNumber = `MDT-${dateStr}-${randCode}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate()
      ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`,
      items: [...cart],
      deliveryType: data.deliveryType,
      status: 'received',
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      address: data.address,
      pickupOrDineinTime: data.pickupOrDineinTime,
      guestCount: data.guestCount,
      subtotal,
      discount,
      pointsUsed,
      deliveryFee,
      totalAmount,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'paid',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update member points: add 5% earned, deduct used
    if (user) {
      const earned = Math.floor(totalAmount * 0.05);
      setUser({
        ...user,
        points: Math.max(0, user.points - pointsUsed + earned),
      });
    }

    setLastCompletedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);

    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loginDemoUser,
        logout,
        registerUser,
        loginUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        favorites,
        toggleFavorite,
        isFavorite,
        orders,
        createOrder,
        couponCode,
        appliedDiscount,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        customizingItem,
        setCustomizingItem,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileOpen,
        setIsProfileOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastCompletedOrder,
        setLastCompletedOrder,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        deliveryType,
        setDeliveryType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
