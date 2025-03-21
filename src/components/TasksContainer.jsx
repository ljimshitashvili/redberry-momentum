import { format } from "date-fns";
import { ka } from "date-fns/locale";
import { Link } from "react-router-dom";
import { comment } from "../assets";

const TasksContainer = ({ allTasksList, commentsList }) => {
  const groupedTasks = {
    1: { title: "დასაწყები", color: "#F7BC30", tasks: [] },
    2: { title: "პროგრესში", color: "#FB5607", tasks: [] },
    3: { title: "მზად ტესტირებისთვის", color: "#FF006E", tasks: [] },
    4: { title: "დასრულებული", color: "#3A86FF", tasks: [] },
  };

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

  allTasksList.forEach((task) => {
    if (groupedTasks[task.status.id]) {
      groupedTasks[task.status.id].tasks.push(task);
    }
  });

  const formatDueDate = (date) =>
    format(new Date(date), "dd MMM, yyyy", { locale: ka });

  const taskComments = commentsList.filter(
    (comment) => comment.taskId === task.id
  );

  return (
    <div className="flex gap-[52px] mt-[79px]">
      {Object.entries(groupedTasks).map(([statusId, { title, tasks }]) => (
        <div key={statusId} className=" w-1/4">
          <h1
            style={{ backgroundColor: groupedTasks[statusId].color }}
            className={`text-[20px] font-medium w-[381] h-[54px] rounded-[10px] flex items-center justify-center  text-[#fff] mb-[30px]`}
          >
            {title}
          </h1>
          {tasks.map((task) => (
            <Link
              to={`/task/${task.id}`}
              key={task.id}
              style={{ borderColor: groupedTasks[statusId].color }}
              className="block border-[1px] rounded-[15px] mb-[30px] p-[20px]"
            >
              <div className="flex justify-between items-center mb-7">
                <div
                  className="flex items-center gap-[10px]"
                  style={{
                    borderColor:
                      task.priority.name === "დაბალი"
                        ? "#08A508"
                        : task.priority.name === "საშუალო"
                        ? "#FFBE0B"
                        : task.priority.name === "მაღალი"
                        ? "#FA4D4D"
                        : "#fff",
                  }}
                >
                  <p
                    className="font-semibold flex items-center justify-center gap-[4.5px] text-[12px]
                    border-[0.5px] rounded-[4px] p-[4px] w-[86px] h-[26px]"
                    style={{
                      color:
                        task.priority.name === "დაბალი"
                          ? "#08A508"
                          : task.priority.name === "საშუალო"
                          ? "#FFBE0B"
                          : task.priority.name === "მაღალი"
                          ? "#FA4D4D"
                          : "#fff",
                    }}
                  >
                    <img
                      src={task.priority.icon}
                      alt="Priority Icon"
                      className="w-[12px]"
                    />
                    {task.priority.name}
                  </p>
                  <p
                    className="w-[88px] h-[24px] rounded-[15px] text-[12px] text-[#fff] flex items-center justify-center"
                    style={{
                      backgroundColor:
                        departmentShortNames[task.department.name]?.color,
                    }}
                  >
                    {departmentShortNames[task.department.name]?.shortName}
                  </p>
                </div>
                <p className="text-[12px] text-[#212529] font-normal flex items-center">
                  {formatDueDate(task.due_date)}
                </p>
              </div>
              <h2 className="text-[15px] text-[#212529] font-medium h-[18px] mb-[12px]">
                {task.name}
              </h2>
              <p className="text-[14px] text-[#343A40] font-normal max-w-[320px] overflow-wrap break-words mb-[28px]">
                {task.description
                  ? task.description.length > 100
                    ? `${task.description.slice(0, 100)}...`
                    : task.description
                  : ""}
              </p>
              <div className="flex items-center justify-between w-full mt-2">
                <img
                  src={task.employee.avatar}
                  className="w-[31px] h-[31px] rounded-full"
                  alt="Avatar"
                />
                <p className="flex w-[34px] h-[22px] items-center justify-between font-normal text-[14px] text-[#212529]">
                  <img src={comment} alt="Comment Icon" />
                  {taskComments.length}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TasksContainer;
