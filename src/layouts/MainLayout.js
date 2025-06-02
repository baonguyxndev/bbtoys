import Header from "../shared/components/Header/Header";
import Footer from "../shared/components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default MainLayout;
