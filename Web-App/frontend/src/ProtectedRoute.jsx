import React from 'react';
import { Redirect } from 'react-router-dom'
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
            <Component/>
        ) : (
            <Redirect to ={ { pathname: 'login' }}>{this.alerting()}</Redirect>
            );
        
    }
}