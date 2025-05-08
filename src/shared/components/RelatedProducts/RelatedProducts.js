import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductItem from "../ProductItem/ProductItem";
import useFetchProducts from "../../hooks/useFetchProducts";
import { flattenProducts } from "../../utils/productUtils";
import "./RelatedProducts.css";

const RelatedProducts = ({ currentProduct }) => {
  const { products, loading, error } = useFetchProducts();
  const allProducts = flattenProducts(products);

  // Lọc sản phẩm liên quan dựa trên tên
  const relatedProducts = useMemo(() => {
    if (!currentProduct?.name || !allProducts?.length) return [];

    const currentName = (currentProduct.name || "").toLowerCase();

    return allProducts
      .filter((product) => {
        // Bỏ qua sản phẩm hiện tại
        if (product.id === currentProduct.id) return false;

        // Kiểm tra nếu product.name tồn tại
        if (!product.name) return false;

        const productName = product.name.toLowerCase();

        // Kiểm tra nếu tên sản phẩm chứa một phần của tên sản phẩm hiện tại
        // hoặc tên sản phẩm hiện tại chứa một phần của tên sản phẩm
        return (
          productName.includes(currentName) ||
          currentName.includes(productName) ||
          // Kiểm tra các từ riêng lẻ
          currentName
            .split(" ")
            .some((word) => word.length > 3 && productName.includes(word))
        );
      })
      .slice(0, 16); // Giới hạn 16 sản phẩm
  }, [currentProduct, allProducts]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="relatedProducts">
      <div className="related-products-section">
        <h2 className="section-title">Related Products</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="swiper-container"
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
            480: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductItem product={product} layout="grid" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
