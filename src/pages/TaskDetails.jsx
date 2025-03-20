import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import updateTaskStatus from "../services/put/changeTaskStatus";
import { CommentsSection } from "../components";

const TaskDetails = ({
  allTasksList,
  updateTaskInList,
  commentsList,
  setCommentsList,
}) => {
  const { taskId } = useParams();
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const task = allTasksList.find((t) => t.id.toString() === taskId);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get(
          "https://momentum.redberryinternship.ge/api/statuses"
        );
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  useEffect(() => {
    if (task) {
      setSelectedStatus(task.status.name);
    }
  }, [task]);

  const handleStatusChange = async (event) => {
    const newStatusId = event.target.value;
    const newStatus = statuses.find(
      (status) => status.id.toString() === newStatusId
    );

    if (!newStatus) {
      setError("Status not found");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updateTaskStatus(taskId, newStatusId);
      updateTaskInList(taskId, newStatusId);
      setSelectedStatus(newStatus.name);
    } catch (err) {
      setError("Failed to update status");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return <div className="p-4 text-red-500">Task not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{task.name}</h1>
      <p className="text-gray-600">{task.description}</p>
      <p>{task.priority.name}</p>
      <p>{selectedStatus}</p>
      <p className="flex items-center">
        <img src={task.employee.avatar} alt="Avatar" className="w-[30px]" />
        {task.employee.name} {task.employee.surname} <br />
        {task.employee.department.name}
      </p>
      <p className="text-sm text-gray-500">Due Date: {task.due_date}</p>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Status:
        </label>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="border rounded p-2 w-full"
          disabled={loading}
        >
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
        {loading && <p className="text-blue-500 text-sm mt-2">Updating...</p>}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <CommentsSection
        commentsList={commentsList}
        taskId={taskId}
        setCommentsList={setCommentsList}
      />
    </div>
  );
};

export default TaskDetails;
