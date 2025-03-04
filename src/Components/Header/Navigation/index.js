import { Button } from "@mui/material";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { IoStorefrontOutline } from "react-icons/io5";
import { HiOutlineFire } from "react-icons/hi";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-2 navPart1">
            <Button className="allCateTab align-items-center">
              <span className="icon1 mr-2">
                <IoIosMenu />
              </span>
              <span class="text">Danh mục</span>
              <span className="icon2 ml-2">
                <FaAngleDown />
              </span>
            </Button>
          </div>
          <div className="col-sm-9 navPart2 d-flex align-items-center">
            <ul className="list list-inline ml-auto">
              <li className="list-inline-item">
                <Link to="/">
                  <TbHome /> &nbsp; Trang chủ
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <IoStorefrontOutline /> &nbsp; Có sẵn
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="/">
                  <HiOutlineFire /> &nbsp; Sale
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="/">
                  {" "}
                  <CiViewList /> &nbsp; Chính sách
                </Link>
                {/* <div className="submenu shadow">
                  <Link to="/">
                    <Button>Chính sách đổi trả</Button>
                  </Link>
                  <Link to="/">
                    <Button>Chính sách mua hàng</Button>
                  </Link>
                </div> */}
              </li>

              <li className="list-inline-item">
                <Link to="/">
                  {" "}
                  <IoInformationCircleOutline /> &nbsp; Liện hệ
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="/">
                  <BiSupport /> &nbsp; Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
