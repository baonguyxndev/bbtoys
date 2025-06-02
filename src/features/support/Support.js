import "../support/styles/Support.css";
import React, { useState, useEffect, useRef } from "react";
import { TbPhotoCancel } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import Loading from "../../shared/components/Loading/Loading";
import useFetchCustomerTickets from "../../shared/hooks/useFetchCustomerTickets";
import useFetchCustomerOrders from "../../shared/hooks/useFetchCustomerOrders";
import { useUserSessionManager } from "../../shared/state/userSessionManager";

const Support = () => {
  const currentUser = useUserSessionManager((state) => state.currentUser);
  const [formData, setFormData] = useState({
    topic: "",
    subject: "",
    saleOrder: "",
    description: "",
    files: [],
  });

  const [showTickets, setShowTickets] = useState(false);
  const [filePreviewUrls, setFilePreviewUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Chỉ fetch dữ liệu khi có user
  const {
    tickets,
    loading: ticketsLoading,
    error: ticketsError,
  } = useFetchCustomerTickets(currentUser?.id || null);

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useFetchCustomerOrders(currentUser?.id || null);

  useEffect(() => {
    // Cleanup file preview URLs when component unmounts
    return () => {
      filePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filePreviewUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          topic: "Account & Data safety",
          subject: "",
          saleOrder: "",
          description: "",
          files: [],
        });
        // Cleanup old preview URLs
        filePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
        setFilePreviewUrls([]);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const selectedFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...selectedFiles],
      }));

      // Generate preview URLs for new files
      const newPreviewUrls = selectedFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      }));
      setFilePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveFile = (index) => {
    // Remove file from formData
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));

    // Cleanup and remove preview URL
    URL.revokeObjectURL(filePreviewUrls[index].url);
    setFilePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const topics = [
    { value: "Account & Data safety", label: "Account & Data safety" },
    { value: "Payment & Refund", label: "Payment & Refund" },
    { value: "Shipping & Delivery", label: "Shipping & Delivery" },
    { value: "Defaults & Breakage", label: "Defaults & Breakage" },
    { value: "Purchase on event", label: "Purchase on event" },
    { value: "Transfer BB Toys Store", label: "Transfer BB Toys Store" },
  ];

  const subjects = {
    "Account & Data safety": [
      { value: "Waiting List", label: "Waiting List" },
      {
        value: "Update my personnal informations",
        label: "Update my personnal informations",
      },
    ],
    "Payment & Refund": [
      { value: "Payment Error", label: "Payment Error" },
      { value: "Installment", label: "Installment" },
      { value: "Order Cancellation", label: "Order Cancellation" },
      { value: "Update Payment Method", label: "Update Payment Method" },
    ],
    "Shipping & Delivery": [
      { value: "Address Confirmation", label: "Address Confirmation" },
      { value: "Damaged Parcel", label: "Damaged Parcel" },
      { value: "Delay", label: "Delay" },
      { value: "Lost Parcel", label: "Lost Parcel" },
    ],
    "Defaults & Breakage": [
      { value: "Breakage", label: "Breakage" },
      { value: "Defauts", label: "Defauts" },
      { value: "Missing Parts", label: "Missing Parts" },
    ],
    "Purchase on event": [
      { value: "Purchase on event", label: "Purchase on event" },
    ],
    "Transfer BB Toys Store": [
      { value: "New Order", label: "New Order" },
      { value: "Partially Payed Order", label: "Partially payed order" },
      { value: "Fully Payed Order", label: "Fully payed order" },
    ],
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  // Hiển thị loading chỉ khi đang fetch dữ liệu và có user
  if (currentUser && (ticketsLoading || ordersLoading)) {
    return (
      <div className="support">
        <div className="loading-container">
          <Loading />
        </div>
      </div>
    );
  }

  // Hiển thị lỗi nếu có
  if (ticketsError || ordersError) {
    return (
      <div className="support">
        <div className="error-message">
          {ticketsError || ordersError || "Có lỗi xảy ra khi tải dữ liệu"}
        </div>
      </div>
    );
  }

  return (
    <div className="support">
      <div className="title">
        <h1>
          <div className="line"></div>
          <span className="titleMain">Support</span>
          <div className="line"></div>
        </h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="desc">
            We are delighted to assist you with your concerns. Please complete
            the form below and submit it to us. Should you have any questions or
            require support, we will address them as promptly as possible,
            within 24 hours of receiving your submission. Additionally, you may
            contact us through our various social media channels.
          </div>
          <div className="col-md-8">
            <div className="ticket-container bg-white rounded-3 shadow-sm p-4">
              <h2 className="tilte">Submit a Ticket</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label">Topic</label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      {topics.map((topic) => (
                        <option key={topic.value} value={topic.value}>
                          {topic.label}
                        </option>
                      ))}
                    </select>
                    <IoIosArrowDown className="select-arrow" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Subject</label>
                  <div className="select-wrapper ">
                    <select
                      className="form-select"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Please choose a subject first</option>
                      {subjects[formData.topic]?.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                    <IoIosArrowDown className="select-arrow" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label optional">Sale order</label>
                  <div className="select-wrapper ">
                    <select
                      className="form-select"
                      name="saleOrder"
                      value={formData.saleOrder}
                      onChange={handleChange}
                    >
                      <option value="">Select an order</option>
                      {orders?.map((order) => (
                        <option key={order.id} value={order.id}>
                          {`ORD${order.id} - ${formatDate(
                            order.createdAt
                          )} - $${order.totalOrder.toLocaleString()}`}
                        </option>
                      ))}
                    </select>
                    <IoIosArrowDown className="select-arrow" />
                  </div>
                  <div className="orders-selected">
                    {formData.saleOrder && (
                      <div className="text-muted">
                        Selected order details:
                        {orders
                          ?.find((o) => o.id === parseInt(formData.saleOrder))
                          ?.product?.map((item, index) => (
                            <div key={index}>
                              • {item.name || `Product #${item.idProduct}`}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Please describe your issue in detail"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label optional">Attachment(s)</label>
                  <div
                    className="file-upload-container"
                    onClick={handleFileClick}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="d-none"
                      multiple
                      onChange={handleChange}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <div className="d-flex align-items-center justify-content-center">
                      <button type="button" className="file-upload-button ">
                        Choose Files
                      </button>
                      <span className="file-upload-text">
                        {formData.files.length > 0
                          ? `${formData.files.length} file(s) selected`
                          : "No file chosen"}
                      </span>
                    </div>
                  </div>
                  {filePreviewUrls.length > 0 && (
                    <div className="file-preview-container">
                      {filePreviewUrls.map((file, index) => (
                        <div
                          key={index}
                          className={`file-preview-item ${
                            !file.type.startsWith("image/") ? "document" : ""
                          }`}
                        >
                          {file.type.startsWith("image/") && (
                            <img src={file.url} alt={file.name} />
                          )}
                          <div className="file-name">{file.name}</div>
                          <button
                            className="remove-file"
                            onClick={() => handleRemoveFile(index)}
                            title="Remove file"
                          >
                            <TbPhotoCancel />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-danger submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : submitSuccess
                    ? "Submitted!"
                    : "Submit"}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="ticket-list-container bg-white rounded-3 shadow-sm p-4">
              <h3 className="pb-2 mb-3 position-relative ">
                Support Tickets Are Created
              </h3>
              <p className="text-muted mb-4">
                All your support tickets will be displayed here. You can track
                the status and content of each ticket.
              </p>
              <button
                type="button"
                className="btn btn-danger w-100 mb-4"
                onClick={() => setShowTickets(!showTickets)}
              >
                {showTickets ? "Hide My Tickets" : "View My Tickets"}
              </button>

              {showTickets && (
                <div className="tickets-list">
                  {tickets?.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="ticket-item bg-light border rounded-3 p-3 mb-2"
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-danger fw-semibold">
                          #{ticket.id}
                        </span>
                        <span className="text-muted small">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                      <div className="fw-medium mb-2">{ticket.subject}</div>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-secondary">{ticket.topic}</small>
                        <span
                          className={`badge ${
                            ticket.status === "processing"
                              ? "bg-processing"
                              : ticket.status === "completed"
                              ? "bg-completed"
                              : ticket.status === "refused"
                              ? "bg-refused"
                              : "bg-wait"
                          }`}
                        >
                          {ticket.status.charAt(0).toUpperCase() +
                            ticket.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {submitSuccess && (
        <div
          className="position-fixed top-50 start-50 translate-middle p-3 bg-white rounded-3 shadow-lg"
          style={{ zIndex: 1050 }}
        >
          <div className="text-center">
            <div className="mb-3">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <h5 className="mb-3">Ticket Submitted Successfully!</h5>
            <p className="text-muted mb-0">
              We'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      )}

      {isSubmitting && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
          }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-">
              <Loading />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
