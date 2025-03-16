import { useState } from "react";
import { arrow } from "../assets";
import Departments from "./Departments";
import Priorities from "./Priorities";
import Employees from "./Employees";

const Filter = ({ departmentList, employeeList, priorityList }) => {
  const [filter, setFilter] = useState("");

  return (
    <div className="flex relative">
      <button className="flex" onClick={() => setFilter("department")}>
        დეპარტამენტი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
      <button className="flex" onClick={() => setFilter("priority")}>
        პრიორიტეტი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
      <button className="flex" onClick={() => setFilter("employee")}>
        თანამშრომელი
        <span>
          <img src={arrow} alt="Arrow Icon" />
        </span>
      </button>
      <div className="absolute w-[688px] h-[274px] top-[110px] left-[118px]">
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
