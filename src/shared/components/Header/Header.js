import React, { useState, useEffect } from "react";
import "./Header.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { PiGlobe } from "react-icons/pi";
import { TbHome } from "react-icons/tb";
import { FaQuestion } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { LuPanelRightClose } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSmallHeader, setShowSmallHeader] = useState(false);
  const [isOpenSideBarNav, setIsOpenSideBarNav] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hoveredImage, setHoveredImage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowSmallHeader(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMenu = () => {
    if (isOpenSideBarNav) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpenSideBarNav(false);
        setIsClosing(false);
      }, 600);
    } else {
      setIsOpenSideBarNav(true);
    }
  };

  const handleUserClick = () => {
    if (currentUser) {
      navigate(`/customer/${currentUser.id}`);
    } else {
      navigate("/login");
    }
  };

  const renderSideBarNav = () => (
    <div
      className={`sideBarNav shadow-lg ${isOpenSideBarNav ? "open" : ""} ${
        isClosing ? "closing" : ""
      }`}
    >
      {/* Nút X để đóng sidebar */}
      <button className="close-btn" onClick={handleToggleMenu}>
        <LuPanelRightClose />
        &nbsp;Exit
      </button>
      <div className="row p-3">
        {/* Sidebar Content */}
        <div className="col-lg-2 col-md-4">
          <ul>
            <li className="memuTitle">Anime</li>
            {[
              {
                name: "Dragon Ball",
                img: "https://dinotoystore.vn/wp-content/uploads/2024/01/418100916_1121048605825948_8638500788809847421_n.jpg",
              },
              {
                name: "Naruto",
                img: "https://product.hstatic.net/200000707011/product/412490014_349534367826732_7954872781839651399_n_e81a393ac4e64fc79179663b13de339a_master.jpg",
              },
              {
                name: "One Piece",
                img: "https://dinotoystore.vn/wp-content/uploads/2024/05/O1CN010bBlBA1ilWcXwVhj7_815204453-3.jpg",
              },
              {
                name: "Jujutsu Kaisen",
                img: "https://cdn.toyokoku.com.au/app/uploads/2024/12/25082715/Image_20241225064446.jpg",
              },
              {
                name: "Chainsaw Man",
                img: "https://i.redd.it/j8aamsp2u1r31.jpg",
              },
              {
                name: "Pokemon",
                img: "https://product.hstatic.net/200000915561/product/z5906405582552_d037b0b6c91b0a5a60e4b9b66872e7b5_acd260ec5d68463cac5cf879032ac3d5_master.jpg",
              },
              {
                name: "Hunter x Hunter",
                img: "https://product.hstatic.net/200000707011/product/464502486_540473585399475_409357148539679234_n_8ce800f6ad864fd5b7332dd4e02ecadf_master.jpg",
              },
              {
                name: "Demon Slayer",
                img: "https://product.hstatic.net/200000740923/product/3d9f20892766663a4463d7e4e4fe8f1c6a6314665d5cf91656059451_43bde1cb7a2943748db39159e671683b_master.jpg",
              },
              {
                name: "Attack On Titan",
                img: "https://favorgk.com/wp-content/uploads/2023/11/301-3.jpg",
              },
              {
                name: "Berserk",
                img: "https://www.clubhousestatues.com/cdn/shop/files/E606AE7D-6006-4BF2-8E12-24FFD0EEF181.jpg?v=1705393808&width=823",
              },
              {
                name: "Spy x Family",
                img: "https://i1.wp.com/img.elevengk.com/Big_Feeler_Studio_-_SPY%C3%97FAMILY_CODE:_White_Family_Portrait-3.jpg?ssl=1",
              },
              {
                name: "Order Anime",
                img: "http://product.hstatic.net/200000707011/product/350823777_984522842547855_5690819540553544334_n_995b81cf07674283af76d947fbaa3a0a_master.jpg",
              },
            ].map((item, index) => (
              <li key={index} onMouseEnter={() => setHoveredImage(item.img)}>
                <Link to="/">
                  <Button>{item.name}</Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-3 col-md-4">
          <ul>
            <li className="memuTitle">Game</li>
            {[
              {
                name: "Elden Ring",
                img: "https://www.japanime.it/cdn/shop/files/x_btn66163.jpg",
              },
              {
                name: "Resident Evil",
                img: "https://rooftop1976.com/news/a4e52f4a810f503b55e7798d3b241fee2f51b553.jpg",
              },
              {
                name: "Zelda",
                img: "https://i.kinja-img.com/image/upload/c_fit,q_60,w_1600/5973c38e2107027a1f8986f7122e8e17.jpg",
              },
              {
                name: "Final Fantasy",
                img: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/09/vest-characters-final-fantasy-VII-remake.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
              },
              {
                name: "Dark Souls",
                img: "https://reactivefigures.co.uk/cdn/shop/files/b_ac1309fd-6c28-49e0-bf08-c4e129106aed_700x513.png?v=1713800435",
              },
              {
                name: "Nier:Automata",
                img: "https://gamelade.vn/wp-content/uploads/2024/12/nier-automata-anime-2b-figure-with-1-4-scale_11zon-1.jpg",
              },
              {
                name: "Street Fighter",
                img: "https://www.specfictionshop.com/cdn/shop/products/RYUMAIN_2000x.jpg?v=1640973115",
              },
              {
                name: "King Of Fighters",
                img: "https://img.fantaskycdn.com/9f5a4204c95a53e4e858007ce6e30874.jpeg",
              },
              {
                name: "Overwatch",
                img: "https://www.hobbymodel.net/web/board/2022/tee2UURS03XGO2832022207.jpg",
              },
              {
                name: "Blue Archive",
                img: "https://www.hobbymodel.net/web/board/2022/tee2UURS03XGO2832022207.jpg",
              },
              {
                name: "Azur Lane",
                img: "https://www.hobbymodel.net/web/board/2022/tee2UURS03XGO2832022207.jpg",
              },
              {
                name: "Order Game",
                img: "https://www.hobbymodel.net/web/board/2022/tee2UURS03XGO2832022207.jpg",
              },
            ].map((item, index) => (
              <li key={index} onMouseEnter={() => setHoveredImage(item.img)}>
                <Link to="/">
                  <Button>{item.name}</Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-lg-2 col-md-4">
          <div>
            <ul>
              <li className="memuTitle">Super hero</li>
              {[
                {
                  name: "DC / Marvel",
                  img: "https://img.orzgk.com/wp-content/uploads/2024/08/UPMDC-10_b37.jpg",
                },
                {
                  name: "Kamen Rider",
                  img: "https://product.hstatic.net/200000588991/product/9bd30908-99f6-49c6-b2ea-e27d9aec69a3_7d400a06625a4531b4956ba150502a49_master.jpeg",
                },
                {
                  name: "Ultraman",
                  img: "https://static.wixstatic.com/media/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg/v1/fill/w_625,h_407,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg",
                },
              ].map((item, index) => (
                <li key={index} onMouseEnter={() => setHoveredImage(item.img)}>
                  <Link to="/">
                    <Button>{item.name}</Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              <li className="memuTitle">NSFW</li>
              {[
                {
                  name: "Female 18+",
                  img: "https://static.wixstatic.com/media/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg/v1/fill/w_625,h_407,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg",
                },
                {
                  name: "Male 18+",
                  img: "https://static.wixstatic.com/media/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg/v1/fill/w_625,h_407,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg",
                },
                {
                  name: "Furry 18+",
                  img: "https://static.wixstatic.com/media/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg/v1/fill/w_625,h_407,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg",
                },
              ].map((item, index) => (
                <li key={index} onMouseEnter={() => setHoveredImage(item.img)}>
                  <Link to="/">
                    <Button>{item.name}</Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              <li className="memuTitle">State</li>
              {[
                {
                  name: "Pre-order",
                  img: "https://static.wixstatic.com/media/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg/v1/fill/w_625,h_407,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg",
                },
                {
                  name: "Order",
                  img: "https://static.wixstatic.com/media/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg/v1/fill/w_625,h_407,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg",
                },
                {
                  name: "Available",
                  img: "https://static.wixstatic.com/media/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg/v1/fill/w_625,h_407,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5964ec_c0447e87ed89471399677537c4694e33~mv2.jpg",
                },
              ].map((item, index) => (
                <li key={index} onMouseEnter={() => setHoveredImage(item.img)}>
                  <Link to="/">
                    <Button>{item.name}</Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-5 col-md-12 imgSubMenu d-flex justify-content-center align-items-center">
          {hoveredImage && (
            <img
              src={hoveredImage}
              alt="preview"
              className="img-fluid animated-image"
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`headerWrapper ${isScrolled ? "scrolled" : ""}`}>
      <div className="top-strip bg-black py-2">
        <div className="containerBannerHeader">
          {/* Banner Top Header */}
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

      {/* Main Header */}
      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Left */}
            <div className="col-sm-2 logoWrapper d-flex align-items-center">
              <Link to="/">
                <img src="/logo-bb-toys-shop.png" alt="logo" />
              </Link>
              {/* Categories Sidebar */}
              <div className="cateWrapper ml-3">
                <Button className="allCateTab" onClick={handleToggleMenu}>
                  <LuPanelRightClose />
                  &nbsp;Menu
                </Button>
                {!showSmallHeader && renderSideBarNav()}
              </div>
            </div>

            {/* Center  */}
            <div className="col-sm-8 part2">
              <nav className="navPart2 d-flex justify-content-center">
                <ul className="list list-inline">
                  <li className="list-inline-item">
                    <Link to="/">
                      <TbHome />
                      &nbsp;HOME
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/shop">
                      <IoStorefrontOutline />
                      &nbsp;SHOP
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/support">
                      <BiSupport />
                      &nbsp;SUPPORT
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/faqs">
                      <FaQuestion />
                      &nbsp;FAQs
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/info">
                      <IoInformationCircleOutline />
                      &nbsp;INFO
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right */}
            <div className="col-sm-2 part3 d-flex justify-content-end">
              <Button className="circle ml-3">
                <IoSearch />
              </Button>
              <Button className="circle ml-3">
                <PiGlobe />
              </Button>
              <div className="cartTab d-flex align-items-center">
                <div className="position-relative">
                  <Button className="circle">
                    <IoBagOutline />
                  </Button>
                  <span className="count">0</span>
                </div>
              </div>
              <Button className="circle ml-3" onClick={handleUserClick}>
                <FiUser />
                {currentUser && (
                  <span className="user-name">{currentUser.firstName}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Small Header */}
      {showSmallHeader && (
        <div className="small-header shadow-sm">
          <div className="container-fluid">
            <div className="row align-items-center">
              {/* Left */}
              <div className="col-sm-2 logoWrapper d-flex align-items-center">
                <Link to="/">
                  <img
                    src="/logo-bb-toys-shop.png"
                    alt="logo"
                    className="small-logo"
                  />
                </Link>
                <div className="cateWrapper ml-3">
                  <Button className="allCateTab" onClick={handleToggleMenu}>
                    <LuPanelRightClose />
                    &nbsp;Menu
                  </Button>
                  {renderSideBarNav()}
                </div>
              </div>

              {/* Center */}
              <div className="col-sm-8 part2">
                <nav className="navPart2 d-flex justify-content-center">
                  <ul className="list list-inline">
                    <li className="list-inline-item">
                      <Link to="/">
                        <TbHome />
                        &nbsp;HOME
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/shop">
                        <IoStorefrontOutline />
                        &nbsp;SHOP
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/support">
                        <BiSupport />
                        &nbsp;SUPPORT
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/faqs">
                        <FaQuestion />
                        &nbsp;FAQs
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="/info">
                        <IoInformationCircleOutline />
                        &nbsp;INFO
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Right */}
              <div className="col-sm-2 part3 d-flex justify-content-end">
                <Button className="circle ml-3">
                  <IoSearch />
                </Button>
                <Button className="circle ml-3">
                  <PiGlobe />
                </Button>
                <div className="cartTab d-flex align-items-center">
                  <div className="position-relative">
                    <Button className="circle">
                      <IoBagOutline />
                    </Button>
                    <span className="count">0</span>
                  </div>
                </div>
                <Button className="circle ml-3" onClick={handleUserClick}>
                  <FiUser />
                  {currentUser && (
                    <span className="user-name">{currentUser.firstName}</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
