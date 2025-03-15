import React from "react";

const deleteTask = (e: React.MouseEvent<HTMLButtonElement>, taskCount: number, setTaskCount: React.Dispatch<React.SetStateAction<number>>, tasks: string[], setTasks: React.Dispatch<React.SetStateAction<string[]>>) => {
	e.preventDefault();
	if (taskCount > 1) {
		setTaskCount(--taskCount);
		const newTasks = [...tasks];
		newTasks.pop();
		setTasks(newTasks);
	}
}
export default deleteTask;
