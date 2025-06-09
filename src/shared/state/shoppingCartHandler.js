import { create } from "zustand";
import { useUserSessionManager } from "./userSessionManager";

const getStorageKey = (userId) =>
  userId ? `cart_items_${userId}` : "cart_items_guest";

// Hàm kiểm tra và xử lý localStorage
const getLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn("Không thể truy cập localStorage:", error);
    return null;
  }
};

const setLocalStorage = (key, value) => {
  try {
    if (
      !value ||
      (Array.isArray(JSON.parse(value)) && JSON.parse(value).length === 0)
    ) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.warn("Không thể lưu vào localStorage:", error);
  }
};

const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Không thể xóa khỏi localStorage:", error);
  }
};

export const useShoppingCartHandler = create((set, get) => ({
  cartItems: [],
  isLoading: true,
  error: null,

  initialize: () => {
    try {
      const { currentUser } = useUserSessionManager.getState();
      const storageKey = getStorageKey(currentUser?.id);
      const storedCart = getLocalStorage(storageKey);
      set({
        cartItems: storedCart ? JSON.parse(storedCart) : [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Lỗi khởi tạo giỏ hàng:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  saveToStorage: () => {
    const { currentUser } = useUserSessionManager.getState();
    const { cartItems } = get();
    const storageKey = getStorageKey(currentUser?.id);
    setLocalStorage(storageKey, JSON.stringify(cartItems));
  },

  addToCart: ({ id, scale, model, version, quantity }) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) =>
          item.id === id &&
          item.scale === scale &&
          item.model === model &&
          item.version === version
      );

      let newCartItems;
      if (existingItem) {
        newCartItems = state.cartItems.map((item) =>
          item.id === id &&
          item.scale === scale &&
          item.model === model &&
          item.version === version
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCartItems = [
          ...state.cartItems,
          { id, scale, model, version, quantity },
        ];
      }

      return { cartItems: newCartItems };
    });

    get().saveToStorage();
  },

  removeFromCart: (id, scale, model, version) => {
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.scale === scale &&
            item.model === model &&
            item.version === version
          )
      ),
    }));

    get().saveToStorage();
  },

  updateQuantity: (id, scale, model, version, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id &&
        item.scale === scale &&
        item.model === model &&
        item.version === version
          ? { ...item, quantity }
          : item
      ),
    }));

    get().saveToStorage();
  },

  clearCart: () => {
    set({ cartItems: [] });
    const { currentUser } = useUserSessionManager.getState();
    const storageKey = getStorageKey(currentUser?.id);
    removeLocalStorage(storageKey);
  },

  getCartTotal: () => {
    const { cartItems } = get();
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
  },

  getCartItemsCount: () => {
    const { cartItems } = get();
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  },
}));
