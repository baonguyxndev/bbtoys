import React from "react";
import { FaCheck } from "react-icons/fa";
import QR from "../../../shared/components/SVG/PaymentMethod/QR";
import Paypal from "../../../shared/components/SVG/PaymentMethod/Paypal";
import ApplePay from "../../../shared/components/SVG/PaymentMethod/ApplePay";
import GooglePay from "../../../shared/components/SVG/PaymentMethod/GooglePay";
import WechatPay from "../../../shared/components/SVG/PaymentMethod/WechatPay";
import { FaMoneyBillWave } from "react-icons/fa";
import { Button } from "@mui/material";
import "./styles/PaymentResult.css";
import { useNavigate } from "react-router-dom";
import { useShoppingCartHandler } from "../../../shared/state/shoppingCartHandler";

const PaymentResult = ({ formData = {} }) => {
  const paymentMethod = formData.paymentMethod;
  const cardInfo = formData.cardInfo || {};
  const navigate = useNavigate();
  const { clearCart } = useShoppingCartHandler();

  const handleConfirmPayment = () => {
    clearCart();
    navigate("/");
  };

  // Render QR Payment Method
  const renderQRPayment = () => (
    <div className="payment-qr">
      <h3>QR Code Payment</h3>
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
      <h3>PayPal Payment</h3>
      <div className="payment-button paypal large">
        <Paypal className="payment-icon" />
        <span>Continue with PayPal</span>
      </div>
    </div>
  );

  // Render Apple Pay Method
  const renderApplePay = () => (
    <div className="payment-applepay">
      <h3>Apple Pay</h3>
      <div className="payment-button apple large">
        <ApplePay className="payment-icon" />
        <span>Continue with Apple Pay</span>
      </div>
    </div>
  );

  // Render Google Pay Method
  const renderGooglePay = () => (
    <div className="payment-googlepay">
      <h3>Google Pay</h3>
      <div className="payment-button google large">
        <GooglePay className="payment-icon" />
        <span>Continue with Google Pay</span>
      </div>
    </div>
  );

  // Render WeChat Pay Method
  const renderWeChatPay = () => (
    <div className="payment-wechatpay">
      <h3>WeChat Pay</h3>
      <div className="payment-button wechat large">
        <WechatPay className="payment-icon" />
        <span>Continue with WeChat Pay</span>
      </div>
    </div>
  );

  // Render Card Payment Method
  const renderCardPayment = () => (
    <div className="payment-card">
      <h3>Card Payment</h3>
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
              <span className="visa-logo">VISA</span>
            ) : (
              <span className="mastercard-logo">MASTERCARD</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render COD Payment Method
  const renderCODPayment = () => (
    <div className="payment-cod">
      <h3>Cash on Delivery</h3>
      <div className="cod-icon-box">
        <FaMoneyBillWave className="cod-icon" />
      </div>
    </div>
  );

  // Render Payment Method based on type
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

  // Render Payment Instructions based on method
  const renderPaymentInstructions = (method) => {
    const instructions = {
      qr: [
        "Scan the QR code using your banking app",
        "Verify the amount and recipient information before payment",
        "Payment will be processed within 15 minutes",
        "You will receive a confirmation email after successful payment",
      ],
      paypal: [
        "You will be redirected to the PayPal payment page",
        "Log in to your PayPal account",
        "Confirm the amount and payment details",
        "Click 'Pay' to complete the transaction",
      ],
      applepay: [
        "Authenticate using Face ID or Touch ID",
        "Verify your saved card information",
        "Confirm the payment amount",
        "Wait for transaction confirmation",
      ],
      googlepay: [
        "Authenticate using password or fingerprint",
        "Verify your saved card information",
        "Confirm the payment amount",
        "Wait for transaction confirmation",
      ],
      wechatpay: [
        "Open the WeChat Pay app",
        "Scan QR code or enter payment code",
        "Confirm the amount and payment details",
        "Enter WeChat Pay password to complete",
      ],
      card: [
        "Your card will be charged after order confirmation",
        "Ensure sufficient card balance",
        "Check transaction confirmation email",
        "Keep the payment receipt",
      ],
      cod: [
        "Prepare the exact payment amount",
        "Verify the order before payment",
        "Request receipt from the delivery person",
        "Pay in cash upon delivery",
      ],
    };

    return (
      <ul>
        {(
          instructions[method] || [
            "Please complete your payment within 15 minutes",
            "Your order will be processed after successful payment",
            "You will receive a confirmation email after payment",
          ]
        ).map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="payment-result">
      <div className="payment-result-content">
        {renderPaymentMethod()}
        <div className="payment-instructions">
          {renderPaymentInstructions(paymentMethod)}
        </div>
        <div className="payment-actions">
          <Button
            onClick={handleConfirmPayment}
            className="confirm-button"
            startIcon={<FaCheck />}
          >
            Confirm Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
