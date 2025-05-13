import React from "react";
import "./ProductItem.css";
import { Button } from "@mui/material";
import { MdFavoriteBorder } from "react-icons/md";
import { LuScaling } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import useNsfwGuard from "../../hooks/useNsfwGuard";
import NsfwBanner from "../NsfwBanner/NsfwBanner";

const ProductItem = ({ product, onOpenModal, layout }) => {
  const navigate = useNavigate();
  const { img: images, id, name, state, brand, details } = product;
  const { price, oldPrice } = details[0] || {};
  const isSoldOut = state === "Sold-Out";
  const { isNsfw } = useNsfwGuard(product);

  const handleChooseOptions = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className={`productCard ${layout} ${isSoldOut ? "sold-out" : ""} ${
        isNsfw ? "nsfw" : ""
      }`}
    >
      <div className="imageWrapper">
        <img
          src={images[0]}
          alt={name}
          className={`productImageMain${isNsfw ? " nsfw-blur" : ""}`}
        />
        <img
          src={images[1]}
          alt={name}
          className={`productImageHover${isNsfw ? " nsfw-blur" : ""}`}
        />
        {isNsfw && <NsfwBanner />}
        <div className="btnFullScreen">
          <Button onClick={() => onOpenModal(id)}>
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
            onClick={handleChooseOptions}
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
