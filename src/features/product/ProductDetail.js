import "./styles/ProductDetail.css";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import { flattenProducts } from "../../shared/utils/productUtils";
import { MdFavoriteBorder, MdShare } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "@mui/material";
import LatestProducts from "../../shared/components/LatestProducts/LatestProducts";
import RelatedProducts from "../../shared/components/RelatedProducts/RelatedProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, error } = useFetchProducts();
  const allProducts = flattenProducts(products);
  const product = allProducts.find((p) => p.id === parseInt(id));

  // Các state cơ bản
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedScale, setSelectedScale] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("shipping");

  // Xử lý các lựa chọn sản phẩm
  const productOptions = useMemo(() => {
    if (!product?.details?.length) return {};

    // Lấy tất cả giá trị duy nhất
    const scales = [
      ...new Set(product.details.map((d) => d.scale).filter(Boolean)),
    ];
    const allModels = [
      ...new Set(product.details.map((d) => d.model).filter(Boolean)),
    ];
    const allVersions = [
      ...new Set(product.details.map((d) => d.version).filter(Boolean)),
    ];

    // Có nhiều scale hay không - Luôn hiển thị scale nếu có giá trị
    const hasMultipleScales = scales.length > 0;
    // Có nhiều model hay không - Luôn hiển thị model nếu có giá trị
    const hasMultipleModels = allModels.length > 0;
    // Có nhiều version hay không - Luôn hiển thị version nếu có giá trị
    const hasMultipleVersions = allVersions.length > 0;

    // Lọc models dựa trên scale đã chọn
    const availableModels = selectedScale
      ? [
          ...new Set(
            product.details
              .filter((d) => d.scale === selectedScale)
              .map((d) => d.model)
              .filter(Boolean)
          ),
        ]
      : allModels;

    // Lọc versions dựa trên scale và model đã chọn
    const availableVersions =
      selectedScale || selectedModel
        ? [
            ...new Set(
              product.details
                .filter(
                  (d) =>
                    (!selectedScale || d.scale === selectedScale) &&
                    (!selectedModel || d.model === selectedModel)
                )
                .map((d) => d.version)
                .filter(Boolean)
            ),
          ]
        : allVersions;

    return {
      scales,
      availableModels,
      availableVersions,
      hasMultipleScales,
      hasMultipleModels,
      hasMultipleVersions,
    };
  }, [product, selectedScale, selectedModel]);

  // Tự động chọn giá trị khi có sự thay đổi
  useEffect(() => {
    if (!product?.details?.length) return;

    // Nếu chưa chọn scale và có ít nhất 1 scale, chọn scale đầu tiên
    if (!selectedScale && productOptions.scales.length > 0) {
      setSelectedScale(productOptions.scales[0]);
      return;
    }

    // Nếu chưa chọn model và có ít nhất 1 model, chọn model đầu tiên
    if (!selectedModel && productOptions.availableModels.length > 0) {
      setSelectedModel(productOptions.availableModels[0]);
      return;
    }

    // Nếu chưa chọn version và có ít nhất 1 version, chọn version đầu tiên
    if (!selectedVersion && productOptions.availableVersions.length > 0) {
      setSelectedVersion(productOptions.availableVersions[0]);
      return;
    }

    // Tìm detail phù hợp với các lựa chọn
    const matchedDetail = product.details.find(
      (d) =>
        (!selectedScale || d.scale === selectedScale) &&
        (!selectedModel || d.model === selectedModel) &&
        (!selectedVersion || d.version === selectedVersion)
    );

    setSelectedDetail(matchedDetail || product.details[0]);
  }, [product, selectedScale, selectedModel, selectedVersion, productOptions]);

  // Xử lý chuyển ảnh
  const handleNextImage = useCallback(() => {
    if (!product?.img?.length) return;
    setSelectedImage((prev) => (prev + 1) % product.img.length);
  }, [product]);

  const handlePrevImage = useCallback(() => {
    if (!product?.img?.length) return;
    setSelectedImage(
      (prev) => (prev - 1 + product.img.length) % product.img.length
    );
  }, [product]);

  // Xử lý phím tắt khi ở chế độ fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case "Escape":
          setIsFullscreen(false);
          break;
        case "ArrowLeft":
          handlePrevImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, handlePrevImage, handleNextImage]);

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Xử lý thay đổi scale
  const handleScaleChange = (scale) => {
    if (scale === selectedScale) return;
    setSelectedScale(scale);
    setSelectedModel(null);
    setSelectedVersion(null);
  };

  // Xử lý thay đổi model
  const handleModelChange = (model) => {
    setSelectedModel(model);
    setSelectedVersion(null);
  };

  const handleAddToCart = () => {};

  // Lọc sản phẩm liên quan dựa trên brand và category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.brand === product.brand || p.category === product.category)
      )
      .slice(0, 16);
  }, [product, allProducts]);

  // Lọc sản phẩm mới nhất
  const latestProducts = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 16);
  }, [allProducts]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="productDetail">
      <div className="container">
        <div className="product-header">
          <div className="product-meta">
            <div className="meta-item">
              <span className="label">Studio :</span>
              <span className="value">{product.brand}</span>
            </div>
            <h1 className="product-name">{product.name}</h1>
            <div className="meta-item">
              <span
                className={`status-tag ${product.state
                  ?.toLowerCase()
                  .replace(/[- ]/g, "")}`}
              >
                {product.state}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="main-image-wrap">
              {selectedDetail?.oldPrice && (
                <div className="discount-badge">
                  {Math.round(
                    ((selectedDetail.oldPrice - selectedDetail.price) /
                      selectedDetail.oldPrice) *
                      100
                  )}
                  %
                </div>
              )}
              <div className="main-image" onClick={() => setIsFullscreen(true)}>
                <img src={product.img[selectedImage]} alt={product.name} />
                <div className="zoom-hint">
                  <span>Click to zoom</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="thumbnails-and-options">
              <div className="thumbnails-wrap">
                <div className="thumbnails">
                  {product.img.map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${
                        selectedImage === index ? "active" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt={`${product.name} - ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="options-wrap">
                <div className="line"></div>
                {productOptions.hasMultipleScales && (
                  <div className="option-group">
                    <label>Scale</label>
                    <div className="scale-options">
                      {productOptions.scales.map((scale) => (
                        <button
                          key={scale}
                          className={`scale-option ${
                            selectedScale === scale ? "selected" : ""
                          }`}
                          onClick={() => handleScaleChange(scale)}
                        >
                          {scale}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {productOptions.hasMultipleModels && (
                  <div className="option-group">
                    <label>Model</label>
                    <div className="model-options">
                      {productOptions.availableModels.map((model) => (
                        <button
                          key={model}
                          className={`model-option ${
                            selectedModel === model ? "selected" : ""
                          }`}
                          onClick={() => handleModelChange(model)}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {productOptions.hasMultipleVersions && (
                  <div className="option-group">
                    <label>Version</label>
                    <div className="version-options">
                      {productOptions.availableVersions.map((version) => (
                        <button
                          key={version}
                          className={`version-option ${
                            selectedVersion === version ? "selected" : ""
                          }`}
                          onClick={() => setSelectedVersion(version)}
                        >
                          {version}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Image View */}
        {isFullscreen && (
          <div
            className="fullscreen-overlay"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              className="fullscreen-image"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.img?.[selectedImage] || ""}
                alt={product.name}
              />
              <button
                className="fullscreen-close"
                onClick={() => setIsFullscreen(false)}
              ></button>
              <button className="fullscreen-nav prev" onClick={handlePrevImage}>
                <IoIosArrowBack />
              </button>
              <button className="fullscreen-nav next" onClick={handleNextImage}>
                <IoIosArrowForward />
              </button>
              <div className="fullscreen-counter">
                {selectedImage + 1} / {product.img?.length}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="product-specs">
              <h3>Specifications</h3>
              <div className="specs-table-wrap">
                <table className="specs-table">
                  <tbody>
                    {product.phase && (
                      <tr>
                        <td className="spec-label">Phase</td>
                        <td className="spec-value">{product.phase}</td>
                      </tr>
                    )}
                    {product.name && (
                      <tr>
                        <td className="spec-label">Name</td>
                        <td className="spec-value">{product.name}</td>
                      </tr>
                    )}
                    {product.brand && (
                      <tr>
                        <td className="spec-label">Studio</td>
                        <td className="spec-value">{product.brand}</td>
                      </tr>
                    )}
                    {productOptions.scales.map((scale) => (
                      <tr key={scale}>
                        <td className="spec-label">Scale</td>
                        <td className="spec-value">{scale}</td>
                      </tr>
                    ))}
                    {product.estSize && (
                      <tr>
                        <td className="spec-label">Size</td>
                        <td className="spec-value">{product.estSize}</td>
                      </tr>
                    )}
                    {Array.isArray(product.feature) && (
                      <tr>
                        <td className="spec-label">Features</td>
                        <td className="spec-value">
                          <ul style={{ margin: 0, paddingLeft: 18 }}>
                            {product.feature.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-info">
              <div className="product-description highlight-note">
                <h3>Note</h3>
                <div className="note-content">
                  {product.description || "No description available"}
                </div>
              </div>
              <div className="product-price">
                {selectedDetail?.oldPrice && (
                  <span className="old-price">
                    ${selectedDetail.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="current-price">
                  ${(selectedDetail?.price * quantity).toLocaleString() || "0"}
                </span>
              </div>

              <div className="quantity-section">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>

              <div className="product-actions">
                <Button
                  className={`add-to-cart-btn ${
                    product.state === "Sold-Out" ? "disabled" : ""
                  }`}
                  disabled={product.state === "Sold-Out"}
                  onClick={handleAddToCart}
                >
                  {product.state === "Sold-Out"
                    ? "Out of Stock"
                    : product.state === "Pre-Order"
                    ? "Pre-Order Now"
                    : product.state === "Order"
                    ? "Order Now"
                    : "Add to Cart"}
                </Button>
                <Button className="wishlist-btn">
                  <MdFavoriteBorder />
                </Button>
                <Button className="share-btn">
                  <MdShare />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Must Read Section với 4 tab */}
      <div className="container must-read-section">
        <h2 className="must-read-title">Must Read</h2>
        <div className="tabs-info-service">
          <button
            className={activeTab === "shipping" ? "tab active" : "tab"}
            onClick={() => setActiveTab("shipping")}
            role="tab"
            aria-selected={activeTab === "shipping"}
            aria-controls="shipping-tab"
          >
            Shipping Cost
          </button>
          <button
            className={activeTab === "payment" ? "tab active" : "tab"}
            onClick={() => setActiveTab("payment")}
            role="tab"
            aria-selected={activeTab === "payment"}
            aria-controls="payment-tab"
          >
            Payment Plan
          </button>
          <button
            className={activeTab === "purchasing" ? "tab active" : "tab"}
            onClick={() => setActiveTab("purchasing")}
            role="tab"
            aria-selected={activeTab === "purchasing"}
            aria-controls="purchasing-tab"
          >
            Purchasing Policy
          </button>
          <button
            className={activeTab === "return" ? "tab active" : "tab"}
            onClick={() => setActiveTab("return")}
            role="tab"
            aria-selected={activeTab === "return"}
            aria-controls="return-tab"
          >
            Return Policy
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "shipping" && (
            <div className="fees" id="shipping-tab">
              <h3>Estimated shipping cost</h3>
              <div className="cost-shipping-table">
                <table className="shipping-table">
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Delivery Method</th>
                      <th>Delivery Time</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>EU</td>
                      <td>EU Warehouse + UPS</td>
                      <td>40-45 days</td>
                      <td>
                        Tax-free delivery via EU warehouse. Tracking available
                        after EU arrival.
                      </td>
                    </tr>
                    <tr>
                      <td>US/CANADA</td>
                      <td>Local Warehouse + Local Delivery</td>
                      <td>30-35 days</td>
                      <td>
                        Tax-free delivery via local warehouse. Tracking
                        available after local arrival.
                      </td>
                    </tr>
                    <tr>
                      <td>AU/UK</td>
                      <td>Local Warehouse + Local Delivery</td>
                      <td>40-45 days</td>
                      <td>
                        Tax-free delivery via local warehouse. Tracking
                        available after local arrival.
                      </td>
                    </tr>
                    <tr>
                      <td>Japan</td>
                      <td>China Post Express</td>
                      <td>7 days</td>
                      <td>
                        Special contract with China Post. Low customs inspection
                        rate. Very cost-effective.
                      </td>
                    </tr>
                    <tr>
                      <td>Switzerland/Norway</td>
                      <td>China Post Train</td>
                      <td>Varies</td>
                      <td>
                        Special train delivery for items under 30KG. More
                        economical than commercial express.
                      </td>
                    </tr>
                    <tr>
                      <td>Russia</td>
                      <td>Russia Warehouse + Local Delivery</td>
                      <td>Varies</td>
                      <td>
                        Tax-free delivery. Local courier charges apply for final
                        delivery.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="shipping-note">
                *If your region is not listed, please message us for a shipping
                quote.
              </p>
              <p className="shipping-note">
                *Shipping cost is calculated based on package size (Formula:
                Depth x Width x Height / 6000 = Final weight)
              </p>
            </div>
          )}
          {activeTab === "payment" && (
            <div className="payment-plan" id="payment-tab">
              <h3>Custom Payment Plan</h3>
              <div className="payment-conditions">
                <h4>General Conditions:</h4>
                <ul>
                  <li>Applicable for orders from ~500$</li>
                  <li>
                    Internal installment - not through financial companies
                  </li>
                  <li>No credit card/documentation required</li>
                  <li>
                    0% interest rate option (for 3-6 months) or low interest
                    (9-12 months)
                  </li>
                  <li>
                    Payment via: Apple Pay, Google Pay, Mastercard, PayPal,
                    Visa, Wechat Pay
                  </li>
                </ul>
              </div>
              <div className="payment-plan-table">
                <table>
                  <thead>
                    <tr>
                      <th>Term</th>
                      <th>Initial Payment (Deposit)</th>
                      <th>Remaining Payments</th>
                      <th>Interest Rate</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>3 months</td>
                      <td>30%</td>
                      <td>2 times (35% + 35%) monthly</td>
                      <td>0%</td>
                      <td className="table-note">Most popular</td>
                    </tr>
                    <tr>
                      <td>6 months</td>
                      <td>20%</td>
                      <td>5 times (16% monthly)</td>
                      <td>0%</td>
                      <td className="table-note">
                        Suitable for orders &gt;2 million
                      </td>
                    </tr>
                    <tr>
                      <td>9 months</td>
                      <td>20%</td>
                      <td>8 times</td>
                      <td>1%/month</td>
                      <td className="table-note">
                        Low interest, smaller payments
                      </td>
                    </tr>
                    <tr>
                      <td>12 months</td>
                      <td>20%</td>
                      <td>11 times</td>
                      <td>1%/month</td>
                      <td className="table-note">
                        Super light monthly payments, suitable for high-value
                        orders
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "purchasing" && (
            <div className="policy" id="purchasing-tab">
              <h3>Purchasing Policy (BB Toys)</h3>
              <ul className="policy-list">
                <li>
                  The final product delivered to customers may differ from the
                  Pre-Order images (as studios may make changes for better
                  suitability).
                </li>
                <li>
                  The product release date may be earlier or later depending on
                  the studio's progress.
                </li>
                <li>
                  Additional payment period starts when you receive the notice,
                  with a deadline of 2 weeks after the goods arrive at BB Toys.
                </li>
                <li>
                  Customers who do not pay on time will lose their deposit for
                  that product.
                </li>
                <li>
                  BB Toys does not support refunding deposits after they have
                  been paid to the studio. If you wish, you can transfer your
                  slot to another person.
                </li>
                <li>
                  Goods usually arrive 3-4 weeks after the tracking code is
                  issued from the factory, but may be delayed or arrive sooner
                  due to various factors.
                </li>
              </ul>
              <h4>What is Pre-Order?</h4>
              <p>
                Pre-Order is a form of ordering a product from the studio in
                advance with a certain deposit, to confirm your order and
                receive the studio's listed price. As these are handmade
                products, after pre-ordering, customers usually have to wait an
                average of 3 months or more to receive the goods.
              </p>
              <h4>What is Order?</h4>
              <p>
                Order is a form of purchasing/ordering products that have
                already been released on the market. Ordered products usually
                require a deposit of 30-50%. As these are already released,
                customers usually receive the goods after 1-4 weeks, but this
                may vary due to various factors.
              </p>
              <h4>Why should you Pre-Order?</h4>
              <ul className="policy-list">
                <li>Each product is produced in a limited quantity.</li>
                <li>
                  Some products can only be purchased during the Pre-Order
                  period.
                </li>
                <li>
                  After release, it is very difficult to find the product again,
                  and if found, the price is often much higher (2-3 times, or
                  even unavailable).
                </li>
              </ul>
              <h4>Why should you Order?</h4>
              <ul className="policy-list">
                <li>
                  Order products usually have better prices than in-stock items.
                </li>
                <li>Items are not available at the store.</li>
                <li>
                  Order items can be selected according to customer
                  requirements.
                </li>
              </ul>
            </div>
          )}
          {activeTab === "return" && (
            <div className="policy" id="return-tab">
              <h3>BB TOYS RETURN POLICY</h3>
              <p>
                <strong>
                  Applies to all products at BB TOYS (Effective from 01/01/2023)
                </strong>
              </p>
              <p>
                <em>
                  *Condition: Customers must provide a video recording the
                  unboxing process (starting from the outermost packaging
                  layer)*
                </em>
              </p>
              <h4>For PVC Products</h4>
              <ul className="policy-list">
                <li>
                  Products broken or damaged during shipping ⇒ Support for
                  repair.
                </li>
                <li>
                  Products scratched or with manufacturing defects ⇒ Support to
                  contact the supplier for complaints.
                </li>
                <li>
                  Boxes severely damaged during shipping ⇒ Resolved on a
                  case-by-case basis.
                </li>
                <li>
                  Products damaged during use ⇒ Support for repair with a
                  service fee.
                </li>
              </ul>
              <p>
                <em>"BB Toys does not guarantee 100% perfect product boxes"</em>
              </p>
              <h4>For Resin Products</h4>
              <ul className="policy-list">
                <li>
                  Products damaged during shipping ⇒ Support for repair or
                  provide replacement parts (if possible).
                </li>
                <li>
                  Products missing parts due to the studio ⇒ Support to contact
                  the studio to send new parts.
                </li>
              </ul>
              <p>
                <em>
                  *In force majeure cases, BB Toys will try to resolve and
                  provide the most suitable solution for customers*
                </em>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-product-section">
        <RelatedProducts products={relatedProducts} />
      </div>

      {/* Latest Products Section */}
      <div className="latest-product-section">
        <LatestProducts products={latestProducts} />
      </div>
    </div>
  );
};

export default ProductDetail;
