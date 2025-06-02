import { Outlet } from "react-router-dom";
import "../features/checkout/styles/Checkout.css";

const CheckoutLayout = () => (
  <div className="checkout-layout-wrapper">
    <div className="checkout-layout-logo-box">
      <img
        src="/logo-bb-toys-shop.png"
        alt="Logo"
        className="checkout-layout-logo"
      />
    </div>
    <Outlet />
  </div>
);

export default CheckoutLayout;
