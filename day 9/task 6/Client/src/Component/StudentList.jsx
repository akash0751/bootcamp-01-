import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../assets/download.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
    const [users, setUsers] = useState([]);
    const [idStudents, setIdStudents] = useState(null);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isDivOpen, setIsDivOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAllStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/students');
            setUsers(response.data);
        } catch (err) {
            console.error("Error fetching students:", err);
            setError("Failed to load student data. Please try again later.");
        }
        setLoading(false);
    };

    const getStudentById = async (id) => {
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/students/${id}`);
            if (!response.ok) throw new Error("Student not found");
            const data = await response.json();
            setIdStudents(data);
        } catch (err) {
            console.error("Error fetching student details:", err);
            setError("Failed to load student details. Please try again.");
        }
    };

    useEffect(() => {
        getAllStudents();
    }, []);

    const openModel = (id) => {
        getStudentById(id);
        setIsModelOpen(true);
    };

    const closeModel = () => {
        setIsModelOpen(false);
        setIsDivOpen(false);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">STUDENT DETAILS</h1>


            {error && <div className="alert alert-danger text-center">{error}</div>}

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>ROLL NO</th>
                                <th>NAME</th>
                                <th>BATCH</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.rollNo}</td>
                                        <td>{user.name}</td>
                                        <td>{user.year}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={() => openModel(user._id)}>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No students available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isModelOpen && idStudents && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Student Record</h5>
                                <button type="button" className="btn-close" onClick={closeModel}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img src={Image} alt="Student" className="img-fluid rounded-circle mb-3" style={{ width: '120px' }} />
                                <p><strong>Roll No:</strong> {idStudents.rollNo}</p>
                                <p><strong>Name:</strong> {idStudents.name}</p>

                                {!isDivOpen && (
                                    <button className="btn btn-secondary mt-3" onClick={() => setIsDivOpen(true)}>View More</button>
                                )}

                                {isDivOpen && (
                                    <div className="mt-3">
                                        <p><strong>Major:</strong> {idStudents.dept}</p>
                                        <p><strong>Year:</strong> {idStudents.year}</p>
                                        
                                        <button className="btn btn-danger mt-3" onClick={() => setIsDivOpen(false)}>View Less</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;

