'use client';

import Image from "next/image";
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";
import {useState} from "react";

import newTask from "../lib/newTask";
import deleteTask from "../lib/deleteTask";
import handleCostChange from "../lib/handleCostChange";
import handleTaskChange from "../lib/handleTaskChange";
import handleFormSubmit from "../lib/handleFormSubmit";

export default function Home() {
  const [taskCount, setTaskCount] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [cost, setCost] = useState<number|string>("");
  const [client, setClient] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([""]);

  return (
	  <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-[#e4e4e7]">
	  <h1 className="text-4xl font-bold m-2">New Contract</h1>
	  <span className="text-2xl m-2">Integrity Electric</span>
		<form className="lg:w-1/3 pt-4">
			<div className="row-1 flex justify-around">
				<Input required type="text" placeholder="MM/DD/YYYY" className="m-2 lg:mx-8" value={date} onChange={(e) => setDate(e.target.value)}/>
				<Input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Job Location (1234 Some St., Arlington VA)" className="m-2 lg:mx-8" />
			</div>

			<div className="row-2 flex justify-around">
				<Input required type="text" placeholder="Cost ($)" className="m-2 lg:mx-8" value={cost} onChange={(e) => handleCostChange(e, setCost)}/>
				<Input type="text" value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client" className="m-2 lg:mx-8" />
			</div>
			

			<div className="tasks flex flex-col justify-around m-2 lg:mx-8">
			  {tasks.map((task, index) => (
			    <Input
			      required
			      key={`input-${index}`}
			      type="text"
			      placeholder={`Job Task ${index + 1}`}
			      value={task}
			      onChange={(e) => handleTaskChange(index, e, tasks, setTasks)}
			      className="mb-2"
			    />
			  ))}
			</div>

			<Button className="new-task-button h-12 m-2 lg:m-8" onClick={() => newTask(taskCount, setTaskCount, tasks, setTasks)}>New Task</Button>
			{taskCount > 1 && (
				<Button className="h-12" onClick={(e) => deleteTask(e, taskCount, setTaskCount, tasks, setTasks)}>Delete Task</Button>
			)}
			<br/>
			<Button type="submit" onClick={(e) => handleFormSubmit(e, date, location, cost, client, tasks)} className="m-2 lg:mx-8 h-12 w-full text-xl font-bold">Create Contract</Button>
		</form>
	  </div>
  );
}
