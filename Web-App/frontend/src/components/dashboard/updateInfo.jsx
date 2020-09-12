import React from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt, isLoggedIn } from '../helpers/jwtHelper';
import Button from 'react-bootstrap/Button';
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { createBrowserHistory } from 'history';
import Alert from 'react-bootstrap/Alert';

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
            alertVisibleSuccess: false,
            alertVisibleError: false,
            errorMessage: [],
            title: '',
            variant: '',
            action: '',
            buttonTitle: ''

        }

        this.handleSubmitChanges = this.handleSubmitChanges.bind(this);
        this.setShowError = this.setShowError.bind(this);
        this.setShowSuccess = this.setShowSuccess.bind(this);
        this.BadUpdateAlert = this.BadUpdateAlert.bind(this);
        this.SuccessfulUpdateAlert = this.SuccessfulUpdateAlert.bind(this);

    }

    setShowError = (bool) =>{
        this.setState({
            alertVisibleError: bool
        });
    }

    setShowSuccess = (bool) =>{
        this.setState({
            alertVisibleSuccess: bool
        });
    }

    BadUpdateAlert = () => {
      
        if (this.state.alertVisibleError) {
          return (
            <Alert variant={this.state.variant} onClose={() => this.setShowError(false)} dismissible>
              <Alert.Heading>{this.state.title}</Alert.Heading>
              <hr />
                { this.state.errorMessage.map((item, index)=>{
                        return (
                            <div>
                            <p key={index}>{item}</p>
                            </div>
                        )
                })
                }
                  
            </Alert>
          );
        }
        return null;
      }

    SuccessfulUpdateAlert = () => {   
        if (this.state.alertVisibleSuccess){   
      return (
          <Alert variant= {this.state.variant}>
            <Alert.Heading>{this.state.title}</Alert.Heading>
            <hr />
              {/* { this.state.errorMessage.map((item, index)=>{
                      return (
                          <div>
                          <p key={index}>{item}</p>
                          </div>
                      )
              })
              } */}
            {/* <hr /> */}
            <div className="d-flex justify-content-around">
              <Button onClick={() => this.props.history.push(this.state.action)} variant="outline-success">
                {this.state.buttonTitle}
              </Button>
              {/* <Button onClick={() => this.props.history.push(this.state.action)} variant="outline-success">
                Take me to login!
              </Button> */}
            </div>
          </Alert>
      );
    }
      return null;
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
        .then(res => {
            console.log(res.data);

            if(!res.data.duplicateUsername && !res.data.duplicateEmail){
                //alert("New User successfully created! Please login");
                if (this.state.newUsername != ""){
                this.setState({
                    title: "Your credentials have been updated. Please login again with your new credentials!",
                    variant: "success",
                    action: '/logout',
                    buttonTitle: 'Back to login'
                })
                }
                else{
                    this.setState({
                        title: "Your credentials have been updated!",
                        variant: "success",
                        action: '/dashboard',
                        buttonTitle: 'Back to dashboard'
                    })
                }
                this.setShowSuccess(true);
                //this.props.history.push('/register');
            }
            else{
                var err = [];
                if (res.data.duplicateUsername){
                   err.push(res.data.duplicateUsername);
                }
                if (res.data.duplicateEmail){
                    err.push(res.data.duplicateEmail)
                }
                console.log(err.length);
                this.setState({
                    title: "Error!",
                    variant: "danger",
                    errorMessage: err
                }) 
                this.setShowError(true);
                //this.props.history.push('/register');
            }
            // if (result.data.duplicateUsername)
            // if (this.state.newUsername != ""){
            //     this.props.history.push("/logout");
            // }
            // this.props.history.push("/dashboard");
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

                    <Button type="button" className="btn" onClick={this.handleSubmitChanges}>Submit Changes</Button>  
                    <div className = "alert"><this.BadUpdateAlert/></div>
                    <div className = "alert"><this.SuccessfulUpdateAlert/></div>
                    </div>

            
            )
        }
    }