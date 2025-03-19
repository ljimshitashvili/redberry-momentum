import axios from "axios";
import { token } from "../token";

const getStatuses = async (param) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/statuses",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
  param(data);
};

export default getStatuses;
