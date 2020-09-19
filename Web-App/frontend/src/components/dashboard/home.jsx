import React from "react";
import axios from 'axios';
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
              <Alert.Heading>Welcome back!</Alert.Heading>
              <p>Logged In</p>
            </Alert>
          );
        }
        return null;
      }

    componentDidMount() {

        console.log(this.props.history);

        const jwt = getJwt();
        if (jwt == null){
            this.props.history.push('/login');
        }
        console.log('passed in jwt:\n' + jwt);

         axios.get(`${BASE_URL}/dashboard`, 
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
                info: result.data.city.name
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
            {/* <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */}
            {/* <Toast show={this.setShow(true)} onClose={this.setShow(false)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast> */}
        </div>
    }

}
