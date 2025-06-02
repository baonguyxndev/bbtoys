import React, { useMemo } from "react";
import "./styles/CustomerTickets.css";
import useFetchCustomerTickets from "../../shared/hooks/useFetchCustomerTickets.js";
import useFetchCustomerOrders from "../../shared/hooks/useFetchCustomerOrders";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import Loading from "../../shared/components/Loading/Loading.js";
import { Button } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserSessionManager } from "../../shared/state/userSessionManager";

const statusConfig = {
  processing: { text: "Processing", color: "processing" },
  completed: { text: "Completed", color: "completed" },
  refused: { text: "Refused", color: "refused" },
  sent: { text: "Sent", color: "sent" },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || { text: status, color: "default" };
  return (
    <span
      className={`customer-tickets__badge customer-tickets__badge--${config.color}`}
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
    <tr className="customer-tickets__product-row">
      <td className="customer-tickets__product-cell customer-tickets__product-cell--image">
        <div className="customer-tickets__product-image-container">
          <img
            src={productImage}
            alt={productName}
            className="customer-tickets__product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        </div>
      </td>
      <td className="customer-tickets__product-cell customer-tickets__product-cell--name">
        <span className="customer-tickets__product-name">{productName}</span>
      </td>
      <td className="customer-tickets__product-cell customer-tickets__product-cell--quantity">
        <span className="customer-tickets__product-quantity-value">
          {item.quantity || 0}
        </span>
      </td>
      <td className="customer-tickets__product-cell customer-tickets__product-cell--price">
        <span className="customer-tickets__product-price-value">
          ${((item.totalPrice || 0) / (item.quantity || 1)).toLocaleString()}
        </span>
      </td>
      <td className="customer-tickets__product-cell customer-tickets__product-cell--total">
        <span className="customer-tickets__product-total-value">
          ${(item.totalPrice || 0).toLocaleString()}
        </span>
      </td>
    </tr>
  );
};

const TicketCard = ({ ticket, getProductDetails }) => {
  const navigate = useNavigate();
  const { orders } = useFetchCustomerOrders(ticket.customerId);

  const order = orders?.find(
    (order) => order.id === parseInt(ticket.orderId.replace("ORD", ""))
  );

  return (
    <div
      className={`customer-tickets__card customer-tickets__card--${
        ticket.status || "default"
      }`}
    >
      <div className="customer-tickets__header">
        <div className="customer-tickets__header-left">
          <StatusBadge status={ticket.status} />
        </div>
        <div className="customer-tickets__header-right">
          <Button
            className="customer-tickets__view-button"
            onClick={() => navigate(`/ticket/${ticket.id}`)}
          >
            <FaEye />
            Details
          </Button>
        </div>
      </div>
      <div className="customer-tickets__content">
        <div className="customer-tickets__info">
          <div className="customer-tickets__info-item">
            <span className="customer-tickets__info-label">Topic:</span>
            <span className="customer-tickets__info-value">
              {ticket.topic || "No topic"}
            </span>
          </div>
          <div className="customer-tickets__info-item">
            <span className="customer-tickets__info-label">Subject:</span>
            <span className="customer-tickets__info-value">
              {ticket.subject || "No subject"}
            </span>
          </div>
        </div>
        {order && (
          <div className="customer-tickets__order">
            <div className="customer-tickets__table-container">
              <table className="customer-tickets__table">
                <thead className="customer-tickets__table-header">
                  <tr>
                    <th className="customer-tickets__table-cell customer-tickets__table-cell--image">
                      Image
                    </th>
                    <th className="customer-tickets__table-cell customer-tickets__table-cell--name">
                      Product
                    </th>
                    <th className="customer-tickets__table-cell customer-tickets__table-cell--quantity">
                      Quantity
                    </th>
                    <th className="customer-tickets__table-cell customer-tickets__table-cell--price">
                      Price
                    </th>
                    <th className="customer-tickets__table-cell customer-tickets__table-cell--total">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.product?.map((item, index) => (
                    <OrderProduct
                      key={index}
                      item={item}
                      productDetails={getProductDetails(item.idProduct)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="customer-tickets__footer">
              <div className="customer-tickets__total-order-left">
                <span className="customer-tickets__total-label">Total:</span>
              </div>
              <div className="customer-tickets__total-order-right">
                <span className="customer-tickets__total-price">
                  ${(order.totalOrder || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TicketGroup = ({ date, tickets, getProductDetails }) => {
  return (
    <div className="customer-tickets__group">
      <div className="customer-tickets__group-header">
        <span className="customer-tickets__group-date">{date}</span>
      </div>
      <div className="customer-tickets__grid">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            getProductDetails={getProductDetails}
          />
        ))}
      </div>
    </div>
  );
};

const CustomerTickets = () => {
  const currentUser = useUserSessionManager((state) => state.currentUser);
  const customerId = currentUser?.id;
  const {
    tickets,
    loading: ticketsLoading,
    error: ticketsError,
  } = useFetchCustomerTickets(customerId);
  const {
    getProductById,
    loading: productsLoading,
    error: productsError,
  } = useFetchProducts();

  const groupedTickets = useMemo(() => {
    if (!tickets) return {};
    return tickets.reduce((groups, ticket) => {
      const date = new Date(ticket.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(ticket);
      return groups;
    }, {});
  }, [tickets]);

  if (ticketsLoading || productsLoading) return <Loading />;
  if (ticketsError)
    return <div className="customer-tickets__error">{ticketsError}</div>;
  if (productsError)
    return <div className="customer-tickets__error">{productsError}</div>;

  return (
    <div className="customer-tickets">
      <h2 className="customer-tickets__title">Your Tickets</h2>
      {!tickets || tickets.length === 0 ? (
        <div className="customer-tickets__empty">No tickets found!</div>
      ) : (
        <div className="customer-tickets__groups">
          {Object.entries(groupedTickets).map(([date, tickets]) => (
            <TicketGroup
              key={date}
              date={date}
              tickets={tickets}
              getProductDetails={getProductById}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerTickets;
