import { useState, useEffect } from "react";

const CART_STORAGE_KEY = "cart_items";

export const useCart = () => {
  // Khởi tạo state từ localStorage ngay lần đầu
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  // Luôn đồng bộ state với localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.warn("Không thể lưu vào localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = ({ id, scale, model, version, quantity }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === id &&
          item.scale === scale &&
          item.model === model &&
          item.version === version
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id &&
          item.scale === scale &&
          item.model === model &&
          item.version === version
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { id, scale, model, version, quantity }];
    });
  };

  const removeFromCart = (id, scale, model, version) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.scale === scale &&
            item.model === model &&
            item.version === version
          )
      )
    );
  };

  const updateQuantity = (id, scale, model, version, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id &&
        item.scale === scale &&
        item.model === model &&
        item.version === version
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.warn("Không thể xóa localStorage:", error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };
};
