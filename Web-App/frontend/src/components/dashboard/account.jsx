import React from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt, isLoggedIn } from '../helpers/jwtHelper';
import Button from 'react-bootstrap/Button';
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";

export class Account extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            username: '',
            password: '',
            email: '',
            name: '',
            city: 'N/A',
            zip: 'N/A',
        }
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

        Axios.get(`${BASE_URL}/account`, { headers: {'Authorization': `Bearer ${jwt}`}})
        .then(result => {
            console.log(result.data.username);
            this.setState({
                username: result.data.username,
                password: result.data.password,
                email: result.data.email,
                name: result.data.name,
                city: result.data.city,
                zip: result.data.zip
            });
            if (result.data.city == "" || result.data.zip ==""){
                this.setState({
                    city: 'N/A',
                    zip: 'N/A'
                })
            }
        }).catch(err =>{
            console.log(err);
            alert("failed account!");
        })

    }


    handleUpdateInfo = (event) =>{
        event.preventDefault();

        console.log("state!" + this.state.username);
        this.props.history.push('/updateInfo', { state: {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            name: this.state.name
        } });

    }

    handleDeleteAccount = (event) =>{
        event.preventDefault();

        this.props.history.push('/deleteAccount');
        //show pop up alert and give user yes or no option then axios away

    }

    render(){
        return (
        <div className = "base-container">
         <NavbarLoggedIn/>
            <div className = "content">
                <div>
                Name: {this.state.name}
                </div>
                <div>
                Username: {this.state.username}
                </div>
                <div>
                Password: {this.state.password}
                </div>
                <div>
                Email: {this.state.email}
                </div>
                <hr/>
                <div>
                City: {this.state.city}
                </div>
                <div>
                Zip: {this.state.zip}
                </div>

                <hr/>
                <Button type="button" className="btn" onClick={this.handleUpdateInfo}>Update Account Info</Button>  
                <hr/>     
                <Button type="button" className="btn" onClick={this.handleDeleteAccount} variant="outline-danger">Delete Account</Button>                 
                </div>
        </div>
        )
    }
}
