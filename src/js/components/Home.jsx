import React, {useEffect, useState} from "react";

//create your first component
const Home = () => {
	const apiUrl = "https://playground.4geeks.com/todo"
	const userName = "Gvergara"
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState ("");

	function createUser(){
		fetch(`${apiUrl}/users/${userName}`, {method: "POST"})
		.then(response => {
			if(!response.ok){
				throw new Error("error creando el usuario");
			}
			return response.json()
		})
		.then(data => console.log(data))
		.catch(error => console.error(error))
	}


	function getTodos(){
		fetch(`${apiUrl}/users/${userName}`)
		.then(response => {
			if(!response.ok){
				if(response.status == 404){
					createUser()
				}
				throw new Error("no se pudo obtener la lista de tareas");
			}
			return response.json()
		})
		.then(data => {
			if(data){
				console.log(data)
				
				setTasks(data.todos)
			}
		})
		.catch(error => console.error(error))

	}
	function addTodo(task){
		fetch(`${apiUrl}/todos/${userName}`, {method: "POST", headers: {"Content-type": "application/json" },
			body: JSON.stringify({label: task, done: false})
		})
		.then(() => getTodos())
		.catch((error) => console.error(error));
	}

	function deleteTodo(index){
		fetch(`${apiUrl}/todos/${index}`, {method: "DELETE", })
		.then(() => getTodos())
		.catch((error) => console.error(error))
	}
	
	function handleKeyPress(event){
		
		if (event.key == "Enter" && newTask !== ""){
			addTodo(newTask)
			setTasks([])
		} 
	}
	function deleteTask(index){
		deleteTodo(index);
	}

	useEffect(()=>{
		getTodos()
	},[])
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
						<span className="text">{task.label}</span>
						<button
							className="delete-button"
							onClick={() => deleteTask(task.id)}
						>X</button>
					</li>

				)}
			</ol>
			<div className="tasks-p">
			<p>{tasks.length} Pending Tasks</p>
			</div>

		</div>
	);
};

export default Home;