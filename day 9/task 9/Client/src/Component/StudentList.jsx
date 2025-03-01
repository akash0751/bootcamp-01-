import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "../assets/download.png";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [idStudents, setIdStudents] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/students");
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
    const interval = setInterval(() => {
      getAllStudents();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (student) =>
            student.name.toLowerCase().includes(query) ||
            student.rollNo.toString().includes(query)
        )
      );
    }
  };

  const handleRefresh = () => {
    getAllStudents();
  };

  const openModel = (id) => {
    getStudentById(id);
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
    setIsDivOpen(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky p-3">
            <h5>Navigation</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Students</a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h1 className="text-center my-4">Student Details</h1>

          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              className="form-control w-75"
              placeholder="Search by Name or Roll No..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="btn btn-success ms-2" onClick={handleRefresh}>🔄 Refresh</button>
          </div>

          
          {error && <div className="alert alert-danger text-center">{error}</div>}
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div className="col-md-4 mb-4" key={user._id}>
                    <div className="card shadow-sm border-0">
                      <div className="card-body text-center">
                        <img
                          src={Image}
                          alt="Student"
                          className="img-fluid rounded-circle mb-3"
                          style={{ width: "80px" }}
                        />
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text"><strong>Roll No:</strong> {user.rollNo}</p>
                        <p className="card-text"><strong>Batch:</strong> {user.year}</p>
                        <button className="btn btn-primary btn-sm" onClick={() => openModel(user._id)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No students found.</div>
              )}
            </div>
          )}
        </main>
      </div>

      
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

