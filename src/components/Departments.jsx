const Departments = ({ departmentList }) => {
  return (
    <>
      {departmentList.map((department) => (
        <div key={department.id}>{department.name}</div>
      ))}
    </>
  );
};

export default Departments;
