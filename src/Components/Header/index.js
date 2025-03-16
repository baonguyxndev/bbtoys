import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Logo from "../../assets/image/logo/logo-bb-toys-shop-big.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { PiGlobe } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`headerWrapper ${isScrolled ? "scrolled" : ""}`}>
      <div className="top-strip bg-black">
        <div className="container">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={500}
          >
            <SwiperSlide>
              <div className="banner-top-bar">
                <p className="mb-0 mt-0 text-center text-white">
                  Giá sản phẩm có thể thay đổi theo nhiều yếu tố khách quan
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="banner-top-bar">
                <p className="mb-0 mt-0 text-center text-white">
                  International Shipping - Giao hàng toàn cầu
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="banner-top-bar">
                <p className="mb-0 mt-0 text-center text-white">
                  BB Toys là nơi chuyên cung cấp mô hình chính hãng trên toàn
                  thế giới
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="logoWrapper d-flex align-items-center col-sm-2">
              <Link to={"/"}>
                <img src={Logo} alt="logo" />
              </Link>
            </div>

            <div className="col-sm-10 d-flex align-items-center part2">
              <SearchBox />

              <div className="d-flex align-items-center part3 mr-auto">
                <Button className="circle ml-3">
                  <PiGlobe />
                </Button>

                <Button className="circle ml-3">
                  <FaMoneyBillTransfer />
                </Button>

                {/* User */}
                <Button className="circle ml-3">
                  <FiUser />
                </Button>
                {/* User */}

                {/* Cart */}
                <div className="ml-auto cartTab d-flex align-items-center">
                  <span className="price ml-3">$0.00</span>
                  <div className="position-relative ml-3">
                    <Button className="circle">
                      <IoBagOutline />
                    </Button>
                    <span className="count d-flex align-items-center justify-content-center">
                      0
                    </span>
                  </div>
                </div>
                {/* Cart */}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navigation />
      <hr />
    </div>
  );
};

export default Header;
