import "../shop/styles/Shop.css";
import React, { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuFilterX } from "react-icons/lu";
import ProductItem from "../../shared/components/ProductItem/ProductItem";
import ProductModal from "../../shared/components/ProductModal/ProductModal";
import { useSearchParams } from "react-router-dom";
import useFetchProducts from "../../shared/hooks/useFetchProducts.js";
import useLayout from "../../shared/hooks/useLayout.js";
import usePagination from "../../shared/hooks/usePagination.js";
import Loading from "../../shared/components/Loading/Loading.js";
import LayoutOptions from "../../shared/components/LayoutOptions/LayoutOptions";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  getPriceRange,
  filterAndSortProducts,
  hasFiltersApplied,
} from "../../shared/utils/productUtils";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useFetchProducts();
  const {
    selectedLayout,
    showLayout,
    handleLayoutChange,
    toggleLayoutVisibility,
  } = useLayout();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "latest"
  );
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [isReady, setIsReady] = useState(false);

  // Trạng thái cho các bộ lọc
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectedStudios, setSelectedStudios] = useState(new Set());
  const [selectedPhases, setSelectedPhases] = useState(new Set());
  const [selectedScales, setSelectedScales] = useState(new Set());
  const [selectedStates, setSelectedStates] = useState(new Set());
  const [selectedNsfw, setSelectedNsfw] = useState(new Set());

  // Trạng thái mở rộng cho các danh mục
  const [expandedCategories, setExpandedCategories] = useState(
    new Set(["PRODUCTS"])
  );
  const [expandedStudios, setExpandedStudios] = useState(new Set());
  const [expandedPhases, setExpandedPhases] = useState(new Set());
  const [expandedScales, setExpandedScales] = useState(new Set());
  const [expandedStates, setExpandedStates] = useState(new Set());

  // Trạng thái hiển thị cho các phần
  const [showPrice, setShowPrice] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showStudio, setShowStudio] = useState(false);
  const [showPhase, setShowPhase] = useState(false);
  const [showScale, setShowScale] = useState(false);
  const [showState, setShowState] = useState(false);
  const [showNsfw, setShowNsfw] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Tính toán min/max price
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const { min: minPrice, max: maxPrice } = getPriceRange(products);
      setPriceRange({
        min: parseInt(searchParams.get("minPrice")) || minPrice,
        max: parseInt(searchParams.get("maxPrice")) || maxPrice,
      });
    }
  }, [products, searchParams]);

  // Tạo cấu trúc cây cho các danh mục
  const categoryTree = useMemo(() => {
    if (!Array.isArray(products) || !products.length) return [];
    return products.map((category) => ({
      key: category.categoryKey || "Unknown",
      name: category.categoryName || "Unknown",
      items: Array.isArray(category.items)
        ? category.items.map((item) => ({
            key: item.itemKey || "Unknown",
            items: [],
          }))
        : [],
    }));
  }, [products]);

  const studioTree = useMemo(() => {
    if (!Array.isArray(products) || !products.length) return [];
    const studios = new Set(
      products
        .flatMap((category) =>
          Array.isArray(category.items)
            ? category.items.flatMap((item) =>
                Array.isArray(item.products)
                  ? item.products.map((product) => product.brand)
                  : []
              )
            : []
        )
        .filter(Boolean)
    );
    return Array.from(studios).map((studio) => ({
      key: studio,
      items: [],
    }));
  }, [products]);

  const phaseTree = useMemo(() => {
    if (!Array.isArray(products) || !products.length) return [];
    const phases = new Set(
      products
        .flatMap((category) =>
          Array.isArray(category.items)
            ? category.items.flatMap((item) =>
                Array.isArray(item.products)
                  ? item.products.map((product) => product.phase)
                  : []
              )
            : []
        )
        .filter(Boolean)
    );
    return Array.from(phases).map((phase) => ({
      key: phase,
      items: [],
    }));
  }, [products]);

  const scaleTree = useMemo(() => {
    if (!Array.isArray(products) || !products.length) return [];
    const scales = new Set(
      products
        .flatMap((category) =>
          Array.isArray(category.items)
            ? category.items.flatMap((item) =>
                Array.isArray(item.products)
                  ? item.products.flatMap((product) =>
                      Array.isArray(product.details)
                        ? product.details.map((detail) => detail.scale)
                        : []
                    )
                  : []
              )
            : []
        )
        .filter(Boolean)
    );
    return Array.from(scales).map((scale) => ({
      key: scale,
      items: [],
    }));
  }, [products]);

  const stateTree = useMemo(() => {
    if (!Array.isArray(products) || !products.length) return [];
    const states = new Set(
      products
        .flatMap((category) =>
          Array.isArray(category.items)
            ? category.items.flatMap((item) =>
                Array.isArray(item.products)
                  ? item.products.map((product) => product.state)
                  : []
              )
            : []
        )
        .filter(Boolean)
    );
    return Array.from(states).map((state) => ({
      key: state,
      items: [],
    }));
  }, [products]);

  const nsfwTree = useMemo(() => {
    if (!Array.isArray(products) || !products.length) return [];
    const nsfwOptions = new Set(
      products
        .flatMap((category) =>
          Array.isArray(category.items)
            ? category.items.flatMap((item) =>
                Array.isArray(item.products)
                  ? item.products.map((product) => product.nsfw)
                  : []
              )
            : []
        )
        .filter(Boolean) // Lọc bỏ các giá trị null
    );
    return Array.from(nsfwOptions).map((nsfw) => ({
      key: nsfw,
      items: [],
    }));
  }, [products]);

  // Kiểm tra bộ lọc được áp dụng
  const hasActiveFilters = useMemo(() => {
    return hasFiltersApplied(
      products,
      selectedCategories,
      selectedItems,
      selectedStudios,
      selectedPhases,
      selectedScales,
      selectedStates,
      selectedNsfw,
      searchQuery,
      sortOption,
      priceRange
    );
  }, [
    products,
    selectedCategories,
    selectedItems,
    selectedStudios,
    selectedPhases,
    selectedScales,
    selectedStates,
    selectedNsfw,
    searchQuery,
    sortOption,
    priceRange,
  ]);

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(
      products,
      {
        categories: selectedCategories,
        items: selectedItems,
        studios: selectedStudios,
        phases: selectedPhases,
        scales: selectedScales,
        states: selectedStates,
        nsfw: selectedNsfw,
      },
      searchQuery,
      sortOption,
      priceRange,
      hasActiveFilters
    );
  }, [
    products,
    selectedCategories,
    selectedItems,
    selectedStudios,
    selectedPhases,
    selectedScales,
    selectedStates,
    selectedNsfw,
    searchQuery,
    sortOption,
    priceRange,
    hasActiveFilters,
  ]);

  // Đảm bảo nội dung hiển thị khi dữ liệu sẵn sàng
  useEffect(() => {
    if (!loading && Array.isArray(products) && products.length > 0) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, products]);

  // Cập nhật URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (sortOption !== "latest") params.set("sort", sortOption);
    if (Array.isArray(products) && products.length > 0) {
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

  const toggleCategory = (type, key) => {
    const setExpanded = {
      categories: setExpandedCategories,
      studios: setExpandedStudios,
      phases: setExpandedPhases,
      scales: setExpandedScales,
      states: setExpandedStates,
    }[type];
    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const toggleSelection = (type, key, parentCategoryKey = null) => {
    console.log("toggleSelection called:", { type, key, parentCategoryKey });

    if (type === "categories") {
      setSelectedCategories((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(key)) {
          newSet.delete(key);
          setSelectedItems((prevItems) => {
            const newItems = new Set(prevItems);
            products
              .find((cat) => cat.categoryKey === key)
              ?.items?.forEach((item) => newItems.delete(item.itemKey));
            console.log(
              "Updated selectedItems after category deselection:",
              Array.from(newItems)
            );
            return newItems;
          });
        } else {
          newSet.add(key);
        }
        console.log("Updated selectedCategories:", Array.from(newSet));
        return newSet;
      });
    } else if (type === "items") {
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        const isSelecting = !newSet.has(key);
        if (isSelecting) {
          newSet.add(key);
        } else {
          newSet.delete(key);
        }
        console.log("Updated selectedItems:", Array.from(newSet));

        if (parentCategoryKey && products.length > 0) {
          setSelectedCategories((prevCats) => {
            const newCats = new Set(prevCats);
            if (newSet.size > 0) {
              newCats.add(parentCategoryKey);
            } else {
              const hasRemainingItems = products
                .find((cat) => cat.categoryKey === parentCategoryKey)
                ?.items?.some(
                  (item) => item.itemKey !== key && newSet.has(item.itemKey)
                );
              if (!hasRemainingItems) {
                newCats.delete(parentCategoryKey);
              }
            }
            console.log(
              "Updated selectedCategories after item change:",
              Array.from(newCats)
            );
            return newCats;
          });
        } else {
          console.log(
            "Skipping selectedCategories update: parentCategoryKey is null or products empty"
          );
        }
        return newSet;
      });
    } else if (type === "nsfw") {
      setSelectedNsfw((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(key)) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
        console.log("Updated selectedNsfw:", Array.from(newSet));
        return newSet;
      });
    } else {
      const setSelected = {
        studios: setSelectedStudios,
        phases: setSelectedPhases,
        scales: setSelectedScales,
        states: setSelectedStates,
      }[type];
      setSelected((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(key)) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
        console.log(`Updated selected (${type}):`, Array.from(newSet));
        return newSet;
      });
    }
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

  const { currentPage, totalPages, paginatedItems, handlePageChange } =
    usePagination(filteredProducts);

  const renderCategoryItem = (category, level = 0, parentKey = null, type) => {
    const hasChildren = category.items?.length > 0;
    const isExpanded = {
      categories: expandedCategories,
      items: expandedCategories,
      studios: expandedStudios,
      phases: expandedPhases,
      scales: expandedScales,
      states: expandedStates,
      nsfw: expandedStates,
    }[type].has(category.key);
    const isSelected =
      type === "items"
        ? selectedItems.has(category.key)
        : {
            categories: selectedCategories,
            studios: selectedStudios,
            phases: selectedPhases,
            scales: selectedScales,
            states: selectedStates,
            nsfw: selectedNsfw,
          }[type].has(category.key);

    const uniqueKey = parentKey ? `${parentKey}-${category.key}` : category.key;

    let isIndeterminate = false;
    if (type === "categories" && hasChildren) {
      const categoryItems =
        products.find((cat) => cat.categoryKey === category.key)?.items || [];
      const selectedItemCount = categoryItems.filter((item) =>
        selectedItems.has(item.itemKey)
      ).length;
      isIndeterminate =
        selectedItemCount > 0 && selectedItemCount < categoryItems.length;
    }

    return (
      <div key={uniqueKey} style={{ marginLeft: `${level * 20}px` }}>
        <div className="category-item">
          {hasChildren && (
            <span
              className="expand-icon"
              onClick={() => toggleCategory(type, category.key)}
            >
              {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          )}
          <div className="category-label">
            <span>{type === "categories" ? category.name : category.key}</span>
          </div>
          <input
            type="checkbox"
            className="category-checkbox"
            checked={isSelected}
            ref={(el) => {
              if (el) el.indeterminate = isIndeterminate;
            }}
            onChange={() => {
              type === "items"
                ? toggleSelection(type, category.key, parentKey)
                : toggleSelection(type, category.key);
            }}
          />
        </div>

        {hasChildren && isExpanded && (
          <div className="subcategory-list">
            {category.items.map((subCategory) =>
              renderCategoryItem(subCategory, level + 1, category.key, "items")
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

      {loading || !isReady ? (
        <Loading />
      ) : error ? (
        <div className="text-center py-5">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          Oops!!! Sorry. No Matching Products Found!
        </div>
      ) : (
        <div className="container-full">
          <div className="row">
            <div className="col-md-3 hidden">
              <div className="sidebar">
                <div className="sidebar-section">
                  <div className="search position-relative mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by name or studio..."
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
                        Sort by price: Low to High
                      </option>
                      <option value="price-high-low">
                        Sort by price: High to Low
                      </option>
                    </select>
                    <span className="sort-icon">
                      <IoIosArrowDown />
                    </span>
                  </div>
                </div>

                <div
                  className={`sidebar-title ${!showLayout ? "collapsed" : ""}`}
                  onClick={toggleLayoutVisibility}
                >
                  <span>Layout Options</span>
                  {showLayout ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showLayout && (
                  <div className="sidebar-section">
                    <LayoutOptions
                      selectedLayout={selectedLayout}
                      onLayoutChange={handleLayoutChange}
                    />
                  </div>
                )}

                {/* Categories */}
                <div
                  className={`sidebar-title ${
                    !showCategory ? "collapsed" : ""
                  }`}
                  onClick={() => setShowCategory(!showCategory)}
                >
                  <span>Category</span>
                  {showCategory ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showCategory && (
                  <div className="sidebar-section">
                    <div className="category-tree scrollable">
                      {categoryTree.map((category) =>
                        renderCategoryItem(category, 0, null, "categories")
                      )}
                    </div>
                  </div>
                )}

                {/* Studio */}
                <div
                  className={`sidebar-title ${!showStudio ? "collapsed" : ""}`}
                  onClick={() => setShowStudio(!showStudio)}
                >
                  <span>Studio</span>
                  {showStudio ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showStudio && (
                  <div className="sidebar-section">
                    <div className="category-tree scrollable">
                      {studioTree.map((studio) =>
                        renderCategoryItem(studio, 0, null, "studios")
                      )}
                    </div>
                  </div>
                )}

                {/* Product Phase */}
                <div
                  className={`sidebar-title ${!showPhase ? "collapsed" : ""}`}
                  onClick={() => setShowPhase(!showPhase)}
                >
                  <span>Product State</span>
                  {showPhase ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showPhase && (
                  <div className="sidebar-section">
                    <div className="category-tree">
                      {phaseTree.map((phase) =>
                        renderCategoryItem(phase, 0, null, "phases")
                      )}
                    </div>
                  </div>
                )}

                {/* Product Scale */}
                <div
                  className={`sidebar-title ${!showScale ? "collapsed" : ""}`}
                  onClick={() => setShowScale(!showScale)}
                >
                  <span>Product Scale</span>
                  {showScale ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showScale && (
                  <div className="sidebar-section">
                    <div className="category-tree">
                      {scaleTree.map((scale) =>
                        renderCategoryItem(scale, 0, null, "scales")
                      )}
                    </div>
                  </div>
                )}

                {/* Product State */}
                <div
                  className={`sidebar-title ${!showState ? "collapsed" : ""}`}
                  onClick={() => setShowState(!showState)}
                >
                  <span>Product State</span>
                  {showState ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showState && (
                  <div className="sidebar-section">
                    <div className="category-tree">
                      {stateTree.map((state) =>
                        renderCategoryItem(state, 0, null, "states")
                      )}
                    </div>
                  </div>
                )}

                {/* Product NSFW */}
                <div
                  className={`sidebar-title ${!showNsfw ? "collapsed" : ""}`}
                  onClick={() => setShowNsfw(!showNsfw)}
                >
                  <span>Product NSFW</span>
                  {showNsfw ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showNsfw && (
                  <div className="sidebar-section">
                    <div className="category-tree">
                      {nsfwTree.map((nsfw) =>
                        renderCategoryItem(nsfw, 0, null, "nsfw")
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
                          <label>Min</label>
                          <input
                            type="text"
                            className="price-input"
                            value={priceRange.min + " $"}
                            onChange={(e) => {
                              const numericValue =
                                parseInt(
                                  e.target.value.replace(/\D/g, ""),
                                  10
                                ) || 0;
                              handlePriceChange("min", numericValue);
                            }}
                          />
                        </div>
                        <div className="price-input-group">
                          <label>Max</label>
                          <input
                            type="text"
                            className="price-input"
                            value={priceRange.max + " $"}
                            onChange={(e) => {
                              const numericValue =
                                parseInt(
                                  e.target.value.replace(/\D/g, ""),
                                  10
                                ) || 0;
                              handlePriceChange("max", numericValue);
                            }}
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        className="price-slider"
                        min={
                          Array.isArray(products) && products.length > 0
                            ? getPriceRange(products).min
                            : 0
                        }
                        max={
                          Array.isArray(products) && products.length > 0
                            ? getPriceRange(products).max
                            : 0
                        }
                        value={priceRange.max}
                        onChange={(e) =>
                          handlePriceChange("max", parseInt(e.target.value))
                        }
                      />
                      <div className="price-labels">
                        <span>
                          {Array.isArray(products) && products.length > 0
                            ? getPriceRange(products).min.toLocaleString(
                                "en-EN"
                              )
                            : 0}{" "}
                          $
                        </span>
                        <span>
                          {Array.isArray(products) && products.length > 0
                            ? getPriceRange(products).max.toLocaleString(
                                "en-EN"
                              )
                            : 0}{" "}
                          $
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Selected Filters */}
                {(selectedCategories.size > 0 ||
                  selectedItems.size > 0 ||
                  selectedStudios.size > 0 ||
                  selectedPhases.size > 0 ||
                  selectedScales.size > 0 ||
                  selectedStates.size > 0) && (
                  <div className="sidebar-section selected-filters">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="m-0">The selected filters</h6>
                      <button
                        className="clear-filters"
                        onClick={() => {
                          setSelectedCategories(new Set());
                          setSelectedItems(new Set());
                          setSelectedStudios(new Set());
                          setSelectedPhases(new Set());
                          setSelectedScales(new Set());
                          setSelectedStates(new Set());
                        }}
                      >
                        <LuFilterX />
                      </button>
                    </div>
                    <div className="selected-categories">
                      {Array.from(selectedCategories).map((category) => (
                        <div
                          key={`category-${category}`}
                          className="selected-category"
                        >
                          <span>{category}</span>
                          <button
                            onClick={() =>
                              toggleSelection("categories", category)
                            }
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {Array.from(selectedItems).map((item) => (
                        <div key={`item-${item}`} className="selected-category">
                          <span>{item}</span>
                          <button
                            onClick={() => toggleSelection("items", item)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {Array.from(selectedStudios).map((studio) => (
                        <div
                          key={`studio-${studio}`}
                          className="selected-category"
                        >
                          <span>{studio}</span>
                          <button
                            onClick={() => toggleSelection("studios", studio)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {Array.from(selectedPhases).map((phase) => (
                        <div
                          key={`phase-${phase}`}
                          className="selected-category"
                        >
                          <span>{phase}</span>
                          <button
                            onClick={() => toggleSelection("phases", phase)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {Array.from(selectedScales).map((scale) => (
                        <div
                          key={`scale-${scale}`}
                          className="selected-category"
                        >
                          <span>{scale}</span>
                          <button
                            onClick={() => toggleSelection("scales", scale)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {Array.from(selectedStates).map((state) => (
                        <div
                          key={`state-${state}`}
                          className="selected-category"
                        >
                          <span>{state}</span>
                          <button
                            onClick={() => toggleSelection("states", state)}
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
              <div className={`products-container ${selectedLayout}`}>
                {paginatedItems.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onOpenModal={handleOpenProductModal}
                    layout={selectedLayout}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination-container">
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                    />
                  </Stack>
                </div>
              )}
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
