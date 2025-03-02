import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
        const interval = setInterval(() => {
            fetchTasks();
        }, 6000); 

        return () => clearInterval(interval); 
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks!");
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task!");
        }
    };

    const markAsCompleted = async (id) => {
        try {
            const updatedTask = tasks.find(task => task._id === id);
            updatedTask.status = "Completed";

            await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);
            setTasks(tasks.map(task => (task._id === id ? { ...task, status: "Completed" } : task)));
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task!");
        }
    };

    const startEditTask = (task) => {
        setEditingTask({ ...task });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingTask({ ...editingTask, [name]: value });
    };

    const saveTask = async () => {
        try {
            await axios.put(`http://localhost:3000/tasks/${editingTask._id}`, editingTask);
            setTasks(tasks.map(task => (task._id === editingTask._id ? editingTask : task)));
            setEditingTask(null);
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task!");
        }
    };

    const sortedTasks = [...tasks].sort((a, b) => 
        sortOrder === "asc" ? new Date(a.duedate) - new Date(b.duedate) : new Date(b.duedate) - new Date(a.duedate)
    );

    const filteredTasks = filterStatus ? sortedTasks.filter(task => task.status === filterStatus) : sortedTasks;

    return (
        <div className="container mt-4">
            <h2 className="text-center">Task List</h2>

            <div className="d-flex justify-content-between mb-3">
                <div>
                    <label className="me-2">Sort by Due Date:</label>
                    <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                        {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
                    </button>
                </div>

                <div>
                    <label className="me-2">Filter by Status:</label>
                    <select 
                        className="form-select form-select-sm d-inline w-auto"
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <tr key={task._id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{new Date(task.duedate).toLocaleDateString()}</td>
                                <td>
                                    <span className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td>
                                    {task.status !== "Completed" && (
                                        <button 
                                            className="btn btn-sm btn-success me-2"
                                            onClick={() => markAsCompleted(task._id)}
                                        >
                                            ✅ Complete
                                        </button>
                                    )}
                                    <button 
                                        className="btn btn-sm btn-primary me-2"
                                        onClick={() => startEditTask(task)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No tasks found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            
            {editingTask && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Task</h5>
                                <button type="button" className="btn-close" onClick={() => setEditingTask(null)}></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-label">Title:</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="title"
                                    value={editingTask.title}
                                    onChange={handleEditChange}
                                />
                                <label className="form-label mt-2">Description:</label>
                                <textarea 
                                    className="form-control"
                                    name="description"
                                    value={editingTask.description}
                                    onChange={handleEditChange}
                                />
                                <label className="form-label mt-2">Due Date:</label>
                                <input 
                                    type="date" 
                                    className="form-control"
                                    name="duedate"
                                    value={editingTask.duedate.split("T")[0]}
                                    onChange={handleEditChange}
                                />
                                <label className="form-label mt-2">Status:</label>
                                <select 
                                    className="form-select"
                                    name="status"
                                    value={editingTask.status}
                                    onChange={handleEditChange}
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setEditingTask(null)}>Cancel</button>
                                <button className="btn btn-primary" onClick={saveTask}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
