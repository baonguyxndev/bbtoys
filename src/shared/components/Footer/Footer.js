import "./Footer.css";
import { LuRefreshCcw } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { BiCopyright } from "react-icons/bi";
import { TbPigMoney } from "react-icons/tb";
import { Link } from "react-router-dom";
import Vietnam from "../SVG/Flag/Vietnam.js";
import China from "../SVG/Flag/China.js";
import Canada from "../SVG/Flag/Canada.js";
import Singapore from "../SVG/Flag/Singapore.js";
import Japan from "../SVG/Flag/Japan.js";
import Facebook from "../SVG/SocialMedia/Facebook.js";
import Instagram from "../SVG/SocialMedia/Instagram.js";
import TikTok from "../SVG/SocialMedia/TikTok.js";
import WeChat from "../SVG/SocialMedia/Wechat.js";
import ApplePay from "../SVG/PaymentMethod/ApplePay.js";
import GooglePay from "../SVG/PaymentMethod/GooglePay.js";
import MasterCard from "../SVG/PaymentMethod/MasterCard.js";
import Paypal from "../SVG/PaymentMethod/Paypal.js";
import Visa from "../SVG/PaymentMethod/Visa.js";
import WechatPay from "../SVG/PaymentMethod/WechatPay.js";

const Footer = () => {
  return (
    <div className="footer">
      <div className="topInfo row">
        <div className="col d-flex align-items-center justify-content-center">
          <span>
            <LuRefreshCcw />
          </span>
          <span className="ml-2">New products daily</span>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <span>
            <TbTruckDelivery />
          </span>
          <span className="ml-2">Daily mega discount</span>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <span>
            <BiCopyright />
          </span>
          <span className="ml-2">Copyright commitment</span>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <span>
            <TbPigMoney />
          </span>
          <span className="ml-2">Best price on the market</span>
        </div>
      </div>
      <footer>
        <div className="footerInner">
          <div className="footerBlock">
            <div className="col">
              <h6>BB Toys</h6>
              <p className="shortIntroduction">
                BB Toys specializes in supplying and sourcing authentic
                collectible figures from around the world. We also offer
                tailored purchasing services based on customer requests.
              </p>
            </div>

            <div className="col">
              <h6>Page</h6>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop now</Link>
                </li>
                <li>
                  <Link to="/support">Sent ticket</Link>
                </li>
                <li>
                  <Link to="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link to="/info">More Info</Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <div className="imgLogoFooter">
                <img src="/logo-bb-toys-shop.png" alt="logo" />
              </div>
            </div>

            <div className="col">
              <h6>Our Warehouses/Showrooms</h6>
              <div className="iconFlag">
                <Vietnam size={40} />
                <China size={40} />
                <Japan size={40} />
                <Canada size={40} />
                <Singapore size={40} />
              </div>
            </div>

            <div className="col">
              <h6>Hotline/Mail</h6>
              <ul>
                <li>Phone: 0123456789</li>
                <li>Mail: example@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footerWrapper">
          <div className="footerEnd">
            <div className="footerRights">
              <p className="copyrightText">
                Copyright © 2025{" "}
                <a className="brandLink" href="/">
                  BB Toys.
                </a>{" "}
                All Rights Reserved
              </p>
            </div>
          </div>
        </div>

        <div className="footerWrapper">
          <div className="footerEnd">
            <div className="socialIcons">
              <Facebook size={20} />
              <Instagram size={20} />
              <TikTok size={20} />
              <WeChat size={20} />
            </div>
            <div className="paymentIcons">
              <ApplePay size={40} />
              <GooglePay size={40} />
              <MasterCard size={40} />
              <Paypal size={40} />
              <Visa size={40} />
              <WechatPay size={40} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
