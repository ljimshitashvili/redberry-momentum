import axios from "axios";
import { token } from "./token";

const getTask = () => {
  const fetchTask = async () => {
    const response = await axios.get(
      "https://momentum.redberryinternship.ge/api/tasks/{task}",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    console.log(data);
  };

  fetchTask();
};

export default getTask;
