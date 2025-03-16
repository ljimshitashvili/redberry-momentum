import axios from "axios";
import { token } from "../token";

const postEmployee = (employeeData) => {
  const addNewEmployee = async () => {
    const formData = new FormData();
    formData.append("name", employeeData.name);
    formData.append("surname", employeeData.surname);
    formData.append("avatar", employeeData.avatar);
    formData.append("department_id", employeeData.department_id);
    try {
      const response = await axios.post(
        "https://momentum.redberryinternship.ge/api/employees",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      const formattedResponse = {
        name: data.name,
        surname: data.surname,
        avatar: data.avatar,
        department_id: employeeData.department_id,
      };
      console.log("Added new employee: ", formattedResponse);
    } catch (error) {
      console.error("Error adding employee:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  addNewEmployee();
};

export default postEmployee;
