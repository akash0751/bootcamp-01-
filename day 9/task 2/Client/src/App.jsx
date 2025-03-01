
import './App.css'
import { useState,useEffect } from 'react'
import axios from 'axios';
function App() {
  const [users,setUsers] = useState([]);

  const getAllStudents = async ()=>{
    await axios.get('http://localhost:3000/students')
    .then((res)=>{
      setUsers(res.data);
    })
  }
  
  useEffect(()=>{
   getAllStudents()
  },[])
  return (
    <>
    <div className='container'>
      <div>
      <h1>STUDENT DETAILS</h1>
      </div>
      <div>
        <table className='table1'>
          <thead>
          <tr>
            <th>ID</th>
            <th>ROLL NO</th>
            <th>NAME</th>
            <th>BATCH</th>
          </tr>
          </thead>
          <tbody>
          {users && users.map((user,index)=>{
            return(
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.rollNo}</td>
                <td>{user.name}</td>
                <td>{user.year}</td>
              </tr>
              
            )
          })}
          </tbody>
          
        </table>
      </div>
    </div>
      </>
  )
}

export default App
