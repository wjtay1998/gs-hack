import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import AdminPage from './components/adminComponents/AdminPage.js';
import LoginPage from './components/LoginPage.js';
import UserPage from './components/userComponents/UserPage.js';

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
      </Routes>
    </Router>
  );
}

export default App;
