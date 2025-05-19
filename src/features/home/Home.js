import "./styles/Home.css";
import HomeBanner from "./HomeBanner";
import HomeProduct from "./HomeProduct";
import HomeCate from "./HomeCategory";
import HomeStudio from "./HomeStudio";
import { Button } from "@mui/material";
import { IoMailOutline } from "react-icons/io5";
const Home = () => {
  return (
    <>
      <HomeBanner />

      <HomeProduct />

      {/*LETTER*/}
      <section className="newLetter d-flex align-items-center">
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
              <img
                src="assets/image/discount-10-silver.png"
                alt="imgDiscountLetter"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeCate />

      <HomeStudio />
    </>
  );
};

export default Home;
