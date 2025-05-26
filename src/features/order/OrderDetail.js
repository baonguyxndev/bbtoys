import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/OrderDetail.css";
import Loading from "../../shared/components/Loading/Loading";
import useFetchCustomerOrders from "../../shared/hooks/useFetchCustomerOrders";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import useFetchCustomer from "../../shared/hooks/useFetchCustomer";
import { LuArrowLeft, LuPrinter } from "react-icons/lu";

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
      className={`order-detail__badge order-detail__badge--${config.color}`}
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
    <tr className="order-detail__product-row">
      <td className="order-detail__product-cell order-detail__product-cell--image">
        <div className="order-detail__product-image-container">
          <img
            src={productImage}
            alt={productName}
            className="order-detail__product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        </div>
      </td>
      <td className="order-detail__product-cell order-detail__product-cell--name">
        <div className="order-detail__product-name">{productName}</div>
      </td>
      <td className="order-detail__product-cell order-detail__product-cell--quantity">
        <div className="order-detail__product-quantity">
          <span className="order-detail__product-quantity-value">
            {item.quantity || 0}
          </span>
        </div>
      </td>
      <td className="order-detail__product-cell order-detail__product-cell--price">
        <div className="order-detail__product-price">
          <span className="order-detail__product-price-value">
            ${(item.totalPrice / item.quantity || 0).toLocaleString()}
          </span>
        </div>
      </td>
      <td className="order-detail__product-cell order-detail__product-cell--total">
        <div className="order-detail__product-total">
          <span className="order-detail__product-total-value">
            ${(item.totalPrice || 0).toLocaleString()}
          </span>
        </div>
      </td>
    </tr>
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    order,
    loading: orderLoading,
    error: orderError,
  } = useFetchCustomerOrders(null, id);
  const {
    getProductById,
    loading: productsLoading,
    error: productsError,
  } = useFetchProducts();
  const {
    customer,
    loading: customerLoading,
    error: customerError,
  } = useFetchCustomer(order?.customerId);

  const handlePrint = () => {
    window.print();
  };

  if (orderLoading || productsLoading || customerLoading) {
    return (
      <div className="order-detail__loading">
        <Loading />
      </div>
    );
  }

  if (orderError) {
    return <div className="order-detail__error">{orderError}</div>;
  }

  if (productsError) {
    return <div className="order-detail__error">{productsError}</div>;
  }

  if (customerError) {
    return <div className="order-detail__error">{customerError}</div>;
  }

  if (!order) {
    return <div className="order-detail__error">Order not found!</div>;
  }

  return (
    <div className="order-detail">
      <div className="order-detail__header">
        <h1 className="order-detail__title">Order Details</h1>
        <div className="order-detail__status">
          <OrderStatus status={order.status} />
        </div>
      </div>

      <div className="order-detail__info">
        <div className="order-detail__info-card">
          <h3 className="order-detail__info-title">Order Information</h3>
          <div className="order-detail__info-content">
            <p>Order ID: #{order.id}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Status: {order.status}</p>
          </div>
        </div>

        <div className="order-detail__info-card">
          <h3 className="order-detail__info-title">Customer Information</h3>
          <div className="order-detail__info-content">
            <p>
              <span>Full Name:</span>
              <span>
                {customer?.firstName} {customer?.lastName}
              </span>
            </p>
            <p>
              <span>Email:</span>
              <span>{customer?.email}</span>
            </p>
            <p>
              <span>Phone:</span>
              <span>{customer?.phone}</span>
            </p>
            <p>
              <span>Address:</span>
              <span>{customer?.address}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="order-detail__products">
        <div className="order-detail__table-container">
          <table className="order-detail__table">
            <thead className="order-detail__table-header">
              <tr>
                <th className="order-detail__table-cell">Image</th>
                <th className="order-detail__table-cell">Product</th>
                <th className="order-detail__table-cell">Quantity</th>
                <th className="order-detail__table-cell">Price</th>
                <th className="order-detail__table-cell">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.product?.map((item, index) => (
                <OrderProduct
                  key={index}
                  item={item}
                  productDetails={getProductById(item.idProduct)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="order-detail__summary">
        <div className="order-detail__summary-row">
          <span className="order-detail__summary-label">Subtotal</span>
          <span className="order-detail__summary-value">
            ${order.totalOrder.toLocaleString()}
          </span>
        </div>
        <div className="order-detail__summary-row">
          <span className="order-detail__summary-label">Shipping</span>
          <span className="order-detail__summary-value">Free</span>
        </div>
        <div className="order-detail__summary-row">
          <span className="order-detail__summary-label">Total</span>
          <span className="order-detail__summary-total">
            ${order.totalOrder.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="order-detail__actions">
        <button
          className="order-detail__button order-detail__button--secondary"
          onClick={() => navigate(-1)}
        >
          <LuArrowLeft />
          Back
        </button>
        <button
          className="order-detail__button order-detail__button--primary"
          onClick={handlePrint}
        >
          <LuPrinter />
          Print Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
