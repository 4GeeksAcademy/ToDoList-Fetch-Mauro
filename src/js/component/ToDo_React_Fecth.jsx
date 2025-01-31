import React, { useState } from "react";


export const ToDoList = () => {

    const [newTask, setNewTask] = useState('');
    const [taskList, setTaskList] = useState(['Task 1', 'Task 2', 'Task 3']);
    const [remainingTask, setRemainingTask] = useState('')

    const handleSubmit = (event) => {

        event.preventDefault();

        if (newTask.trim() != '') {
            setTaskList([...taskList, newTask]);
        }

        setNewTask('')
    };

    const handleNewTask = (event) => {
        setNewTask(event.target.value)
    };

    const handleDelete = (item) => {
        setTaskList(taskList.filter(task => task !== item))              
    };

           
    return (
        <div>
            <div>
                <h1 className="text-primary">Your tasks To Do</h1>
            </div>
            <div>
                <div className="container list-group">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Add a new Task here" value={newTask} onChange={handleNewTask} />
                        </div>
                    </form>
                    <form>
                        <div className="mb-3 text-start">
                            <label className="form-label text-success">Update Task</label>
                            <input type="text" className="form-control" placeholder="Edit task"/>
                                
                        </div>                       
                        <div className="mb-3 form-check text-start">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" for="exampleCheck1">Completed</label>
                        </div>
                        <div className="d-flex justify-content-start">
                        <button type="submit" className="btn btn-primary me-2">Submit</button>
                        <button type="submit" className="btn btn-secondary ms-2">Cancel</button>
                        </div>
                    </form>
                    <h3 className="text-success">To Do List</h3>
                    <ul className="list-group text-start">
                        {taskList.map((taskElement, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                {taskElement}
                                <div>
                                <span onClick={() => { handleDelete(taskElement) }}>
                                    <i className="far fa-edit text-success me-2"></i>
                                </span>
                                <span onClick={() => { handleDelete(taskElement) }}>
                                    <i className="fa fa-trash text-danger"></i>
                                </span>
                                </div>
                            </li>
                        ))}
                        <li className="list-group-item list-group-item-secondary text-end fw-light">{taskList.length} {remainingTask} Remaining</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};