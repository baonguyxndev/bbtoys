import "./styles/CustomerWishList.css";
import useFetchCustomerWishlist from "../../shared/hooks/useFetchCustomerWishlist";
import useFetchProducts from "../../shared/hooks/useFetchProducts";
import React from "react";
import Loading from "../../shared/components/Loading/Loading.js";
import ProductItem from "../../shared/components/ProductItem/ProductItem";
import { useUserSessionManager } from "../../shared/state/userSessionManager";

const CustomerWishList = () => {
  const currentUser = useUserSessionManager((state) => state.currentUser);
  const customerId = currentUser?.id;
  const {
    wishlist,
    loading: wishlistLoading,
    error: wishlistError,
  } = useFetchCustomerWishlist(customerId);
  const {
    getProductById,
    loading: productsLoading,
    error: productsError,
  } = useFetchProducts();

  // Lấy wishlist đầu tiên của khách hàng (theo dữ liệu mẫu)
  const customerWishlist = wishlist && wishlist.length > 0 ? wishlist[0] : null;
  const productIds = customerWishlist ? customerWishlist.idProduct : [];

  if (wishlistLoading || productsLoading) return <Loading />;
  if (wishlistError)
    return <div className="customer-wishlist__error">{wishlistError}</div>;
  if (productsError)
    return <div className="customer-wishlist__error">{productsError}</div>;

  return (
    <div className="customer-wishlist">
      <h2 className="customer-wishlist__title">Your Wishlist</h2>
      {!productIds || productIds.length === 0 ? (
        <div className="customer-wishlist__empty">No wishlist items found!</div>
      ) : (
        <div className="customer-wishlist__grid">
          {productIds.map((productId) => {
            const product = getProductById(productId);
            if (!product) return null;
            return (
              <ProductItem
                key={productId}
                product={product}
                onOpenModal={() => {}}
                layout="wishlist"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerWishList;
