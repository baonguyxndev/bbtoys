import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";
import "./Loading.css"; // Import file CSS

const Loading = ({ size = 45, speed = 1.75, color = "red" }) => {
  return (
    <div className="loading-container">
      <Bouncy size={size} speed={speed} color={color} />
    </div>
  );
};

export default Loading;
