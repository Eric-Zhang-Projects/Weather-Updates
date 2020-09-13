import React from "react";
import loginLogo from "../../images/registerLogo.png";
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import Navbar from '../navbar/Navbar';
import Button from 'react-bootstrap/Button';
import SweetAlert from 'react-bootstrap-sweetalert';


export class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            name: '',
            email: '',
            username: '',
            password: '',
            usernameError: 'Username',
            emailError: 'Email',
            nameError:'Name',
            passwordError:'Password',
            successAlert: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleValidation = () =>{
        console.log("entering validation");
        var passed = true;
        if (this.state.name == ""){
            passed = false;
            this.setState({
                nameError: "Name field cannot be empty"
            })
        }
        if (this.state.email == ""){
            passed = false;
            this.setState({
                emailError: "Email field cannot be empty"
            })
        }
        if (this.state.username == ""){
            passed = false;
            this.setState({
                usernameError: "Username field cannot be empty"
            })
        }
        if (this.state.password ==""){
            passed = false;
            this.setState({
                passwordError: "Password field cannot be empty"
            })
        }
        return passed;

    }

    showSuccessAlert = () =>{
        return <SweetAlert 
            success
            title="Woot!"
            onConfirm={() => {this.props.history.push('/login')}}
            >
            Account Registered!
            </SweetAlert>   
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        this.setState({
            usernameError: 'Username',
            emailError: 'Email',
            nameError:'Name',
            passwordError:'Password'
        })

        var validationErrors = this.handleValidation();
        //validationErrors true is passed, false if violation
        if (!validationErrors){
            console.log("failed validation");
            this.props.history.push('/register');
            return null;
        }

        axios.post(`${BASE_URL}/register`, {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then (res => {
            console.log(res.data.duplicateEmail + " " + res.data.duplicateUsername);
            if(!res.data.duplicateUsername && !res.data.duplicateEmail){
                this.setState({
                    successAlert: this.showSuccessAlert()
            });
            }
            else{
                if (res.data.duplicateUsername){
                   this.setState({
                       usernameError: res.data.duplicateUsername
                   })
                }
                if (res.data.duplicateEmail){
                    this.setState({
                        emailError: res.data.duplicateEmail
                    })
                }
            }
        }).catch(error =>{
            this.setState({
                errorMessage: this.state.errorMessage.push("Failed to register")
            }) 
            this.setShowError(true); 
        this.props.history.push('/register')
        });
    
    }

    nameField = () =>{
        var textColor = 'black';
        if (this.state.nameError != 'Name'){
            textColor = 'red';
        }
            return <label htmlFor="name" style={{ color: textColor }}>{this.state.nameError}</label>
    }

    emailField = () =>{
        var textColor = 'black';
        if (this.state.emailError != 'Email'){
            textColor = 'red';
        }
            return <label htmlFor="email" style={{ color: textColor }}>{this.state.emailError}</label>
    }

    usernameField = () =>{
        var textColor = 'black';
        if (this.state.usernameError != 'Username'){
            textColor = 'red';
        }
            return <label htmlFor="username" style={{ color: textColor }}>{this.state.usernameError}</label>
    }

    passwordField = () =>{
        var textColor = 'black';
        if (this.state.passwordError != 'Password'){
            textColor = 'red';
        }
            return <label htmlFor="password" style={{ color: textColor }}>{this.state.passwordError}</label>
    }

    render() {
        return <div className = "base-container">
            <Navbar />
            <div className = "content">
                <div className = "image">
                    <img src = {loginLogo}/>
                </div>
                <div className = "form"> Please fill in the following information: <hr/>
                    <div className = "form-group">
                            {this.nameField()}
                            <input type="text" name="name" placeholder="Name" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                        {this.emailField()}
                            <input type="text" name="email" placeholder="Email" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                        {this.usernameField()}
                            <input type="text" name="username" placeholder="Username" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                        {this.passwordField()}
                            <input type="text" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                </div>
            </div>
            <div className="footer"> 
            <Button type="button" className="btn" onClick={this.handleSubmit}>
                Register!
            </Button>
            </div>
            {this.state.successAlert}

        </div>
    }


}