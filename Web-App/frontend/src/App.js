import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Register, About } from "./components/login";
import { Home, Account, UpdateInfo, DeleteAccount, Logout, Unauthorized, SearchResults, WeatherResults } from "./components/dashboard";
import ProtectedRoute from "./ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component = {About}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/register' component = {Register}/>
          <Route path = '/unauthorized' component = {Unauthorized}/>
          <ProtectedRoute path = '/dashboard' component = {Home}/>
          <ProtectedRoute path = '/searchResults' component = {SearchResults}/>
          <ProtectedRoute path = '/weatherResults' component = {WeatherResults}/>
          {/* <Route path = '/account' render ={(props) => ( <Account {...props} />)}/> */}
          <ProtectedRoute path = '/account' component = {Account}/>
          <ProtectedRoute path = '/updateInfo' component = {UpdateInfo}/>
          <ProtectedRoute path = '/deleteAccount' component = {DeleteAccount}/>
          <Route path = '/logout' component = {Logout}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
