import { useState, useEffect } from "react";

const useFetchCustomer = (id) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const response = await fetch("/assets/data/customers.json");
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        const foundCustomer = data.find((c) => c.id === parseInt(id));

        if (!foundCustomer) {
          throw new Error("Customer not found");
        }

        setCustomer(foundCustomer);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  return { customer, loading, error };
};

export default useFetchCustomer;
