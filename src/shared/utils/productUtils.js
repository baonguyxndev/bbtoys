export const flattenProducts = (productsData) => {
  if (!Array.isArray(productsData)) return [];
  let allProducts = [];
  productsData.forEach((category) => {
    if (category?.items) {
      category.items.forEach((subCategory) => {
        if (subCategory?.products) {
          allProducts = allProducts.concat(subCategory.products);
        }
      });
    }
  });
  return allProducts;
};

export const getPriceRange = (products) => {
  const allPrices = products
    .flatMap((category) =>
      category.items.flatMap((item) =>
        (item.products || []).flatMap((product) =>
          (product.details || []).map((detail) => detail.price)
        )
      )
    )
    .filter((price) => price !== null && price !== undefined);

  return {
    min: allPrices.length > 0 ? Math.min(...allPrices) : 0,
    max: allPrices.length > 0 ? Math.max(...allPrices) : 0,
  };
};

export const filterAndSortProducts = (
  products,
  selectedCategories,
  searchQuery,
  sortOption,
  priceRange,
  hasActiveFilters
) => {
  let result = products
    .flatMap((category) =>
      category.items.flatMap((item) =>
        (item.products || []).map((product) => ({
          ...product,
          category: item.itemKey,
          categoryKey: category.categoryKey,
        }))
      )
    )
    .filter((product) => {
      if (!product?.details?.length) return false;

      if (!hasActiveFilters) return true;

      const matchesCategory =
        selectedCategories.size === 0 ||
        selectedCategories.has(product.categoryKey);

      const matchesSearch =
        !searchQuery ||
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase());

      const { min: minProductPrice, max: maxProductPrice } =
        getPriceRange(products);
      const matchesPrice =
        (priceRange.min === minProductPrice &&
          priceRange.max === maxProductPrice) ||
        product.details.some(
          (d) => d.price >= priceRange.min && d.price <= priceRange.max
        );

      return matchesCategory && matchesSearch && matchesPrice;
    });

  if (sortOption !== "latest") {
    result.sort((a, b) => {
      if (sortOption === "price-low-high") {
        return (
          Math.min(...a.details.map((d) => d.price)) -
          Math.min(...b.details.map((d) => d.price))
        );
      }
      if (sortOption === "price-high-low") {
        return (
          Math.max(...b.details.map((d) => d.price)) -
          Math.max(...a.details.map((d) => d.price))
        );
      }
      return 0;
    });
  }

  return result;
};

export const hasFiltersApplied = (
  products,
  selectedCategories,
  searchQuery,
  sortOption,
  priceRange
) => {
  if (!products.length) return false;
  const { min: minProductPrice, max: maxProductPrice } =
    getPriceRange(products);

  return (
    selectedCategories.size > 0 ||
    searchQuery.trim() !== "" ||
    sortOption !== "latest" ||
    priceRange.min !== minProductPrice ||
    priceRange.max !== maxProductPrice
  );
};
