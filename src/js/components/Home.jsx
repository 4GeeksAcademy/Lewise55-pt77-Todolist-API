// The tasks are added when the user presses enter on the keyboard, or you can have your own button.
// The delete icon shows only when the task is hovered.
// The user can add as many tasks as they want.
// When there are no tasks the list should say "No tasks, add a task"
// There is no way to update a task, the user will have to delete and create again.

import React, {useState, useEffect} from "react";

//view list of todos
//allow for items on the list to be added and removed 
//save and access todos to an API
//update (done) put request to false


const Home = () => {
	const [toDoList, setToDoList] = useState([]);
	const [task, setTask] = useState("");	

	useEffect(() => {
		getUser();
	}, []);

	// Adds item to list
	const addToList = async (e) => {
        e.preventDefault();
		let response = await fetch("https://playground.4geeks.com/todo/todos/Lewise55", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ 
				label: task,
				is_done: false
			})
		})
        if (task.trim() !== "") {
            // setToDoList([...toDoList, toDo]);
			let data = await response.json()
            setTask("")
			getUser()
        }

		
		
    };
	
	// update the toDoList with the api todos[]
	const crossOut = async (toDo) => {
			let id = toDo.id;
			let response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ 
					label: toDo.label,
					is_done: !toDo.is_done
				})			
			});
			let data = await response.json();
			getUser()
		};
	
	// Removes item from list
	const removeToDo = async (id) => {
		let response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
			method: "DELETE",
			headers: { "Content-type": "application/json" }
		})
		let data = await response.json()
		getUser()

	};
	

	const getUser = async() => {
		let response = await fetch("https://playground.4geeks.com/todo/users/Lewise55")
		let data = await response.json()
		if(typeof data.name != 'undefined'){
			setToDoList(data.todos);	
		}
		else if(typeof data.detail != 'undefined'){
			let response = await fetch("https://playground.4geeks.com/todo/users/Lewise55",{
				method: "POST",
    			headers: { "Content-type": "application/json" },
				
			});
			let data = await response.json()
			
		}

	};
	
	console.log(toDoList);
	
	return (
		<div className="text-center m-auto py-5">
			<h1>ToDo List</h1>
            <input 
				type="text" 
				onChange={(e) => setTask(e.target.value)} 
				value={task}
			/>
			<button onClick={(e) => addToList(e, task)}>Add to List</button>

			{/* display toDoList */}
			<ul>
				{toDoList.length === 0 ? (
					<li>No tasks, add a task</li>
				) : (
					toDoList?.map((toDo, index) => {
						if(toDo.done != true) {
							return (
								<li key={index} className={toDo.is_done == true ? "text-decoration-line-through" : ""}> 
									{toDo.label} 
									<input type="checkbox" onChange={() => crossOut(toDo)} checked={toDo.done == true ? "checked" : ""}/> 
									<span onClick={() => removeToDo(toDo.id)}>❌</span>
								</li>
							);
								
						}							
					})				
				)}
			</ul>	
		</div>
	);
};

export default Home;