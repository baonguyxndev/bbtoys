import React from "react";
import { Button, TextField } from "@mui/material";
import { FiEdit2, FiSave, FiTrash2, FiPlus } from "react-icons/fi";
import "./styles/AddressesTab.css";

const AddressesTab = ({
  addresses,
  editingAddressId,
  newAddressMode,
  addressForm,
  handleEditAddress,
  handleSaveAddress,
  handleDeleteAddress,
  handleNewAddress,
  handleCancelAddress,
  handleAddressInputChange,
}) => (
  <div className="addresses-tab">
    <div className="addresses-list">
      {addresses.map((addr) => (
        <div key={addr.id} className="addresses-item">
          {editingAddressId === addr.id ? (
            <form
              className="addresses-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveAddress();
              }}
            >
              <TextField
                name="name"
                label="Name"
                value={addressForm.name}
                onChange={handleAddressInputChange}
                fullWidth
                size="small"
              />
              <TextField
                name="address"
                label="Address"
                value={addressForm.address}
                onChange={handleAddressInputChange}
                fullWidth
                size="small"
              />
              <TextField
                name="city"
                label="City"
                value={addressForm.city}
                onChange={handleAddressInputChange}
                fullWidth
                size="small"
              />
              <TextField
                name="zip"
                label="Zip Code"
                value={addressForm.zip}
                onChange={handleAddressInputChange}
                fullWidth
                size="small"
              />
              <TextField
                name="country"
                label="Country"
                value={addressForm.country}
                onChange={handleAddressInputChange}
                fullWidth
                size="small"
              />
              <TextField
                name="phone"
                label="Phone"
                value={addressForm.phone}
                onChange={handleAddressInputChange}
                fullWidth
                size="small"
              />
              <div className="addresses-actions">
                <Button
                  className="btn-save"
                  type="submit"
                  startIcon={<FiSave />}
                >
                  Save
                </Button>
                <Button
                  className="btn-edit"
                  type="button"
                  onClick={handleCancelAddress}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="addresses-name">{addr.name}</div>
              <div>{addr.address}</div>
              <div>
                {addr.city} {addr.zip}
              </div>
              <div>{addr.country}</div>
              <div className="addresses-phone">Phone: {addr.phone}</div>
              <div className="addresses-actions">
                <Button
                  className="btn-edit"
                  onClick={() => handleEditAddress(addr)}
                  startIcon={<FiEdit2 />}
                >
                  Edit
                </Button>
                <Button
                  className="btn-logout"
                  onClick={() => handleDeleteAddress(addr.id)}
                  startIcon={<FiTrash2 />}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
      {newAddressMode && (
        <form
          className="addresses-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveAddress();
          }}
        >
          <TextField
            name="name"
            label="Name"
            value={addressForm.name}
            onChange={handleAddressInputChange}
            fullWidth
            size="small"
          />
          <TextField
            name="address"
            label="Address"
            value={addressForm.address}
            onChange={handleAddressInputChange}
            fullWidth
            size="small"
          />
          <TextField
            name="city"
            label="City"
            value={addressForm.city}
            onChange={handleAddressInputChange}
            fullWidth
            size="small"
          />
          <TextField
            name="zip"
            label="Zip Code"
            value={addressForm.zip}
            onChange={handleAddressInputChange}
            fullWidth
            size="small"
          />
          <TextField
            name="country"
            label="Country"
            value={addressForm.country}
            onChange={handleAddressInputChange}
            fullWidth
            size="small"
          />
          <TextField
            name="phone"
            label="Phone"
            value={addressForm.phone}
            onChange={handleAddressInputChange}
            fullWidth
            size="small"
          />
          <div className="addresses-actions">
            <Button className="btn-save" type="submit" startIcon={<FiSave />}>
              Save
            </Button>
            <Button
              className="btn-edit"
              type="button"
              onClick={handleCancelAddress}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      <div className="addresses-new-box" onClick={handleNewAddress}>
        <FiPlus size={32} className="addresses-plus-icon" />
        <div className="addresses-new-label">New Address</div>
      </div>
    </div>
  </div>
);

export default AddressesTab;
