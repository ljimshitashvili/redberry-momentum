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

const TaskPage = () => {
  const [status, setTatus] = useState([]);

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
      <Filter />
    </div>
  );
};

export default TaskPage;
