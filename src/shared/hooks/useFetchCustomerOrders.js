import { useState, useEffect } from "react";

const useFetchCustomerOrders = (customerId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/assets/data/orders.json`);
        if (!response.ok) {
          throw new Error("Không thể tải danh sách đơn hàng");
        }
        const data = await response.json();
        // Lọc orders theo customerId và chuyển đổi số
        const customerOrders = data.filter(
          (order) => order.customerId === Number(customerId)
        );
        setOrders(customerOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchOrders();
    }
  }, [customerId]);

  return { orders, loading, error };
};

export default useFetchCustomerOrders;
