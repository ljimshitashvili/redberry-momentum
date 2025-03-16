import axios from "axios";
import { token } from "../token";

const postEmployee = (employeeData) => {
  const addNewEmployee = async () => {
    const response = await axios.post(
      "https://momentum.redberryinternship.ge/api/employees",
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log("Added new employee: ", data);
  };

  addNewEmployee();
};

export default postEmployee;
