import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductItem from "../ProductItem/ProductItem";
import useFetchProducts from "../../hooks/useFetchProducts";
import { flattenProducts } from "../../utils/productUtils";
import Loading from "../Loading/Loading";
import "./LatestProducts.css";

const LatestProducts = () => {
  const { products, loading, error } = useFetchProducts();
  const allProducts = flattenProducts(products);

  // Lọc và sắp xếp sản phẩm mới nhất dựa trên id
  const latestProducts = useMemo(() => {
    if (!allProducts?.length) return [];

    return [...allProducts]
      .sort((a, b) => b.id - a.id) // Sắp xếp giảm dần theo id
      .slice(0, 16); // Chỉ lấy 16 sản phẩm mới nhất
  }, [allProducts]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!latestProducts || latestProducts.length === 0) {
    return null;
  }

  return (
    <div className="latestProducts">
      <div className="related-products-section">
        <h2 className="section-title">Latest Products</h2>
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
          {latestProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductItem product={product} layout="grid" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestProducts;
