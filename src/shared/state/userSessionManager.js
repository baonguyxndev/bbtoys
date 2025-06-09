import { create } from "zustand";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key"; // Nên được lưu trong biến môi trường
const USER_ID_KEY = "encrypted_user_id";

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Lỗi giải mã:", error);
    return null;
  }
};

// Hàm kiểm tra và xử lý sessionStorage
const getSessionStorage = (key) => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.warn("Không thể truy cập sessionStorage:", error);
    return null;
  }
};

const setSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.warn("Không thể lưu vào sessionStorage:", error);
  }
};

const removeSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn("Không thể xóa khỏi sessionStorage:", error);
  }
};

export const useUserSessionManager = create((set) => ({
  currentUser: null,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      const encryptedUserId = getSessionStorage(USER_ID_KEY);
      if (!encryptedUserId) {
        set({ currentUser: null, isLoading: false });
        return;
      }

      const userId = decryptData(encryptedUserId);
      if (!userId) {
        set({ currentUser: null, isLoading: false });
        return;
      }

      const response = await fetch("/assets/data/customers.json");
      const users = await response.json();
      const user = users.find((u) => String(u.id) === String(userId));

      set({ currentUser: user || null, isLoading: false });
    } catch (error) {
      console.error("Lỗi khởi tạo:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  login: async (user) => {
    try {
      const encryptedUserId = encryptData(user.id);
      setSessionStorage(USER_ID_KEY, encryptedUserId);
      set({ currentUser: user, error: null });

      // --- Merge cart_items_guest vào cart_items_{userId} nếu có ---
      const guestCart = localStorage.getItem("cart_items_guest");
      if (guestCart) {
        const userCartKey = `cart_items_${user.id}`;
        const userCart = localStorage.getItem(userCartKey);
        let mergedCart = [];
        if (userCart) {
          // Gộp 2 mảng, cộng dồn quantity nếu trùng sản phẩm
          const guestArr = JSON.parse(guestCart);
          const userArr = JSON.parse(userCart);
          mergedCart = [...userArr];
          guestArr.forEach((guestItem) => {
            const idx = mergedCart.findIndex(
              (item) =>
                item.id === guestItem.id &&
                item.scale === guestItem.scale &&
                item.model === guestItem.model &&
                item.version === guestItem.version
            );
            if (idx > -1) {
              mergedCart[idx].quantity += guestItem.quantity;
            } else {
              mergedCart.push(guestItem);
            }
          });
        } else {
          mergedCart = JSON.parse(guestCart);
        }
        localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
        localStorage.removeItem("cart_items_guest");
      }
      // --- END MERGE ---
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      set({ error: error.message });
    }
  },

  logout: () => {
    removeSessionStorage(USER_ID_KEY);
    set({ currentUser: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
