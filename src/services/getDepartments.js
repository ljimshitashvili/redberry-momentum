import axios from "axios";
import { token } from "./token";

const getDepartments = () => {
  const fetchDepartments = async () => {
    const response = await axios.get(
      "https://momentum.redberryinternship.ge/api/departments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
  };
  fetchDepartments();
};

export default getDepartments;
