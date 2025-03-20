import axios from "axios";
import { token } from "../token";
const API_URL = "https://momentum.redberryinternship.ge/api/tasks";

const addComment = async (taskId, comment) => {
  try {
    const encodedTaskId = encodeURIComponent(taskId);
    const response = await axios.post(
      `${API_URL}/${encodedTaskId}/comments`,
      { text: comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export default addComment;
