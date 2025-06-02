import { useState, useEffect } from "react";

const useFetchCustomerWishlist = (customerId) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/assets/data/wishlist.json`);
        if (!response.ok) {
          throw new Error("Không thể tải danh sách yêu thích");
        }
        const data = await response.json();
        // Lọc wishlist theo customerId và chuyển đổi số
        const customerWishlist = data.filter(
          (item) => item.customerId === Number(customerId)
        );
        setWishlist(customerWishlist);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchWishlist();
    }
  }, [customerId]);

  return { wishlist, loading, error };
};

export default useFetchCustomerWishlist;
