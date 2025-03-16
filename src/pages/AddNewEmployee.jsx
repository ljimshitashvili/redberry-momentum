import { useEffect, useState } from "react";
import { getDepartments } from "../services/get";
import { postEmployee } from "../services/post";

const AddNewEmployee = ({ departmentList, setDepartmentList }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    surname: "",
    avatar: null,
    department: "",
  });

  useEffect(() => {
    getDepartments(setDepartmentList);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "department") {
      const departmentId = departmentList.find(
        (department) => department.name === value
      )?.id;
      setNewEmployee((prev) => ({
        ...prev,
        department_id: departmentId,
      }));
    } else {
      setNewEmployee((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if the file size is greater than 600 KB
    if (file && file.size > 600 * 1024) {
      alert("File size must be less than 600 KB.");
      return;
    }

    setNewEmployee((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSubmit = () => {
    postEmployee(newEmployee);
  };

  return (
    <div>
      <h1>თანამშრომლის დამატება</h1>
      <label htmlFor="name">
        სახელი
        <input
          className="border-[1px]"
          type="text"
          id="name"
          onChange={handleInputChange}
          value={newEmployee.name}
        />
      </label>
      <label htmlFor="surname">
        გვარი
        <input
          className="border-[1px]"
          type="text"
          id="surname"
          onChange={handleInputChange}
          value={newEmployee.surname}
        />
      </label>
      <label htmlFor="avatar">
        ავატარი
        <input
          className="border-[1px]"
          type="file"
          accept="image/png, image/jpeg"
          id="avatar"
          onChange={handleFileChange}
        />
      </label>
      <label htmlFor="department">
        დეპარტამენტი
        <select
          className="border-[1px]"
          id="department"
          onChange={handleInputChange}
          value={
            departmentList.find(
              (department) => department.id === newEmployee.department_id
            )?.name || ""
          }
        >
          {departmentList.map((department) => (
            <option key={department.id + 1}>{department.name}</option>
          ))}
        </select>
      </label>
      <button onClick={handleSubmit}>ADD</button>
    </div>
  );
};

export default AddNewEmployee;
