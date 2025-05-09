const newTask = (taskCount: number, setTaskCount: React.Dispatch<React.SetStateAction<number>>, tasks: string[], setTasks:React.Dispatch<React.SetStateAction<string[]>>): void => {
	if (tasks[tasks.length - 1] !== "") {
		setTaskCount(++taskCount);
		const newTasks = [...tasks, ""];
		setTasks(newTasks);
	}
}
export default newTask;
