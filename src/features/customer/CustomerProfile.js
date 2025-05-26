import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchCustomer from "../../shared/hooks/useFetchCustomer";
import "./styles/CustomerProfile.css";
import { Button } from "@mui/material";
import Loading from "../../shared/components/Loading/Loading.js";
import CustomerOrders from "./CustomerOrders.js";
import CustomerWishList from "./CustomerWishList.js";
import CustomerTikets from "./CustomerTickets.js";
import { FiLogOut } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/contexts/AuthContext";

const CustomerProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const {
    customer,
    loading: customerLoading,
    error: customerError,
  } = useFetchCustomer(id);

  useEffect(() => {
    if (!customerLoading) {
      setIsLoading(false);
    }
  }, [customerLoading]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (customerError) {
    return (
      <div className="customer-profile">
        <div className="error-message">{customerError}</div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="customer-profile">
        <div className="error-message">Opps! Erorr</div>
      </div>
    );
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderProfileTab = () => (
    <div className="profile-card">
      <div className="profile-header-wrapper">
        <div className="profile-header-left">
          <img
            src={customer.avatar}
            alt={customer.firstName}
            className="profile-avatar me-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/120";
            }}
          />
          <div>
            <h1 className="profile-name">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="profile-username">@{customer.username}</p>
          </div>
        </div>
        <div className="profile-header-right">
          <Button className="btn-logout" onClick={handleLogout}>
            Log Out <FiLogOut />
          </Button>
        </div>
      </div>

      <div className="profile-info">
        <div className="row">
          <div className="col-md-6">
            <div className="info-section">
              <div className="info-header">
                <div className="info-label">Email</div>
                <Button className="btn-edit">
                  <FiEdit2 />
                </Button>
              </div>
              <div className="info-value">
                <a
                  href={`mailto:${customer.email}`}
                  className="text-decoration-none"
                >
                  {customer.email}
                </a>
              </div>
            </div>
            <div className="info-section">
              <div className="info-header">
                <div className="info-label">Number Phone</div>
                <Button className="btn-edit">
                  <FiEdit2 />
                </Button>
              </div>
              <div className="info-value">
                <a
                  href={`tel:${customer.phone}`}
                  className="text-decoration-none"
                >
                  {customer.phone}
                </a>
              </div>
            </div>
            <div className="info-section">
              <div className="info-header">
                <div className="info-label">Address</div>
                <Button className="btn-edit">
                  <FiEdit2 />
                </Button>
              </div>
              <div className="info-value">{customer.address}</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-section">
              <div className="info-header">
                <div className="info-label">Gender</div>
                <Button className="btn-edit">
                  <FiEdit2 />
                </Button>
              </div>
              <div className="info-value">
                {customer.gender === "male" ? "Male" : "Female"}
              </div>
            </div>
            <div className="info-section">
              <div className="info-header">
                <div className="info-label">Date of Birth</div>
                <Button className="btn-edit">
                  <FiEdit2 />
                </Button>
              </div>
              <div className="info-value">
                {new Date(customer.birthday).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="customer-profile">
      <div className="container">
        <div className="profile-tabs">
          <div className="tabs-header">
            <Button
              className={`tab-button ${
                activeTab === "profile" ? "active" : ""
              }`}
              onClick={() => handleTabChange("profile")}
            >
              Personal Information
            </Button>
            <Button
              className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => handleTabChange("orders")}
            >
              Orders
            </Button>
            <Button
              className={`tab-button ${
                activeTab === "wishlist" ? "active" : ""
              }`}
              onClick={() => handleTabChange("wishlist")}
            >
              Wishlist
            </Button>
            <Button
              className={`tab-button ${
                activeTab === "tickets" ? "active" : ""
              }`}
              onClick={() => handleTabChange("tickets")}
            >
              Tickets
            </Button>
          </div>

          <div className="tab-content">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "orders" && <CustomerOrders id={id} />}
            {activeTab === "wishlist" && <CustomerWishList id={id} />}
            {activeTab === "tickets" && <CustomerTikets id={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
