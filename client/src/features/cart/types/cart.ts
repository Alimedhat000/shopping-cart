// src/features/cart/types/cart.ts

export interface CartItem {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity?: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  subtotal: number;
  itemCount: number;
}

export interface CartProviderProps {
  children: React.ReactNode;
}
