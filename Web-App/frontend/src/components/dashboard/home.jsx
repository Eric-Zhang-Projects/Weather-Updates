import React from "react";
import axios from 'axios';
import { getJwt } from '../helpers/jwtHelper';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { createBrowserHistory } from 'history';


export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            info: '',
            alertVisible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.setShow = this.setShow.bind(this);
    }

    setShow = (bool) =>{
        this.setState({
            alertVisible: bool
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    SuccessfulAlert = () => {
      
        if (this.state.alertVisible) {
          return (
            <Alert variant="success" onClose={() => this.setShow(false)} dismissible>
              {/* <Alert.Heading>Logged in!</Alert.Heading> */}
              <p>Logged In!</p>
            </Alert>
          );
        }
        return null;
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
             console.log("hit dashboard");
             console.log(result.data.greeting);
             const history = createBrowserHistory();
             const location = history.location;
             try {
                if (location.state.from == '/login'){
                    this.setShow(true);
                }
                 
             } catch (error) {
                console.log('not from /login');
             }
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
            <this.SuccessfulAlert/>
            <div className = "content">
                {this.state.info}
            </div>
        </div>
    }

}
