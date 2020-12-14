import React from "react";
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import Button from 'react-bootstrap/Button';
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { createBrowserHistory } from 'history';
import SweetAlert from 'react-bootstrap-sweetalert';

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
            enterAllFields: 'Please only input the information you would like to change, leaving the other fields empty.',
            allFieldsTextColor: 'black',
            successAlert: null,
            successMessage: '',
            redirectTo: '',
            usernameError: 'Username',
            emailError: 'Email',
            title: ''
        }

        this.handleSubmitChanges = this.handleSubmitChanges.bind(this);
    
    }

    showSuccessAlert = () =>{
        return <SweetAlert 
            success
            title="Woot!"
            onConfirm={() => {this.props.history.push(this.state.redirectTo)}}
            >
            {this.state.successMessage}
            </SweetAlert>   
    }

    confirmAlert = () =>{
        return <SweetAlert
        warning
        showCancel
        confirmBtnText="Confirm Changes"
        confirmBtnBsStyle="danger"
        title={this.state.title}
        onConfirm={() => this.handleSubmitChanges()}
        onCancel={() => this.props.history.push('/account')}
        focusCancelBtn 
          //  success
          //  title="A!"
            >
            {this.state.successMessage}
            </SweetAlert>   
    }

    // helper = () => {
    //     this.setState({successAlert: null})
    //     ; 
    // }


    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount(){

        const jwt = getJwt();
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

    handleConfirmChanges = (event) => {
        event.preventDefault();

        console.log("change? " + (this.state.newName === '' && this.state.newUsername === '' && this.state.newEmail === '' && this.state.newPassword === ''));
        if (this.state.newName === '' && this.state.newUsername === '' && this.state.newEmail === '' && this.state.newPassword === ''){
            this.setState({enterAllFields: "Please enter at least one field to update, or cancel",
            allFieldsTextColor: 'red',
            emailError: 'Email',
            usernameErro: 'Username'
        })
        }
        else{
            console.log("passed");
            if (this.state.newUsername!== ''){
                console.log("changed username");
                this.setState({
                    title: "This action will require you to re-log in",
            }, () =>{
                console.log(this.state.title);
            })
            }
            else{
                console.log("didnt change username");
                this.setState({
                    title: "Are you sure you want to update this information?",
            }, () =>{
                console.log(this.state.title);
            })
            }
        }

    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.title!==this.state.title && this.state.title!=='-1'){
            console.log("state change");
            this.setState({successAlert: this.confirmAlert()}, () =>{
                console.log(this.state.title);
            });
        }
    }

    handleSubmitChanges = () => {

        this.setState({
            usernameError: 'Username',
            emailError: 'Email',
            successAlert: null,
            enterAllFields: 'Please only input the information you would like to change, leaving the other fields empty',
            allFieldsTextColor: 'black'
        })

        const jwt = getJwt();

        console.log("current name: " + this.state.oldName + " " +this.state.newName);
        axios.post(`${BASE_URL}/updateInfo`, {
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
                if (this.state.newUsername !== ""){
                this.setState({
                    successMessage: "Your credentials have been updated. Please login again with your new credentials!",
                    redirectTo: '/logout'
                });
                this.setState({successAlert: this.showSuccessAlert()});
                }
                else{
                    this.setState({
                        successMessage: "Your credentials have been updated!",
                        redirectTo: '/account',
                    });
                    this.setState({successAlert: this.showSuccessAlert()});
                }
            }
            else{
                if (res.data.duplicateUsername){
                    this.setState({
                        usernameError: res.data.duplicateUsername
                    })
                 }
                 if (res.data.duplicateEmail){
                     this.setState({
                         emailError: res.data.duplicateEmail
                     })
                 }
                 this.setState({title: '-1'});
            }
        }).catch (error => {
            console.log(error);
        });
    }


    emailField = () =>{
        var textColor = 'black';
        if (this.state.emailError !== 'Email'){
            textColor = 'red';
        }
            return <label htmlFor="email" style={{ color: textColor }}>{this.state.emailError}</label>
    }

    usernameField = () =>{
        var textColor = 'black';
        if (this.state.usernameError !== 'Username'){
            textColor = 'red';
        }
            return <label htmlFor="username" style={{ color: textColor }}>{this.state.usernameError}</label>
    }

    allFields = () => {
        return <label htmlFor="allFields" style={{ color: this.state.allFieldsTextColor }}>{this.state.enterAllFields}</label>
    }
        
        render(){
            return (
            <div className = "base-container">
             <NavbarLoggedIn/>
             <div className = "form">
                 <div>{this.allFields()}</div>
                    <div className = "form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="newName" placeholder={"Current: " + this.state.oldName} value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                        {this.emailField()}
                            <input type="text" name="newEmail" placeholder= {"Current: " + this.state.oldEmail}  value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                        {this.usernameField()}
                            <input type="text" name="newUsername" placeholder={"Current: " + this.state.oldUsername} value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="newPassword" placeholder={"Current: " + this.state.oldPassword} value={this.state.value} onChange={this.handleChange} required/>
                        </div>
                        {/* <div className = "form-group">
                        <div class="d-flex justify-content-between" >
              <Button onClick={() => this.props.history.push('/account')} variant="outline-danger">Cancel</Button>
              <Button type="button" className="btn" onClick={this.handleSubmitChanges} variant="outline-success">Submit Changes</Button>  
            </div> */}
            {/* </div> */}
                </div>

                <div className="d-flex justify-content-around" style={{width: "100%"}}>
              <Button onClick={() => this.props.history.push('/account')} variant="outline-danger">Cancel</Button>
              <Button type="button" className="btn" onClick={this.handleConfirmChanges} variant="outline-success">Submit Changes</Button>  
            </div>
            <p style={{"paddingTop": "20px"}}>*If you would like to change the default city saved to this account, please go to 'Dashboard', then search, find, and save a new location.</p>
            {this.state.successAlert}
            </div>

            
            )
        }
    }