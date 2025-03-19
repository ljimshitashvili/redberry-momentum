import { format } from "date-fns";
import { ka } from "date-fns/locale";

const TasksContainer = ({ allTasksList }) => {
  const toStartTasks = allTasksList.filter((task) => task.status.id == "1");
  const inProgressTasks = allTasksList.filter((task) => task.status.id == "2");
  const readyForTestTasks = allTasksList.filter(
    (task) => task.status.id == "3"
  );
  const completedTasks = allTasksList.filter((task) => task.status.id == "4");

  const formatDueDate = (date) => {
    return format(new Date(date), "dd MMMM, yyyy", { locale: ka });
  };

  console.log(allTasksList.priority);
  return (
    <div className="flex">
      <div name="to-start" className="">
        <h1 className="">დასაწყები</h1>
        {toStartTasks.map((task) => (
          <div key={task.id} className="border-[1px] border-black">
            <div className="flex">
              <div className="flex">
                <p>{task.priority.name}</p>
                <p>{task.department.name}</p>
              </div>
              <p>{formatDueDate(task.due_date)}</p>
            </div>
            <h2>{task.name}</h2>
            <h3>{task.description}</h3>
            <div>
              <img
                src={task.employee.avatar}
                className="w-[30px]"
                alt="Avatar"
              />
              <p>კომენტარების რაოდენობა</p>
            </div>
          </div>
        ))}
      </div>
      <div name="in-progress" className="">
        <h1>პროგრესში</h1>
        {inProgressTasks.map((task) => (
          <div key={task.id} className="border-[1px] border-black">
            <div className="flex">
              <div className="flex">
                <p>{task.priority.name}</p>
                <p>{task.department.name}</p>
              </div>
              <p>{formatDueDate(task.due_date)}</p>
            </div>
            <h2>{task.name}</h2>
            <h3>{task.description}</h3>
            <div>
              <img
                src={task.employee.avatar}
                className="w-[30px]"
                alt="Avatar"
              />
              <p>კომენტარების რაოდენობა</p>
            </div>
          </div>
        ))}
      </div>
      <div name="ready-for-test" className="">
        <h1>მზად ტესტირებისთვის</h1>
        {readyForTestTasks.map((task) => (
          <div key={task.id} className="border-[1px] border-black">
            <div className="flex">
              <div className="flex">
                <p>{task.priority.name}</p>
                <p>{task.department.name}</p>
              </div>
              <p>{formatDueDate(task.due_date)}</p>
            </div>
            <h2>{task.name}</h2>
            <h3>{task.description}</h3>
            <div>
              <img
                src={task.employee.avatar}
                className="w-[30px]"
                alt="Avatar"
              />
              <p>კომენტარების რაოდენობა</p>
            </div>
          </div>
        ))}
      </div>
      <div name="completed" className="">
        <h1>დასრულებული</h1>
        {completedTasks.map((task) => (
          <div key={task.id} className="border-[1px] border-black">
            <div className="flex">
              <div className="flex">
                <p>{task.priority.name}</p>
                <p>{task.department.name}</p>
              </div>
              <p>{formatDueDate(task.due_date)}</p>
            </div>
            <h2>{task.name}</h2>
            <h3>{task.description}</h3>
            <div>
              <img
                src={task.employee.avatar}
                className="w-[30px]"
                alt="Avatar"
              />
              <p>კომენტარების რაოდენობა</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TasksContainer;
