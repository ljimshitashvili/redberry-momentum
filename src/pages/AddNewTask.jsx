import { useState } from "react";
import { postTask } from "../services/post";

const AddNewTask = ({
  departmentList,
  employeeList,
  priorityList,
  statusesList,
  allTasksList,
}) => {
  const { createTask } = postTask();

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    due_date: getTomorrowDate(),
    status: { id: "", name: "" },
    priority: { id: "", name: "" },
    department: { id: "", name: "" },
    employee: { id: "", name: "", surname: "", avatar: "", department_id: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prevTask) => {
      if (["status", "priority", "department", "employee"].includes(name)) {
        const selectedOption =
          name === "status"
            ? statusesList.find((item) => item.name === value)
            : name === "priority"
            ? priorityList.find((item) => item.name === value)
            : name === "department"
            ? departmentList.find((item) => item.name === value)
            : employeeList.find(
                (item) => `${item.name} ${item.surname}` === value
              );

        return {
          ...prevTask,
          [name]: { id: selectedOption?.id || "", name: value },
        };
      }
      return { ...prevTask, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!newTask.name || !newTask.description || !newTask.status.id) {
      alert("გთხოვთ, შეავსოთ ყველა აუცილებელი ველი!");
      return;
    }

    // Construct correct API payload
    const formattedTask = {
      name: newTask.name,
      description: newTask.description,
      due_date: newTask.due_date,
      status_id: newTask.status.id, // Send only the ID
      priority_id: newTask.priority.id, // Send only the ID
      department_id: newTask.department.id, // Send only the ID
      employee_id: newTask.employee.id, // Send only the ID
    };

    const response = await createTask(formattedTask);
    if (response) {
      alert("დავალება წარმატებით დაემატა!");
      setNewTask({
        name: "",
        description: "",
        due_date: getTomorrowDate(),
        status: { id: "", name: "" },
        priority: { id: "", name: "" },
        department: { id: "", name: "" },
        employee: {
          id: "",
          name: "",
          surname: "",
          avatar: "",
          department_id: "",
        },
      });
    }
  };

  return (
    <div>
      <h1>შექმენი ახალი დავალება</h1>
      <div className="bg-[#DDD2FF] p-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">სათაური*</label>
          <input
            type="text"
            name="name"
            value={newTask.name}
            onChange={handleChange}
            className="border border-black w-full"
          />

          <label htmlFor="description">აღწერა*</label>
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
            className="border border-black w-full"
          />

          <label htmlFor="department">დეპარტამენტი*</label>
          <select
            name="department"
            value={newTask.department.name}
            onChange={handleChange}
            className="border border-black w-full"
          >
            {departmentList.map((dept) => (
              <option key={dept.id}>{dept.name}</option>
            ))}
          </select>

          <label htmlFor="employee">პასუხისმგებელი თანამშრომელი*</label>
          <select
            name="employee"
            value={`${newTask.employee.name} ${newTask.employee.surname}`}
            onChange={handleChange}
            className="border border-black w-full"
          >
            {employeeList.map((staff) => (
              <option key={staff.id}>
                {staff.name} {staff.surname}
              </option>
            ))}
          </select>

          <label htmlFor="priority">პრიორიტეტი*</label>
          <select
            name="priority"
            value={newTask.priority.name}
            onChange={handleChange}
            className="border border-black w-full"
          >
            {priorityList.map((priority) => (
              <option key={priority.id}>{priority.name}</option>
            ))}
          </select>

          <label htmlFor="status">სტატუსი*</label>
          <select
            name="status"
            value={newTask.status.name}
            onChange={handleChange}
            className="border border-black w-full"
          >
            {statusesList.map((status) => (
              <option key={status.id}>{status.name}</option>
            ))}
          </select>

          <label htmlFor="due_date">დედლაინი</label>
          <input
            type="date"
            name="due_date"
            value={newTask.due_date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            className="border border-black w-full"
          />

          <button type="submit" className="bg-[#8338EC] text-white mt-4 p-2">
            დავალების შექმნა
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
