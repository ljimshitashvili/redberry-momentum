import { token } from "../token";
import axios from "axios";

const getPriorities = () => {
  const fetchPriorities = async () => {
    const response = await axios.get(
      "https://momentum.redberryinternship.ge/api/priorities",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
  };
  fetchPriorities();
};

export default getPriorities;
