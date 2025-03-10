import React from "react";
import Slider from "react-slick";
const HomeBanner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };
  return (
    <>
      <div className="homeBannerSection">
        <Slider {...settings}>
          <div className="item">
            <img
              src="https://file.hstatic.net/200000515997/file/1200x500_1_b0798332fcd3415ca9b2312cade52cd2.png"
              alt="homebanner"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://file.hstatic.net/200000515997/file/1200x500_2_a2c0eb05f3874967ab508da9c8df61cb.png"
              alt="homebanner"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://file.hstatic.net/200000515997/file/1200x500_1_b0798332fcd3415ca9b2312cade52cd2.png"
              alt="homebanner"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://file.hstatic.net/200000515997/file/1200x500_1_b0798332fcd3415ca9b2312cade52cd2.png"
              alt="homebanner"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://file.hstatic.net/200000515997/file/1200x500_1_b0798332fcd3415ca9b2312cade52cd2.png"
              alt="homebanner"
              className="w-100"
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default HomeBanner;
