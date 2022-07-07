import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import AdminPage from './components/adminComponents/AdminPage.js';
import LoginPage from './components/LoginPage.js';

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
        {/* <Route exact path = "/admin/createTasks" component = {CreateTaskPage}/>
        <Route exact path = "/admin/module" component = {ModulePage} />
        <Route exact path = "/user" component = {UserPage}/>
        <Route exact path = "/user/schedule" component = {SchedulerPage}/> */}
      </Routes>
    </Router>
  );
}

export default App;
