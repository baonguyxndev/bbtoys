import React, { useState, useEffect } from "react";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import { useShoppingCartHandler } from "../../shared/state/shoppingCartHandler";
import { useUserSessionManager } from "../../shared/state/userSessionManager";
import useFetchCustomer from "../../shared/hooks/useFetchCustomer";
import { Button } from "@mui/material";
import CustomerForm from "./components/CustomerForm";
import ShippingForm from "./components/ShippingForm";
import PaymentForm from "./components/PaymentForm";
import ConfirmInfo from "./components/ConfirmInfo";
import PaymentResult from "./components/PaymentResult";
import { FaCheck } from "react-icons/fa";
import { useNotification } from "../../shared/context/NotificationContext";
import "./styles/Checkout.css";

const steps = ["Customer", "Shipping", "Payment", "Confirm"];

const Checkout = () => {
  const { showNotification } = useNotification();
  const currentUser = useUserSessionManager((state) => state.currentUser);
  const customerId = currentUser?.id;
  const { customer } = useFetchCustomer(customerId);

  // Cart logic
  const { cartItems } = useShoppingCartHandler();
  const { getProductById } = useFetchProducts();
  const totalProductCost = cartItems.reduce((total, item) => {
    const product = getProductById(item.id);
    const detail = product?.details?.find(
      (d) =>
        d.scale === item.scale &&
        d.model === item.model &&
        d.version === item.version
    );
    return total + (detail?.price || 0) * item.quantity;
  }, 0);
  const shippingCost = 50;
  const tax = totalProductCost * (2 / 100);
  const grandTotal = totalProductCost + shippingCost + tax;

  // Checkout logic
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        zipCode: customer.zipCode || "",
        country: customer.country || "",
      });
    }
  }, [customer]);

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setActiveStep((prev) => prev + 1);
    window.scrollTo(0, 0);

    // Show notifications for each step
    const stepMessages = {
      0: {
        message: "Customer information updated successfully!",
        severity: "success",
      },
      1: {
        message: "Shipping information updated successfully!",
        severity: "success",
      },
      2: {
        message: "Payment information updated successfully!",
        severity: "success",
      },
      3: {
        message: "Order confirmed successfully!",
        severity: "success",
      },
    };

    if (stepMessages[activeStep]) {
      showNotification(
        stepMessages[activeStep].message,
        stepMessages[activeStep].severity
      );
    }
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CustomerForm onNext={handleNext} defaultValues={formData} />;
      case 1:
        return (
          <ShippingForm
            onNext={handleNext}
            onBack={handleBack}
            defaultValues={formData}
          />
        );
      case 2:
        return (
          <PaymentForm
            onNext={handleNext}
            onBack={handleBack}
            defaultValues={formData}
          />
        );
      case 3:
        return (
          <ConfirmInfo
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
          />
        );
      case 4:
        return <PaymentResult formData={formData} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout-stepper-wrapper">
          <div className="checkout-stepper">
            {steps.map((label, idx) => (
              <div
                key={label}
                className={`step-item${activeStep === idx ? " active" : ""}${
                  activeStep > idx ? " done" : ""
                }`}
              >
                <div className="step-index">
                  {activeStep > idx ? (
                    <FaCheck className="step-check-icon" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className="step-label">{label}</div>
                {idx < steps.length - 1 && <div className="step-line"></div>}
              </div>
            ))}
          </div>
          <div className="checkout-content">{getStepContent(activeStep)}</div>
        </div>
        {activeStep < 4 && (
          <div className="cart-summary-wrapper">
            <div className="cart-summary-heading">
              <span className="cart-summary-title">
                <h3>Order Summary</h3>
              </span>
              <Button className="edit-cart-btn" href="/cart">
                Edit
              </Button>
            </div>
            <div className="cart-summary-content">
              <div className="cart-summary-item-list">
                <h5 className="count-items">
                  <span>{cartItems.length} Item</span>
                </h5>
                <ul className="item-list">
                  {cartItems.map((item, idx) => {
                    const product = getProductById(item.id);
                    const detail = product?.details?.find(
                      (d) =>
                        d.scale === item.scale &&
                        d.model === item.model &&
                        d.version === item.version
                    );
                    return (
                      <li className="cart-summary-product-item" key={idx}>
                        <div className="cart-summary-product-img-box">
                          <img
                            src={product?.img[0] || "/assets/no-image.png"}
                            alt={product?.name}
                            className="cart-summary-product-img"
                          />
                        </div>
                        <div className="cart-summary-product-info">
                          <div className="cart-summary-product-title">
                            <b>1 x {product?.name}</b>
                          </div>
                          <div className="cart-summary-product-meta">
                            {item.scale} {item.model} {item.version}
                          </div>
                        </div>
                        <div className="cart-summary-product-price">
                          ${((detail?.price || 0) * item.quantity).toFixed(2)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="cart-summary-total-costs">
                <div className="total-product-cost">
                  <span className="cost-type">Total Product Cost</span>
                  <span className="cost-value">
                    ${totalProductCost.toFixed(2)}
                  </span>
                </div>
                <div className="shipping-cost">
                  <span className="cost-type">Shipping Cost</span>
                  <span className="cost-value">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="tax-cost">
                  <span className="cost-type">Tax (VAT 2%)</span>
                  <span className="cost-value">${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="grand-total-wrapper">
                <span className="grand-total-label">Grand total</span>
                <span className="grand-total">
                  ${(grandTotal + shippingCost + tax).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
