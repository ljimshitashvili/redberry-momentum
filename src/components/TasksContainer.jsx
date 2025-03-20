import { format } from "date-fns";
import { ka } from "date-fns/locale";
import { Link } from "react-router-dom";

const TasksContainer = ({ allTasksList, updateTaskInList }) => {
  const groupedTasks = {
    1: { title: "დასაწყები", tasks: [] },
    2: { title: "პროგრესში", tasks: [] },
    3: { title: "მზად ტესტირებისთვის", tasks: [] },
    4: { title: "დასრულებული", tasks: [] },
  };

  allTasksList.forEach((task) => {
    if (groupedTasks[task.status.id]) {
      groupedTasks[task.status.id].tasks.push(task);
    }
  });

  const formatDueDate = (date) =>
    format(new Date(date), "dd MMMM, yyyy", { locale: ka });

  return (
    <div className="flex">
      {Object.entries(groupedTasks).map(([statusId, { title, tasks }]) => (
        <div key={statusId} className="p-4 border-r border-gray-300 w-1/4">
          <h1 className="text-lg font-bold mb-2">{title}</h1>
          {tasks.map((task) => (
            <Link
              to={`/task/${task.id}`}
              key={task.id}
              className="block border p-2 mb-2 bg-white shadow-sm rounded-lg"
            >
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <p className="font-semibold">{task.priority.name}</p>
                  <p className="text-gray-600">{task.department.name}</p>
                </div>
                <p className="text-sm text-gray-500">
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
