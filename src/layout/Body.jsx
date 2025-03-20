import { useEffect, useState } from "react";
import { AddNewEmployee, TaskPage, AddNewTask, TaskDetails } from "../pages";
import { Route, Routes } from "react-router-dom";
import {
  getAllTasks,
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
  getTask,
} from "../services/get";
const Body = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [statusesList, setStatusesList] = useState([]);
  const [allTasksList, setAllTasksList] = useState([]);

  const updateTaskInList = (taskId, newStatusId) => {
    setAllTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id.toString() === taskId
          ? { ...task, status: { ...task.status, id: newStatusId } }
          : task
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        console.log("Fetched tasks:", tasks);
        setAllTasksList(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
    getDepartments(setDepartmentList);
    getEmployees(setEmployeeList);
    getPriorities(setPriorityList);
    getStatuses(setStatusesList);
  }, []);
  console.log(employeeList);

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
              updateTaskInList={updateTaskInList}
            />
          }
        />
        <Route
          path="/add-employee"
          element={<AddNewEmployee departmentList={departmentList} />}
        />
        <Route
          path="/task/:taskId"
          element={
            <TaskDetails
              allTasksList={allTasksList}
              updateTaskInList={updateTaskInList}
            />
          }
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
