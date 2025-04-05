import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import homeBanner1 from "../../assets/image/home-banner-1.jpg";
import homeBanner2 from "../../assets/image/home-banner-2.webp";
import homeBanner3 from "../../assets/image/home-banner-3.jpg";
import homeBanner4 from "../../assets/image/home-banner-4.jpg";

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
        {[homeBanner1, homeBanner2, homeBanner3, homeBanner4].map(
          (imgSrc, index) => (
            <SwiperSlide key={index}>
              <div className="banner-wrapper hidden">
                <div className="banner-image-container">
                  <img
                    src={imgSrc}
                    alt={`Toy shop promotional banner ${index + 1}`}
                    className="banner-image"
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
