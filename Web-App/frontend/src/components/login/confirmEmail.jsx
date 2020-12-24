import React from "react";
import Navbar from '../navbar/Navbar';
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import Button from 'react-bootstrap/Button';

export class ConfirmEmail extends React.Component {

    state ={
        showError: null
    }

    componentDidMount = () => {
        try {
            const encodedEmail = this.props.location.search.substring(3);
            console.log("confirm encoded email: " + encodedEmail);
            axios.post(`${BASE_URL}/confirmemail`, {email: encodedEmail},
            { headers: { "Content-Type": "application/json; charset=UTF-8" }})
            .then(res => {
                if (res.data === "Success"){
                    this.props.history.push('/resetpassword', {email: encodedEmail})
                } else {
                    this.setState({showError: this.error(res.data)})
                }
            }).catch(error => {
                console.log(error);
            //this.props.history.push('/forgotpassword');
            });
        } catch (e){
            this.props.history.push('/pageerror', {loggedIn: "false"});
        } 
    }

    error = (message) => {
        return (
            <div>
                <Navbar/>
                <div className = "page-error-base">
                        <div>
                        <h1>Whoops!</h1>
                        <h5>{message}</h5>
                        <hr/>
                        <Button type="button" className="btn" onClick={()=>this.props.history.push("/login")}>Back to Login Page</Button>     
                        </div>  
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>{this.state.showError}</div>
        )
    }

}