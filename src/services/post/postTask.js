import { token } from "../token";
import axios from "axios";
const postTask = () => {
  const createTask = async (data) => {
    try {
      const response = await axios.post(
        "https://momentum.redberryinternship.ge/api/tasks",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error creating task: ",
        error.response ? error.response.data : error.message
      );
      throw error; // rethrow the error to propagate it
    }
  };

  return { createTask };
};
export default postTask;
