import { Pagination, Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import products from "../../assets/data/products.json";
import { Button } from "@mui/material";
import "./style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BannerResin from "../../assets/image/banner-resin-image.jpeg";
import BannerPVC from "../../assets/image/banner-pvc-image.jpeg";

const HomeProducts = () => {
  const flattenProducts = () => {
    let allProducts = [];
    products.forEach((category) => {
      category.items.forEach((subCategory) => {
        allProducts = allProducts.concat(subCategory.products);
      });
    });
    return allProducts;
  };

  const allProducts = flattenProducts();
  return (
    <div className="homeProducts">
      {/* TITLE */}
      <div className="title mt-2 hidden">
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
            <div className="d-flex align-items-center mt-4 hidden">
              <div className="info">
                <h3 className="mb-0 hd">Resin Statues</h3>
              </div>
              <Button className="viewAllBtn ml-auto">
                View all <IoIosArrowRoundForward />
              </Button>
            </div>
            <div className="bestSellersWrapper hidden">
              {/* Ảnh giới thiệu bên trái */}
              <div className="promoImageBox">
                <img
                  src={BannerResin}
                  alt="Most Popular"
                  className="promoImage"
                />
                <div className="promoTextOverlay">
                  <h2 className="promoTitle">Resin Statues</h2>
                  <p className="promoDesc">
                    These figure is made from high-quality resin, known for its
                    sharp detail and smooth finish. It is ideal for high-end
                    display pieces but should be handled with care due to its
                    fragile nature.
                    <br />
                    <b>
                      Minor variations may occur due to the handcrafted process.
                    </b>
                  </p>
                </div>
              </div>

              {/* Slider sản phẩm bên phải */}
              <div className="productSliderBox">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={20}
                  slidesPerGroup={2}
                  pagination={{ clickable: true }}
                  navigation={false}
                  modules={[Pagination, Navigation]}
                  className="bestSellerSwiper"
                >
                  {allProducts.slice(0, 10).map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* PVC Statues */}
            <div className="d-flex align-items-center mt-4 hidden">
              <div className="info">
                <h3 className="mb-0 hd">PVC Figures</h3>
              </div>
              <Button className="viewAllBtn ml-auto">
                View all <IoIosArrowRoundForward />
              </Button>
            </div>
            <div className="bestSellersWrapper hidden">
              {/* Slider sản phẩm bên trái*/}
              <div className="productSliderBox">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={20}
                  slidesPerGroup={2}
                  pagination={{ clickable: true }}
                  navigation={false}
                  modules={[Pagination, Navigation]}
                  className="bestSellerSwiper"
                >
                  {allProducts.slice(0, 10).map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Ảnh giới thiệu bên phải */}
              <div className="promoImageBox">
                <img
                  src={BannerPVC}
                  alt="Most Popular"
                  className="promoImage"
                />
                <div className="promoTextOverlay">
                  <h2 className="promoTitle">PVC Figures</h2>
                  <p className="promoDesc">
                    These figure is made from high-quality PVC, offering
                    durability and flexibility. It is well-suited for dynamic
                    poses and articulated designs, making it ideal for both
                    display and light handling.
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

      {/* TITLE */}
      <div className="title mt-2 hidden">
        <h2>
          <div className="line"></div>
          <span className="titleMain">PRODUCTS</span>
          <div className="line"></div>
        </h2>
      </div>
      <div className="container">
        {/* NEW PRODUCTS */}
        <div className="subTitle d-flex align-items-center hidden">
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
        <div className="product_row productRow2 w-100 d-flex hidden">
          {allProducts.slice(0, 8).map((product) => (
            <div key={product.id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>

        {/* SALE */}
        <div className="subTitle d-flex align-items-center hidden">
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
        <div className="product_row productRow3 w-100 d-flex hidden">
          {allProducts.slice(0, 8).map((product) => (
            <div key={product.id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomeProducts;
