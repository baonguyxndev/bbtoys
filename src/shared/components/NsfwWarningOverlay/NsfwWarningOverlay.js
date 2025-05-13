import React from "react";
import "./styles/NsfwWarningOverlay.css";

const NsfwWarningOverlay = ({ onEnter, onExit }) => (
  <div className="nsfw-warning-overlay">
    <div className="nsfw-warning-box">
      <div className="nsfw-warning-title">Warning: NSFW Content</div>
      <div className="nsfw-warning-desc">
        This product contains adult content that may not be suitable for work or
        under 18 viewers. Please confirm that you are at least 18 years old to
        proceed.
      </div>
      <div className="nsfw-warning-actions">
        <button className="exit-btn" onClick={onExit}>
          I'm under 18 - Exit
        </button>
        <button className="enter-btn" onClick={onEnter}>
          I'm 18 or older - Enter
        </button>
      </div>
    </div>
  </div>
);

export default NsfwWarningOverlay;
