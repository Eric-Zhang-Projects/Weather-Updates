import React from "react";
import Navbar from '../navbar/Navbar';
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SweetAlert from 'react-bootstrap-sweetalert';

export class CancelNotifications extends React.Component {

    state = {
        email: '',
       errorMessage: null,
       showSuccess: null
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    confirmEmail = () => {
        console.log("email: " + this.state.email);
        axios.post(`${BASE_URL}/cancelnotifications`, {email: this.state.email},
        { headers: { "Content-Type": "application/json; charset=UTF-8" }})
        .then(res => {
            console.log("Confirm Email status: "  + res.data);
            if (res.data === "success"){
                this.setState({
                    showSuccess: this.showSuccessPopUp()
                })
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

    showSuccessPopUp = () =>{
        return <SweetAlert
        success
        confirmBtnText="Ok"
        confirmBtnBsStyle="danger"
        title="Notifications Canceled"
        onConfirm={() => this.props.history.push("/login")}
        focusCancelBtn
      >
    We're sorry to see you go! You can re-set up notifications anytime. Thanks!
    </SweetAlert>
    }

    showError = (message) => {
        return <div style={{"color": "red"}}>{message}</div>
    }

    render() {
        return <div>
        <Navbar/>     
        <h1 style={{"fontFamily": "Open Sans, sans-serif", "paddingTop": "7vh"}}>Cancel Notifications</h1>   
    <div className = "forgot-password-base">
        <div className = "forgot-password-content">
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Please enter the email address associated with your account to confirm</Form.Label>
                <Form.Control type="text" placeholder="Enter email" name="email" value={this.state.value} onChange={this.handleChange} required/>
                <Form.Text className="text-muted">
                    {this.state.errorMessage}
                </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={()=>this.confirmEmail()}>
                Submit
            </Button>
        </Form>
        {this.state.showSuccess}
        </div>
    </div>
    </div>
    }
}