import { useState, useEffect } from "react";

const useFetchCustomerOrders = (customerId, orderId) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customerId && !orderId) {
      setLoading(false);
      return;
    }
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/assets/data/orders.json`);
        if (!response.ok) {
          throw new Error("Không thể tải danh sách đơn hàng");
        }
        const data = await response.json();

        if (orderId) {
          // Nếu có orderId, tìm đơn hàng cụ thể
          const foundOrder = data.find(
            (order) => order.id === parseInt(orderId)
          );
          if (!foundOrder) {
            throw new Error("Không tìm thấy đơn hàng");
          }
          setOrder(foundOrder);
        } else if (customerId) {
          // Nếu có customerId, lọc đơn hàng theo customer
          const customerOrders = data.filter(
            (order) => order.customerId === Number(customerId)
          );
          setOrders(customerOrders);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (customerId || orderId) {
      fetchOrders();
    }
  }, [customerId, orderId]);

  return { orders, order, loading, error };
};

export default useFetchCustomerOrders;
