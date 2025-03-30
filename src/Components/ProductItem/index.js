import React from "react";
import "./style.css";
import { Button } from "@mui/material";
import {
  MdFavorite,
  MdShoppingCart,
  MdRemoveShoppingCart,
} from "react-icons/md";
import { LuScaling } from "react-icons/lu";

const ProductItem = ({ product }) => {
  const { img: images, name, state, brand, details } = product;
  // Lấy price và oldPrice từ details[0]
  const { price, oldPrice } = details[0] || {};
  const isSoldOut = state === "Sold-Out";
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div className="hidden">
      <div className={`item productItem ${isSoldOut ? "Sold-Out" : ""}`}>
        <div className="imgWrapper position-relative">
          <img src={images[0]} alt={name} className="w-100 main-img" />
          <img src={images[1]} alt={name} className="w-100 hover-img" />

          <div className="btnFullScreen">
            <Button>
              <LuScaling />
            </Button>
          </div>
        </div>

        <div className="productInfo">
          <div className="row justify-content-center align-conten-center">
            <Button className="favBtn">
              <MdFavorite />
            </Button>
            <span className={`state ${state}`}>{state}</span>
            <Button className="cartBtn">
              {isSoldOut ? <MdRemoveShoppingCart /> : <MdShoppingCart />}
            </Button>
          </div>

          {oldPrice && (
            <div className="saleTagWrapper">
              <span className="saleTag">-{discount}%</span>
            </div>
          )}

          <h4>{brand}</h4>
          <h3>{name}</h3>
          <p className="price">
            {oldPrice && (
              <span className="oldPrice">{oldPrice.toLocaleString()}đ</span>
            )}
            {price.toLocaleString()}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
