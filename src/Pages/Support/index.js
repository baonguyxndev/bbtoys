import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { TbPhotoCancel } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

const Support = () => {
  const [formData, setFormData] = useState({
    topic: "",
    subject: "",
    saleOrder: "",
    description: "",
    files: [],
  });

  const [showTickets, setShowTickets] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filePreviewUrls, setFilePreviewUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [orders, setOrders] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Cleanup file preview URLs when component unmounts
    return () => {
      filePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filePreviewUrls]);

  // Giả lập lấy danh sách đơn hàng từ API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Thay thế bằng API call thực tế
        const mockOrders = [
          {
            id: "ORD001",
            date: "2024-03-20",
            total: "1,500,000đ",
            items: ["Mô hình Naruto", "Mô hình Sasuke"],
          },
          {
            id: "ORD002",
            date: "2024-03-15",
            total: "2,300,000đ",
            items: ["Mô hình Luffy", "Mô hình Zoro"],
          },
          {
            id: "ORD003",
            date: "2024-03-10",
            total: "1,800,000đ",
            items: ["Mô hình Goku", "Mô hình Vegeta"],
          },
        ];
        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Mock data cho tickets
    const mockTickets = [
      {
        id: "TK001",
        date: "2024-03-20",
        subject: "Vấn đề về đơn hàng ORD001",
        status: "processing",
        topic: "Payment & Refund",
      },
      {
        id: "TK002",
        date: "2024-03-15",
        subject: "Theo dõi đơn hàng ORD002",
        status: "completed",
        topic: "Account & Data safety",
      },
      {
        id: "TK003",
        date: "2024-03-10",
        subject: "Theo dõi đơn hàng ORD003",
        status: "refused",
        topic: "Shipping",
      },
      {
        id: "TK004",
        date: "2024-03-20",
        subject: "Vấn đề về đơn hàng ORD004",
        status: "wating reply",
        topic: "Payment & Refund",
      },
      {
        id: "TK005",
        date: "2024-03-20",
        subject: "Vấn đề về đơn hàng ORD005",
        status: "sent",
        topic: "Payment & Refund",
      },
    ];
    setTickets(mockTickets);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form data:", formData);
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

  return (
    <div className="support">
      <div className="title mt-2 hidden">
        <h2 className="title">
          <div className="line"></div>
          <span className="titleMain">Support</span>
          <div className="line"></div>
        </h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="desc hidden">
            We are delighted to assist you with your concerns. Please complete
            the form below and submit it to us. Should you have any questions or
            require support, we will address them as promptly as possible,
            within 24 hours of receiving your submission. Additionally, you may
            contact us through our various social media channels.
          </div>
          <div className="col-md-8 hidden">
            <div className="ticket-container bg-white rounded-3 shadow-sm p-4">
              <h2 className="hidden">Submit a Ticket</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label hidden">Topic</label>
                  <div className="select-wrapper hidden">
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
                  <label className="form-label hidden">Subject</label>
                  <div className="select-wrapper hidden">
                    <select
                      className="form-select hidden"
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
                  <label className="form-label optional hidden">
                    Sale order
                  </label>
                  <div className="select-wrapper hidden">
                    <select
                      className="form-select hidden"
                      name="saleOrder"
                      value={formData.saleOrder}
                      onChange={handleChange}
                    >
                      <option value="">Select an order</option>
                      {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                          {`${order.id} - ${order.date} - ${
                            order.total
                          } - ${order.items.join(", ")}`}
                        </option>
                      ))}
                    </select>
                    {formData.saleOrder && (
                      <div className="mt-2 text-muted hidden">
                        Selected order details:
                        {orders
                          .find((o) => o.id === formData.saleOrder)
                          ?.items.map((item, index) => (
                            <div key={index}>• {item}</div>
                          ))}
                      </div>
                    )}
                    <IoIosArrowDown className="select-arrow" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label hidden">Description</label>
                  <textarea
                    className="form-control hidden"
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Please describe your issue in detail"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label optional hidden">
                    Attachment(s)
                  </label>
                  <div
                    className="file-upload-container hidden"
                    onClick={handleFileClick}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="d-none hidden"
                      multiple
                      onChange={handleChange}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="file-upload-button hidden"
                      >
                        Choose Files
                      </button>
                      <span className="file-upload-text hidden">
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
                  className="btn btn-danger submit-btn hidden"
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
          <div className="col-md-4 hidden">
            <div className="ticket-list-container bg-white rounded-3 shadow-sm p-4">
              <h3 className="pb-2 mb-3 position-relative hidden">
                Support Tickets Are Created
              </h3>
              <p className="text-muted mb-4 hidden">
                All your support tickets will be displayed here. You can track
                the status and content of each ticket.
              </p>
              <button
                type="button"
                className="btn btn-danger w-100 mb-4 hidden"
                onClick={() => setShowTickets(!showTickets)}
              >
                {showTickets ? "Hide My Tickets" : "View My Tickets"}
              </button>

              {showTickets && (
                <div className="tickets-list">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="ticket-item bg-light border rounded-3 p-3 mb-2"
                    >
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-danger fw-semibold">
                          {ticket.id}
                        </span>
                        <span className="text-muted small">
                          {formatDate(ticket.date)}
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
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
