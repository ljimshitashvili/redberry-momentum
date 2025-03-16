import axios from "axios";
import { token } from "../token";

const getEmployees = async (setEmployees) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/employees",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
  setEmployees(data);
};

export default getEmployees;
