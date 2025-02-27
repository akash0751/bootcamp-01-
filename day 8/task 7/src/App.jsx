
import './App.css';
import { useState } from 'react';
import { Student } from './Component/Student';

function App() {
    const studentsList = [
        { rollNo: 1, name: "Akash S", dept: "B Tech-IT", year: "2022-2026" },
        { rollNo: 2, name: "Bhargav V", dept: "B Tech-IT", year: "2023-2025" },
        { rollNo: 3, name: "Dinesh P", dept: "B Tech-IT", year: "2024-2028" }
    ];

    const [search, setSearch] = useState('');

    const filteredStudents = studentsList.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())||
    student.dept.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h1 className='h11'>STUDENTS LIST</h1>
            <input
            className='input'
                type="text"
                placeholder="Search by name or dept"
                onChange={(e) => setSearch(e.target.value)}
            /><br></br>
            {filteredStudents.map((student) => (
                <Student key={student.name} {...student} />
))}
        </>
    );
}

export default App;

