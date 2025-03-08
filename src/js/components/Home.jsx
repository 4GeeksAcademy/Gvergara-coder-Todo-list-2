import React, {useState} from "react";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState(["Make the bed", "Whas my hands", "Eat", "Walk the dog"]);
	/*const [newTask, setNewTask] = useState ("");*/

	function handleKeyPress(event){
		
		if (event.key == "Enter" && event.target.value != ""){
			setTasks([...tasks, event.target.value])
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
				<input type="text" 
				placeholder="Enter a task..."
				onKeyDown={handleKeyPress}
				/>
			</div>

			<ol>
				{tasks.map((task, index) =>
					<li key={index}>
						<span className="text">{task}</span>
						<button
							className="delete-button"
							onClick={() => deleteTask(index)}
						>X</button>


					</li>

				)}
			</ol>

		</div>
	);
};

export default Home;