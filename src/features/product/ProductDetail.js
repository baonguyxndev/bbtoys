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

  const handleMouseMove = (e) => {
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    image.style.setProperty("--mouse-x", `${x}%`);
    image.style.setProperty("--mouse-y", `${y}%`);
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

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

      <MustRead />

      {/* Related Products Section */}
      <div className="related-product-section">
        <RelatedProducts currentProduct={product} />
      </div>

      {/* Latest Products Section */}
      <div className="latest-product-section">
        <LatestProducts />
      </div>
    </div>
  );
};

export default ProductDetail;
