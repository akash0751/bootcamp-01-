import './App.css';
import { useState } from 'react';
import { Student } from './Component/Student';

function App() {
    const [students, setStudents] = useState([
        { rollNo: 1, name: "Akash S", dept: "B Tech-IT", year: "2022-2026" },
        { rollNo: 2, name: "Bhargav V", dept: "B Tech-IT", year: "2023-2025" },
        { rollNo: 3, name: "Dinesh P", dept: "B Tech-CSE", year: "2024-2028" }
    ]);

    const [search, setSearch] = useState('');
    const [newStudent, setNewStudent] = useState({ name: "", dept: "", year: "" });

    const addStudent = () => {
        if (!newStudent.name || !newStudent.dept || !newStudent.year) {
            alert("Please fill in all fields.");
            return;
        }
        setStudents([...students, { ...newStudent, rollNo: students.length + 1 }]);
        setNewStudent({ name: "", dept: "", year: "" });
    };

    const removeStudent = (rollNo) => {
        setStudents(students.filter(student => student.rollNo !== rollNo));
    };
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.dept.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="app-container">
            <h1 className='h11'>STUDENTS LIST</h1>
            <input
                type="text"
                className="input search-bar"
                placeholder="Search by name or department"
                onChange={(e) => setSearch(e.target.value)}
            /><br></br>

            
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="input"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Enter Department"
                    className="input"
                    value={newStudent.dept}
                    onChange={(e) => setNewStudent({ ...newStudent, dept: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Enter Year"
                    className="input"
                    value={newStudent.year}
                    onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                />
                <button className="add-btn" onClick={addStudent}>Add Student</button>
            </div><br></br>

            <div className="students-list">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                        <div key={student.rollNo} className="student-card">
                            <Student {...student} />
                            <button className="remove-btn" onClick={() => removeStudent(student.rollNo)}>Remove</button><br></br>
                        </div>
                    ))
                ) : (
                    <p className="no-student-msg">No matching students found.</p>
                )}
            </div>
        </div>
    );
}

export default App;

