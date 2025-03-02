import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;

    const getAllStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/students');
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (err) {
            console.error("Error fetching students:", err);
            setError("Failed to load student data. Please try again later.");
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllStudents();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1);

        if (query === "") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(student =>
                student.name.toLowerCase().includes(query) ||
                student.rollNo.toString().includes(query)
            ));
        }
    };

    

   
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredUsers.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = Math.ceil(filteredUsers.length / studentsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">STUDENT DETAILS</h1>
            
            
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name or Roll No..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
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
                                {currentStudents.length > 0 ? (
                                    currentStudents.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{indexOfFirstStudent + index + 1}</td>
                                            <td>{user.rollNo}</td>
                                            <td>{user.name}</td>
                                            <td>{user.year}</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No students found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-outline-primary me-2" onClick={prevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span className="align-self-center">Page {currentPage} of {totalPages}</span>
                        <button className="btn btn-outline-primary ms-2" onClick={nextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>

        
    );
};

export default StudentList;




