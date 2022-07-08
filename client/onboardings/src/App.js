import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import AdminPage from './components/adminComponents/AdminPage.js';
import LoginPage from './components/LoginPage.js';
import UserPage from './components/userComponents/userPage.js';
import CreateTask from './components/adminComponents/CreateTask/createTask.js'
import AdminCreateTask from './components/adminComponents/CreateTaskPage';
import CreateModule from './components/adminComponents/ModulePage';
import TaskPage
 from './components/adminComponents/TaskPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path = "/"
          element = {<Navigate replace to="/login" />
          }
        />
        <Route path= "/admin" element = {AdminPage}/>
        <Route path = "/login" element = {LoginPage}/>
        <Route path = "/user" element = {<UserPage/>}/>
        <Route path = "/createTask" element = {<CreateTask/>}/>
        <Route path = "/createTask1" element = {<AdminCreateTask/>}/>
        <Route path = "/createModule" element = {<CreateModule/>}/>
        <Route path = "/taskdetails/:id" element = {<TaskPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
