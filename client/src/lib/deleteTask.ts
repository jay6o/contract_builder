const deleteTask = (e, taskCount, setTaskCount, tasks, setTasks) => {
	e.preventDefault();
	if (taskCount > 1) {
		setTaskCount(--taskCount);
		const newTasks = [...tasks];
		newTasks.pop();
		setTasks(newTasks);
	}
}
export default deleteTask;
