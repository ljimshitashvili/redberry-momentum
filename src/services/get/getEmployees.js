import axios from "axios";
import { token } from "../token";

const getEmployees = () => {
  const fetchEmployees = async () => {
    const response = await axios.get(
      "https://momentum.redberryinternship.ge/api/employees",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
  };
  fetchEmployees();
};

export default getEmployees;
