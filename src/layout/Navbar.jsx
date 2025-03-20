import { add, logo } from "../assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex w-full h-[100px] justify-between px-[120px] py-[31px] ">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-[210px]" />
      </Link>
      <div className="button-container flex justify-between w-[533px] h-[40px]">
        <Link
          to="add-employee"
          className="cursor-pointer border-[1px] w-[225px] h-full border-[#8338EC] rounded-[5px] flex items-center justify-center"
        >
          თანამშრომლის შექმნა
        </Link>
        <Link
          to="add-new-task"
          className="flex cursor-pointer border-[1px] w-[268px] h-full border-[#8338EC] rounded-[5px] items-center justify-center gap-[9px] bg-[#8338EC] text-[#fff]"
        >
          <img src={add} alt="Plus Icon" />
          შექმენი ახალი დავალება
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
