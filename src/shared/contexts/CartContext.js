import { useState, useEffect } from "react";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Lấy cart theo userId sau khi đã mount
  useEffect(() => {
    try {
      const userId = sessionStorage.getItem("userId");
      const key = userId ? `cart_${userId}` : "cart_guest";
      const storedCart = localStorage.getItem(key);
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    } catch {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      const userId = sessionStorage.getItem("userId");
      const key = userId ? `cart_${userId}` : "cart_guest";
      localStorage.setItem(key, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // ...các hàm addToCart, removeFromCart, ... giữ nguyên
};
