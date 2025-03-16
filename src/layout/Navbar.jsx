import { add, logo } from "../assets";
const Navbar = () => {
  return (
    <div className="flex w-full justify-between">
      <img src={logo} alt="Logo" />
      <div className="button-container flex gap-[40px] ">
        <button className="cursor-pointer border-[1px]">
          თანამშრომლის შექმნა
        </button>
        <button className="flex cursor-pointer border-[1px]">
          <img src={add} alt="Plus Icon" />
          შექმენი ახალი დავალება
        </button>
      </div>
    </div>
  );
};

export default Navbar;
