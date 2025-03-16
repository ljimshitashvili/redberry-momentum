import axios from "axios";
import { token } from "../token";

const getAllTasks = () => {
  const fetchAllTasks = async () => {
    const response = await axios.get(
      "https://momentum.redberryinternship.ge/api/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
  };

  fetchAllTasks();
};

export default getAllTasks;
