import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { isLoggedIn } from './components/helpers/jwtHelper';

export default class ProtectedRoute extends React.Component {


    alerting = () =>{
        console.log("please login first to continue");
        //alert("Please login first to continue");
    }


    render(){
        const Component = this.props.component;
        const isAuthenticated = isLoggedIn();

        return isAuthenticated ? (
        <Route render={(props) => <Component {...props} />}/>
        ) : (
            <Redirect to ={ { pathname: 'unauthorized' }}>{this.alerting()}</Redirect>
            );
        
    }
}