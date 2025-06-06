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
import MustRead from "../../shared/components/MustRead/MustRead.js";
import Loading from "../../shared/components/Loading/Loading.js";
import useNsfwGuard from "../../shared/hooks/useNsfwGuard.js";
import NsfwWarningOverlay from "../../shared/components/NsfwWarningOverlay/NsfwWarningOverlay.js";
import { useShoppingCartHandler } from "../../shared/state/shoppingCartHandler";
import { useNotification } from "../../shared/context/NotificationContext";
import { IoClose } from "react-icons/io5";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, error } = useFetchProducts();
  const addToCart = useShoppingCartHandler((state) => state.addToCart);
  const allProducts = useMemo(() => flattenProducts(products), [products]);
  const product = useMemo(
    () => allProducts.find((p) => p.id === id),
    [allProducts, id]
  );

  // Các state cơ bản
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedScale, setSelectedScale] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { showNsfwWarning, handleEnterNsfw, handleExitNsfw } =
    useNsfwGuard(product);

  const { showNotification } = useNotification();

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

  const handleMouseMove = (e) => {
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    image.style.setProperty("--mouse-x", `${x}%`);
    image.style.setProperty("--mouse-y", `${y}%`);
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

  if (loading) return <Loading />;
  if (error) return <div className="error-state">{error}</div>;
  if (!product)
    return (
      <div className="not-found-state">Product not found with ID: {id}</div>
    );

  if (showNsfwWarning) {
    return (
      <NsfwWarningOverlay onEnter={handleEnterNsfw} onExit={handleExitNsfw} />
    );
  }

  return (
    <div className="product-detail">
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
              </span>{" "}
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
              <div
                className="main-image"
                onClick={() => setIsFullscreen(true)}
                onMouseMove={handleMouseMove}
              >
                <div className="image-container">
                  <img src={product.img[selectedImage]} alt={product.name} />
                </div>
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
                {productOptions.hasMultipleScales &&
                  productOptions.scales.length > 0 && (
                    <div className="option-group">
                      <label>Scale</label>
                      <div className="scale-options">
                        {productOptions.scales.map((scale) => (
                          <Button
                            key={scale}
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

                {productOptions.hasMultipleModels &&
                  productOptions.availableModels.length > 0 && (
                    <div className="option-group">
                      <label>Model</label>
                      <div className="model-options">
                        {productOptions.availableModels.map((model) => (
                          <Button
                            key={model}
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

                {productOptions.hasMultipleVersions &&
                  productOptions.availableVersions.length > 0 && (
                    <div className="option-group">
                      <label>Version</label>
                      <div className="version-options">
                        {productOptions.availableVersions.map((version) => (
                          <Button
                            key={version}
                            className={`version-option ${
                              selectedVersion === version ? "selected" : ""
                            }`}
                            onClick={() => setSelectedVersion(version)}
                          >
                            {version}
                          </Button>
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
              <Button
                className="fullscreen-close"
                onClick={() => setIsFullscreen(false)}
              >
                <IoClose />
              </Button>
              <Button className="fullscreen-nav prev" onClick={handlePrevImage}>
                <IoIosArrowBack />
              </Button>
              <Button className="fullscreen-nav next" onClick={handleNextImage}>
                <IoIosArrowForward />
              </Button>
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
                    {productOptions.scales?.length > 0 && (
                      <tr>
                        <td className="spec-label">Scale</td>
                        <td className="spec-value">
                          {productOptions.scales.map((scale, index) => (
                            <React.Fragment key={scale}>
                              {scale}
                              {index < productOptions.scales.length - 1 && (
                                <br />
                              )}
                            </React.Fragment>
                          ))}
                        </td>
                      </tr>
                    )}
                    {productOptions.availableModels?.length > 0 && (
                      <tr>
                        <td className="spec-label">Model</td>
                        <td className="spec-value">
                          {productOptions.availableModels.map(
                            (model, index) => (
                              <React.Fragment key={model}>
                                {model}
                                {index <
                                  productOptions.availableModels.length - 1 && (
                                  <br />
                                )}
                              </React.Fragment>
                            )
                          )}
                        </td>
                      </tr>
                    )}
                    {productOptions.availableVersions?.length > 0 && (
                      <tr>
                        <td className="spec-label">Version</td>
                        <td className="spec-value">
                          {productOptions.availableVersions.map(
                            (version, index) => (
                              <React.Fragment key={version}>
                                {version}
                                {index <
                                  productOptions.availableVersions.length -
                                    1 && <br />}
                              </React.Fragment>
                            )
                          )}
                        </td>
                      </tr>
                    )}
                    {product.estSize && (
                      <tr>
                        <td className="spec-label">Size</td>
                        <td className="spec-value">
                          {Array.isArray(product.estSize)
                            ? product.estSize.map((estSize, index) => (
                                <React.Fragment key={estSize}>
                                  {estSize}
                                  {index < product.estSize.length - 1 && <br />}
                                </React.Fragment>
                              ))
                            : product.estSize}
                        </td>
                      </tr>
                    )}
                    {product.feature && (
                      <tr>
                        <td className="spec-label">Features</td>
                        <td className="spec-value">
                          {Array.isArray(product.feature)
                            ? product.feature.map((feature, index) => (
                                <React.Fragment key={feature}>
                                  {feature}
                                  {index < product.feature.length - 1 && <br />}
                                </React.Fragment>
                              ))
                            : product.feature}
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
              <div className="product-note highlight-note">
                <h3>Note</h3>
                <div className="note-content">
                  {Array.isArray(product.note)
                    ? product.note.map((note, index) => (
                        <React.Fragment key={note}>
                          {note}
                          {index < product.note.length - 1 && <br />}
                        </React.Fragment>
                      ))
                    : product.note || "No note..."}
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
                  <Button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <AiOutlineMinus />
                  </Button>
                  <span className="quantity-value">{quantity}</span>
                  <Button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <AiOutlinePlus />
                  </Button>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </div>

      <MustRead />

      {/* Related Products Section */}
      <section className="related-product-section">
        <RelatedProducts currentProduct={product} />
      </section>

      {/* Latest Products Section */}
      <section className="latest-product-section">
        <LatestProducts />
      </section>
    </div>
  );
};

export default ProductDetail;
