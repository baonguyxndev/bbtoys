import React, { useState } from "react";
import { Button } from "@mui/material";
import "./styles/CustomerForm.css";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

const CustomerForm = ({ onNext, defaultValues }) => {
  const [formData, setFormData] = useState({
    email: defaultValues.email || "",
    firstName: defaultValues.firstName || "",
    lastName: defaultValues.lastName || "",
    phone: defaultValues.phone || "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onNext(formData);
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <h3 className="customer-title">Customer Information</h3>
      <div className="customer-row">
        <div className="input-wrapper">
          <input
            type="text"
            name="firstName"
            placeholder={errors.firstName || "First Name"}
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "error" : ""}
          />
          <FaUser />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="lastName"
            placeholder={errors.lastName || "Last Name"}
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? "error" : ""}
          />
          <FaUser />
        </div>
      </div>
      <div className="input-wrapper">
        <input
          type="email"
          name="email"
          placeholder={errors.email || "Email"}
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
        <IoIosMail />
      </div>
      <div className="input-wrapper">
        <input
          type="tel"
          name="phone"
          placeholder={errors.phone || "Phone Number"}
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
        <FaPhone />
      </div>
      <div className="customer-actions">
        <Button type="submit" className="btn-continue">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
