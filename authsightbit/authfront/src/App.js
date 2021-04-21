import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import SignIn from "./components/Signin/SignIn";
import Register from "./components/Register/Registrer";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const userName = useSelector((state) => state.auth.userData.name);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/home-page">
            {userName ? <HomePage /> : <Redirect to="/login" />}
          </Route>

          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
