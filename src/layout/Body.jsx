//Routes of the website is changed in this component. It contains Routes.

import { useState } from "react";
import { AddNewEmployee, TaskPage } from "../pages";
import { Route, Routes } from "react-router-dom";

const Body = () => {
  const [departmentList, setDepartmentList] = useState([]);

  return (
    <div className="w-full h-full ">
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route
          path="/add-employee"
          element={
            <AddNewEmployee
              departmentList={departmentList}
              setDepartmentList={setDepartmentList}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Body;
