import "../shop/styles/Shop.css";
import React, { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import ProductItem from "../../shared/components/ProductItem/ProductItem";
import ProductModal from "../../shared/components/ProductModal/ProductModal";
import { useSearchParams } from "react-router-dom";
import useFetchProducts from "../../shared/hooks/useFetchProducts.js";
import Loading from "../../shared/components/Loading/Loading.js";
import {
  getPriceRange,
  filterAndSortProducts,
  hasFiltersApplied,
} from "../../shared/utils/productUtils";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useFetchProducts();
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
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [showPrice, setShowPrice] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isReady, setIsReady] = useState(false); // Thêm trạng thái isReady

  // Tính toán min/max price sau khi dữ liệu products được tải
  useEffect(() => {
    if (products.length > 0) {
      const { min: minPrice, max: maxPrice } = getPriceRange(products);
      setPriceRange({
        min: parseInt(searchParams.get("minPrice")) || minPrice,
        max: parseInt(searchParams.get("maxPrice")) || maxPrice,
      });
    }
  }, [products, searchParams]);

  // Tạo cấu trúc category tree từ products
  const categoryTree = useMemo(() => {
    if (!products.length) return [];
    return products.map((category) => ({
      key: category.categoryKey,
      items: category.items.map((item) => ({
        key: item.itemKey,
        items: [],
      })),
    }));
  }, [products]);

  // Kiểm tra xem có filter nào được áp dụng không
  const hasActiveFilters = useMemo(() => {
    return hasFiltersApplied(
      products,
      selectedCategories,
      searchQuery,
      sortOption,
      priceRange
    );
  }, [products, selectedCategories, searchQuery, sortOption, priceRange]);

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(
      products,
      selectedCategories,
      searchQuery,
      sortOption,
      priceRange,
      hasActiveFilters
    );
  }, [
    products,
    selectedCategories,
    searchQuery,
    sortOption,
    priceRange,
    hasActiveFilters,
  ]);

  // Đảm bảo chỉ hiển thị nội dung khi filteredProducts đã sẵn sàng
  useEffect(() => {
    if (!loading && products.length > 0) {
      // Đợi một khoảng thời gian nhỏ để đảm bảo filteredProducts đã được tính toán
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100); // Độ trễ nhỏ để đảm bảo tính toán hoàn tất
      return () => clearTimeout(timer);
    }
  }, [loading, products]);

  // Cập nhật URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (sortOption !== "latest") params.set("sort", sortOption);
    if (products.length > 0) {
      const { min: minProductPrice, max: maxProductPrice } =
        getPriceRange(products);
      if (priceRange.min !== minProductPrice) {
        params.set("minPrice", priceRange.min);
      }
      if (priceRange.max !== maxProductPrice) {
        params.set("maxPrice", priceRange.max);
      }
    }
    setSearchParams(params);
  }, [searchQuery, sortOption, priceRange, setSearchParams, products]);

  // Event handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
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

  const handleOpenProductModal = (id) => {
    setSelectedProductId(id);
  };

  const handleCloseProductModal = () => {
    setSelectedProductId(null);
  };

  const selectedProduct = filteredProducts.find(
    (product) => product.id === selectedProductId
  );

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

      {/* Hiển thị Loading ngay sau title */}
      {loading || !isReady ? (
        <Loading />
      ) : error ? (
        <div className="text-center py-5">{error}</div>
      ) : (
        <div className="container-full">
          <div className="row g-4">
            <div className="col-md-2.5S hidden">
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
                  className={`sidebar-title ${
                    !showCategory ? "collapsed" : ""
                  }`}
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
                                parseInt(e.target.value) || priceRange.min
                              )
                            }
                            min={
                              products.length > 0
                                ? getPriceRange(products).min
                                : 0
                            }
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
                                parseInt(e.target.value) || priceRange.max
                              )
                            }
                            min={priceRange.min}
                            max={
                              products.length > 0
                                ? getPriceRange(products).max
                                : 0
                            }
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        className="price-slider"
                        min={
                          products.length > 0 ? getPriceRange(products).min : 0
                        }
                        max={
                          products.length > 0 ? getPriceRange(products).max : 0
                        }
                        value={priceRange.max}
                        onChange={(e) =>
                          handlePriceChange("max", parseInt(e.target.value))
                        }
                      />
                      <div className="price-labels">
                        <span>
                          {products.length > 0
                            ? getPriceRange(products).min.toLocaleString(
                                "vi-VN"
                              )
                            : 0}{" "}
                          ₫
                        </span>
                        <span>
                          {products.length > 0
                            ? getPriceRange(products).max.toLocaleString(
                                "vi-VN"
                              )
                            : 0}{" "}
                          ₫
                        </span>
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
              <div className="products-container">
                <div className="row g-4">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={`${product.categoryKey}-${product.category}-${product.id}`}
                        className="col-xl-3 col-lg-4 col-md-4 col-sm-6"
                      >
                        <ProductItem
                          product={product}
                          onOpenModal={handleOpenProductModal}
                        />
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
            </div>
          </div>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProductId}
        onClose={handleCloseProductModal}
      />
    </div>
  );
};

export default Shop;
