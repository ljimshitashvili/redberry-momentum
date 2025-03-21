import { postTask } from "../services/post";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AddNewTaskSchema from "../validation/scheme";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddNewTask = ({
  departmentList,
  employeeList,
  priorityList,
  statusesList,
}) => {
  const { createTask } = postTask();
  const navigate = useNavigate();

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getSavedFormValues = () => {
    const savedValues = localStorage.getItem("newTaskFormValues");
    return savedValues ? JSON.parse(savedValues) : {};
  };

  const initialValues = {
    name: "",
    description: "",
    due_date: getTomorrowDate(),
    status: "დასაწყები",
    priority: "საშუალო",
    department: "",
    employee: "",
    ...getSavedFormValues(),
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formattedTask = {
      name: values.name,
      description: values.description,
      due_date: values.due_date,
      status_id:
        statusesList.find((status) => status.name === values.status)?.id || "",
      priority_id:
        priorityList.find((priority) => priority.name === values.priority)
          ?.id || "საშუალო",
      department_id:
        departmentList.find((dept) => dept.name === values.department)?.id ||
        "",
      employee_id:
        employeeList.find(
          (employee) =>
            `${employee.name} ${employee.surname}` === values.employee
        )?.id || "",
    };

    const response = await createTask(formattedTask);
    if (response) {
      alert("დავალება წარმატებით დაემატა!");
      resetForm();
      localStorage.removeItem("newTaskFormValues");
      navigate("/");
    }
  };

  const handleChange = (values) => {
    localStorage.setItem("newTaskFormValues", JSON.stringify(values));
  };

  return (
    <div className="">
      <h1 className="mt-[40px] mb-[25px] font-semibold text-[34px] text-[#212529]">
        შექმენი ახალი დავალება
      </h1>
      <div className="border-[0.3px] border-[#DDD2FF] bg-[#FBF9FFA6] pt-[71px] pb-[216px] pr-[368px] pl-[55px]">
        <Formik
          initialValues={initialValues}
          validationSchema={AddNewTaskSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ setFieldValue, values }) => {
            useEffect(() => {
              handleChange(values);
            }, [values]);

            useEffect(() => {
              if (values.department) {
                setFieldValue("employee", "");
              }
            }, [values.department, setFieldValue]);

            return (
              <Form className="flex flex-col">
                <div className="flex justify-between mb-[57px]">
                  <div className="flex flex-col">
                    <label>სათაური*</label>
                    <Field
                      type="text"
                      name="name"
                      className="w-[550px] h-[45px] rounded-[5px] border-[1px] border-[#DEE2E6]"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="department">დეპარტამენტი*</label>
                    <Field
                      as="select"
                      name="department"
                      className="w-[550px] h-[45px] rounded-[5px] border-[1px] border-[#DEE2E6]"
                    >
                      <option value=""></option>
                      {departmentList.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between mb-[55px]">
                  <div className="flex flex-col ">
                    <label htmlFor="description">აღწერა*</label>
                    <Field
                      type="text"
                      name="description"
                      className="w-[550px] h-[133px] rounded-[5px] border-[1px] border-[#DEE2E6]"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  {values.department && (
                    <div className="w-min">
                      <label htmlFor="employee">
                        პასუხისმგებელი თანამშრომელი*
                      </label>
                      <Field
                        as="select"
                        name="employee"
                        className="w-[550px] h-[45px] rounded-[5px] border-[1px] border-[#DEE2E6]"
                      >
                        <option value=""></option>
                        {employeeList
                          .filter(
                            (staff) =>
                              staff.department.name === values.department
                          )
                          .map((staff) => (
                            <option
                              key={staff.id}
                              value={`${staff.name} ${staff.surname}`}
                            >
                              {staff.name} {staff.surname}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name="employee"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between gap-[161px]">
                  <div className="w-[550px] flex justify-between mb-[55px] gap-[55px]">
                    <div>
                      <label htmlFor="priority">პრიორიტეტი*</label>
                      <Field
                        as="select"
                        name="priority"
                        className="w-[259px] h-[45px] rounded-[5px] border-[1px] border-[#DEE2E6]"
                      >
                        {priorityList.map((priority) => (
                          <option key={priority.id} value={priority.name}>
                            {priority.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="priority"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="status">სტატუსი*</label>
                      <Field
                        as="select"
                        name="status"
                        className="w-[259px] h-[45px] rounded-[5px] border-[1px] border-[#DEE2E6]"
                      >
                        {statusesList.map((status) => (
                          <option key={status.id} value={status.name}>
                            {status.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="due_date">დედლაინი</label>
                    <Field
                      type="date"
                      name="due_date"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-[320px] h-[45px] rounded-[5px] border-[1px] border-[#DEE2E6]"
                    />
                    <ErrorMessage
                      name="due_date"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-[145px] bg-[#8338EC] rounded-[5px] w-[208px] h-[42px] text-[#fff] text-[18px] font-normal self-end"
                >
                  დავალების შექმნა
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewTask;
