import { useNavigate } from "react-router-dom";
import "./styles/HomeCategory.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@mui/material";
import { IoIosArrowRoundForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import Loading from "../../shared/components/Loading/Loading.js";
import useFetchCategories from "../../shared/hooks/useFetchCategories.js";

const HomeCategory = () => {
  const { categories, loading, error } = useFetchCategories();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  const handleViewAll = (categoryKey) => {
    navigate(`/shop?categoryKey=${categoryKey}`);
  };

  return (
    <div className="homeCategory">
      <div className="container-full">
        {/* Title */}
        <div className="title">
          <h2>
            <div className="line"></div>
            <span className="titleMain">Category</span>
            <div className="line"></div>
          </h2>
        </div>

        {/* Anime */}
        <div className="anime-wrapper">
          <div className="sub-title-wrapper">
            <div className="sub-title">
              <h3>Anime</h3>
            </div>

            <Button
              className="viewAllBtn"
              onClick={() => handleViewAll("anime")}
            >
              View all <IoIosArrowRoundForward />
            </Button>
          </div>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              reverseDirection: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={false}
            navigation={false}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="swiper_container"
          >
            {categories
              .filter((category) => category.categoryKey === "anime")
              .map((category) =>
                category.items.map((item) => (
                  <SwiperSlide key={item.itemKey}>
                    <div className="slide-content">
                      <img src={item.itemImg} alt={item.itemName} />
                      <div className="slide-info">
                        <h3>{item.itemName}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
          </Swiper>
        </div>

        {/* Game */}
        <div className="game-wrapper">
          <div className="sub-title-wrapper">
            <div className="sub-title">
              <h3>Game</h3>
            </div>

            <Button
              className="viewAllBtn"
              onClick={() => handleViewAll("game")}
            >
              View all <IoIosArrowRoundForward />
            </Button>
          </div>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              reverseDirection: true,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={false}
            navigation={false}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="swiper_container"
          >
            {categories
              .filter((category) => category.categoryKey === "game")
              .map((category) =>
                category.items.map((item) => (
                  <SwiperSlide key={item.itemKey}>
                    <div className="slide-content">
                      <img src={item.itemImg} alt={item.itemName} />
                      <div className="slide-info">
                        <h3>{item.itemName}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default HomeCategory;
