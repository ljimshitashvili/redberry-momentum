import { token } from "../token";
import axios from "axios";

const getPriorities = async (setPriorities) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/priorities",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
  setPriorities(data);
};

export default getPriorities;
