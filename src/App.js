import "./shared/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./shared/components/Header/Header";
import Home from "./features/home/Home";
import Shop from "./features/shop/Shop";
import License from "./features/license/License";
import Support from "./features/support/Support";
import Info from "./features/info/Info";
import Footer from "./shared/components/Footer/Footer";
import ScrollHandler from "./shared/hooks/ScrollHandler";
import ScrollToTop from "./shared/hooks/ScrollToTop";
import FAQs from "./features/faqs/FAQs";
import ProductDetail from "./features/product/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollHandler />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/license" element={<License />} />
        <Route path="/support" element={<Support />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/info" element={<Info />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
