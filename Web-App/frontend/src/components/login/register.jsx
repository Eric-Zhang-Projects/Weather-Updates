import React from "react";
import loginLogo from "../../images/registerLogo.png";
import axios from "axios";
import Navbar from '../navbar/Navbar';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            name: '',
            email: '',
            username: '',
            password: '',
            alertVisibleError: false,
            alertVisibleSuccess: false,
            errorMessage: [],
            variant: 'danger',
            title: 'Whoops! You got an error :('
        };
        this.setShowError = this.setShowError.bind(this);
        this.setShowSuccess = this.setShowSuccess.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.BadRegisterAlert = this.BadRegisterAlert.bind(this);
        this.SuccessfulRegisterAlert = this.SuccessfulRegisterAlert.bind(this);
    }

    setShowError = (bool) =>{
        this.setState({
            alertVisibleError: bool
        });
    }

    setShowSuccess = (bool) =>{
        this.setState({
            alertVisibleSuccess: bool
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleValidation = () =>{
        console.log("entering validation");
        var err = [];
        if (this.state.name == ""){
            err.push("Name field cannot be empty");
        }
        if (this.state.email == ""){
            err.push("Email field cannot be empty");
        }
        if (this.state.username == ""){
            err.push("Username field cannot be empty");
        }
        if (this.state.password ==""){
            err.push("Password field cannot be empty");
        }
        return err;        
    }

    BadRegisterAlert = () => {
      
        if (this.state.alertVisibleError) {
          return (
            <Alert variant={this.state.variant} onClose={() => this.setShowError(false)} dismissible>
              <Alert.Heading>{this.state.title}</Alert.Heading>
              <hr />
                { this.state.errorMessage.map((item, index)=>{
                        return (
                            <div>
                            <p key={index}>{item}</p>
                            </div>
                        )
                })
                }
                  
            </Alert>
          );
        }
        return null;
      }

      SuccessfulRegisterAlert = () => {   
          if (this.state.alertVisibleSuccess){   
        return (
            <Alert variant= {this.state.variant}>
              <Alert.Heading>{this.state.title}</Alert.Heading>
              <hr />
                { this.state.errorMessage.map((item, index)=>{
                        return (
                            <div>
                            <p key={index}>{item}</p>
                            </div>
                        )
                })
                }
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => this.props.history.push('/login')} variant="outline-success">
                  Take me to login!
                </Button>
              </div>
            </Alert>
        );
      }
        return null;
      }

    handleSubmit = (event) =>{
        event.preventDefault();

        this.setState({
            alertVisibleError: false,
            alertVisibleSuccess: false
        })

        var vErrs = this.handleValidation();
        if (vErrs.length >0){
            console.log("failed validation");
            this.setState({
                errorMessage: vErrs
            }) 
            this.setShowError(true);
            this.props.history.push('/register');
            return null;
        }

        axios.post('http://localhost:8080/register', {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then (res => {
            console.log(res.data.duplicateEmail + " " + res.data.duplicateUsername);
            if(!res.data.duplicateUsername && !res.data.duplicateEmail){
                //alert("New User successfully created! Please login");
                var successful = ["Your new account has been created. Please login with your credentials!"];
                this.setState({
                    errorMessage: successful,
                    title: "Hello " + this.state.name + ", welcome!",
                    variant: "success"
                })
                this.setShowSuccess(true);
                //this.props.history.push('/register');
            }
            else{
                var err = [];
                if (res.data.duplicateUsername){
                   err.push(res.data.duplicateUsername);
                }
                if (res.data.duplicateEmail){
                    err.push(res.data.duplicateEmail)
                }
                console.log(err.length);
                this.setState({
                    errorMessage: err
                }) 
                this.setShowError(true);
                //this.props.history.push('/register');
            }
        }).catch(error =>{
            this.setState({
                errorMessage: this.state.errorMessage.push("Failed to register")
            }) 
            this.setShowError(true); 
        this.props.history.push('/register')
        });
    
    }

    render() {
        return <div className = "base-container">
            <Navbar />
            <div className = "content">
                <div className = "image">
                    <img src = {loginLogo}/>
                </div>
                <div className = "form">
                    <div className = "form-group">
                            <label htmlFor="password">Name</label>
                            <input type="text" name="name" placeholder="Name" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="password">Email</label>
                            <input type="text" name="email" placeholder="Email" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="Username" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                </div>
            </div>
            <div className="footer"> 
            <Button type="button" className="btn" onClick={this.handleSubmit}>
                Register!
            </Button>
            </div>
            <div className = "alert"><this.BadRegisterAlert/></div>
            <div className = "alert"><this.SuccessfulRegisterAlert/></div>


        </div>
    }


}