const Employees = ({ employeeList }) => {
  return (
    <>
      {employeeList.map((employee) => (
        <div key={employee.id}>
          {employee.name} {employee.surname}
        </div>
      ))}
    </>
  );
};

export default Employees;
