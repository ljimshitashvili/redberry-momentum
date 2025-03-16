import axios from "axios";
import { token } from "../token";

const getDepartments = async (setDepartmentsList) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/departments",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
  setDepartmentsList(data);
};

export default getDepartments;
