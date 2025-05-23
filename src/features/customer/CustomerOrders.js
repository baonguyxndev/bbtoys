import React, { useMemo } from "react";
import "./styles/CustomerOrders.css";
import { useNavigate } from "react-router-dom";
import useFetchCustomerOrders from "../../shared/hooks/useFetchCustomerOrders";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import Loading from "../../shared/components/Loading/Loading.js";
import { FaEye } from "react-icons/fa";
import { Button } from "@mui/material";

const OrderStatus = ({ status }) => {
  const statusConfig = {
    pending: { text: "Pending", color: "pending" },
    processing: { text: "Processing", color: "processing" },
    shipping: { text: "Shipping", color: "shipping" },
    delivered: { text: "Delivered", color: "delivered" },
    packed: { text: "Packed", color: "packed" },
    cancelled: { text: "Cancelled", color: "cancelled" },
    failed: { text: "Failed", color: "failed" },
    refunded: { text: "Refunded", color: "refunded" },
    returned: { text: "Returned", color: "returned" },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`customer-orders__adge customer-orders__badge--${config.color}`}
    >
      {config.text}
    </span>
  );
};

const OrderProduct = ({ item, productDetails }) => {
  const defaultImage = "https://via.placeholder.com/60";
  const productName = productDetails?.name || `Product #${item.idProduct}`;
  const productImage = productDetails?.img?.[0] || defaultImage;

  return (
    <div className="customer-orders__product">
      <img
        src={productImage}
        alt={productName}
        className="customer-orders__product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
      <div className="customer-orders__product-info">
        <div className="customer-orders__product-details">
          <span className="customer-orders__product-name">{productName}</span>
          <span className="customer-orders__product-quantity">
            Quantity: {item.quantity || 0}
          </span>
        </div>
        <span className="customer-orders__product-price">
          ${(item.totalPrice || 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const OrderCard = ({ order, getProductDetails }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`customer-orders__card customer-orders__card--${
        order.status || "pending"
      }`}
    >
      <div className="customer-orders__header">
        <div className="customer-orders__header-right">
          <OrderStatus status={order.status} />
        </div>
        <div className="customer-orders__actions">
          <Button
            className="customer-orders__view-button"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <FaEye />
            Details
          </Button>
        </div>
      </div>
      <div className="customer-orders__products">
        {order.product?.map((item, index) => (
          <OrderProduct
            key={index}
            item={item}
            productDetails={getProductDetails(item.idProduct)}
          />
        ))}
      </div>
      <div className="customer-orders__footer">
        <div className="customer-orders__total-order">
          <span className="customer-orders__total-text">Total: </span>
          <span className="customer-order__total-price">
            ${(order.totalOrder || 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderGroup = ({ date, orders, getProductDetails }) => {
  return (
    <div className="customer-orders__group">
      <div className="customer-orders__group-header">
        <span className="customer-orders__group-date">{date}</span>
      </div>
      <div className="customer-orders__grid">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            getProductDetails={getProductDetails}
          />
        ))}
      </div>
    </div>
  );
};

const CustomerOrders = ({ id }) => {
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useFetchCustomerOrders(id);
  const {
    getProductById,
    loading: productsLoading,
    error: productsError,
  } = useFetchProducts();

  const groupedOrders = useMemo(() => {
    if (!orders) return {};

    return orders.reduce((groups, order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});
  }, [orders]);

  if (ordersLoading || productsLoading) return <Loading />;
  if (ordersError)
    return <div className="customer-orders__error">{ordersError}</div>;
  if (productsError)
    return <div className="customer-orders__error">{productsError}</div>;

  return (
    <div className="customer-orders">
      <h2 className="customer-orders__title">Your Orders</h2>
      {!orders || orders.length === 0 ? (
        <div className="customer-orders__empty">No orders found!</div>
      ) : (
        <div className="customer-orders__groups">
          {Object.entries(groupedOrders).map(([date, orders]) => (
            <OrderGroup
              key={date}
              date={date}
              orders={orders}
              getProductDetails={getProductById}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
