import React from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt, isLoggedIn } from '../helpers/jwtHelper';
import Button from 'react-bootstrap/Button';
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { createBrowserHistory } from 'history';


export class UpdateInfo extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            oldUsername: '',
            oldPassword: '',
            oldEmail: '',
            oldName: '',
            newUsername: '',
            newPassword: '',
            newEmail: '',
            newName: '',
        }

        this.handleSubmitChanges = this.handleSubmitChanges.bind(this);

    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount(){

        const jwt = getJwt();
        if (!isLoggedIn){
            alert("Please log in");
            this.props.history.push('/login');
        }
        console.log('passed in jwt:\n' + jwt);

        const history = createBrowserHistory();
        const location = history.location;
        this.setState({
            oldUsername: location.state.state.username, 
            oldPassword: location.state.state.password,
            oldName: location.state.state.name,
            oldEmail: location.state.state.email
        })
        
    }

    handleSubmitChanges = (event) => {
        event.preventDefault();

        const jwt = getJwt();

        console.log("current name: " + this.state.oldName + " " +this.state.newName);
        Axios.post(`${BASE_URL}/updateInfo`, {
            oldName: this.state.oldName,
            oldEmail: this.state.oldEmail,
            oldUsername: this.state.oldUsername,
            oldPassword: this.state.oldPassword,
            newName: this.state.newName,
            newEmail: this.state.newEmail,
            newUsername: this.state.newUsername,
            newPassword: this.state.newPassword },
            {headers: {'Authorization': `Bearer ${jwt}`}})
        .then(result => {
            console.log(result.data);
            if (this.state.newUsername != ""){
                this.props.history.push("/logout");
            }
            this.props.history.push("/dashboard");
        }).catch (error => {
            console.log(error);
        });
    }
        
        render(){
            return (
            <div className = "base-container">
             <NavbarLoggedIn/>
             <div className = "form">
                 <div>Please only input the information you would like to change, leaving the other fields empty</div>
                    <div className = "form-group">
                            <label htmlFor="password">Name</label>
                            <input type="text" name="newName" placeholder={"Current: " + this.state.oldName} value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="password">Email</label>
                            <input type="text" name="newEmail" placeholder= {"Current: " + this.state.oldEmail}  value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="newUsername" placeholder={"Current: " + this.state.oldUsername} value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="newPassword" placeholder={"Current: " + this.state.oldPassword} value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                </div>
                    <hr/>
                    <hr/>
                    <Button type="button" className="btn" onClick={this.handleSubmitChanges}>Submit Changes</Button>  
          
                    </div>
            
            )
        }
    }