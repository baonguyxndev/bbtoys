import { Button } from "@mui/material";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbHome } from "react-icons/tb";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { CiViewList } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 navPart1">
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
            <ul className="list-list-inline mr-auto">
              <li className="list-inline-item">
                <Link to="/">
                  <TbHome /> &nbsp; Trang chủ
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="/">
                  <HiOutlineNewspaper /> &nbsp; Tin tức
                </Link>
              </li>

              <li className="list-inline-item">
                <Link to="/">
                  {" "}
                  <CiViewList /> &nbsp; Chính sách
                </Link>
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
