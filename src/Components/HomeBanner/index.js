import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const HomeBanner = () => {
  return (
    <div className="homeBannerSection">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {[
          "https://file.hstatic.net/200000515997/file/1200x500_1_b0798332fcd3415ca9b2312cade52cd2.png",
          "https://file.hstatic.net/200000515997/file/1200x500_2_a2c0eb05f3874967ab508da9c8df61cb.png",
          "https://file.hstatic.net/200000515997/file/1200x500_1_b0798332fcd3415ca9b2312cade52cd2.png",
          "https://file.hstatic.net/200000515997/file/1200x500_1_b0798332fcd3415ca9b2312cade52cd2.png",
          "https://file.hstatic.net/200000515997/file/1200x500_1_b0798332fcd3415ca9b2312cade52cd2.png",
        ].map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <img src={imgSrc} alt={`homebanner-${index}`} className="w-80" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
