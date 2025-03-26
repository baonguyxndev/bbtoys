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
import licences from "../../assets/data/licences.json";
const Home = () => {
  return (
    <>
      <HomeBanner />

      {/* LICENCES */}
      <section className="homeLicences">
        <div className="sectionTitle mt-2">
          <h2>
            <div className="line"></div>
            <span className="sectionTitleMain">LICENCES</span>
            <div className="line"></div>
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="licenceWrapper">
              {/* Hàng 1: 4 card nhỏ */}
              <ul className="row row-cols-1 row-cols-sm-4 g-4 licenceRow">
                {licences.slice(0, 4).map((licence) => (
                  <li key={licence.id} className="col">
                    <div className="licenceCard">
                      <a
                        href={`/licences/${licence.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="licenceCard-link"
                      >
                        <div className="imageWrapper">
                          <img
                            src={licence.background}
                            alt={`img-${licence.name}`}
                            className="img-fluid"
                          />
                          <div className="logoOverlay">
                            <img
                              src={licence.logo}
                              alt={`logo-${licence.name}`}
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Hàng 2: 2 card nhỏ + 1 card lớn */}
              <div className="licenceRow licenceRow--mixed">
                {/* 2 card nhỏ */}
                <ul className="row row-cols-1 row-cols-sm-2 g-4">
                  {licences.slice(4, 6).map((licence) => (
                    <li key={licence.id} className="col">
                      <div className="licenceCard">
                        <a
                          href={`/licences/${licence.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="licenceCard-link"
                        >
                          <div className="imageWrapper">
                            <img
                              src={licence.background}
                              alt={`img-${licence.name}`}
                              className="img-fluid"
                            />
                            <div className="logoOverlay">
                              <img
                                src={licence.logo}
                                alt={`logo-${licence.name}`}
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Card lớn */}
                <ul className="row">
                  <li className="col-12 allLicenceItem">
                    <div className="allLicenceCard">
                      <a href="/licences" className="cardAllLicences">
                        <div className="text">OTHER</div>
                        <div className="imageWrapper">
                          <img
                            src="https://e1.pxfuel.com/desktop-wallpaper/894/350/desktop-wallpaper-anime-digital-anime-crossover-accel-world-another-crossover-anime.jpg"
                            alt={`img-all-licences`}
                            className="img-fluid"
                          />
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="homeProducts">
        {/* TITLE */}
        <div className="sectionTitle mt-2 hidden">
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
              <div className="d-flex align-items-center productRow mt-5 hidden">
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
                {products.slice(0, 8).map((product) => (
                  <div key={product.id}>
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>

              {/* BEST SELLER */}
              <div className="d-flex align-items-center productRow mt-4 hidden">
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

              <div className="product_row w-100 hidden">
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
              <div className="d-flex align-items-center productRow mt-5 hidden">
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

      {/*LETTER*/}
      <section className="newLetter d-flex align-items-center hidden">
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

      {/*CATEGORIES*/}
      <HomeCate />
    </>
  );
};

export default Home;
