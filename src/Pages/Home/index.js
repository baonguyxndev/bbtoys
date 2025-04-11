import "./style.css";
import HomeBanner from "../../Components/HomeBanner";
import { Button } from "@mui/material";
import React from "react";
import HomeCate from "../../Components/HomeCate";
import NewsLetterImg from "../../assets/image/discount-10-silver.png";
import { IoMailOutline } from "react-icons/io5";
import HomeProducts from "../../Components/HomeProducts";
import HomeLicences from "../../Components/HomeLicences";

const Home = () => {
  return (
    <>
      <HomeBanner />

      <HomeProducts />

      <HomeLicences />

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

      <HomeCate />
    </>
  );
};

export default Home;
