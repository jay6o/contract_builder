const newTask = (taskCount, setTaskCount, tasks, setTasks): void => {
	setTaskCount(++taskCount);
	const newTasks = [...tasks, ""];
	setTasks(newTasks);
}
export default newTask;
