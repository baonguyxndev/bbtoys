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
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSmallHeader, setShowSmallHeader] = useState(false);
  const [isOpenSideBarNav, setIsOpenSideBarNav] = useState(false); // Trạng thái sidebar
  const [isClosing, setIsClosing] = useState(false); // Trạng thái đóng sidebar

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowSmallHeader(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm xử lý bật/tắt sidebar
  const handleToggleMenu = () => {
    if (isOpenSideBarNav) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpenSideBarNav(false);
        setIsClosing(false);
      }, 600); // Thời gian khớp với animation
    } else {
      setIsOpenSideBarNav(true);
    }
  };

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
              <Link to="/">
                {" "}
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
                <Button className="circle ml-3">
                  <FiUser />
                </Button>
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
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navigation
        isOpenSideBarNav={isOpenSideBarNav}
        isClosing={isClosing}
        handleToggleMenu={handleToggleMenu} // Truyền hàm xử lý xuống
      />
      <hr />

      {showSmallHeader && (
        <div className="small-header">
          <div className="left-content">
            <Link to="/" onClick={handleToggleMenu}>
              {" "}
              {/* Logo nhỏ cũng điều khiển sidebar */}
              <img src={Logo} alt="logo" className="small-logo" />
            </Link>
          </div>
          <div className="center-content">
            <nav className="small-nav">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/support">Support</Link>
              <Link to="/policy">Policy</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/licences">Licences</Link>
            </nav>
          </div>
          <div className="right-content">
            <IoSearch />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
