import React from "react";
import { Button } from "@mui/material";
import {
  MdFavorite,
  MdShoppingCart,
  MdRemoveShoppingCart,
} from "react-icons/md";
import { LuScaling } from "react-icons/lu";

const ProductItem = ({ product }) => {
  const { img1, img2, name, status, studio, price, oldPrice } = product;
  const isSoldOut = status === "Sold-Out";
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div className={`item productItem ${isSoldOut ? "Sold-Out" : ""}`}>
      <div className="imgWrapper position-relative">
        <img src={img1} alt={name} className="w-100 main-img" />
        <img src={img2} alt={name} className="w-100 hover-img" />

        <div className="btnFullScreen">
          <Button>
            <LuScaling />
          </Button>
        </div>
      </div>

      <div className="productInfo">
        <Button className="favBtn">
          <MdFavorite />
        </Button>
        <span className={`status ${status}`}>{status}</span>
        <Button className="cartBtn">
          {isSoldOut ? <MdRemoveShoppingCart /> : <MdShoppingCart />}
        </Button>

        {oldPrice && (
          <div className="saleTagWrapper">
            <span className="saleTag">-{discount}%</span>
          </div>
        )}

        <h4>{studio}</h4>
        <h3>{name}</h3>
        <p className="price">
          {oldPrice && (
            <span className="oldPrice">{oldPrice.toLocaleString()}đ</span>
          )}
          {price.toLocaleString()}đ
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
