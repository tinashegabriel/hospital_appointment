import logo from './logo.svg';
import './App.css';
import React from 'react';

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import FooterSmall from "./components/FooterSmall";
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import {
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Navbar transparent />
      {/* <Main/> */}
      <Login />
      {/* <Signup/> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
