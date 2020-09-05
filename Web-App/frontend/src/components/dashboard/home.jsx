import React from "react";
import axios from 'axios';
import { getJwt } from '../helpers/jwtHelper';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            info: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {

        const jwt = getJwt();
        if (jwt == null){
            this.props.history.push('/login');
        }
        console.log('passed in jwt:\n' + jwt);

         axios.get('http://localhost:8080/dashboard', 
         { headers: {'Authorization': `Bearer ${jwt}`}})
         .then( result => {
             console.log("HOME");
             console.log(result.data.greeting);
            this.setState({
                info: result.data.greeting
            });
        }).catch(err => {
            console.log(err.messasge);
            alert("Valid credentials but failed to log in");
         //   this.props.history.push('/login');
        });
    }

    render() {
        return <div className = "base-container">
            <NavbarLoggedIn/>
            <div className = "content">
                {this.state.info}
            </div>
        </div>
    }

}
