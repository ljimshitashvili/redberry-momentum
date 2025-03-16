import { useEffect, useState } from "react";
import { getDepartments } from "../services/get";

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

  return (
    <div>
      <h1>თანამშრომლის დამატება</h1>
      <label htmlFor="name">
        სახელი
        <input type="text" id="name" />
      </label>
      <label htmlFor="surname">
        გვარი
        <input type="text" id="surname" />
      </label>
      <label htmlFor="avatar">
        ავატარი
        <input type="text" id="avatar" />
      </label>
      <label htmlFor="department">
        დეპარტამენტი
        <select id="department">
          {departmentList.map((department) => (
            <option key={department.id}>{department.name}</option>
          ))}
        </select>
      </label>
      <button onClick={() => getDepartments()}>ADD</button>
    </div>
  );
};

export default AddNewEmployee;
