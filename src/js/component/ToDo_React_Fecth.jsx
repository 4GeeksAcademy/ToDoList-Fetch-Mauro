import React, { useState, useEffect } from "react";


export const ToDoList = () => {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [editTask, setEditTask] = useState("");
    const [isDone, setIsDone] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [todoId, setTodoId] = useState(null)

    
    const host = 'https://playground.4geeks.com/todo';
    const user = "mauro"
    /* const todoId = (32); */

    useEffect(() => { getUserToDo() }, [])

    
    const getUserToDo = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: 'GET'
        };

        const response = await fetch(uri, options)

        if (!response.ok) {
            console.log('Error:', response.status, response.statusText)
            return;
        }
        const data = await response.json();

        setTaskList(data.todos);
        

        
        
    };

    const createUserTask = async () => {
        const uri = `${host}/todos/${user}`;

        const requestBody = {
            label: newTask,
            is_done: isDone
        };

        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        };

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return;
        };

        const data = await response.json();

        getUserToDo();
    };

    const editUserTask = async () => {
        
        const uri = `${host}/todos/${todoId}`

        const requestBody = {
            label: editTask,
            is_done: isDone
        };

        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        };

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return;
        };
        const data = await response.json();
        
        
        getUserToDo();
    };

    const deleteUserTask = async (todoId) => {
        
        const uri = `${host}/todos/${todoId}`

        const option = {
            method: 'DELETE'
        };

        const response = await fetch(uri, option)

        if(!response.ok){
            console.log('Error: ', response.status, response.statusText)
            return;            
        };        
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        
        setNewTask("");

        createUserTask();
    };


    const handleEditTask = (event) => {
        event.preventDefault();
        setEditTask("");
        editUserTask()    
           
    };

    const handleEdit = (task) => {
        setIsEdit(true);
        setEditTask(task.label) 
        setTodoId(task.id)

    };

    const handleDelete = (task) => {
        setTodoId(task.id);
        deleteUserTask(task.id);
        setTaskList(taskList.filter((item) => task.id !== item.id));
    };

    const cancelButton = () =>{
        setIsEdit(false);
    };

    
    return (
        <div className="container mt-1">
            <div className="row col-sm-10 col-md-6 m-auto">
                <h1 className="text-primary">Your tasks To Do</h1>
            </div>
            <div>
                <div className="container list-group">
                    {!isEdit ?
                        <div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input onChange={event => setNewTask(event.target.value)} value={newTask} type="text" className="form-control" placeholder="Add a new Task here" />
                            </div>
                        </form>
                        </div>
                        :
                        <form onSubmit={handleEditTask}>
                            <div  className="mb-3 text-start">
                                <label className="form-label text-success">Update Task</label>
                                <input onChange={event => setEditTask(event.target.value)} value={editTask} type="text" className="form-control" placeholder="Edit task" />
                            </div>
                            <div className="mb-3 form-check text-start">
                                <input onChange={event => setIsDone(event.target.checked)} checked={isDone} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Completed</label>
                            </div>
                            <div className="d-flex justify-content-start">
                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button onClick={cancelButton} type="submit" className="btn btn-secondary ms-2">Cancel</button>
                            </div>
                        </form>
                    }
                    <h3 className="text-success">To Do List</h3>
                    <ul className="list-group text-start">
                        {taskList.map((todo) => (
                            <li key={todo.id} className="list-group-item d-flex justify-content-between">
                                {todo.label} - {todo.id}
                                <div>
                                    <span >
                                        <i onClick={() => { handleEdit(todo) }} className="far fa-edit text-success me-2"></i>

                                        <i onClick={() => { handleDelete(todo) }} className="fa fa-trash text-danger"></i>
                                    </span>
                                </div>
                            </li>
                        ))}
                        <li className="list-group-item list-group-item-secondary text-end fw-light" >{taskList.length} {(taskList.length !== 1) ? 'Tasks' : 'Task'} Remaining</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};