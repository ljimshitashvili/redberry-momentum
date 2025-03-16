import { useEffect, useState } from "react";
import { Filter } from "../components";
import {
  getAllTasks,
  getComments,
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
} from "../services/get";

const TaskPage = ({ departmentList, employeeList, priorityList }) => {
  useEffect(() => {
    getStatuses();
    getPriorities();
    getDepartments();
    getEmployees();
    getComments();
    getAllTasks();
  }, []);
  return (
    <div className="w-full">
      <h1>დავალებების გვერდი</h1>
      <Filter
        departmentList={departmentList}
        employeeList={employeeList}
        priorityList={priorityList}
      />
    </div>
  );
};

export default TaskPage;
