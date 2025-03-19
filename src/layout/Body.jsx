//Routes of the website is changed in this component. It contains Routes.

import { useEffect, useState } from "react";
import { AddNewEmployee, TaskPage, AddNewTask } from "../pages";
import { Route, Routes } from "react-router-dom";
import {
  getAllTasks,
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
} from "../services/get";

const Body = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [statusesList, setStatusesList] = useState([]);
  const [allTasksList, setAllTasksList] = useState([]);

  useEffect(() => {
    getDepartments(setDepartmentList);
    getEmployees(setEmployeeList);
    getPriorities(setPriorityList);
    getStatuses(setStatusesList);
    getAllTasks(setAllTasksList);
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
              allTasksList={allTasksList}
            />
          }
        />
        <Route
          path="/add-employee"
          element={<AddNewEmployee departmentList={departmentList} />}
        />
        <Route
          path="/add-new-task"
          element={
            <AddNewTask
              departmentList={departmentList}
              employeeList={employeeList}
              priorityList={priorityList}
              statusesList={statusesList}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Body;
