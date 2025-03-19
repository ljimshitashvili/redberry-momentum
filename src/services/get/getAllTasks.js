import axios from "axios";
import { token } from "../token";

const getAllTasks = async (param) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/tasks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = response.data;
  param(data);
};

export default getAllTasks;
