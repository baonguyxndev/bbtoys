import React, { useState } from "react";
import { Button } from "@mui/material";
import "./styles/ShippingForm.css";
import {
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaHashtag,
  FaBuilding,
  FaComment,
} from "react-icons/fa";

const DELIVERY_METHODS = [
  {
    id: "standard",
    label: "Standard Shipping",
    description: "Lowest cost, fastest delivery",
  },
  {
    id: "express",
    label: "Express Shipping",
    description: "Highest cost, fastest delivery",
  },
];

const ShippingForm = ({ onNext, onBack, defaultValues }) => {
  const [formData, setFormData] = useState({
    address: defaultValues.address || "",
    apartment: defaultValues.apartment || "",
    city: defaultValues.city || "",
    state: defaultValues.state || "",
    country: defaultValues.country || "",
    postalCode: defaultValues.postalCode || "",
    comments: defaultValues.comments || "",
    method: defaultValues.method || "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State/Province is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!formData.method) {
      newErrors.method = "Please select a delivery method";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDelivery = (id) => {
    setFormData((prev) => ({ ...prev, method: id }));
    if (errors.method) {
      setErrors((prev) => ({ ...prev, method: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onNext(formData);
  };

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <h3 className="shipping-title">Shipping Address</h3>
      <div className="delivery-methods-row">
        {DELIVERY_METHODS.map((m) => (
          <button
            type="button"
            key={m.id}
            className={`delivery-method-btn${
              formData.method === m.id ? " selected" : ""
            }`}
            onClick={() => handleDelivery(m.id)}
            aria-label={m.label}
          >
            <span className="delivery-method-label">{m.label}</span>
            <span className="delivery-method-desc">{m.description}</span>
          </button>
        ))}
      </div>
      {errors.method && <div className="delivery-error">{errors.method}</div>}
      <div className="input-wrapper">
        <input
          type="text"
          name="address"
          placeholder={errors.address || "Street Address"}
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? "error" : ""}
        />
        <FaMapMarkerAlt />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="apartment"
          placeholder="Apartment, suite, unit, etc. (optional)"
          value={formData.apartment}
          onChange={handleChange}
        />
        <FaBuilding />
      </div>
      <div className="shipping-row">
        <div className="input-wrapper">
          <input
            type="text"
            name="city"
            placeholder={errors.city || "City"}
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "error" : ""}
          />
          <FaCity />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="state"
            placeholder={errors.state || "State/Province"}
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? "error" : ""}
          />
          <FaMapMarkerAlt />
        </div>
      </div>
      <div className="shipping-row">
        <div className="input-wrapper">
          <input
            type="text"
            name="country"
            placeholder={errors.country || "Country"}
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? "error" : ""}
          />
          <FaGlobe />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="postalCode"
            placeholder={errors.postalCode || "Postal Code"}
            value={formData.postalCode}
            onChange={handleChange}
            className={errors.postalCode ? "error" : ""}
          />
          <FaHashtag />
        </div>
      </div>
      <div className="input-wrapper">
        <textarea
          name="comments"
          placeholder="Order Comments (optional)"
          value={formData.comments}
          onChange={handleChange}
          className="comments-input"
        />
        <FaComment />
      </div>
      <div className="shipping-actions">
        <Button
          variant="outlined"
          onClick={onBack}
          type="button"
          className="btn-back"
        >
          Back
        </Button>
        <Button type="submit" className="btn-continue">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ShippingForm;
