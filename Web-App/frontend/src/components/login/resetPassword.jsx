import React from "react";
import Navbar from '../navbar/Navbar';
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import Button from 'react-bootstrap/Button';
import { createBrowserHistory } from 'history';
import SweetAlert from 'react-bootstrap-sweetalert';

export class ResetPassword extends React.Component {

    state = {
        email: '',
        newUsername: '',
        newPassword: '',
        usernameError: 'New Username',
        passwordError: 'New Password',
        showSuccessMessage: null
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount = () => {
        const history = createBrowserHistory();
        const location = history.location;
        try {
            this.setState({
                email: location.state.email,
            })
        } catch (e){
            this.props.history.push('/pageerror', {loggedIn: "false"});
        }
    }

    submit = () => {

        this.setState({
            usernameError: 'New Username',
            passwordError:'New Password'
        })

        var validationErrors = this.handleValidation();
        //validationErrors true is passed, false if violation
        if (!validationErrors){
            console.log("failed validation");
            this.props.history.push('/register');
            return null;
        }

        axios.post(`${BASE_URL}/resetpassword`,
        {email: this.state.email,
        newUsername: this.state.newUsername,
        newPassword: this.state.newPassword}
        ).then(result => {
            console.log("reset status: " + result.data);
            if(result.data === "success"){
                this.setState({showSuccessMessage: this.showSuccessPopUp()})
            } else {
                this.setState({usernameError: result.data});
            }
        }).catch(e => {
            console.log("error" + e);
        })
    }

    showSuccessPopUp = () =>{
        return <SweetAlert
        success
        confirmBtnText="Ok"
        confirmBtnBsStyle="danger"
        title="Success!"
        onConfirm={() => this.props.history.push("/login")}
        focusCancelBtn
      >
    Credentials reset! Please log in again
    </SweetAlert>
    }

    handleValidation = () =>{
        console.log("entering validation");
        var passed = true;
        if (this.state.newUsername === ""){
            passed = false;
            this.setState({
                usernameError: "Username field cannot be empty"
            })
        }
        if (this.state.newPassword ===""){
            passed = false;
            this.setState({
                passwordError: "Password field cannot be empty"
            })
        }
        return passed;
    }

    newUsernameField = () =>{
        var textColor = 'black';
        if (this.state.usernameError !== 'New Username'){
            textColor = 'red';
        }
            return <label htmlFor="name" style={{color: textColor}}>{this.state.usernameError}</label>
    }

    newPasswordField = () =>{
        var textColor = 'black';
        if (this.state.passwordError !== 'New Password'){
            textColor = 'red';
        }
            return <label htmlFor="email" style={{ color: textColor }}>{this.state.passwordError}</label>
    }

    render() {
        return <div>
            <Navbar/>  
            <div className = "reset-password-base">
                <div className = "reset-password-content">
                    <div className = "form"> Please reset your login info: <hr/>
                        <div className = "form-group" style={{"outlineColor": "green"}}>
                            {this.newUsernameField()}
                            <input type="text" name="newUsername" placeholder="New Username" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                            {this.newPasswordField()}
                            <input type="text" name="newPassword" placeholder="New Password" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                    </div>
                    <Button onClick={()=>this.submit()}>Submit</Button>
                    {this.state.showSuccessMessage}
                </div>
            </div>
        </div>
    }
}
