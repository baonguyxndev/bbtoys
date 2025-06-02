import { useState, useEffect } from "react";

const useFetchStudio = () => {
  const [studioes, setStudioes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/assets/data/studioes.json");
        if (!response.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data = await response.json();
        setStudioes(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching studioes");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { studioes, loading, error };
};
export default useFetchStudio;
