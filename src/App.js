import "./shared/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./shared/components/Header/Header";
import Home from "./features/home/Home";
import Shop from "./features/shop/Shop";
import Support from "./features/support/Support";
import Info from "./features/info/Info";
import Footer from "./shared/components/Footer/Footer";
import ScrollHandler from "./shared/hooks/ScrollHandler";
import ScrollToTop from "./shared/hooks/ScrollToTop";
import FAQs from "./features/faqs/FAQs";
import ProductDetail from "./features/product/ProductDetail";
import MustRead from "./shared/components/MustRead/MustRead";
import CustomerProfile from "./features/customer/CustomerProfile";
import Auth from "./features/customer/Auth";
import { AuthProvider } from "./shared/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ScrollHandler />
        <Header />
        <Routes>
          {/*Home*/}
          <Route path="/" element={<Home />} />

          {/*Shop*/}
          <Route path="/shop" element={<Shop />} />

          {/*Product*/}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/*Support*/}
          <Route path="/support" element={<Support />} />

          {/*FAQs*/}
          <Route path="/faqs" element={<FAQs />} />

          {/*Info*/}
          <Route path="/info" element={<Info />} />

          {/*MustRead*/}
          <Route path="/must-read" element={<MustRead />} />

          {/*Customer*/}
          <Route path="/customer/:id" element={<CustomerProfile />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
