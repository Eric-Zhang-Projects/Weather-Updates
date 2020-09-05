import React from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt, isLoggedIn } from '../helpers/jwtHelper';
import Navbar from "../navbar/Navbar";
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
            zip: 'N/A'
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
        }).catch(err =>{
            console.log(err);
            alert("failed account!");
        })

    }


    handleSubmit = (event) =>{
        event.preventDefault();

    }


    render(){
        return (
        <div className = "base-container">
            <NavbarLoggedIn/>
            <div>
            Username: {this.state.username}
            </div>
            <div>
            Password: {this.state.password}
            </div>
            <div>
            Email: {this.state.email}
            </div>
            <div>
            Name:: {this.state.name}
            </div>
            <div>
            City: {this.state.city}
            </div>
            <div>
            Zip: {this.state.Zip}
            </div>
        </div>
        )
    }
}