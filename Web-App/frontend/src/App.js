import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Login, Register, About } from "./components/login";
import { Home } from "./components/dashboard";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path = '/' component = {About}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/register' component = {Register}/>
          <Route path = '/dashboard' component = {Home}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
