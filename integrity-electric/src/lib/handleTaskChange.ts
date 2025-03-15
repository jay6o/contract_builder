const handleTaskChange = (index: number, e: React.ChangeEvent<HTMLInputElement>, tasks: string[], setTasks: React.Dispatch<React.SetStateAction<string[]>>) => {
        const newTasks = [...tasks];
        newTasks[index] = e.target.value;
        setTasks(newTasks);
}
export default handleTaskChange;
