import { useState, useEffect } from "react";

const useFetchCustomerTickets = (customerId, ticketId) => {
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState(null);
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

        if (ticketId) {
          // Nếu có ticketId, tìm ticket cụ thể
          const foundTicket = data.find(
            (ticket) => ticket.id === parseInt(ticketId)
          );
          if (!foundTicket) {
            throw new Error("Không tìm thấy ticket");
          }
          setTicket(foundTicket);
        } else if (customerId) {
          // Nếu có customerId, lọc ticket theo customer
          const customerTickets = data.filter(
            (ticket) => ticket.customerId === Number(customerId)
          );
          setTickets(customerTickets);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (customerId || ticketId) {
      fetchTickets();
    }
  }, [customerId, ticketId]);

  return { tickets, ticket, loading, error };
};

export default useFetchCustomerTickets;
