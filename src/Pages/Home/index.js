import "./style.css";
import products from "../../assets/data/products.json";
import HomeBanner from "../../Components/HomeBanner";
import { Button } from "@mui/material";
import { IoIosArrowRoundForward } from "react-icons/io";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import HomeCate from "../../Components/HomeCate";
import NewsLetterImg from "../../assets/image/discount-10-silver.png";
import { IoMailOutline } from "react-icons/io5";

const Home = () => {
  return (
    <>
      <HomeBanner />

      <section className="homeProducts">
        <div className="sectionTitle mt-2">
          <h2>
            <div className="line"></div>
            <span className="sectionTitleMain">PRODUCTS</span>
            <div className="line"></div>
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* NEW PRODUCTS */}
              <div className="d-flex align-items-center productRow mt-5">
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
                {products.slice(0, 8).map((product) => (
                  <div key={product.id}>
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>

              {/* BEST SELLER */}
              <div className="d-flex align-items-center productRow mt-4">
                <div className="info">
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View all <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  slidesPerGroup={4}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                >
                  {products.slice(0, 10).map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* SALE */}
              <div className="d-flex align-items-center productRow mt-5">
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
                {products.slice(0, 8).map((product) => (
                  <div key={product.id}>
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Letter*/}
      <section className="newLetterSection d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white">10% discount for your first order</p>
              <h4 className="text-white">Join our newsletter and get...</h4>
              <p className="text-light">
                Join your email subscription now to get updates on promotions
                and coupon.
              </p>

              <form>
                <IoMailOutline />
                <input className="text" placeholder="Your email address" />
                <Button>subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={NewsLetterImg} alt="imgDiscountLetter" />
            </div>
          </div>
        </div>
      </section>

      {/*Categories*/}
      <HomeCate />
    </>
  );
};

export default Home;
