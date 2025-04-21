import { useState, useEffect } from "react";

const useFetchLicenses = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await fetch("/assets/data/licenses.json");
        if (!response.ok) {
          throw new Error("Failed to fetch licenses");
        }
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLicenses(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching categories");
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  return { licenses, loading, error };
};
export default useFetchLicenses;
