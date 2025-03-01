
import './App.css'
import { useState,useEffect } from 'react'
function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("http://localhost:3000/students"); 
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student List</h1>
      {loading && <p>Loading student data...</p>}
      {!loading && (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - Roll No: {student.rollNo} - Batch: {student.year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default App
