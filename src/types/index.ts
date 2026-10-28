export type MenuCategory = 'grand-sets' | 'patisserie' | 'scones-baked' | 'artisanal-tea';

export interface MenuItem {
  id: string;
  name: string;
  frenchName: string;
  description: string;
  price: number;
  category: MenuCategory;
  categoryName: string;
  image: string;
  isSignature?: boolean;
  isNew?: boolean;
  flavorNotes: string[];
  servings?: string;
  calories?: string;
  pairingRecommendation?: string;
  allowedCustomizations: {
    temperature?: boolean;
    sweetness?: boolean;
    clottedCream?: boolean;
    extraJam?: boolean;
    giftPackaging?: boolean;
  };
}

export interface CustomizationOptions {
  temperature?: '熱沖 Hot' | '冰鎮 Iced' | '常溫 Room Temp';
  sweetness?: '原味甜度 Standard' | '微甜 Low Sugar' | '無糖 Unsweetened';
  clottedCream?: boolean;
  extraJam?: boolean;
  giftPackaging?: boolean;
  specialInstructions?: string;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  customizations: CustomizationOptions;
  unitPrice: number;
  totalPrice: number;
}

export type MemberTier = 'bronze' | 'gold' | 'diamond';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: MemberTier;
  points: number;
  birthday: string;
  joinDate: string;
  savedAddresses: string[];
  favorites: string[];
}

export interface SeatingZone {
  id: string;
  name: string;
  frenchName: string;
  description: string;
  image: string;
  suitableFor: string;
  capacityRange: string;
  lighting: string;
  soundscape: string;
  highlight: string;
  availableTables: number;
  atmosphereBadge: string;
}

export type DeliveryType = 'delivery' | 'pickup' | 'dinein';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  deliveryType: DeliveryType;
  status: 'received' | 'baking' | 'delivering' | 'completed';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address?: string;
  pickupOrDineinTime?: string;
  guestCount?: number;
  seatingZone?: string;
  subtotal: number;
  discount: number;
  pointsUsed: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'credit_card' | 'line_pay' | 'apple_pay' | 'counter';
  paymentStatus: 'paid' | 'pending';
}

