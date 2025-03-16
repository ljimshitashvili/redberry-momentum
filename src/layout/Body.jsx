//Routes of the website is changed in this component. It contains Routes.

import { AddNewEmployee, TaskPage } from "../pages";
import { Route, Routes } from "react-router-dom";

const Body = () => {
  return (
    <div className="w-full h-full ">
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/add-employee" element={<AddNewEmployee />} />
      </Routes>
    </div>
  );
};

export default Body;
