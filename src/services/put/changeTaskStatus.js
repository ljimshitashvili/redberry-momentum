import axios from "axios";
import { token } from "../token";

const updateTaskStatus = async (taskId, newStatusId) => {
  try {
    const response = await axios.put(
      `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
      { status_id: newStatusId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export default updateTaskStatus;
