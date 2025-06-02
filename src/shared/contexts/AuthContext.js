import { useState, useEffect } from "react";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (userId) setCurrentUser({ id: userId });
    } catch (error) {
      setCurrentUser(null);
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    try {
      sessionStorage.setItem("userId", user.id);
    } catch {}
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem("userId");
    } catch {}
  };

  // ...return Provider như cũ
};
