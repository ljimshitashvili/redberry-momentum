import { useState, useEffect } from "react";
import { AddNewEmployee } from "../pages";
import { Filter, TasksContainer } from "../components";
import {
  getAllTasks,
  getDepartments,
  getEmployees,
  getPriorities,
  getStatuses,
} from "../services/get";

const TaskPage = ({
  departmentList,
  employeeList,
  priorityList,
  updateTaskInList,
  commentsList,
  toggleWindow,
  setToggleWindow,
}) => {
  const [allTasksList, setAllTasksList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setAllTasksList(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full relative">
      <h1 className="font-semibold text-[34px] color-[#212529] mb-[52px]">
        დავალებების გვერდი
      </h1>
      <Filter
        departmentList={departmentList}
        employeeList={employeeList}
        priorityList={priorityList}
      />
      <AddNewEmployee
        departmentList={departmentList}
        toggleWindow={toggleWindow}
        setToggleWindow={setToggleWindow}
      />
      <TasksContainer
        commentsList={commentsList}
        allTasksList={allTasksList}
        updateTaskInList={updateTaskInList}
      />
    </div>
  );
};

export default TaskPage;
