import "./styles/HomeBanner.css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const bannerImages = [
  "/assets/image/home-banner-1.jpg",
  "/assets/image/home-banner-2.webp",
  "/assets/image/home-banner-3.jpg",
  "/assets/image/home-banner-4.jpg",
];

const HomeBanner = () => {
  return (
    <div className="homeBannerSection">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop={true}
        spaceBetween={20}
        centeredSlides={true}
      >
        {bannerImages.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <div className="banner-wrapper ">
              <div className="banner-image-container">
                <img
                  src={imgSrc}
                  alt={`Toy shop promotional banner ${index + 1}`}
                  className="banner-image"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
