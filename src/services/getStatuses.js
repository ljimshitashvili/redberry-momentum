import axios from "axios";

const getStatuses = async () => {
  const token = import.meta.env.VITE_API_TOKEN;
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
    console.log(data);
  };
  fetchStatuses();
};

export default getStatuses;
