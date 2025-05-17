import { useState, useEffect } from "react";

const useFetchMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch("/assets/data/materials.json");
        if (!response.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data = await response.json();
        setMaterials(data.materials);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  return { materials, loading, error };
};

export default useFetchMaterials;
