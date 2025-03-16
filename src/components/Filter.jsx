import { arrow } from "../assets";

const Filter = () => {
  return (
    <div className="flex">
      <button className="flex">
        დეპარტამენტი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
      <button className="flex">
        პრიორიტეტი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
      <button className="flex">
        თანამშრომელი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
    </div>
  );
};

export default Filter;
