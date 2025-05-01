// productUtils.js
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

export const hasFiltersApplied = (
  products,
  selectedCategories,
  selectedItems,
  selectedStudios,
  selectedPhases,
  selectedScales,
  selectedStates,
  searchQuery,
  sortOption,
  priceRange
) => {
  const { min: minPrice, max: maxPrice } = getPriceRange(products);
  return (
    selectedCategories.size > 0 ||
    selectedItems.size > 0 ||
    selectedStudios.size > 0 ||
    selectedPhases.size > 0 ||
    selectedScales.size > 0 ||
    selectedStates.size > 0 ||
    searchQuery ||
    sortOption !== "latest" ||
    priceRange.min !== minPrice ||
    priceRange.max !== maxPrice
  );
};

export const filterAndSortProducts = (
  products,
  filters,
  searchQuery,
  sortOption,
  priceRange,
  hasActiveFilters
) => {
  let filteredProducts = [];

  // Duyệt qua từng category
  products.forEach((category) => {
    const { categoryKey, items } = category;

    // Lọc theo categoryKey (nếu có trong selectedCategories)
    if (filters.categories.size === 0 || filters.categories.has(categoryKey)) {
      // Duyệt qua từng item trong category
      items.forEach((item) => {
        const { itemKey, products: itemProducts } = item;

        // Lọc theo itemKey (nếu có trong selectedItems hoặc categoryKey được chọn)
        if (filters.items.size === 0 || filters.items.has(itemKey)) {
          // Lọc sản phẩm trong item
          const filteredItemProducts = itemProducts.filter((product) => {
            // Lọc theo các tiêu chí khác (studio, phase, scale, state, price, search)
            const matchesStudio =
              filters.studios.size === 0 || filters.studios.has(product.brand);
            const matchesPhase =
              filters.phases.size === 0 || filters.phases.has(product.phase);
            const matchesScale =
              filters.scales.size === 0 ||
              (Array.isArray(product.details) &&
                product.details.some((detail) =>
                  filters.scales.has(detail.scale)
                ));
            const matchesState =
              filters.states.size === 0 || filters.states.has(product.state);
            const matchesPrice =
              Array.isArray(product.details) &&
              product.details.some(
                (detail) =>
                  detail.price >= priceRange.min &&
                  detail.price <= priceRange.max
              );
            const matchesSearch =
              !searchQuery ||
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.brand.toLowerCase().includes(searchQuery.toLowerCase());

            return (
              matchesStudio &&
              matchesPhase &&
              matchesScale &&
              matchesState &&
              matchesPrice &&
              matchesSearch
            );
          });

          filteredProducts = [...filteredProducts, ...filteredItemProducts];
        }
      });
    }
  });

  // Sắp xếp sản phẩm
  if (sortOption === "price-low-high") {
    filteredProducts.sort((a, b) => {
      const aMinPrice = Array.isArray(a.details)
        ? Math.min(...a.details.map((d) => d.price))
        : Infinity; // Giá trị mặc định nếu details không tồn tại
      const bMinPrice = Array.isArray(b.details)
        ? Math.min(...b.details.map((d) => d.price))
        : Infinity;
      return aMinPrice - bMinPrice;
    });
  } else if (sortOption === "price-high-low") {
    filteredProducts.sort((a, b) => {
      const aMinPrice = Array.isArray(a.details)
        ? Math.min(...a.details.map((d) => d.price))
        : -Infinity; // Giá trị mặc định nếu details không tồn tại
      const bMinPrice = Array.isArray(b.details)
        ? Math.min(...b.details.map((d) => d.price))
        : -Infinity;
      return bMinPrice - aMinPrice;
    });
  } else {
    // Mặc định: latest (có thể dựa vào id hoặc ngày thêm)
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  return filteredProducts;
};
