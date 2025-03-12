import React, {useState} from "react";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState(["Make the bed", "Whas my hands", "Eat", "Walk the dog"]);
	const [newTask, setNewTask] = useState ("");

	function handleKeyPress(event){
		
		if (event.key == "Enter" && newTask != ""){
			setTasks([...tasks, newTask])
		} 
	}
	function deleteTask(index){
		const updateTasks = tasks.filter((_, i) => i !== index);
		setTasks(updateTasks);
	}

	return (
		<div className="to-do-list">
			<h1>To-Do-List</h1>

			<div>
				<input
				value={newTask}
				type="text" 
				placeholder="Enter a task..."
				onKeyDown={handleKeyPress}
				onChange={(e)=> setNewTask(e.target.value)}
				/>
			</div>

			<ol>
				{tasks.map((task, index) =>
					<li key={index} className="task-hidden">
						<span className="text">{task}</span>
						<button
							className="delete-button"
							onClick={() => deleteTask(index)}
						>X</button>
					</li>

				)}
			</ol>
			<div className="tasks-p">
				{tasks.length}
				<p>Pending Tasks</p>
			</div>

		</div>
	);
};

export default Home;