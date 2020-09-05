import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Login, Register, About } from "./components/login";
import { Home, Account, Logout } from "./components/dashboard";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        <Switch>
          <Route exact path = '/' component = {About}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/register' component = {Register}/>
          <ProtectedRoute path = '/dashboard' component = {Home}/>
          <ProtectedRoute path = '/account' component = {Account}/>
          <ProtectedRoute path = '/logout' component = {Logout}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
