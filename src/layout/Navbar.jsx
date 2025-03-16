import { add, logo } from "../assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between">
      <img src={logo} alt="Logo" />
      <div className="button-container flex gap-[40px] ">
        <Link to="add-employee" className="cursor-pointer border-[1px]">
          თანამშრომლის შექმნა
        </Link>
        <Link className="flex cursor-pointer border-[1px]">
          <img src={add} alt="Plus Icon" />
          შექმენი ახალი დავალება
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
