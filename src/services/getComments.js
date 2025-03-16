import axios from "axios";
import { token } from "./token";

const getComments = () => {
  const fetchComments = async () => {
    const response = await axios.get(
      "https://momentum.redberryinternship.ge/api/tasks/{task}/comments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log(data);
  };
  fetchComments();
};

export default getComments;
