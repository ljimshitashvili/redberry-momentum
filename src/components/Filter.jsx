import { useEffect, useState, useRef } from "react";
import { arrow } from "../assets";
import Departments from "./Departments";
import Priorities from "./Priorities";
import Employees from "./Employees";

const Filter = ({ departmentList, employeeList, priorityList }) => {
  const [filter, setFilter] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <div className="flex relative h-[44px] w-[688px] border-[1px] border-[#DEE2E6] rounded-[10px] px-[18px] justify-between items-center">
      <button
        className="flex gap-2 cursor-pointer hover:text-[#8338EC]"
        onClick={() => setFilter("department")}
      >
        დეპარტამენტი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
      <button
        className="flex gap-2 cursor-pointer hover:text-[#8338EC]"
        onClick={() => setFilter("priority")}
      >
        პრიორიტეტი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
      <button
        className="flex gap-2 cursor-pointer hover:text-[#8338EC]"
        onClick={() => setFilter("employee")}
      >
        თანამშრომელი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
      <div
        className={` absolute w-[688px] h-[274px] top-[110px] left-[118px] `}
      >
        {filter === "department" && (
          <Departments departmentList={departmentList} />
        )}
        {filter === "priority" && <Priorities priorityList={priorityList} />}
        {filter === "employee" && <Employees employeeList={employeeList} />}
      </div>
    </div>
  );
};

export default Filter;
