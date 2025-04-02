import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Licences from "./Pages/Licences";
import Support from "./Pages/Support";
import Contact from "./Pages/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Footer";
import ScrollHandler from "./hooks/ScrollHandler";
import ScrollToTop from "./hooks/ScrollToTop";
import FAQs from "./Pages/FAQs";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollHandler />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/licences" element={<Licences />} />
        <Route path="/support" element={<Support />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
