
import './App.css'
import { Student } from './Component/Student'

function App() {
  return (
    <>
    <h1 className='h11'>STUDENTS LIST</h1>
    <Student rollNo={1} name="Akash S" dept="B Tech-IT" year="2022-2026" />
    <Student rollNo={2} name="Bhargav V" dept="B Tech-IT" year="2022-2026" />
    <Student rollNo={3} name="Dinesh P" dept="B Tech-IT" year="2022-2026" />
    
    
  </>
  )
    
}

export default App
