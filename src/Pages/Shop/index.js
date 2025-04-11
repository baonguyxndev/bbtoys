import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import ProductItem from "../../Components/ProductItem";
import products from "../../assets/data/products.json";
import { useSearchParams } from "react-router-dom";

// Tính toán giá min và max từ tất cả sản phẩm
const { minProductPrice, maxProductPrice } = (() => {
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
    minProductPrice: Math.min(...allPrices),
    maxProductPrice: Math.max(...allPrices),
  };
})();

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "latest"
  );
  const [expandedCategories, setExpandedCategories] = useState(
    new Set(["PRODUCTS"])
  );
  const [priceRange, setPriceRange] = useState({
    min: parseInt(searchParams.get("minPrice")) || minProductPrice,
    max: parseInt(searchParams.get("maxPrice")) || maxProductPrice,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPrice, setShowPrice] = useState(true);
  const [showCategory, setShowCategory] = useState(true);

  // Tạo cấu trúc category tree từ products.json
  const categoryTree = useMemo(() => {
    return products.map((category) => ({
      key: category.categoryKey,
      items: category.items.map((item) => ({
        key: item.itemKey,
        items: [],
      })),
    }));
  }, []);

  // Kiểm tra xem có filter nào được áp dụng không
  const hasActiveFilters = useMemo(() => {
    return (
      selectedCategories.size > 0 ||
      searchQuery.trim() !== "" ||
      sortOption !== "latest" ||
      priceRange.min !== minProductPrice ||
      priceRange.max !== maxProductPrice
    );
  }, [selectedCategories, searchQuery, sortOption, priceRange]);

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
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

        // Nếu không có filter nào được áp dụng, hiển thị tất cả sản phẩm
        if (!hasActiveFilters) return true;

        const matchesCategory =
          selectedCategories.size === 0 ||
          selectedCategories.has(product.categoryKey);

        const matchesSearch =
          !searchQuery ||
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPrice =
          (priceRange.min === minProductPrice &&
            priceRange.max === maxProductPrice) ||
          product.details.some(
            (d) => d.price >= priceRange.min && d.price <= priceRange.max
          );

        return matchesCategory && matchesSearch && matchesPrice;
      });

    // Chỉ sắp xếp khi có lựa chọn sort
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
  }, [
    selectedCategories,
    searchQuery,
    sortOption,
    priceRange,
    hasActiveFilters,
  ]);

  // Cập nhật URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (sortOption !== "latest") params.set("sort", sortOption);
    if (priceRange.min !== minProductPrice)
      params.set("minPrice", priceRange.min);
    if (priceRange.max !== maxProductPrice)
      params.set("maxPrice", priceRange.max);
    setSearchParams(params);
  }, [searchQuery, sortOption, priceRange, setSearchParams]);

  // Reset loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filteredProducts]);

  // Event handlers
  const handleSearchChange = (e) => {
    setIsLoading(true);
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setIsLoading(true);
    setSortOption(e.target.value);
  };

  const toggleCategory = (categoryKey) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey);
      } else {
        newSet.add(categoryKey);
      }
      return newSet;
    });
  };

  const toggleCategorySelection = (categoryKey) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey);
      } else {
        newSet.add(categoryKey);
      }
      return newSet;
    });
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Render category item
  const renderCategoryItem = (category, level = 0, parentKey = "") => {
    const hasChildren = category.items?.length > 0;
    const isExpanded = expandedCategories.has(category.key);
    const isSelected = selectedCategories.has(category.key);
    const uniqueKey = parentKey ? `${parentKey}-${category.key}` : category.key;

    return (
      <div key={uniqueKey} style={{ marginLeft: `${level * 20}px` }}>
        <div className="category-item">
          {hasChildren && (
            <span
              className="expand-icon"
              onClick={() => toggleCategory(category.key)}
            >
              {isExpanded ? <FiMinus /> : <FiPlus />}
            </span>
          )}
          <input
            type="checkbox"
            className="category-checkbox"
            checked={isSelected}
            onChange={() => toggleCategorySelection(category.key)}
          />
          <div className="category-label">
            <span>{category.key}</span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="subcategory-list">
            {category.items.map((subCategory, index) =>
              renderCategoryItem(subCategory, level + 1, uniqueKey)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="shop">
      <div className="title mt-2 hidden">
        <h2>
          <div className="line"></div>
          <span className="titleMain">Shop</span>
          <div className="line"></div>
        </h2>
      </div>
      <div className="container-full">
        <div className="row g-4">
          <div className="col-md-2.5S">
            <div className="sidebar">
              {/* Search và Sort */}
              <div className="sidebar-section">
                <div className="search position-relative mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or brand..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <span className="search-icon">
                    <button type="button">
                      <IoSearch />
                    </button>
                  </span>
                </div>
                <div className="sort position-relative">
                  <select
                    className="form-select"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="latest">Sort by latest</option>
                    <option value="price-low-high">
                      Sort by price: low to high
                    </option>
                    <option value="price-high-low">
                      Sort by price: high to low
                    </option>
                  </select>
                  <span className="sort-icon">
                    <IoIosArrowDown />
                  </span>
                </div>
              </div>

              {/* Categories */}
              <div
                className={`sidebar-title ${!showCategory ? "collapsed" : ""}`}
                onClick={() => setShowCategory(!showCategory)}
              >
                <span>Categories</span>
                {showCategory ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
              {showCategory && (
                <div className="sidebar-section">
                  <div className="category-tree">
                    {categoryTree.map((category) =>
                      renderCategoryItem(category)
                    )}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div
                className={`sidebar-title ${!showPrice ? "collapsed" : ""}`}
                onClick={() => setShowPrice(!showPrice)}
              >
                <span>Price Range</span>
                {showPrice ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
              {showPrice && (
                <div className="sidebar-section">
                  <div className="price-range">
                    <div className="price-inputs mb-3">
                      <div className="price-input-group">
                        <label>Min Price</label>
                        <input
                          type="number"
                          className="price-input"
                          value={priceRange.min}
                          onChange={(e) =>
                            handlePriceChange(
                              "min",
                              parseInt(e.target.value) || minProductPrice
                            )
                          }
                          min={minProductPrice}
                          max={priceRange.max}
                        />
                      </div>
                      <div className="price-input-group">
                        <label>Max Price</label>
                        <input
                          type="number"
                          className="price-input"
                          value={priceRange.max}
                          onChange={(e) =>
                            handlePriceChange(
                              "max",
                              parseInt(e.target.value) || maxProductPrice
                            )
                          }
                          min={priceRange.min}
                          max={maxProductPrice}
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      className="price-slider"
                      min={minProductPrice}
                      max={maxProductPrice}
                      value={priceRange.max}
                      onChange={(e) =>
                        handlePriceChange("max", parseInt(e.target.value))
                      }
                    />
                    <div className="price-labels">
                      <span>{minProductPrice.toLocaleString("vi-VN")} ₫</span>
                      <span>{maxProductPrice.toLocaleString("vi-VN")} ₫</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedCategories.size > 0 && (
                <div className="sidebar-section selected-filters">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="m-0">Selected Filters</h6>
                    <button
                      className="clear-filters"
                      onClick={() => setSelectedCategories(new Set())}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="selected-categories">
                    {Array.from(selectedCategories).map((category) => (
                      <div key={category} className="selected-category">
                        <span>{category}</span>
                        <button
                          onClick={() => toggleCategorySelection(category)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-9">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="products-container">
                <div className="row g-4">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={`${product.categoryKey}-${product.category}-${product.id}`}
                        className="col-xl-3 col-lg-4 col-md-4 col-sm-6"
                      >
                        <ProductItem product={product} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <div className="text-center py-5 bg-white rounded">
                        <h3>No products found</h3>
                        <p>Try adjusting your filters or search terms</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
