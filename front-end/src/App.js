import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Login from "./screens/login/Login";

import useNetwork from "./useNetwork";

function App() {
  const webHook = useNetwork();
  const handleLogin = (data) => {
    webHook.makePostRequest("http://localhost:3000/login", data);
  };

  const handleRegsiter = (data) => {
    webHook.makePostRequest("http://localhost:3000/register", data);
  };

  return (
    <div className="App">
      <Login handleLogin={handleLogin} />
      <Login handleLogin={handleRegsiter} />
    </div>
  );
}

export default App;
