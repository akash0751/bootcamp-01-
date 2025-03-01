import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../assets/download.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
    const [users, setUsers] = useState([]);
    const [idStudents, setIdStudents] = useState(null);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isDivOpen, setIsDivOpen] = useState(false);

    const getAllStudents = async () => {
        await axios.get('http://localhost:3000/students')
            .then((res) => {
                setUsers(res.data);
            });
    };

    const getStudentById = async (id) => {
        const response = await fetch(`http://localhost:3000/students/${id}`);
        const data = await response.json();
        setIdStudents(data);
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
                        {users.map((user, index) => (
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
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bootstrap Modal for Student Details */}
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
                                        
                                        {/* View Less button now at the bottom */}
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

