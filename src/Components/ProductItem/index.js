import React from "react";
import "./style.css";
import { Button } from "@mui/material";
import { MdFavoriteBorder } from "react-icons/md";
import { LuScaling } from "react-icons/lu";

const ProductItem = ({ product }) => {
  const { img: images, name, state, brand, details } = product;
  const { price, oldPrice } = details[0] || {};
  const isSoldOut = state === "Sold-Out";

  return (
    <div className={`productCard ${isSoldOut ? "sold-out" : ""}`}>
      <div className="imageWrapper">
        <img src={images[0]} alt={name} className="productImageMain" />
        <img src={images[1]} alt={name} className="productImageHover" />
        <div className="btnFullScreen">
          <Button>
            <LuScaling />
          </Button>
        </div>
      </div>

      <div className="contentWrapper">
        <h4 className="productTitle">
          <span
            className={`stateTag ${state
              ?.toLowerCase()
              .replace("-", "")
              .replace(" ", "")}`}
          >
            {state === "Available"
              ? "【AVAILABLE】"
              : state === "Order"
              ? "【ORDER】"
              : state === "Pre-Order"
              ? "【PRE-ORDER】"
              : "【SOLD-OUT】"}
          </span>{" "}
          {brand}
        </h4>

        <h3 className="productName">{name}</h3>

        <div className="priceWrapper">
          <div className="leftPart">
            <span className="currentPrice">${price?.toFixed(2)}</span>
            {oldPrice && (
              <span className="oldPrice">${oldPrice.toFixed(2)}</span>
            )}
          </div>
          {oldPrice && (
            <span className="discountTag">
              -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}
        </div>

        <div className="bottomAction">
          <Button
            className={`actionButton ${isSoldOut ? "disabled" : ""}`}
            disabled={isSoldOut}
          >
            {isSoldOut ? "Out of stock" : "Choose Options"}
          </Button>
          <Button className="iconBtn">
            <MdFavoriteBorder />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
