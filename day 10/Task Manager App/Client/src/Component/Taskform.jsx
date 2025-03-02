import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const TaskForm = ({ onTaskAdded }) => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        duedate: "",
        status: "Open",
        done: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/tasks", task);
            alert("Task added successfully!");
            setTask({ title: "", description: "", duedate: "", status: "Open", done: false });
            if (onTaskAdded) onTaskAdded(response.data); 
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task!");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title:</label>
                        <input type="text" className="form-control" name="title" value={task.title} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <textarea className="form-control" name="description" value={task.description} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Due Date:</label>
                        <input type="date" className="form-control" name="duedate" value={task.duedate} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status:</label>
                        <select className="form-select" name="status" value={task.status} onChange={handleChange} required>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" name="done" checked={task.done} onChange={handleChange} />
                        <label className="form-check-label">Mark as Done</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Add Task</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;

