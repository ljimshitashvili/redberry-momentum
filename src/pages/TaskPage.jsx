import { useState, useEffect } from "react";
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
    <div className="w-full">
      <h1>დავალებების გვერდი</h1>
      <Filter
        departmentList={departmentList}
        employeeList={employeeList}
        priorityList={priorityList}
      />
      <TasksContainer
        allTasksList={allTasksList}
        updateTaskInList={updateTaskInList}
      />
    </div>
  );
};

export default TaskPage;
