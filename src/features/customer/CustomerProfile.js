import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchCustomer from "../../shared/hooks/useFetchCustomer";
import useFetchCustomerTickets from "../../shared/hooks/useFetchCustomerTickets";
import useFetchCustomerOrders from "../../shared/hooks/useFetchCustomerOrders";
import useFetchCustomerWishlist from "../../shared/hooks/useFetchCustomerWishlist";
import "./styles/CustomerProfile.css";
import { Button } from "@mui/material";

const CustomerProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const {
    customer,
    loading: customerLoading,
    error: customerError,
  } = useFetchCustomer(id);
  const {
    tickets,
    loading: ticketsLoading,
    error: ticketsError,
  } = useFetchCustomerTickets(id);
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useFetchCustomerOrders(id);
  const {
    wishlist,
    loading: wishlistLoading,
    error: wishlistError,
  } = useFetchCustomerWishlist(id);

  useEffect(() => {
    if (
      !customerLoading &&
      !ticketsLoading &&
      !ordersLoading &&
      !wishlistLoading
    ) {
      setIsLoading(false);
    }
  }, [customerLoading, ticketsLoading, ordersLoading, wishlistLoading]);

  if (isLoading) {
    return (
      <div className="customer-profile">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </div>
    );
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
        <div className="error-message">Không tìm thấy thông tin khách hàng</div>
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
        <div className="profile-header">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="profile-avatar me-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/120";
            }}
          />
          <div>
            <h1 className="profile-name">{customer.name}</h1>
            <p className="profile-username">@{customer.username}</p>
          </div>
        </div>
      </div>

      <div className="profile-info">
        <div className="row">
          <div className="col-md-6">
            <div className="info-section">
              <div className="info-label">Email</div>
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
              <div className="info-label">Số điện thoại</div>
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
              <div className="info-label">Địa chỉ</div>
              <div className="info-value">{customer.address}</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-section">
              <div className="info-label">Giới tính</div>
              <div className="info-value">
                {customer.gender === "male" ? "Nam" : "Nữ"}
              </div>
            </div>
            <div className="info-section">
              <div className="info-label">Ngày sinh</div>
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

  const renderTicketsTab = () => (
    <div className="profile-section">
      <h2 className="section-title">Ticket hỗ trợ</h2>
      {ticketsLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      ) : ticketsError ? (
        <div className="error-message">{ticketsError}</div>
      ) : tickets.length === 0 ? (
        <div className="empty-message">Chưa có ticket hỗ trợ nào</div>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <div className="ticket-header">
                <span className="ticket-id">#{ticket.id}</span>
                <span className="ticket-date">
                  {new Date(ticket.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="ticket-order">Mã đơn hàng: {ticket.orderId}</div>
              <div className="ticket-status">
                <span className={`badge bg-${ticket.status}`}>
                  {ticket.status === "processing" && "Đang xử lý"}
                  {ticket.status === "completed" && "Hoàn thành"}
                  {ticket.status === "refused" && "Từ chối"}
                  {ticket.status === "sent" && "Đã gửi"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrdersTab = () => (
    <div className="profile-section">
      <h2 className="section-title">Đơn hàng</h2>
      {ordersLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      ) : ordersError ? (
        <div className="error-message">{ordersError}</div>
      ) : orders.length === 0 ? (
        <div className="empty-message">Chưa có đơn hàng nào</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <span className="order-id">#{order.id}</span>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="order-products">
                {order.product.map((item, index) => (
                  <div key={index} className="order-product">
                    <span className="product-id">#{item.idProduct}</span>
                    <span className="product-quantity">x{item.quantity}</span>
                    <span className="product-price">
                      {item.totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                Tổng tiền: {order.total.toLocaleString("vi-VN")}đ
              </div>
              <div className="order-status">
                <span className={`badge bg-${order.status}`}>
                  {order.status === "pending" && "Chờ xác nhận"}
                  {order.status === "processing" && "Đang xử lý"}
                  {order.status === "shipping" && "Đang giao hàng"}
                  {order.status === "delivered" && "Đã giao hàng"}
                  {order.status === "packed" && "Đã đóng gói"}
                  {order.status === "cancelled" && "Đã hủy"}
                  {order.status === "failed" && "Thất bại"}
                  {order.status === "refunded" && "Đã hoàn tiền"}
                  {order.status === "returned" && "Đã trả hàng"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWishlistTab = () => (
    <div className="profile-section">
      <h2 className="section-title">Sản phẩm yêu thích</h2>
      {wishlistLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      ) : wishlistError ? (
        <div className="error-message">{wishlistError}</div>
      ) : wishlist.length === 0 ? (
        <div className="empty-message">Chưa có sản phẩm yêu thích nào</div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="wishlist-item-info">
                <div className="wishlist-item-date">
                  Ngày thêm:{" "}
                  {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="wishlist-products">
                  {item.idProduct.map((productId, index) => (
                    <div key={index} className="wishlist-product">
                      Mã sản phẩm: {productId}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
              Thông tin cá nhân
            </Button>
            <Button
              className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => handleTabChange("orders")}
            >
              Đơn hàng
            </Button>
            <Button
              className={`tab-button ${
                activeTab === "wishlist" ? "active" : ""
              }`}
              onClick={() => handleTabChange("wishlist")}
            >
              Sản phẩm yêu thích
            </Button>
            <Button
              className={`tab-button ${
                activeTab === "tickets" ? "active" : ""
              }`}
              onClick={() => handleTabChange("tickets")}
            >
              Ticket hỗ trợ
            </Button>
          </div>

          <div className="tab-content">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "orders" && renderOrdersTab()}
            {activeTab === "wishlist" && renderWishlistTab()}
            {activeTab === "tickets" && renderTicketsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
