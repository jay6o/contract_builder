const newTask = (taskCount, setTaskCount, tasks, setTasks): void => {
	if (tasks[tasks.length - 1] !== "") {
		setTaskCount(++taskCount);
		const newTasks = [...tasks, ""];
		setTasks(newTasks);
	}
}
export default newTask;
