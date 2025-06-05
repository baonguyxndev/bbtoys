import { Outlet } from "react-router-dom";
import "../features/checkout/styles/Checkout.css";
import { Link } from "react-router-dom";

const CheckoutLayout = () => (
  <div className="checkout-layout-wrapper">
    <div className="checkout-layout-logo-box">
      <Link to="/">
        <img
          src="/logo-bb-toys-shop.png"
          alt="Logo"
          className="checkout-layout-logo"
        />
      </Link>
    </div>
    <Outlet />
  </div>
);

export default CheckoutLayout;
