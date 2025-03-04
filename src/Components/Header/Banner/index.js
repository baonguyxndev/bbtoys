import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Import hình ảnh đúng cách
import banner1 from "../../../assets/image/banner/banner1.webp";
import banner2 from "../../../assets/image/banner/banner2.webp";

const banners = [banner1, banner2, banner1]; // Tạo mảng ảnh

const Banner = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="bannerWrapper col-sm-12">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={500}
          >
            {banners.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="img-fluid w-100"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banner;
