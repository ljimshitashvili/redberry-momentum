const Priorities = ({ priorityList }) => {
  return (
    <>
      {priorityList.map((priority) => (
        <div key={priorityList.id}>{priority.name}</div>
      ))}
    </>
  );
};

export default Priorities;
