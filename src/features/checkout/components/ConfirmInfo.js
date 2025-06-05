import React from "react";
import { Button } from "@mui/material";
import "./styles/ConfirmInfo.css";
import QR from "../../../shared/components/SVG/PaymentMethod/QR";
import Paypal from "../../../shared/components/SVG/PaymentMethod/Paypal";
import ApplePay from "../../../shared/components/SVG/PaymentMethod/ApplePay";
import GooglePay from "../../../shared/components/SVG/PaymentMethod/GooglePay";
import WechatPay from "../../../shared/components/SVG/PaymentMethod/WechatPay";
import { FaMoneyBillWave, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// Mastercard Logo Component
const MastercardLogo = (props) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <circle cx={7} cy={12} r={7} fill="#EA001B" />
      <circle cx={17} cy={12} r={7} fill="#FFA200" fillOpacity={0.8} />
    </g>
  </svg>
);

// Visa Logo Component
const VisaLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800px"
    height="800px"
    viewBox="0 0 750 471"
    {...props}
  >
    <g>
      <path
        fill="#FFFFFF"
        d="M278.198,334.228l33.36-195.763h53.358l-33.384,195.763H278.198L278.198,334.228z"
      />
      <path
        fill="#FFFFFF"
        d="M524.307,142.687c-10.57-3.966-27.135-8.222-47.822-8.222c-52.725,0-89.863,26.551-90.18,64.604c-0.297,28.129,26.514,43.821,46.754,53.185c20.77,9.597,27.752,15.716,27.652,24.283c-0.133,13.123-16.586,19.116-31.924,19.116c-21.355,0-32.701-2.967-50.225-10.274l-6.877-3.112l-7.488,43.823c12.463,5.466,35.508,10.199,59.438,10.445c56.09,0,92.502-26.248,92.916-66.884c0.199-22.27-14.016-39.216-44.801-53.188c-18.65-9.056-30.072-15.099-29.951-24.269c0-8.137,9.668-16.838,30.559-16.838c17.447-0.271,30.088,3.534,39.936,7.5l4.781,2.259L524.307,142.687"
      />
      <path
        fill="#FFFFFF"
        d="M661.615,138.464h-41.23c-12.773,0-22.332,3.486-27.941,16.234l-79.244,179.402h56.031c0,0,9.16-24.121,11.232-29.418c6.123,0,60.555,0.084,68.336,0.084c1.596,6.854,6.492,29.334,6.492,29.334h49.512L661.615,138.464L661.615,138.464z M596.198,264.872c4.414-11.279,21.26-54.724,21.26-54.724c-0.314,0.521,4.381-11.334,7.074-18.684l3.607,16.878c0,0,10.217,46.729,12.352,56.527h-44.293V264.872L596.198,264.872z"
      />
      <path
        fill="#FFFFFF"
        d="M 45.878906 138.46484 L 45.197266 142.53711 C 66.290228 147.64311 85.129273 155.0333 101.62305 164.22656 L 148.96875 333.91406 L 205.42383 333.85156 L 289.42773 138.46484 L 232.90234 138.46484 L 180.66406 271.96094 L 175.09961 244.83008 C 174.83893 243.99185 174.55554 243.15215 174.26562 242.31055 L 156.10547 154.99219 C 152.87647 142.59619 143.50892 138.89684 131.91992 138.46484 L 45.878906 138.46484 z"
      />
    </g>
  </svg>
);

const ConfirmInfo = ({ onNext, onBack, formData }) => {
  const paymentMethod = formData.paymentMethod;
  const cardInfo = formData.cardInfo || {};

  // Shipping method GIFs
  const standardShippingGif =
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTFreXdibjFuOWU4aGRid3BpNXVmN2YydHU0d3ZvYWl3Yml2d2trbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/4kVAY28Chug8RX7txG/giphy.gif";
  const expressShippingGif =
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTE2d3p5YzI4dXRxbGUwczM3d2Y3emFlaTJsMXJpNmI4c2lkc2NlcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/HlfpNuh15y0IXs5rHh/giphy.gif";

  // Render QR Payment Method
  const renderQRPayment = () => (
    <div className="payment-qr">
      <div className="qr-container">
        <QR size={220} />
        <div className="qr-actions">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigator.clipboard.writeText("QR_CODE_DATA")}
          >
            Copy QR Code
          </Button>
          <Button variant="outlined" color="primary">
            Download QR
          </Button>
        </div>
      </div>
    </div>
  );

  // Render PayPal Payment Method
  const renderPayPalPayment = () => (
    <div className="payment-paypal">
      <div className="payment-button paypal large">
        <Paypal className="payment-icon" />
        <span>Continue with PayPal</span>
      </div>
    </div>
  );

  // Render Apple Pay Method
  const renderApplePay = () => (
    <div className="payment-applepay">
      <div className="payment-button apple large">
        <ApplePay className="payment-icon" />
        <span>Continue with Apple Pay</span>
      </div>
    </div>
  );

  // Render Google Pay Method
  const renderGooglePay = () => (
    <div className="payment-googlepay">
      <div className="payment-button google large">
        <GooglePay className="payment-icon" />
        <span>Continue with Google Pay</span>
      </div>
    </div>
  );

  // Render WeChat Pay Method
  const renderWeChatPay = () => (
    <div className="payment-wechatpay">
      <div className="payment-button wechat large">
        <WechatPay className="payment-icon" />
        <span>Continue with WeChat Pay</span>
      </div>
    </div>
  );

  // Render Card Payment Method
  const renderCardPayment = () => (
    <div className="payment-card">
      <div
        className={`virtual-card ${
          cardInfo.type === "mastercard" ? "mastercard" : ""
        }`}
      >
        <div className="card-top-row">
          <span className="card-label">Credit Card</span>
          <span className="bank-name">{cardInfo.bank || "Bank Name"}</span>
        </div>
        <div className="card-chip-row">
          <div className="card-chip"></div>
        </div>
        <div className="card-number-row">
          <span className="card-number">
            {cardInfo.number
              ? cardInfo.number.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
              : "1234 5678 9012 3456"}
          </span>
        </div>
        <div className="card-bottom-row">
          <div className="card-holder-block">
            <span className="card-holder-label">Name</span>
            <span className="card-holder">
              {cardInfo.name || "Name Surname"}
            </span>
          </div>
          <div className="card-expiry-block">
            <span className="valid-thru">VALID THRU</span>
            <span className="expiry-date">{cardInfo.expiry || "01/80"}</span>
          </div>
          <div className="card-logo">
            {cardInfo.type === "visa" ? (
              <VisaLogo className="visa-logo" />
            ) : (
              <MastercardLogo className="mastercard-logo" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render COD Payment Method
  const renderCODPayment = () => (
    <div className="payment-cod">
      <div className="cod-icon-box">
        <FaMoneyBillWave className="cod-icon" />
      </div>
    </div>
  );

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case "qr":
        return renderQRPayment();
      case "paypal":
        return renderPayPalPayment();
      case "applepay":
        return renderApplePay();
      case "googlepay":
        return renderGooglePay();
      case "wechatpay":
        return renderWeChatPay();
      case "card":
        return renderCardPayment();
      case "cod":
        return renderCODPayment();
      default:
        return <div className="payment-unknown">Invalid payment method</div>;
    }
  };

  // Get initials for avatar
  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <div className="checkout-confirm">
      <h3 className="title">Confirm Information</h3>

      {/* Customer Information */}
      <div className="customer">
        <div className="customer-profile">
          <div className="avatar">
            {getInitials(formData.firstName, formData.lastName)}
          </div>
          <div className="info">
            <h3 className="name">
              {formData.firstName} {formData.lastName}
            </h3>
            <div className="details">
              <div className="detail">
                <FaEnvelope className="detail-icon" />
                <span>{formData.email}</span>
              </div>
              <div className="detail">
                <FaPhone className="detail-icon" />
                <span>{formData.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="shipping">
        <div className="shipping-header">
          <h4 className="shipping-title">Shipping Information</h4>
        </div>
        <div className="map">
          <div className="map-placeholder">
            <div className="map-content">
              <MdLocationOn className="map-marker" />
              <div className="map-address">
                <div className="address-text">{formData.address}</div>
                <div className="address-text">
                  {formData.city}, {formData.country} {formData.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="method">
        <div className="method-header">
          <h4 className="method-title">Shipping Method</h4>
        </div>
        <div className="method-content">
          <div className="method-icon">
            <img
              src={
                formData.method === "standard"
                  ? standardShippingGif
                  : expressShippingGif
              }
              alt={
                formData.method === "standard"
                  ? "Standard Shipping"
                  : "Express Shipping"
              }
            />
          </div>
          <div className="method-info">
            <div className="method-name">
              {formData.method === "standard"
                ? "Standard Shipping"
                : "Express Shipping"}
            </div>
            <div className="method-description">
              {formData.method === "standard"
                ? "Delivery within 5-7 business days"
                : "Delivery within 1-2 business days"}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="payment">
        <div className="payment-header">
          <h4 className="payment-title">Payment Method</h4>
        </div>
        <div className="section-content">
          <div className="section-row">{renderPaymentMethod()}</div>
        </div>
      </div>

      <div className="actions">
        <Button
          variant="outlined"
          onClick={onBack}
          type="button"
          className="btn-back"
        >
          Back
        </Button>
        <Button onClick={onNext} className="btn-confirm">
          Confirm Order
        </Button>
      </div>
    </div>
  );
};

export default ConfirmInfo;
