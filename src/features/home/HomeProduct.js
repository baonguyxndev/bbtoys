import React, { useState, useMemo } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "@mui/material";
import ProductItem from "../../shared/components/ProductItem/ProductItem.js";
import ProductModal from "../../shared/components/ProductModal/ProductModal.js";
import useFetchProducts from "../../shared/hooks/useFetchProducts.js";
import { flattenProducts } from "../../shared/utils/productUtils.js";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/HomeProduct.css";

const HomeProduct = () => {
  const { products, loading, error } = useFetchProducts();
  const allProducts = useMemo(() => flattenProducts(products), [products]);

  /* Product Modal */
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenProductModal = (id) => {
    setSelectedProductId(id);
  };

  const handleCloseProductModal = () => {
    setSelectedProductId(null);
  };

  const selectedProduct = useMemo(
    () => allProducts.find((product) => product.id === selectedProductId),
    [allProducts, selectedProductId]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="homeProducts">
      {/* TITLE */}
      <div className="title mt-2">
        <h2>
          <div className="line"></div>
          <span className="titleMain">Types Of Materials</span>
          <div className="line"></div>
        </h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* Resin Statues */}
            <div className="d-flex align-items-center mt-4">
              <div className="info">
                <h3 className="mb-0 hd">Resin Statues</h3>
              </div>
              <Button className="viewAllBtn ml-auto">
                View all <IoIosArrowRoundForward />
              </Button>
            </div>
            <div className="resinWrapper">
              <div className="promoImageBox">
                <img
                  src="/assets/image/banner-resin-image.jpeg"
                  alt="Resin Statues promotional banner"
                  className="promoImage"
                />
                <div className="promoTextOverlay">
                  <h2 className="promoTitle">Resin Statues</h2>
                  <p className="promoDesc">
                    These figures are made from high-quality resin, known for
                    its sharp detail and smooth finish. Ideal for high-end
                    display pieces but should be handled with care due to its
                    fragile nature.
                    <br />
                    <b>
                      Minor variations may occur due to the handcrafted process.
                    </b>
                  </p>
                </div>
              </div>
              <Swiper
                slidesPerView={2}
                spaceBetween={20}
                slidesPerGroup={2}
                pagination={{ clickable: true }}
                navigation={false}
                modules={[Pagination, Navigation]}
                className="resinSwiper"
              >
                {allProducts.slice(0, 10).map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductItem
                      product={product}
                      onOpenModal={handleOpenProductModal}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* PVC Figures */}
            <div className="d-flex align-items-center mt-4">
              <div className="info">
                <h3 className="mb-0 hd">PVC Figures</h3>
              </div>
              <Button className="viewAllBtn ml-auto">
                View all <IoIosArrowRoundForward />
              </Button>
            </div>
            <div className="pvcWrapper">
              <Swiper
                slidesPerView={2}
                spaceBetween={20}
                slidesPerGroup={2}
                pagination={{ clickable: true }}
                navigation={false}
                modules={[Pagination, Navigation]}
                className="pvcSwiper"
              >
                {allProducts.slice(0, 10).map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductItem
                      product={product}
                      onOpenModal={handleOpenProductModal}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="promoImageBox">
                <img
                  src="/assets/image/banner-pvc-image.jpeg"
                  alt="PVC Figures promotional banner"
                  className="promoImage"
                />
                <div className="promoTextOverlay">
                  <h2 className="promoTitle">PVC Figures</h2>
                  <p className="promoDesc">
                    These figures are made from high-quality PVC, offering
                    durability and flexibility. Well-suited for dynamic poses
                    and articulated designs, ideal for both display and light
                    handling.
                    <br />
                    <b>
                      Minor differences may appear due to the mass production
                      process.
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* NEW PRODUCTS */}
      <div className="title mt-2">
        <h2>
          <div className="line"></div>
          <span className="titleMain">PRODUCTS</span>
          <div className="line"></div>
        </h2>
      </div>
      <div className="container">
        <div className="subTitle d-flex align-items-center">
          <div className="info">
            <h3 className="mb-0 hd">NEW PRODUCTS</h3>
            <p className="text-light text-sml mb-0">
              New products with updated stock.
            </p>
          </div>
          <Button className="viewAllBtn ml-auto">
            View all <IoIosArrowRoundForward />
          </Button>
        </div>
        <div className="product_row productRow2 w-100 d-flex">
          {allProducts.slice(0, 8).map((product) => (
            <div key={product.id}>
              <ProductItem
                product={product}
                onOpenModal={handleOpenProductModal}
              />
            </div>
          ))}
        </div>
        {/* SALE */}
        <div className="subTitle d-flex align-items-center">
          <div className="info">
            <h3 className="mb-0 hd">SALES</h3>
            <p className="text-light text-sml mb-0">
              Sale products with special prices.
            </p>
          </div>
          <Button className="viewAllBtn ml-auto">
            View all <IoIosArrowRoundForward />
          </Button>
        </div>
        <div className="product_row productRow3 w-100 d-flex">
          {allProducts.slice(0, 8).map((product) => (
            <div key={product.id}>
              <ProductItem
                product={product}
                onOpenModal={handleOpenProductModal}
              />
            </div>
          ))}
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProductId}
        onClose={handleCloseProductModal}
      />
    </div>
  );
};

export default HomeProduct;
