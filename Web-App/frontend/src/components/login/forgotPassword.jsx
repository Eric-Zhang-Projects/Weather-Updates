import React from "react";
import Navbar from '../navbar/Navbar';
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SweetAlert from 'react-bootstrap-sweetalert';

export class ForgotPassword extends React.Component {

    state = {
        email: '',
       showSuccess: null,
       showError: null
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    sendResetEmail = () => {
        console.log("email: " + this.state.email);
        axios.post(`${BASE_URL}/forgotpassword`, {email: this.state.email},
        { headers: { "Content-Type": "application/json; charset=UTF-8" }})
        .then(res => {
            console.log("forgot password status: "  + res.data);
            if (res.data === "Success"){
                this.setState({
                    showSuccess: this.showSuccessPopUp()
                })
            } else {
                this.setState({
                    showError: this.showErrorPopUp(res.data)
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
        title="Email Sent!"
        onConfirm={() => this.props.history.push("/login")}
        focusCancelBtn
      >
    Please check your inbox and follow in the instructions in the email. Thanks!
    </SweetAlert>
    }

    showErrorPopUp = (error) =>{
        return <SweetAlert
        danger
        confirmBtnText="Ok"
        confirmBtnBsStyle="danger"
        title="Oops!"
        onConfirm={() => this.setState({showError: null})}
        focusCancelBtn
      >
    {error}
    </SweetAlert>
    }

    render() {
        return <div>
            <Navbar/>     
            <h1 style={{"fontFamily": "Open Sans, sans-serif", "paddingTop": "7vh"}}>Forgot Password?</h1>   
        <div className = "forgot-password-base">
            <div className = "forgot-password-content">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Please enter the email address you registered with</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name="email" value={this.state.value} onChange={this.handleChange} required/>
                    <Form.Text className="text-muted">
                    We'll send you an email with a link to reset your login info
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={()=>this.sendResetEmail()}>
                    Submit
                </Button>
            </Form>
            {this.state.showSuccess}
            {this.state.showError} 
            </div>
        </div>
        </div>
    }
}
