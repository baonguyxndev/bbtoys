import "./ProductModal.css";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdFavoriteBorder, MdShare } from "react-icons/md";
import useNsfwGuard from "../../hooks/useNsfwGuard";
import NsfwWarningOverlay from "../NsfwWarningOverlay/NsfwWarningOverlay";
import { Button } from "@mui/material";
import { useShoppingCartHandler } from "../../state/shoppingCartHandler";
import { useNotification } from "../../context/NotificationContext";

const ProductModal = ({ product, isOpen, onClose }) => {
  // Quản lý trạng thái scroll của body
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

  // Các state cơ bản
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedScale, setSelectedScale] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const addToCart = useShoppingCartHandler((state) => state.addToCart);

  const { showNsfwWarning, handleEnterNsfw, handleExitNsfw } =
    useNsfwGuard(product);

  const { showNotification } = useNotification();

  // Xử lý khi người dùng chọn Under 18
  const handleExitNsfwAndCloseModal = () => {
    handleExitNsfw();
    onClose();
  };

  // Xử lý chuyển ảnh với useCallback
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

  // Tự động chọn detail đầu tiên khi mở modal
  useEffect(() => {
    if (isOpen && product?.details?.length) {
      if (!selectedDetail) {
        setSelectedDetail(product.details[0]);
      }
    }
  }, [isOpen, product, selectedDetail]);

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

  const handleMouseMove = (e) => {
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    image.style.setProperty("--mouse-x", `${x}%`);
    image.style.setProperty("--mouse-y", `${y}%`);
  };

  if (showNsfwWarning) {
    return (
      <NsfwWarningOverlay
        onEnter={handleEnterNsfw}
        onExit={handleExitNsfwAndCloseModal}
      />
    );
  }

  const handleAddToCart = () => {
    if (!selectedDetail) return;

    const productState = product.state?.toLowerCase();
    let message = "";
    let severity = "success";

    switch (productState) {
      case "available":
        addToCart({
          id: product.id,
          scale: selectedScale || null,
          model: selectedModel || null,
          version: selectedVersion || null,
          quantity: quantity,
        });
        message = "Product added to cart successfully!";
        break;
      case "sold out":
        message = "Please contact us for more information!";
        severity = "warning";
        break;
      case "pre-order":
        addToCart({
          id: product.id,
          scale: selectedScale || null,
          model: selectedModel || null,
          version: selectedVersion || null,
          quantity: quantity,
          type: "pre-order",
        });
        message = "Product added to pre-order list!";
        break;
      case "order":
        addToCart({
          id: product.id,
          scale: selectedScale || null,
          model: selectedModel || null,
          version: selectedVersion || null,
          quantity: quantity,
          type: "order",
        });
        message = "Product added to order list!";
        break;
      default:
        message = "An error occurred!";
        severity = "error";
    }

    showNotification(message, severity);
  };

  const getButtonText = () => {
    const productState = product.state?.toLowerCase();
    switch (productState) {
      case "available":
        return "Add to Cart";
      case "sold out":
        return "Please contact us for more information!";
      case "pre-order":
        return "Pre-Order Now";
      case "order":
        return "Order Now";
      default:
        return "Add to Cart";
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="productModalOverlay" onClick={onClose}>
      <div className="productModal" onClick={(e) => e.stopPropagation()}>
        <Button className="btnCloseProductModal" onClick={onClose}>
          <IoClose />
        </Button>

        <h1 className="productName">{product.name}</h1>

        <div className="productMeta">
          <div className="metaLeft">
            <span className="metaLabel">Brands:</span>
            <span className="metaValue">{product.brand}</span>
          </div>
          <div className="metaRight">
            <span
              className={`stock-status ${product.state
                ?.toLowerCase()
                .replace("-", "")
                .replace(" ", "")}`}
            >
              {product.state === "Available"
                ? "【AVAILABLE】"
                : product.state === "Order"
                ? "【ORDER】"
                : product.state === "Pre-Order"
                ? "【PRE-ORDER】"
                : "【SOLD-OUT】"}
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
              <div
                className="mainImage"
                onClick={() => setIsFullscreen(true)}
                onMouseMove={handleMouseMove}
              >
                <div className="image-container">
                  <img src={product.img[selectedImage]} alt={product.name} />
                </div>
                <div className="zoom-hint">
                  <span>Click để phóng to</span>
                </div>
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
            <div className="option-wrap">
              {/* Scale Selection */}
              {productOptions.hasMultipleScales &&
                productOptions.scales.length > 0 && (
                  <div className="option-group">
                    <label>Scale</label>
                    <div className="scale-options">
                      {productOptions.scales.map((scale, index) => (
                        <Button
                          key={index}
                          className={`scale-option ${
                            selectedScale === scale ? "selected" : ""
                          }`}
                          onClick={() => handleScaleChange(scale)}
                        >
                          {scale}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Model Selection */}
              {productOptions.hasMultipleModels &&
                productOptions.availableModels.length > 0 && (
                  <div className="option-group">
                    <label>Model</label>
                    <div className="model-options">
                      {productOptions.availableModels.map((model, index) => (
                        <Button
                          key={index}
                          className={`model-option ${
                            selectedModel === model ? "selected" : ""
                          }`}
                          onClick={() => handleModelChange(model)}
                        >
                          {model}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Version Selection */}
              {productOptions.hasMultipleVersions &&
                productOptions.availableVersions.length > 0 && (
                  <div className="option-group">
                    <label>Version</label>
                    <div className="version-options">
                      {productOptions.availableVersions.map(
                        (version, index) => (
                          <Button
                            key={index}
                            className={`version-option ${
                              selectedVersion === version ? "selected" : ""
                            }`}
                            onClick={() => setSelectedVersion(version)}
                          >
                            {version}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Price and Actions */}
              {selectedDetail && (
                <>
                  <div className="quantity-section">
                    <div className="control-quantity">
                      <Button onClick={() => handleQuantityChange(-1)}>
                        -
                      </Button>
                      <span className="quantity-value">{quantity}</span>
                      <Button onClick={() => handleQuantityChange(1)}>+</Button>
                    </div>
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
                  </div>
                </>
              )}

              <div className="action-buttons">
                <Button onClick={handleAddToCart} className="add-to-cart-btn">
                  {getButtonText()}
                </Button>
                <Button className="wishlist-btn">
                  <MdFavoriteBorder />
                </Button>
                <Button className="share-btn">
                  <MdShare />
                </Button>
              </div>

              {/* Product Details */}
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

        {isFullscreen && (
          <div
            className="fullscreen-overlay"
            onClick={() => setIsFullscreen(false)}
          >
            <Button
              className="fullscreen-close"
              onClick={() => setIsFullscreen(false)}
            >
              <IoClose />
            </Button>

            <Button
              className="fullscreen-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
            >
              <IoIosArrowBack />
            </Button>

            <div
              className="fullscreen-image"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.img[selectedImage]}
                alt={`${product.name} - ${selectedImage + 1}`}
              />
            </div>

            <Button
              className="fullscreen-nav next"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <IoIosArrowForward />
            </Button>

            <div className="fullscreen-counter">
              {selectedImage + 1} / {product.img.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
