import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import updateTaskStatus from "../services/put/changeTaskStatus";
import { CommentsSection } from "../components";
import { due, status, user } from "../assets";

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

  const formatDateInGeorgian = (dateString) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ka-GE", options).format(date);
  };

  if (!task) {
    return <div className="p-4 text-red-500">Task not found.</div>;
  }

  const departmentShortNames = {
    "ადმინისტრაციის დეპარტამენტი": { shortName: "ადმ. დეპ.", color: "#F7BC30" },
    "ადამიანური რესურსების დეპარტამენტი": {
      shortName: "რეს. დეპ.",
      color: "#FF66A8",
    },
    "გაყიდვები და მარკეტინგის დეპარტამენტი": {
      shortName: "გაყიდვები",
      color: "#FFD86D",
    },
    "ფინანსების დეპარტამენტი": { shortName: "ფინანსები.", color: "#FD9A6A" },
    "ლოჯისტიკის დეპარტამენტი": { shortName: "ლოჯისტიკა", color: "#89B6FF" },
    "ტექნოლოგიების დეპარტამენტი": { shortName: "ტექ. დეპ", color: "#FFBE0B" },
    "მედიის დეპარტამენტი": { shortName: "მედია", color: "#FA4D4D" },
  };

  return (
    <div className="p-6 flex justify-between">
      <div className="">
        <div className="flex items-center gap-[18px] mb-[12px]">
          <p
            className="w-[106px] h-[32px] rounded-[3px] border-[1px] flex items-center justify-center"
            style={{ borderColor: task.priority.color }}
          >
            {task.priority.name}
          </p>
          <p
            className="w-[88px] h-[29px] rounded-[15px] flex items-center justify-center"
            style={{
              backgroundColor: departmentShortNames[task.department.name].color,
              color: "#fff",
            }}
          >
            {departmentShortNames[task.department.name].shortName}
          </p>
        </div>

        <h1 className="font-semibold text-[34px] text-[#212529] mb-[36px]">
          {task.name}
        </h1>
        <p className="font-normal text-[18px] text-[#212529] mb-[63px]">
          {task.description}
        </p>
        <p className="font-medium text-[24px] text-[#2A2A2A] mb-7">
          დავალების დეტალები
        </p>

        <div className="flex justify-between items-center w-[493px] mb-[42px]">
          <label className=" text-sm font-medium text-gray-700 flex gap-2 items-center">
            <img src={status} alt="Status Icon" />
            <p> სტატუსი</p>{" "}
          </label>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border rounded-[5px] p-2 w-[259px]"
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
        <p className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 self-start">
            <img src={user} alt="Employee Icon" />
            <p>თანამშრომელი</p>
          </div>
          <div className="flex items-center gap-[12px] mb-[38px]">
            <img
              src={task.employee.avatar}
              alt="Avatar"
              className="w-[32px] h-[32px]"
            />
            <div className="font-normal text-[14px] text-[#0D0F10]">
              <p className="font-light text-[11px] text-[#474747] mb-[-20px]">
                {task.employee.department.name}
              </p>{" "}
              <br />
              {task.employee.name} {task.employee.surname} <br />
            </div>
          </div>
        </p>
        <p className="text-sm text-gray-500 flex items-center justify-between">
          <img src={due} alt="" />{" "}
          <span className="font-normal text-[14px] text-[#0D0F10]">
            {formatDateInGeorgian(task.due_date)}
          </span>
        </p>
        <div className="mt-4"></div>
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
