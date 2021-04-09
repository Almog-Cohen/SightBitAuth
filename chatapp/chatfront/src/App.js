import React, { useState, useEffect } from "react";
import Chat from "./components/Chat/Chat";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignIn from "./components/Signin/SignIn";
import Register from "./components/Register/Registrer";
import { useStateValue } from "./StateProvider";

function App() {
  const [roomNumber, setRoomNumber] = useState("");
  const [userName, setUserName] = useState("");
  // const [{ roomName }, dispatch] = useStateValue();
  console.log("APP IS RENDERS ");

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            {/* <LoginPage userName={userName} setUserName={setUserName} /> */}
            <SignIn setUserName={setUserName} />
          </Route>
          <Route path="/register">
            <Register setUserName={setUserName} />
          </Route>
          <Route path="/chat">
            <div className="app-body">
              <Sidebar setRoomNumber={setRoomNumber} userName={userName} />
              {roomNumber && (
                <Chat roomNumber={roomNumber} userName={userName} />
              )}
            </div>
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
