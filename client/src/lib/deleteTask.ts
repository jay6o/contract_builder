const deleteTask = (taskCount, setTaskCount, tasks, setTasks) => {
	setTaskCount(--taskCount);
	const newTasks = [...tasks];
	newTasks.pop();
	setTasks(newTasks);
}
export default deleteTask;
