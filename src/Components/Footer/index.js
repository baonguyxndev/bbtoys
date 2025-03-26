import "./style.css";
import { LuRefreshCcw } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { BiCopyright } from "react-icons/bi";
import { TbPigMoney } from "react-icons/tb";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo-bb-toys-shop-big.png";
import PayPal from "../../assets/image/footer_payment_paypal.png";
import Wise from "../../assets/image/footer_payment_wise.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="topInfo row ">
        <div className="col d-flex align-items-center justify-content-center ">
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
          <div className="footerBlock row justify-content-between mx-auto">
            <div className="col ">
              <h6>Our Product</h6>
              <ul>
                <li>
                  <Link to="#">Anime</Link>
                </li>
                <li>
                  <Link to="#">Game</Link>
                </li>
                <li>
                  <Link to="#">Super Hero</Link>
                </li>
                <li>
                  <Link to="#">NSFW</Link>
                </li>
                <li>
                  <Link to="#">State</Link>
                </li>
              </ul>
            </div>

            <div className="col ">
              <h6>Help & Support</h6>
              <ul>
                <li>
                  <Link to="#">Terms of Service</Link>
                </li>
                <li>
                  <Link to="#">Private Policy</Link>
                </li>
                <li>
                  <Link to="#">Cancelations and Returns</Link>
                </li>
                <li>
                  <Link to="#">FAQ</Link>
                </li>
                <li>
                  <Link to="#">After-Sales Service</Link>
                </li>
              </ul>
            </div>

            <div className="col ">
              <div className="imgLogoFooter">
                <img src={Logo} alt="logo" />
              </div>
            </div>

            <div className="col ">
              <h6>Contact Us</h6>
              <ul>
                <li>
                  <Link to="#">Facebook</Link>
                </li>
                <li>
                  <Link to="#">Instagram</Link>
                </li>
                <li>
                  <Link to="#">Wechat</Link>
                </li>
                <li>
                  <Link to="#">TikTok</Link>
                </li>
                <li>
                  <Link to="#">Mail</Link>
                </li>
              </ul>
            </div>

            <div className="col ">
              <h6>Payment Methods</h6>
              <ul className="paymentMethod">
                <li>
                  <img src={PayPal} alt="imgPaypal" />
                </li>
                <li>
                  <img src={Wise} alt="imWise" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
