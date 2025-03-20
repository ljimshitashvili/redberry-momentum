import { token } from "../token";
import axios from "axios";
const getComments = async (taskId) => {
  try {
    const response = await axios.get(
      `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Fetched comments:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export default getComments;
