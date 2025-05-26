import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import "./styles/TicketDetail.css";
import Loading from "../../shared/components/Loading/Loading";
import useFetchCustomerTickets from "../../shared/hooks/useFetchCustomerTickets";
import useFetchCustomerOrders from "../../shared/hooks/useFetchCustomerOrders";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import useFetchCustomer from "../../shared/hooks/useFetchCustomer";
import { LuArrowLeft, LuSave } from "react-icons/lu";

const TicketStatus = ({ status }) => {
  const statusConfig = {
    processing: { text: "Processing", color: "processing" },
    completed: { text: "Completed", color: "completed" },
    refused: { text: "Refused", color: "refused" },
    sent: { text: "Sent", color: "sent" },
  };

  const config = statusConfig[status] || statusConfig.processing;

  return (
    <span
      className={`ticket-detail__badge ticket-detail__badge--${config.color}`}
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
    <tr className="ticket-detail__product-row">
      <td className="ticket-detail__product-cell ticket-detail__product-cell--image">
        <div className="ticket-detail__product-image-container">
          <img
            src={productImage}
            alt={productName}
            className="ticket-detail__product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        </div>
      </td>
      <td className="ticket-detail__product-cell ticket-detail__product-cell--name">
        <div className="ticket-detail__product-name">{productName}</div>
      </td>
      <td className="ticket-detail__product-cell ticket-detail__product-cell--quantity">
        <div className="ticket-detail__product-quantity">
          <span className="ticket-detail__product-quantity-value">
            {item.quantity || 0}
          </span>
        </div>
      </td>
      <td className="ticket-detail__product-cell ticket-detail__product-cell--price">
        <div className="ticket-detail__product-price">
          <span className="ticket-detail__product-price-value">
            ${(item.totalPrice / item.quantity || 0).toLocaleString()}
          </span>
        </div>
      </td>
      <td className="ticket-detail__product-cell ticket-detail__product-cell--total">
        <div className="ticket-detail__product-total">
          <span className="ticket-detail__product-total-value">
            ${(item.totalPrice || 0).toLocaleString()}
          </span>
        </div>
      </td>
    </tr>
  );
};

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    ticket,
    loading: ticketsLoading,
    error: ticketsError,
  } = useFetchCustomerTickets(null, id);
  const {
    getProductById,
    loading: productsLoading,
    error: productsError,
  } = useFetchProducts();
  const {
    customer,
    loading: customerLoading,
    error: customerError,
  } = useFetchCustomer(ticket?.customerId);

  const handleSave = () => {
    console.log("save");
  };

  const { orders } = useFetchCustomerOrders(ticket?.customerId);
  const order = orders?.find(
    (order) => order.id === parseInt(ticket?.orderId.replace("ORD", ""))
  );

  if (ticketsLoading || productsLoading || customerLoading) {
    return (
      <div className="ticket-detail__loading">
        <Loading />
      </div>
    );
  }

  if (ticketsError) {
    return <div className="ticket-detail__error">{ticketsError}</div>;
  }

  if (productsError) {
    return <div className="ticket-detail__error">{productsError}</div>;
  }

  if (customerError) {
    return <div className="ticket-detail__error">{customerError}</div>;
  }

  if (!ticket) {
    return <div className="ticket-detail__error">Ticket not found!</div>;
  }

  return (
    <div className="ticket-detail">
      <div className="ticket-detail__header">
        <h1 className="ticket-detail__title">Ticket Details</h1>
        <div className="ticket-detail__status">
          <TicketStatus status={ticket.status} />
        </div>
      </div>

      <div className="ticket-detail__info">
        <div className="ticket-detail__info-card">
          <h3 className="ticket-detail__info-title">Ticket Information</h3>
          <div className="ticket-detail__info-content">
            <p>
              <span>Ticket ID:</span>
              <span>#{ticket.id}</span>
            </p>
            <p>
              <span>Date:</span>
              <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
            </p>
            <p>
              <span>Status:</span>
              <span>{ticket.status}</span>
            </p>
            <p>
              <span>Topic:</span>
              <span>{ticket.topic}</span>
            </p>
            <p>
              <span>Subject:</span>
              <span>{ticket.subject}</span>
            </p>
          </div>
        </div>

        <div className="ticket-detail__info-card">
          <h3 className="ticket-detail__info-title">Customer Information</h3>
          <div className="ticket-detail__info-content">
            <p>
              <span>Full Name:</span>
              <span>
                {customer?.firstName} {customer?.lastName}
              </span>
            </p>
            <p>
              <span>Order ID:</span>
              <span>{ticket.orderId}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="ticket-detail__description">
        <h3 className="ticket-detail__description-title">Description</h3>
        <div className="ticket-detail__description-content">
          {ticket.description}
        </div>
      </div>

      {order && (
        <>
          <div className="ticket-detail__order">
            <div className="ticket-detail__order-header">
              <h3 className="ticket-detail__order-title">Order Details</h3>
              <button
                className="ticket-detail__button ticket-detail__button--primary"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                <FaEye />
                Details
              </button>
            </div>
            <div className="ticket-detail__table-container">
              <table className="ticket-detail__table">
                <thead className="ticket-detail__table-header">
                  <tr>
                    <th className="ticket-detail__table-cell">Image</th>
                    <th className="ticket-detail__table-cell">Product</th>
                    <th className="ticket-detail__table-cell">Quantity</th>
                    <th className="ticket-detail__table-cell">Price</th>
                    <th className="ticket-detail__table-cell">Total</th>
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
        </>
      )}
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
          onClick={handleSave}
        >
          <LuSave />
          Save
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;
