import { useState, useEffect } from "react";

const useFetchCustomerTickets = (customerId) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/assets/data/tickets.json`);
        if (!response.ok) {
          throw new Error("Không thể tải danh sách ticket");
        }
        const data = await response.json();
        // Lọc tickets theo customerId và chuyển đổi số
        const customerTickets = data.filter(
          (ticket) => ticket.customerId === Number(customerId)
        );
        setTickets(customerTickets);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchTickets();
    }
  }, [customerId]);

  return { tickets, loading, error };
};

export default useFetchCustomerTickets;
