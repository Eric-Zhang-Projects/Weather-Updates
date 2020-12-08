import React from "react";
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import Button from 'react-bootstrap/Button';
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import Card from 'react-bootstrap/Card';

export class Account extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            username: '',
            password: '',
            email: '',
            name: '',
            city: 'N/A',
            state: 'N/A',
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount(){

        const jwt = getJwt();
        console.log('passed in jwt:\n' + jwt);

        axios.get(`${BASE_URL}/account`, { headers: {'Authorization': `Bearer ${jwt}`}})
        .then(result => {
            console.log(result.data.username);
            this.setState({
                username: result.data.username,
                password: result.data.password,
                email: result.data.email,
                name: result.data.name,
                city: result.data.city,
                state: result.data.state
            });
            if (result.data.city === "" || result.data.state ===""){
                this.setState({
                    city: 'N/A',
                    state: 'N/A'
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
        <div>
         <NavbarLoggedIn/>
         <div className = "account-content-base">
            <div className = "account-content">
            <Card className="text-center" style={{"width": "30%"}}>
                <Card.Header>Current Info:</Card.Header>
                <Card.Body>
                    <Card.Text>
                <p>
                Name: {this.state.name}
                </p>
                <p>
                Email: {this.state.email}
                </p>
                <p>
                Username: {this.state.username}
                </p>
                <p>
                Password: {this.state.password}
                </p>
                <hr/>
                <p>
                Default City: {this.state.city}, {this.state.state}
                </p>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                    <Button type="button" style={{"marginRight": "10px"}} onClick={this.handleUpdateInfo}>Update Account Info</Button>  
                    <Button type="button" style={{"marginLeft": "10px"}} onClick={this.handleDeleteAccount} variant="outline-danger">Delete Account</Button>  
                    </Card.Footer>
                </Card>
                </div>
                </div>
        </div>
        )
    }
}
