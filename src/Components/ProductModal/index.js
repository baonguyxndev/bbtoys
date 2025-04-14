import "./style.css";
import React, { useState, useEffect, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { BiGitCompare } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";

const ProductModal = ({ product, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("blockScroll");
      setSelectedScale(null);
      setSelectedModel(null);
      setSelectedVersion(null);
      setSelectedDetail(null);
    } else {
      document.body.classList.remove("blockScroll");
    }
  }, [isOpen, product]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedScale, setSelectedScale] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Xử lý các lựa chọn sản phẩm
  const productOptions = useMemo(() => {
    if (!product || !product.details || product.details.length <= 0) return {};

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
    if (!product || !product.details || product.details.length <= 0) return;

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

    // Nếu không tìm thấy detail phù hợp, chọn detail đầu tiên
    setSelectedDetail(matchedDetail || product.details[0]);
  }, [product, selectedScale, selectedModel, selectedVersion, productOptions]);

  // Tự động chọn scale đầu tiên khi component được mount
  useEffect(() => {
    if (isOpen && product && product.details && product.details.length > 0) {
      // Auto-select first detail if none is selected
      if (!selectedDetail) {
        setSelectedDetail(product.details[0]);
      }
    }
  }, [isOpen, product, selectedDetail]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Khi chọn scale mới, reset model và version
  const handleScaleChange = (scale) => {
    // Nếu đang chọn cùng scale cũ, không làm gì cả
    if (scale === selectedScale) return;

    setSelectedScale(scale);
    setSelectedModel(null);
    setSelectedVersion(null);
  };

  // Khi chọn model mới, reset version
  const handleModelChange = (model) => {
    setSelectedModel(model);
    setSelectedVersion(null);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="productModalOverlay" onClick={onClose}>
      <div className="modalProduct" onClick={(e) => e.stopPropagation()}>
        <button className="btnCloseProductModal" onClick={onClose}>
          <IoClose />
        </button>

        <h1 className="productTitle">{product.name}</h1>

        <div className="productMeta">
          <div className="metaLeft">
            <span className="metaLabel">Brands:</span>
            <span className="metaValue">{product.brand}</span>
          </div>
          <div className="metaRight">
            <span
              className={`stock-status ${product.state
                ?.toLowerCase()
                .replace(/[- ]/g, "")}`}
            >
              {product.state || "IN STOCK"}
            </span>
          </div>
        </div>

        <div className="productModalContent">
          <div className="modalLeft">
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
            <div className="productImages">
              <div className="mainImage">
                <img src={product.img[selectedImage]} alt={product.name} />
              </div>
            </div>
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

          <div className="modalRight">
            {/* Hiển thị lựa chọn Scale nếu có giá trị scale */}
            {productOptions.hasMultipleScales && (
              <div className="option-selector">
                <div className="option-label">Scale</div>
                <div className="option-buttons">
                  {productOptions.scales.map((scale, index) => (
                    <button
                      key={index}
                      className={`option-button ${
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

            {/* Hiển thị lựa chọn Model nếu có giá trị model */}
            {productOptions.hasMultipleModels &&
              productOptions.availableModels.length > 0 && (
                <div className="option-selector">
                  <div className="option-label">Model</div>
                  <div className="option-buttons">
                    {productOptions.availableModels.map((model, index) => (
                      <button
                        key={index}
                        className={`option-button ${
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

            {/* Hiển thị lựa chọn Version nếu có giá trị version */}
            {productOptions.hasMultipleVersions &&
              productOptions.availableVersions.length > 0 && (
                <div className="option-selector">
                  <div className="option-label">Version</div>
                  <div className="option-buttons">
                    {productOptions.availableVersions.map((version, index) => (
                      <button
                        key={index}
                        className={`option-button ${
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

            {/* Hiển thị thông tin giá và trạng thái */}
            {selectedDetail && (
              <>
                <div className="price-section">
                  {selectedDetail.oldPrice && (
                    <span className="oldPrice">
                      ${selectedDetail.oldPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="currentPrice">
                    ${selectedDetail.price.toLocaleString()}
                  </span>
                </div>

                <p className="description">
                  {product.description ||
                    "Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent"}
                </p>

                <div className="quantity-section">
                  <button
                    className="quantity-btn minus"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-btn plus"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <AiOutlinePlus />
                  </button>
                  <button
                    className={`add-to-cart ${
                      product.state === "Sold-Out" ? "disabled" : ""
                    }`}
                    disabled={product.state === "Sold-Out"}
                  >
                    {product.state === "Sold-Out"
                      ? "OUT OF STOCK"
                      : product.state === "Pre-Order"
                      ? "PRE-ORDER NOW"
                      : product.state === "Order"
                      ? "ORDER NOW"
                      : "ADD TO CART"}
                  </button>
                </div>
              </>
            )}

            <div className="action-buttons">
              <button className="action-button wishlist">
                <FiHeart />
                ADD TO WISHLIST
              </button>
              <button className="action-button compare">
                <BiGitCompare />
                COMPARE
              </button>
            </div>

            {/* Hiển thị chi tiết sản phẩm */}
            <div className="product-details">
              {selectedDetail && (
                <>
                  {selectedDetail.scale && (
                    <div className="detail-item">
                      <span className="detail-icon">✓</span>
                      <span className="detail-label">Scale:</span>
                      <span className="detail-value">
                        {selectedDetail.scale}
                      </span>
                    </div>
                  )}

                  {selectedDetail.model && (
                    <div className="detail-item">
                      <span className="detail-icon">✓</span>
                      <span className="detail-label">Model:</span>
                      <span className="detail-value">
                        {selectedDetail.model}
                      </span>
                    </div>
                  )}

                  {selectedDetail.version && (
                    <div className="detail-item">
                      <span className="detail-icon">✓</span>
                      <span className="detail-label">Version:</span>
                      <span className="detail-value">
                        {selectedDetail.version}
                      </span>
                    </div>
                  )}
                </>
              )}

              {product.estSize && (
                <div className="detail-item">
                  <span className="detail-icon">✓</span>
                  <span className="detail-label">Estimated Size:</span>
                  <span className="detail-value">{product.estSize}</span>
                </div>
              )}

              {product.material && (
                <div className="detail-item">
                  <span className="detail-icon">✓</span>
                  <span className="detail-label">Material:</span>
                  <span className="detail-value">{product.material}</span>
                </div>
              )}

              {product.feature && (
                <div className="detail-item">
                  <span className="detail-icon">✓</span>
                  <span className="detail-label">Features:</span>
                  <span className="detail-value">
                    {Array.isArray(product.feature)
                      ? product.feature.join(", ")
                      : product.feature}
                  </span>
                </div>
              )}

              {product.phase && (
                <div className="detail-item">
                  <span className="detail-icon">✓</span>
                  <span className="detail-label">Phase:</span>
                  <span className="detail-value">{product.phase}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
