import axios from "axios";
import { token } from "./token";

const getStatuses = async () => {
  const fetchStatuses = async () => {
    const response = await axios.get(
      "https://momentum.redberryinternship.ge/api/statuses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
  };
  fetchStatuses();
};

export default getStatuses;
