import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchCustomer from "../../shared/hooks/useFetchCustomer";
import "./styles/CustomerProfile.css";
import { Button } from "@mui/material";
import Loading from "../../shared/components/Loading/Loading.js";
import CustomerOrders from "./CustomerOrders.js";
import CustomerWishList from "./CustomerWishList.js";
import CustomerTikets from "./CustomerTickets.js";
import { useNavigate } from "react-router-dom";
import { useUserSessionManager } from "../../shared/state/userSessionManager";
import ProfileTab from "./ProfileTab";
import AddressesTab from "./AddressesTab";

const CustomerProfile = () => {
  const logout = useUserSessionManager((state) => state.logout);
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("orders");
  const [activeListTab, setActiveListTab] = useState("wishlist");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const {
    customer,
    loading: customerLoading,
    error: customerError,
  } = useFetchCustomer(id);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Nguyen Bao",
      address: "TL10",
      city: "Ho Chi Minh",
      zip: "00100",
      country: "Viet Nam",
      phone: "0783356437",
    },
  ]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddressMode, setNewAddressMode] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!customerLoading) {
      setIsLoading(false);
    }
  }, [customerLoading]);

  useEffect(() => {
    if (customer) {
      setEditedProfile({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        gender: customer.gender || "male",
        birthday: customer.birthday
          ? new Date(customer.birthday).toISOString().split("T")[0]
          : "",
      });
    }
  }, [customer]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Mô phỏng việc lưu thông tin
    console.log("Saving profile:", editedProfile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm(addr);
    setNewAddressMode(false);
  };

  const handleSaveAddress = () => {
    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddressId
            ? { ...addressForm, id: editingAddressId }
            : a
        )
      );
      setEditingAddressId(null);
    } else {
      setAddresses((prev) => [...prev, { ...addressForm, id: Date.now() }]);
      setNewAddressMode(false);
    }
    setAddressForm({
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
    });
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleNewAddress = () => {
    setNewAddressMode(true);
    setEditingAddressId(null);
    setAddressForm({
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
    });
  };

  const handleCancelAddress = () => {
    setEditingAddressId(null);
    setNewAddressMode(false);
    setAddressForm({
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
    });
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
        <div className="error-message">Opps! Error</div>
      </div>
    );
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleListTabChange = (tab) => {
    setActiveListTab(tab);
  };

  const renderListTab = () => (
    <div className="list-tab-container">
      <div className="tabs-header">
        <Button
          className={`tab-button ${
            activeListTab === "wishlist" ? "active" : ""
          }`}
          onClick={() => handleListTabChange("wishlist")}
        >
          Wish List
        </Button>
        <Button
          className={`tab-button ${
            activeListTab === "preorder" ? "active" : ""
          }`}
          onClick={() => handleListTabChange("preorder")}
        >
          Pre-Order List
        </Button>
      </div>
      <div className="list-tab-content">
        {activeListTab === "wishlist" && <CustomerWishList />}
        {activeListTab === "preorder" && <CustomerTikets />}
      </div>
    </div>
  );

  return (
    <div className="customer-profile">
      <div className="title">
        <h1>
          <div className="line"></div>
          <span className="titleMain">Profile</span>
          <div className="line"></div>
        </h1>
      </div>
      <div className="container">
        <div className="profile-tabs">
          <div className="tabs-header">
            <Button
              className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => handleTabChange("orders")}
            >
              Orders
            </Button>
            <Button
              className={`tab-button ${
                activeTab === "addresses" ? "active" : ""
              }`}
              onClick={() => handleTabChange("addresses")}
            >
              Addresses
            </Button>
            <Button
              className={`tab-button ${activeTab === "lists" ? "active" : ""}`}
              onClick={() => handleTabChange("lists")}
            >
              My List
            </Button>
            <Button
              className={`tab-button ${
                activeTab === "profile" ? "active" : ""
              }`}
              onClick={() => handleTabChange("profile")}
            >
              Profile
            </Button>
          </div>

          <div className="tabs-content">
            {activeTab === "orders" && <CustomerOrders />}
            {activeTab === "addresses" && (
              <AddressesTab
                addresses={addresses}
                editingAddressId={editingAddressId}
                newAddressMode={newAddressMode}
                addressForm={addressForm}
                handleEditAddress={handleEditAddress}
                handleSaveAddress={handleSaveAddress}
                handleDeleteAddress={handleDeleteAddress}
                handleNewAddress={handleNewAddress}
                handleCancelAddress={handleCancelAddress}
                handleAddressInputChange={handleAddressInputChange}
              />
            )}
            {activeTab === "lists" && renderListTab()}
            {activeTab === "profile" && (
              <ProfileTab
                customer={customer}
                isEditing={isEditing}
                editedProfile={editedProfile}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleInputChange={handleInputChange}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
