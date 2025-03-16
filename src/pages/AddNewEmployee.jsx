const AddNewEmployee = () => {
  return (
    <div>
      <h1>თანამშრომლის დამატება</h1>
      <label htmlFor="name">
        სახელი
        <input type="text" id="name" />
      </label>
      <label htmlFor="surname">
        გვარი
        <input type="text" id="surname" />
      </label>
      <label htmlFor="avatar">
        ავატარი
        <input type="text" id="avatar" />
      </label>
      <label htmlFor="department">
        დეპარტამენტი
        <input type="text" id="department" />
      </label>
    </div>
  );
};

export default AddNewEmployee;
