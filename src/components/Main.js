import React from 'react';
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

// import Home from '../pages/Home';
import Signup from '../components/signup/Signup';
import Login from './login/Login';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Signup}></Route>
      <Route exact path='/Login' component={Login}></Route>
    </Routes>
  );
}

export default Main;