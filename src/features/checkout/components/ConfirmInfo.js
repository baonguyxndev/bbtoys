import React from "react";
import { Button } from "@mui/material";
import "./styles/ConfirmInfo.css";

const ConfirmInfo = ({ onNext, onBack, formData }) => {
  const renderCustomerInfo = () => (
    <div className="info-section">
      <div className="info-header">
        <h4>Customer Information</h4>
      </div>
      <div className="info-content">
        <div className="info-row">
          <span className="info-label">Full Name</span>
          <span className="info-value">
            {formData.firstName} {formData.lastName}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Email</span>
          <span className="info-value">{formData.email}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Phone</span>
          <span className="info-value">{formData.phone}</span>
        </div>
      </div>
    </div>
  );

  const renderShippingInfo = () => (
    <div className="info-section">
      <div className="info-header">
        <h4>Shipping Address</h4>
      </div>
      <div className="info-content">
        <div className="info-row">
          <span className="info-label">Address</span>
          <span className="info-value">{formData.address}</span>
        </div>
        <div className="info-row">
          <span className="info-label">City</span>
          <span className="info-value">{formData.city}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Country:</span>
          <span className="info-value">{formData.country}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Postal Code</span>
          <span className="info-value">{formData.postalCode}</span>
        </div>
      </div>
    </div>
  );

  const renderDeliveryInfo = () => (
    <div className="info-section">
      <div className="info-header">
        <h4>Shipping Method</h4>
      </div>
      <div className="info-content">
        <div className="info-row">
          <span className="info-label">Method</span>
          <span className="info-value">
            {formData.method === "standard"
              ? "Standard Shipping"
              : formData.method === "express"
              ? "Express Shipping"
              : formData.method}
          </span>
        </div>
      </div>
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="info-section">
      <div className="info-header">
        <h4>Payment Method</h4>
      </div>
      <div className="info-content">
        <div className="info-row">
          <span className="info-label">Method</span>
          <span className="info-value">{formData.paymentMethod}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="confirm-info">
      <h3 className="confirm-title">Order Confirmation</h3>

      {renderCustomerInfo()}
      {renderShippingInfo()}
      {renderDeliveryInfo()}
      {renderPaymentInfo()}

      <div className="confirm-actions">
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
