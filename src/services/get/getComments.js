import axios from "axios";
import { token } from "../token";

const getComments = async () => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/tasks/{task}/comments",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
};

export default getComments;
