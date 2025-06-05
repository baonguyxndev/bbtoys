import "./shared/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./features/home/Home";
import Shop from "./features/shop/Shop";
import Support from "./features/support/Support";
import Info from "./features/info/Info";
import FAQs from "./features/faqs/FAQs";
import ProductDetail from "./features/product/ProductDetail";
import MustRead from "./shared/components/MustRead/MustRead";
import CustomerProfile from "./features/customer/CustomerProfile";
import Auth from "./features/customer/Auth";
import OrderDetail from "./features/order/OrderDetail";
import TicketDetail from "./features/ticket/TicketDetail";
import Cart from "./features/cart/Cart";
import Checkout from "./features/checkout/Checkout";
import ScrollHandler from "./shared/hooks/ScrollHandler";
import ScrollToTop from "./shared/hooks/ScrollToTop";
import { useUserSessionManager } from "./shared/state/userSessionManager";
import { useShoppingCartHandler } from "./shared/state/shoppingCartHandler";
import MainLayout from "./layouts/MainLayout";
import CheckoutLayout from "./layouts/CheckoutLayout";
import { NotificationProvider } from "./shared/context/NotificationContext";

function AppContent() {
  const initializeAuth = useUserSessionManager((state) => state.initialize);
  const initializeCart = useShoppingCartHandler((state) => state.initialize);

  useEffect(() => {
    const initializeStores = async () => {
      await initializeAuth();
      initializeCart();
    };
    initializeStores();
  }, [initializeAuth, initializeCart]);

  return (
    <>
      <ScrollToTop />
      <ScrollHandler />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/info" element={<Info />} />
          <Route path="/must-read" element={<MustRead />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<CheckoutLayout />}>
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
