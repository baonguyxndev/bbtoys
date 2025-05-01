import React from "react";
import { Button } from "@mui/material";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { HiMenu } from "react-icons/hi";
import "./LayoutOptions.css";

const LayoutOptions = ({ selectedLayout, onLayoutChange }) => {
  return (
    <div className="layoutOptions">
      <Button
        className={`layoutOptionBtn ${
          selectedLayout === "grid3" ? "active" : ""
        }`}
        onClick={() => onLayoutChange("grid3")}
      >
        <BsFillGrid3X3GapFill />
      </Button>
      <Button
        className={`layoutOptionBtn ${
          selectedLayout === "grid4" ? "active" : ""
        }`}
        onClick={() => onLayoutChange("grid4")}
      >
        <TfiLayoutGrid4Alt />
      </Button>
      <Button
        className={`layoutOptionBtn ${
          selectedLayout === "list" ? "active" : ""
        }`}
        onClick={() => onLayoutChange("list")}
      >
        <HiMenu />
      </Button>
    </div>
  );
};

export default LayoutOptions;
