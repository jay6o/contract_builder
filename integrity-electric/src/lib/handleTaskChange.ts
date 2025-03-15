const handleTaskChange = (index,e, tasks, setTasks) => {
        const newTasks = [...tasks];
        newTasks[index] = e.target.value;
        setTasks(newTasks);
}
export default handleTaskChange;
