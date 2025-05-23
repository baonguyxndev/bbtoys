import { useState, useEffect } from "react";
import { flattenProducts } from "../utils/productUtils";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [flattenedProducts, setFlattenedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/assets/data/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Tạo bản đồ sản phẩm để truy xuất nhanh
        const flattened = flattenProducts(data);

        setProducts(data);
        setFlattenedProducts(flattened);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id) => {
    return flattenedProducts.find((product) => product.id === id) || null;
  };

  return {
    products,
    flattenedProducts,
    getProductById,
    loading,
    error,
  };
};

export default useFetchProducts;
