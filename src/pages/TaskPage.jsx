import { useEffect, useState } from "react";
import { Filter } from "../components";
import { getDepartments, getPriorities, getStatuses } from "../services";

const TaskPage = () => {
  const [status, setTatus] = useState([]);

  useEffect(() => {
    getStatuses();
    getPriorities();
    getDepartments();
  }, []);
  return (
    <div className="w-full">
      <h1>დავალებების გვერდი</h1>
      <Filter />
    </div>
  );
};

export default TaskPage;
