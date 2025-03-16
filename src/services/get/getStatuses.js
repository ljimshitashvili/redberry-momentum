import axios from "axios";
import { token } from "../token";

const getStatuses = async () => {
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

export default getStatuses;
