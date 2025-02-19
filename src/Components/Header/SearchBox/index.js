import { IoSearch } from "react-icons/io5";
import { Button } from "@mui/material";
const SearchBox = () => {
  return (
    <div className="headerSearch ml-auto mr-auto">
      <input type="text" placeholder="Search for products..." />
      <Button>
        <IoSearch />
      </Button>
    </div>
  );
};
export default SearchBox;
