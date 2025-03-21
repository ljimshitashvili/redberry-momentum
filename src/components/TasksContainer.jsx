import { format } from "date-fns";
import { ka } from "date-fns/locale";
import { Link } from "react-router-dom";

const TasksContainer = ({ allTasksList, updateTaskInList }) => {
  const groupedTasks = {
    1: { title: "დასაწყები", color: "#F7BC30", tasks: [] },
    2: { title: "პროგრესში", color: "#FB5607", tasks: [] },
    3: { title: "მზად ტესტირებისთვის", color: "#FF006E", tasks: [] },
    4: { title: "დასრულებული", color: "#3A86FF", tasks: [] },
  };

  const departmentShortNames = {
    "ადმინისტრაციის დეპარტამენტი": "ადმ. დეპ.",
    "მარკეტინგის დეპარტამენტი": "მარკ. დეპ.",
    "ტექნიკური დეპარტამენტი": "ტექ. დეპ.",
    "ფინანსთა დეპარტამენტი": "ფინ. დეპ.",
    "მენეჯმენტის დეპარტამენტი": "მენეჯმენტი",
  };

  allTasksList.forEach((task) => {
    if (groupedTasks[task.status.id]) {
      groupedTasks[task.status.id].tasks.push(task);
    }
  });

  const formatDueDate = (date) =>
    format(new Date(date), "dd MMM, yyyy", { locale: ka });

  console.log(groupedTasks);

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
              <div className="flex justify-between align-center mb-7">
                <div
                  className="flex border-[0.5px] rounded-[4px] p-[4px] w-[86px] h-[26px] "
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
                    className="font-semibold flex items-center justify-center gap-[4.5px] text-[12px]"
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
                  <p className="text-gray-600">
                    {departmentShortNames[task.department.name]}
                  </p>
                </div>
                <p className="text-[12px] text-[#212529] font-normal flex items-center">
                  {formatDueDate(task.due_date)}
                </p>
              </div>
              <h2 className="text-md font-semibold mt-1">{task.name}</h2>
              <p className="text-sm text-gray-700">{task.description}</p>
              <div className="flex items-center mt-2">
                <img
                  src={task.employee.avatar}
                  className="w-8 h-8 rounded-full"
                  alt="Avatar"
                />
                <p className="ml-2 text-sm text-gray-600">
                  კომენტარების რაოდენობა
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
