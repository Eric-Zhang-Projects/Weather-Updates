import React from "react";
import loginLogo from "../../images/registerLogo.png";
import axios from "axios";

export class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            name: '',
            email: '',
            username: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) =>{
        event.preventDefault();

        axios.post('http://localhost:8080/register', {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then (res => {
            console.log(res.data);
            alert("New User successfully created! Please login");
            this.props.history.push('/login');
        }).catch(error => 
        alert("Failed to register", error));
        this.props.history.push('/register');

    }

    render() {
        return <div className = "base-container">
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
            <button type="button" className="btn" onClick={this.handleSubmit}>
                Register!
            </button>
            </div>
        </div>
    }


}