import React from "react";
import loginLogo from "../../images/loginLogo.png";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getJwt } from '../helpers/jwtHelper';

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

        this.forceUpdate();

         axios.get('http://localhost:8080/dashboard', 
         { headers: 
            {
            'Authorization': `Bearer ${jwt}`,
            //'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Request-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
            'Access-Control-Request-Headers': 'Authorization, origin, content-type, accept'
            }
        })
         //`Bearer ${jwt}`
         .then( result => {
             console.log("HOME");
             console.log(result.data.greeting);
        //     this.setState({
        //         info: result.data.greeting
        //     });
        }).catch(err => {
            console.log(err.messasge);
            alert("Valid credentials but failed to log in");
         //   this.props.history.push('/login');
        });

        // fetch('http://localhost:8080/dashboard', 
        // { 
        //     method: "GET",
        //     mode: "cors",
        //     headers: {
        //         "Authorization": `Bearer ${jwt}`,
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
        //         "Access-Control-Allow-Headers": "Authorization",
        //         "Access-Control-Allow-Origin": "http://localhost:3000"
        //     }
        // }).then(res => {
        //     console.log("HOME");
        //     console.log(res.json());
        // }).catch(err =>{
        //     console.log(err);
        //     alert("nooo");

        // })
        // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Authorization'}}))

    }

    render() {
        return <div className = "base-container">
            <div className = "content">
                {this.state.info}
            </div>
        </div>
    }

}
