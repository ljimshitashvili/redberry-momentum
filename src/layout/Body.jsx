//Routes of the website is changed in this component. It contains Routes.

import { useEffect, useState } from "react";
import { AddNewEmployee, TaskPage } from "../pages";
import { Route, Routes } from "react-router-dom";
import { getDepartments, getEmployees, getPriorities } from "../services/get";

const Body = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);

  useEffect(() => {
    getDepartments(setDepartmentList);
    getEmployees(setEmployeeList);
    getPriorities(setPriorityList);
  }, []);
  console.log(priorityList);

  return (
    <div className="w-full h-full ">
      <Routes>
        <Route
          path="/"
          element={
            <TaskPage
              departmentList={departmentList}
              employeeList={employeeList}
              priorityList={priorityList}
            />
          }
        />
        <Route
          path="/add-employee"
          element={<AddNewEmployee departmentList={departmentList} />}
        />
      </Routes>
    </div>
  );
};

export default Body;
