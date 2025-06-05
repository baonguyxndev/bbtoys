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
  const [paypalEmail, setPaypalEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      // Only allow digits while typing
      let digits = value.replace(/\D/g, "");
      setCard({ ...card, [name]: digits });
      if (errors.number) setErrors((prev) => ({ ...prev, number: "" }));
    } else {
      setCard({ ...card, [name]: value });
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCardNumberBlur = () => {
    // Format as 4-digit groups on blur
    let formatted = card.number.replace(/(.{4})/g, "$1 ").trim();
    setCard((prev) => ({ ...prev, number: formatted }));
  };

  const handlePaypalChange = (e) => {
    setPaypalEmail(e.target.value);
    if (errors.paypalEmail) {
      setErrors((prev) => ({ ...prev, paypalEmail: "" }));
    }
  };

  const handleMethod = (id) => {
    setMethod(id);
    setErrors({});
  };

  // Validate cho thẻ
  const validateCard = () => {
    const newErrors = {};
    // Remove all non-digits for card number
    const numberNoSpace = card.number.replace(/\D/g, "");
    // Card number: 16 digits, Luhn check
    if (!/^\d{16}$/.test(numberNoSpace) || !luhnCheck(numberNoSpace)) {
      newErrors.number = "Card number must be 16 digits and valid";
    }
    // Name: allow letters (with accents) and spaces
    if (!/^[a-zA-ZÀ-ỹà-ỹ\s]+$/.test(card.name.trim()) || !card.name.trim()) {
      newErrors.name = "Name is required and must be letters only";
    }
    // Expiry: MM/YY, not expired
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
      newErrors.expiry = "Expiry must be MM/YY";
    } else if (isExpired(card.expiry)) {
      newErrors.expiry = "Card is expired";
    }
    // CVV: 3 or 4 digits
    if (!/^\d{3,4}$/.test(card.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function luhnCheck(number) {
    let arr = (number + "")
      .split("")
      .reverse()
      .map((x) => parseInt(x));
    let sum = arr.reduce(
      (acc, val, idx) =>
        idx % 2 ? acc + ((val *= 2) > 9 ? val - 9 : val) : acc + val,
      0
    );
    return sum % 10 === 0;
  }

  function isExpired(expiry) {
    const [mm, yy] = expiry.split("/");
    const expDate = new Date(`20${yy}`, parseInt(mm), 0); // last day of month
    const now = new Date();
    expDate.setHours(23, 59, 59, 999);
    return expDate < now;
  }

  // Validate cho PayPal
  const validatePaypal = () => {
    const newErrors = {};
    if (!paypalEmail.trim()) {
      newErrors.paypalEmail = "Email là bắt buộc";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(paypalEmail)) {
      newErrors.paypalEmail = "Email không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let nextData = {};
    if (isCard) {
      if (!validateCard()) return;
      nextData = {
        paymentMethod: "card",
        cardInfo: {
          type: method,
          number: card.number,
          expiry: card.expiry,
          name: card.name,
        },
      };
    } else if (method === "paypal") {
      if (!validatePaypal()) return;
      nextData = {
        paymentMethod: "paypal",
        paypalEmail,
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

  // Hàm render card mô phỏng
  const renderVirtualCard = () => (
    <div className="payment-card">
      <div
        className={`virtual-card ${
          method === "mastercard" ? "mastercard" : ""
        }`}
      >
        <div className="card-top-row">
          <span className="card-label">Credit Card</span>
          <span className="bank-name">Bank Name</span>
        </div>
        <div className="card-chip-row">
          <div className="card-chip"></div>
        </div>
        <div className="card-number-row">
          <span className="card-number">
            {card.number
              ? card.number.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
              : "xxxx xxxx xxxx xxxx"}
          </span>
        </div>
        <div className="card-bottom-row">
          <div className="card-holder-block">
            <span className="card-holder-label">Name</span>
            <span className="card-holder">{card.name || "Your Name"}</span>
          </div>
          <div className="card-expiry-block">
            <span className="valid-thru">VALID THRU</span>
            <span className="expiry-date">{card.expiry || "MM/YY"}</span>
          </div>
          <div className="card-logo">
            {method === "visa" ? (
              <span className="visa-logo">VISA</span>
            ) : method === "mastercard" ? (
              <span className="mastercard-logo">MASTERCARD</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

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
        <>
          {renderVirtualCard()}
          <div className="payment-card-box">
            <input
              className={`payment-input${errors.number ? " error" : ""}`}
              name="number"
              placeholder="Card number"
              value={card.number}
              onChange={handleChange}
              onBlur={handleCardNumberBlur}
              maxLength={19}
              required
            />
            {errors.number && (
              <div className="error-message">{errors.number}</div>
            )}
            <div className="payment-row">
              <input
                className={`payment-input${errors.expiry ? " error" : ""}`}
                name="expiry"
                placeholder="Expiration (MM/YY)"
                value={card.expiry}
                onChange={handleChange}
                maxLength={5}
                required
              />
              {errors.expiry && (
                <div className="error-message">{errors.expiry}</div>
              )}
              <input
                className={`payment-input${errors.cvv ? " error" : ""}`}
                name="cvv"
                placeholder="CVV"
                value={card.cvv}
                onChange={handleChange}
                maxLength={4}
                required
              />
              {errors.cvv && <div className="error-message">{errors.cvv}</div>}
            </div>
            <input
              className={`payment-input${errors.name ? " error" : ""}`}
              name="name"
              placeholder="Name on card"
              value={card.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
        </>
      )}
      {method === "paypal" && (
        <div className="payment-card-box">
          <input
            className={`payment-input${errors.paypalEmail ? " error" : ""}`}
            name="paypalEmail"
            placeholder={errors.paypalEmail || "PayPal Email"}
            value={paypalEmail}
            onChange={handlePaypalChange}
            required
          />
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
