import { useState } from "react";
import { postEmployee } from "../services/post";
import { x, trash } from "../assets";

const AddNewEmployee = ({ departmentList, toggleWindow, setToggleWindow }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    surname: "",
    avatar: null,
    avatarPreview: null,
    department: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "department") {
      const departmentId = departmentList.find(
        (department) => department.name === value
      )?.id;
      setNewEmployee((prev) => ({
        ...prev,
        department_id: departmentId,
      }));
    } else {
      setNewEmployee((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 600 * 1024) {
      alert("File size must be less than 600 KB.");
      return;
    }

    setNewEmployee((prev) => ({
      ...prev,
      avatar: file,
      avatarPreview: URL.createObjectURL(file),
    }));
  };

  const handleRemoveImage = () => {
    setNewEmployee((prev) => ({
      ...prev,
      avatar: null,
      avatarPreview: null,
    }));
  };

  const handleSubmit = () => {
    postEmployee(newEmployee);
    cancel();
  };

  const cancel = () => {
    setNewEmployee({
      name: "",
      surname: "",
      avatar: null,
      avatarPreview: null,
      department: "",
    });
    setToggleWindow(!toggleWindow);
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-[10px] bg-gray-500/30 flex justify-center items-center z-50"
      style={{ display: toggleWindow ? "block" : "none" }}
    >
      <div className="h-[766px] mt-[118px] justify-self-center bg-[#fff] opacity-100 rounded-[10px] py-10 px-[50px] w-[913px] flex flex-col">
        <button
          className="self-end cursor-pointer w-10 h-10"
          onClick={() => setToggleWindow(!toggleWindow)}
        >
          <img src={x} alt="Close Icon" />
        </button>
        <h1 className="self-center font-medium text-[32px] text-[#212529]">
          თანამშრომლის დამატება
        </h1>
        <div className="flex align-center justify-between">
          <label htmlFor="name">
            სახელი*
            <br />
            <input
              className="border-[1px] border-[#CED4DA] mt-[3px] w-[384px] h-[42px] rounded-[6px] p-[10px]"
              type="text"
              id="name"
              onChange={handleInputChange}
              value={newEmployee.name}
            />
          </label>
          <label htmlFor="surname">
            გვარი* <br />
            <input
              className="border-[1px] border-[#CED4DA] mt-[3px] w-[384px] h-[42px] rounded-[6px] p-[10px]"
              type="text"
              id="surname"
              onChange={handleInputChange}
              value={newEmployee.surname}
            />
          </label>
        </div>

        <label htmlFor="avatar" className="block mt-4">
          ავატარი*
        </label>

        <div className="mt-[3px] mb-[45px] relative w-full h-[120px] border-[1px] border-[#CED4DA] rounded-[8px] border-dashed flex items-center justify-center">
          {newEmployee.avatarPreview ? (
            <div className="relative">
              <img
                src={newEmployee.avatarPreview}
                alt="Avatar Preview"
                className="w-[80px] h-[80px] rounded-full object-cover"
              />
              <button
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg"
                onClick={handleRemoveImage}
              >
                <img src={trash} alt="Remove" className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <input
                className="absolute w-full h-full opacity-0 cursor-pointer"
                type="file"
                accept="image/png, image/jpeg"
                id="avatar"
                onChange={handleFileChange}
              />
              <label
                htmlFor="avatar"
                className="absolute text-center text-[#007bff] cursor-pointer w-full h-full flex justify-center items-center"
              >
                Click here to upload
              </label>
            </>
          )}
        </div>

        <label htmlFor="department">
          დეპარტამენტი
          <br />
          <select
            className="border-[1px] border-[#CED4DA] mt-[3px] w-[384px] h-[42px]"
            id="department"
            onChange={handleInputChange}
            value={
              departmentList.find(
                (department) => department.id === newEmployee.department_id
              )?.name || ""
            }
          >
            <option value=""></option>
            {departmentList.map((department) => (
              <option key={department.id + 1}>{department.name}</option>
            ))}
          </select>
        </label>
        <div className="flex self-end mt-[65px] gap-[22px]">
          <button
            onClick={cancel}
            className="w-[102px] h-[42px] text-[16px] font-normal text-[#343A40] border-[1px] border-[#8338EC] rounded-[5px]"
          >
            გაუქმება
          </button>
          <button
            className="w-[263px] h-[42px] text-[18px] font-normal text-[#fff] border-[1px] border-[#8338EC] bg-[#8338EC] rounded-[5px]"
            onClick={handleSubmit}
          >
            დაამატე თანამშრომელი
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewEmployee;
