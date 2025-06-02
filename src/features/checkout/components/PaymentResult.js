import React from "react";
import QR from "../../../shared/components/SVG/PaymentMethod/QR";
import Paypal from "../../../shared/components/SVG/PaymentMethod/Paypal";
import ApplePay from "../../../shared/components/SVG/PaymentMethod/ApplePay";
import GooglePay from "../../../shared/components/SVG/PaymentMethod/GooglePay";
import WechatPay from "../../../shared/components/SVG/PaymentMethod/WechatPay";
import { FaCcVisa, FaCcMastercard, FaMoneyBillWave } from "react-icons/fa";
import { Button } from "@mui/material";
import "./styles/PaymentResult.css";

const PaymentResult = ({ formData = {}, onBack }) => {
  const paymentMethod = formData.paymentMethod;
  const cardInfo = formData.cardInfo || {};

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case "qr":
        return (
          <div className="payment-qr">
            <h3>Scan QR Code to Pay</h3>
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
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginLeft: 8 }}
                >
                  Download QR
                </Button>
              </div>
              <p className="qr-instruction">
                Please scan the QR code with your banking app to complete the
                payment.
              </p>
            </div>
          </div>
        );
      case "paypal":
        return (
          <div className="payment-paypal">
            <h3>Pay with PayPal</h3>
            <div className="payment-button paypal large">
              <Paypal className="payment-icon" />
              <span>Proceed to PayPal</span>
            </div>
            <p className="payment-note">
              You will be redirected to PayPal to complete your payment.
            </p>
          </div>
        );
      case "applepay":
        return (
          <div className="payment-applepay">
            <h3>Pay with Apple Pay</h3>
            <div className="payment-button apple large">
              <ApplePay className="payment-icon" />
              <span>Proceed with Apple Pay</span>
            </div>
            <p className="payment-note">
              Fast checkout with Apple Pay on supported devices.
            </p>
          </div>
        );
      case "googlepay":
        return (
          <div className="payment-googlepay">
            <h3>Pay with Google Pay</h3>
            <div className="payment-button google large">
              <GooglePay className="payment-icon" />
              <span>Proceed with Google Pay</span>
            </div>
            <p className="payment-note">
              Fast checkout with Google Pay on supported devices.
            </p>
          </div>
        );
      case "wechatpay":
        return (
          <div className="payment-wechatpay">
            <h3>Pay with WeChat Pay</h3>
            <div className="payment-button wechat large">
              <WechatPay className="payment-icon" />
              <span>Proceed with WeChat Pay</span>
            </div>
            <p className="payment-note">
              Scan the QR code or open WeChat app to pay.
            </p>
          </div>
        );
      case "card":
        return (
          <div className="payment-card">
            <h3>Payment Card Information</h3>
            <div className="virtual-card modern">
              <div className="card-header">
                {cardInfo.type === "visa" ? (
                  <FaCcVisa className="card-type-icon visa" />
                ) : (
                  <FaCcMastercard className="card-type-icon mastercard" />
                )}
              </div>
              <div className="card-number">{cardInfo.number}</div>
              <div className="card-details">
                <div className="card-name">
                  <span>Card Holder</span>
                  <p>{cardInfo.name}</p>
                </div>
                <div className="card-expiry">
                  <span>Expires</span>
                  <p>{cardInfo.expiry}</p>
                </div>
              </div>
            </div>
            <p className="payment-note">
              Your card will be charged after order confirmation.
            </p>
          </div>
        );
      case "cod":
        return (
          <div className="payment-cod">
            <h3>Cash on Delivery</h3>
            <div className="cod-icon-box">
              <FaMoneyBillWave className="cod-icon" />
            </div>
            <p className="payment-note">
              Please prepare the exact amount. You will pay when you receive
              your order.
            </p>
          </div>
        );
      default:
        return <div className="payment-unknown">Unknown payment method</div>;
    }
  };

  return (
    <div className="payment-result">
      <div className="payment-result-content">
        {renderPaymentMethod()}
        <div className="payment-instructions">
          <h4>Payment Instructions</h4>
          <ul>
            <li>Please complete your payment within 15 minutes</li>
            <li>Your order will be processed after successful payment</li>
            <li>You will receive a confirmation email after payment</li>
          </ul>
        </div>
        <div className="payment-actions">
          <Button variant="outlined" onClick={onBack} className="back-button">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
