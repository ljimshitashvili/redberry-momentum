import { useEffect, useState } from "react";
import { AddNewEmployee, TaskPage, AddNewTask, TaskDetails } from "../pages";
import { Route, Routes } from "react-router-dom";
import {
  getAllTasks,
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
  getComments,
} from "../services/get";
const Body = ({ setToggleWindow, toggleWindow }) => {
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [statusesList, setStatusesList] = useState([]);
  const [allTasksList, setAllTasksList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);

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
    const fetchAllTasks = async () => {
      try {
        const tasks = await getAllTasks();
        setAllTasksList(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const comments = await getComments();
        setCommentsList(comments);
        console.log("commentsList: ", commentsList);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchAllTasks();
    fetchComments();
    getDepartments(setDepartmentList);
    getEmployees(setEmployeeList);
    getPriorities(setPriorityList);
    getStatuses(setStatusesList);
  }, []);

  console.log(departmentList);

  return (
    <div className="w-full h-full pt-[40px] px-[120px] ">
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
              commentsList={commentsList}
              toggleWindow={toggleWindow}
              setToggleWindow={setToggleWindow}
            />
          }
        />
        <Route
          path="/task/:taskId"
          element={
            <TaskDetails
              allTasksList={allTasksList}
              updateTaskInList={updateTaskInList}
              commentsList={commentsList}
              setCommentsList={setCommentsList}
            />
          }
        />

        <Route
          path="addemployee"
          element={
            <AddNewEmployee
              departmentList={departmentList}
              toggleWindow={toggleWindow}
              setToggleWindow={setToggleWindow}
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
