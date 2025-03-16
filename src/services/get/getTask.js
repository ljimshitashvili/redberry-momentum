import axios from "axios";
import { token } from "../token";

const getTask = async () => {
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

export default getTask;
