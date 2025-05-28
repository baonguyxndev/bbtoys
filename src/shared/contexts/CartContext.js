import React, { createContext, useContext } from "react";
import { useCart as useCartHook } from "../hooks/useCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cart = useCartHook();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
