/* import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import Image from '../assets/download.png'
import Studentcard from './Studentcard';
const StudentList = () => {
    const [users,setUsers] = useState([]);
    const [idStudents,setIdStudents] = useState(null)
    const [isModelOpen, setIsModelOpen] = useState(false); 
    const [isDivOpen,setIsDivOpen] = useState(false)
    const [isVisible,SetISVisible] = useState(true)

  const getAllStudents = async ()=>{
    await axios.get('http://localhost:3000/students')
    .then((res)=>{
      setUsers(res.data);
    })
  }

  const getStudentById = async (id) =>{
     const response = await fetch(`http://localhost:3000/students/${id}`)
     const data = await response.json()
        setIdStudents(data)
        console.log(data)
    }
  
  
  useEffect(()=>{
   getAllStudents()
   getStudentById();
  },[])
  
  const openModel = () =>{
    setIsModelOpen(true)
  }
  
  const closeModel = () =>{
    setIsModelOpen(false);
  }
  
  const openDiv = ()=>{
    setIsDivOpen(true)
  }

  const closeDiv= ()=>{
    setIsDivOpen(false)
  }
  return (
    
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
            <th></th>
          </tr>
          </thead>
          <tbody>
          {users && users.map((user,index)=>{
            return(
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.rollNo}</td>
                <td>{user.name}</td>
                <td>{user.year}</td>
                <th><a onClick={openModel}><button onClick={()=>getStudentById(user._id)}>View Details</button></a></th>
              </tr>
            )
          })}
          </tbody>
        </table>
        {isModelOpen && (
            <div className='model'>
                <div className='model-content'>
                    <span onClick ={closeModel} className="close">&times;</span><br></br>
                    <h2 className='h1'>User Record</h2>
                    {
            idStudents && (
                <div>
                    <img className="img" src={Image}></img>
                    <p className='h'>RollNo:{idStudents.rollNo}</p>
                    <p className='h'>Name : {idStudents.name}</p>
                    {isVisible && (
                      <a onClick={()=>SetISVisible(false)}><button onClick={openDiv} className='btn1'>View More</button></a>  
                    )}
                    
                </div>
            ) 
          }
          {
            isDivOpen && (
              <>
              <p className='h'>Major: {idStudents.dept}</p>
              <p className='h'>year : {idStudents.year}</p>
               <a onClick={()=>SetISVisible(true)}><button className="btn1" onClick={closeDiv}>View Less</button></a>
              
              
              </>
            )
          }
                </div>
            </div>
        )}
      </div>
    </div>
  )
  
}

export default StudentList; */
