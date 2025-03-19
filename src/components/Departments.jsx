const Departments = ({ departmentList }) => {
  return (
    <select>
      {departmentList.map((department) => (
        <option key={department.id}>{department.name}</option>
      ))}
    </select>
  );
};

export default Departments;
