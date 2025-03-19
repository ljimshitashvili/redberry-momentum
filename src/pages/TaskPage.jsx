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

const TaskPage = ({
  departmentList,
  employeeList,
  priorityList,
  allTasksList,
}) => {
  useEffect(() => {
    getStatuses();
    getPriorities();
    getDepartments();
    getEmployees();
    getComments();
    getAllTasks();
  }, []);
  console.log("all tasks", allTasksList);

  return (
    <div className="w-full">
      <h1>დავალებების გვერდი</h1>
      <Filter
        departmentList={departmentList}
        employeeList={employeeList}
        priorityList={priorityList}
      />
      {allTasksList.map((task) => (
        <div key={task.id}>{<p>{task.priority.name}</p>}</div>
      ))}
    </div>
  );
};

export default TaskPage;
