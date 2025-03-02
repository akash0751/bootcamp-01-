
import './App.css'
import TaskForm from './Component/Taskform'
import TaskList from './Component/Tasklist'
function App() {
  return (
      <div>
          <h1>Task Manager</h1>
          <TaskForm />
          <TaskList />
      </div>
  );
}

export default App;
