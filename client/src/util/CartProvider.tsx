import React, { useState, useContext, createContext, ReactNode } from 'react';

// Define types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity?: number; // Make quantity optional in product interface
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  subtotal: number;
  itemCount: number; // Added to display cart count
}

export interface CartProviderProps {
  children: ReactNode;
}

// Create a cart context to manage cart state across components
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to cart with optional quantity parameter
  const addToCart = (product: Product, quantity: number = 1): void => {
    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size
    );

    if (existingItem) {
      // If item already exists, increase quantity by the specified amount
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Add new item with specified quantity
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId: number): void => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: number, newQuantity: number): void => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total number of items
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
