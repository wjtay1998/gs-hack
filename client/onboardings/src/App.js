import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact path = "/"
          render = {() => {
            return (<Redirect to="/login"/> )
          }}
        />
        <Route exact path = "/admin" component = {AdminPage}/>
        <Route exact path = "/admin/createTasks" component = {CreateTaskPage}/>
        <Route exact path = "/admin/module" component = {ModulePage} />
        <Route exact path = "/user" component = {UserPage}/>
        <Route exact path = "/user/schedule" component = {SchedulerPage}/>
      </Switch>
    </Router>
  );
}

export default App;
