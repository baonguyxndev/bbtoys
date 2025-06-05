import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import "./styles/Notification.css";
import { Button } from "@mui/material";

const NOTIFICATION_TYPES = {
  success: {
    icon: FaCheckCircle,
    title: "Success",
    color: "#34d399",
  },
  error: {
    icon: FaExclamationCircle,
    title: "Error",
    color: "#f87171",
  },
  warning: {
    icon: FaExclamationCircle,
    title: "Warning",
    color: "#fbbf24",
  },
  info: {
    icon: FaInfoCircle,
    title: "Information",
    color: "#60a5fa",
  },
};

const Notification = ({ open, message, severity = "success", onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const type = NOTIFICATION_TYPES[severity] || NOTIFICATION_TYPES.info;
  const Icon = type.icon;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setIsClosing(false);
      const timer = setTimeout(handleClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, handleClose]);

  if (!open) return null;

  return createPortal(
    <div className="notification-container">
      <div className={`notification ${severity} ${isClosing ? "closing" : ""}`}>
        <Icon className="notification-icon" />
        <div className="notification-content">
          <div className="notification-title">{type.title}</div>
          <div className="notification-message">{message}</div>
        </div>
        <Button
          className="notification-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <FaTimes />
        </Button>
        <div className="notification-progress" />
      </div>
    </div>,
    document.body
  );
};

export default Notification;
