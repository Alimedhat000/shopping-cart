// src/features/cart/context/CartContext.tsx

import { createContext } from 'react';
import { CartContextType } from '../types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export default CartContext;
