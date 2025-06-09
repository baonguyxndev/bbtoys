import React from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import { FiEdit2, FiSave, FiLogOut } from "react-icons/fi";
import "./ProfileTab.css";

const ProfileTab = ({
  customer,
  isEditing,
  editedProfile,
  handleEdit,
  handleSave,
  handleInputChange,
  handleLogout,
}) => {
  if (!customer) return null;
  return (
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
              {isEditing ? (
                <div className="edit-name-fields">
                  <TextField
                    name="firstName"
                    value={editedProfile.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    size="small"
                    className="me-2"
                  />
                  <TextField
                    name="lastName"
                    value={editedProfile.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    size="small"
                  />
                </div>
              ) : (
                `${customer.firstName} ${customer.lastName}`
              )}
            </h1>
            <p className="profile-username">@{customer.username}</p>
          </div>
        </div>
        <div className="profile-header-right">
          {isEditing ? (
            <Button className="btn-save" onClick={handleSave}>
              Save <FiSave />
            </Button>
          ) : (
            <Button className="btn-edit" onClick={handleEdit}>
              Edit <FiEdit2 />
            </Button>
          )}
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
              </div>
              <div className="info-value">
                {isEditing ? (
                  <TextField
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                  />
                ) : (
                  <a
                    href={`mailto:${customer.email}`}
                    className="text-decoration-none"
                  >
                    {customer.email}
                  </a>
                )}
              </div>
            </div>
            <div className="info-section">
              <div className="info-header">
                <div className="info-label">Number Phone</div>
              </div>
              <div className="info-value">
                {isEditing ? (
                  <TextField
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                  />
                ) : (
                  <a
                    href={`tel:${customer.phone}`}
                    className="text-decoration-none"
                  >
                    {customer.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-section">
              <div className="info-header">
                <div className="info-label">Gender</div>
              </div>
              <div className="info-value">
                {isEditing ? (
                  <TextField
                    select
                    name="gender"
                    value={editedProfile.gender}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                ) : customer.gender === "male" ? (
                  "Male"
                ) : (
                  "Female"
                )}
              </div>
            </div>
            <div className="info-section">
              <div className="info-header">
                <div className="info-label">Date of Birth</div>
              </div>
              <div className="info-value">
                {isEditing ? (
                  <TextField
                    name="birthday"
                    type="date"
                    value={editedProfile.birthday}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                ) : (
                  new Date(customer.birthday).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
