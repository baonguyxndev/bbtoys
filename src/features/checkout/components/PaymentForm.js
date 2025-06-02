import React, { useState } from "react";
import { Button } from "@mui/material";
import ApplePay from "../../../shared/components/SVG/PaymentMethod/ApplePay";
import GooglePay from "../../../shared/components/SVG/PaymentMethod/GooglePay";
import MasterCard from "../../../shared/components/SVG/PaymentMethod/MasterCard";
import Paypal from "../../../shared/components/SVG/PaymentMethod/Paypal";
import Visa from "../../../shared/components/SVG/PaymentMethod/Visa";
import WechatPay from "../../../shared/components/SVG/PaymentMethod/WechatPay";
import COD from "../../../shared/components/SVG/PaymentMethod/COD";
import QR from "../../../shared/components/SVG/PaymentMethod/QR";
import "./styles/PaymentForm.css";

const paymentMethods = [
  {
    id: "cod",
    label: "COD",
    icon: <COD size={32} />,
  },
  {
    id: "visa",
    label: "Visa",
    icon: <Visa size={32} />,
  },
  {
    id: "mastercard",
    label: "Mastercard",
    icon: <MasterCard size={32} />,
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: <Paypal size={32} />,
  },
  {
    id: "applepay",
    label: "Apple Pay",
    icon: <ApplePay size={32} />,
  },
  {
    id: "googlepay",
    label: "Google Pay",
    icon: <GooglePay size={32} />,
  },
  {
    id: "qr",
    label: "QR",
    icon: <QR size={32} />,
  },

  {
    id: "wechatpay",
    label: "WeChat Pay",
    icon: <WechatPay size={32} />,
  },
];

const PaymentForm = ({ onBack, onNext, defaultValues }) => {
  const [method, setMethod] = useState("cod");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name:
      defaultValues.firstName && defaultValues.lastName
        ? `${defaultValues.firstName} ${defaultValues.lastName}`
        : "",
  });

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleMethod = (id) => {
    setMethod(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let nextData = {};
    if (isCard) {
      nextData = {
        paymentMethod: "card",
        cardInfo: {
          type: method,
          number: card.number,
          expiry: card.expiry,
          name: card.name,
        },
      };
    } else {
      nextData = {
        paymentMethod: method,
      };
    }
    onNext(nextData);
  };

  // Card methods
  const isCard = ["visa", "mastercard"].includes(method);

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3 className="payment-title">Select a payment method</h3>
      <div className="payment-methods-row">
        {paymentMethods.map((m) => (
          <button
            type="button"
            key={m.id}
            className={`payment-method-btn${
              method === m.id ? " selected" : ""
            }`}
            onClick={() => handleMethod(m.id)}
            aria-label={m.label}
          >
            {m.icon}
            <span className="payment-method-label">{m.label}</span>
          </button>
        ))}
      </div>
      {isCard && (
        <div className="payment-card-box">
          <input
            className="payment-input"
            name="number"
            placeholder="Card number"
            value={card.number}
            onChange={handleChange}
            required
          />
          <div className="payment-row">
            <input
              className="payment-input"
              name="expiry"
              placeholder="Expiration (MM/YY)"
              value={card.expiry}
              onChange={handleChange}
              required
            />
            <input
              className="payment-input"
              name="cvv"
              placeholder="CVV"
              value={card.cvv}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="payment-input"
            name="name"
            placeholder="Name on card"
            value={card.name}
            onChange={handleChange}
            required
          />
        </div>
      )}
      {method === "paypal" && (
        <div className="payment-info-box">
          You will be redirected to PayPal to complete your payment.
        </div>
      )}
      {method === "applepay" && (
        <div className="payment-info-box">
          Fast checkout with Apple Pay on supported devices.
        </div>
      )}
      {method === "googlepay" && (
        <div className="payment-info-box">
          Fast checkout with Google Pay on supported devices.
        </div>
      )}
      {method === "wechatpay" && (
        <div className="payment-info-box">
          Scan the QR code or open WeChat app to pay.
        </div>
      )}
      {method === "qr" && (
        <div className="payment-info-box">Scan the QR code to pay.</div>
      )}
      {method === "cod" && (
        <div className="payment-info-box">
          Pay with cash upon delivery (COD).
        </div>
      )}
      <div className="payment-actions">
        <Button
          variant="outlined"
          onClick={onBack}
          type="button"
          className="btn-back"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="btn-continue"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
