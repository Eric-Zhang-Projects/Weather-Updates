import React from "react";
import Navbar from '../navbar/Navbar';
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SweetAlert from 'react-bootstrap-sweetalert';

export class ConfirmEmail extends React.Component {

    state = {
        email: '',
        errorMessage: null
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    confirmEmail = () => {
        console.log("email: " + this.state.email);
        axios.post(`${BASE_URL}/confirmemail`, {email: this.state.email},
        { headers: { "Content-Type": "application/json; charset=UTF-8" }})
        .then(res => {
            console.log("Confirm Email status: "  + res.data);
            if (res.data === "success"){
                this.props.history.push("/resetpassword", {email: this.state.email});
            } else {
                this.setState({
                    errorMessage: this.showError(res.data)
                });
            }
        }).catch(error => {
            console.log(error);
        //this.props.history.push('/forgotpassword');
        });
    }

    showError = (message) => {
        return <div style={{"color": "red"}}>{message}</div>
    }

    render() {
        return <div>
        <Navbar/>     
        <h1 style={{"fontFamily": "Open Sans, sans-serif", "paddingTop": "7vh"}}>Confirm Email</h1>   
    <div className = "forgot-password-base">
        <div className = "forgot-password-content">
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Please enter the email address you registered with to continue</Form.Label>
                <Form.Control type="text" placeholder="Enter email" name="email" value={this.state.value} onChange={this.handleChange} required/>
                <Form.Text className="text-muted">
                    {this.state.errorMessage}
                </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={()=>this.confirmEmail()}>
                Submit
            </Button>
        </Form>
        </div>
    </div>
    </div>
    }
}