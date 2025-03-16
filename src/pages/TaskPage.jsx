import { useEffect, useState } from "react";
import { Filter } from "../components";
import { getStatuses } from "../services";

const TaskPage = () => {
  const [status, setTatus] = useState([]);

  useEffect(() => {
    getStatuses();
  }, []);
  return (
    <div className="w-full">
      <h1>დავალებების გვერდი</h1>
      <Filter />
    </div>
  );
};

export default TaskPage;
