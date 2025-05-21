import { useState, useEffect } from "react";

const useFetchCustomer = (customerId) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch("/assets/data/customers.json");
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        const foundCustomer = data.find((c) => c.id === parseInt(customerId));

        if (!foundCustomer) {
          throw new Error("Không tìm thấy thông tin khách hàng");
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
        setCustomer(foundCustomer);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  return { customer, loading, error };
};

export default useFetchCustomer;
