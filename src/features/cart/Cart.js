import React from "react";
import { useUserSessionManager } from "../../shared/state/userSessionManager";
import useFetchCustomer from "../../shared/hooks/useFetchCustomer";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import { useShoppingCartHandler } from "../../shared/state/shoppingCartHandler";
import Loading from "../../shared/components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import "./styles/Cart.css";
import { Button } from "@mui/material";
import { IoBagRemoveOutline, IoBagCheckOutline } from "react-icons/io5";

const Cart = () => {
  const currentUser = useUserSessionManager((state) => state.currentUser);
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } =
    useShoppingCartHandler();

  // Get customer info from current user
  const customerId = currentUser?.id;
  const { loading: customerLoading } = useFetchCustomer(customerId);

  // Get product info
  const { getProductById, loading: productsLoading } = useFetchProducts();

  const totalProductCost = cartItems.reduce((total, item) => {
    const product = getProductById(item.id);
    const detail = product?.details?.find(
      (d) =>
        d.scale === item.scale &&
        d.model === item.model &&
        d.version === item.version
    );
    return total + (detail?.price || 0) * item.quantity;
  }, 0);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(
        item.id,
        item.scale,
        item.model,
        item.version,
        newQuantity
      );
    }
  };

  const handleRemoveItem = (item) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      removeFromCart(item.id, item.scale, item.model, item.version);
    }
  };

  // Chỉ loading khi có user và đang fetch thông tin customer
  if (currentUser && customerLoading) return <Loading />;
  if (productsLoading) return <Loading />;

  if (!cartItems.length)
    return (
      <div className="cart-empty">
        <h2 className="cart-title">Your cart is empty</h2>
        <Button className="buy-btn" onClick={() => navigate("/shop")}>
          Buy now
        </Button>
      </div>
    );

  return (
    <div className="cart">
      <div className="title">
        <h2>
          <div className="line"></div>
          <span className="titleMain">Cart</span>
          <div className="line"></div>
        </h2>
      </div>
      <div className="container-fluid">
        <div className="cart-left">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const product = getProductById(item.id);
                const detail = product?.details?.find(
                  (d) =>
                    d.scale === item.scale &&
                    d.model === item.model &&
                    d.version === item.version
                );

                return (
                  <tr
                    className="cart-item"
                    key={`${item.id}-${item.scale}-${item.model}-${item.version}`}
                  >
                    <td>
                      <div className="info-product-wrapper">
                        <div className="image-wrapper">
                          <img
                            src={product?.img[0] || "/assets/no-image.png"}
                            alt={product?.name || "Product"}
                          />
                        </div>
                        <div className="info-product">
                          <b>{product?.name || "Product"}</b>
                          <div className="text-light">
                            {product?.brand || "Brand"}
                          </div>
                          {item.scale && (
                            <div className="text-light">{item.scale}</div>
                          )}
                          {item.model && (
                            <div className="text-light">{item.model}</div>
                          )}
                          {item.version && (
                            <div className="text-light">{item.version}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="cart-quantity">
                        <Button onClick={() => handleQuantityChange(item, -1)}>
                          -
                        </Button>
                        <span className="quantity-value">{item.quantity}</span>
                        <Button onClick={() => handleQuantityChange(item, 1)}>
                          +
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div className="cart-price">
                        ${detail?.price?.toFixed(2) || "0.00"}
                      </div>
                    </td>
                    <td>
                      <div className="cart-total">
                        ${((detail?.price || 0) * item.quantity).toFixed(2)}
                      </div>
                    </td>
                    <td className="cart-actions">
                      <Button
                        className="delete-btn"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <IoBagRemoveOutline />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="cart-right">
          <div className="cart-summary">
            <div className="summary-row grand-total-wrapper">
              <span>Grand total:</span>
              <span className="grand-total">
                ${totalProductCost.toFixed(2)}
              </span>
            </div>
            <div className="checkout-btn-wrapper">
              <Button
                className="checkout-btn"
                fullWidth
                onClick={() => navigate("/checkout")}
              >
                Proceed To Checkout
                <span className="checkout-icon">
                  <IoBagCheckOutline />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
