import React, { useMemo } from "react";
import "./styles/CustomerTickets.css";
import useFetchCustomerTickets from "../../shared/hooks/useFetchCustomerTickets.js";
import Loading from "../../shared/components/Loading/Loading.js";

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

const TicketCard = ({ ticket }) => {
  return (
    <div
      className={`customer-tickets__card customer-tickets__card--${
        ticket.status || "default"
      }`}
    >
      <div className="customer-tickets__header">
        <span className="customer-tickets__id">#{ticket.id}</span>
        <div className="customer-tickets__header-right">
          <StatusBadge status={ticket.status} />
        </div>
      </div>
      <div className="customer-tickets__content">
        <div className="customer-tickets__orderid">
          Order ID: {ticket.orderId}
        </div>
      </div>
      <div className="customer-tickets__footer">
        <span className="customer-tickets__date">
          {new Date(ticket.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

const TicketGroup = ({ date, tickets }) => {
  return (
    <div className="customer-tickets__group">
      <div className="customer-tickets__group-header">
        <span className="customer-tickets__group-date">{date}</span>
      </div>
      <div className="customer-tickets__grid">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

const CustomerTickets = ({ id }) => {
  const {
    tickets,
    loading: ticketsLoading,
    error: ticketsError,
  } = useFetchCustomerTickets(id);

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

  if (ticketsLoading) return <Loading />;
  if (ticketsError)
    return <div className="customer-tickets__error">{ticketsError}</div>;

  return (
    <div className="customer-tickets">
      <h2 className="customer-tickets__title">Your Tickets</h2>
      {!tickets || tickets.length === 0 ? (
        <div className="customer-tickets__empty">No tickets found!</div>
      ) : (
        <div className="customer-tickets__groups">
          {Object.entries(groupedTickets).map(([date, tickets]) => (
            <TicketGroup key={date} date={date} tickets={tickets} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerTickets;
