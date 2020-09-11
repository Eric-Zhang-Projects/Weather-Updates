import React from "react";
import loginLogo from "../../images/loginLogo.png";
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt, isLoggedIn } from '../helpers/jwtHelper';
import Navbar from '../navbar/Navbar';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';



export class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            username: '',
            password: '',
            alertVisible: false
        };
        this.setShow = this.setShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.BadCredentialsAlert = this.BadCredentialsAlert.bind(this);
    }

    setShow = (bool) =>{
        this.setState({
            alertVisible: bool
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    BadCredentialsAlert = () => {
      
        if (this.state.alertVisible) {
          return (
            <Alert variant="danger" onClose={() => this.setShow(false)} dismissible>
              <Alert.Heading>Whoops! You got an error :(</Alert.Heading>
              <p>Invalid username and password combination, please try again</p>
            </Alert>
          );
        }
        return null;
      }
      

    handleSubmit = (event) =>{
        event.preventDefault();

        const jwt = getJwt();
        console.log('passed in jwt:\n' + jwt);
        
        const isLogged = isLoggedIn();
        console.log("is logged in? " + isLogged);

        axios.post(`${BASE_URL}/authenticate`, {
            username: this.state.username,
            password: this.state.password
        }, ).then (res => {
            if (res.data.jwt == null){
                this.setShow(true);
             //   alert("Invalid username and password combination, please try again");
                this.props.history.push('/login');
            }
            else{
            console.log(res.data.jwt);
            localStorage.setItem('jwt', res.data.jwt);
            this.props.history.push('/dashboard', { from: '/login'});
            }
        }).catch(error => {
        this.setShow(true);
        this.props.history.push('/login');
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
            <div className = "button">
            <Button type="button" className="btn" onClick={this.handleSubmit}>
                Login!
            </Button>
            </div>
            <div className = "alert"><this.BadCredentialsAlert/></div>

            </div>
            </div>
 
    }


}