import React from "react";
import loginLogo from "../../images/loginLogo.png";

export class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            username: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) =>{
       // alert("Form submit on" + JSON.stringify(this.state));
       fetch('http://localhost:8080/authenticate', {
           method: 'POST',
           body: JSON.stringify(this.state),
           headers: {
            'Content-Type': 'application/json'
           }           
       }).then(function(response) {
           console.log(response);
           //contentType: 'application/json';
           return response.json();
       }).catch(error => 
        alert("Bad Credentials", error));
    }

    render() {
        return <div className = "base-container">
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
            <button type="button" className="btn" onClick={this.handleSubmit}>
                Login!
            </button>
            </div>
        </div>
    }


}