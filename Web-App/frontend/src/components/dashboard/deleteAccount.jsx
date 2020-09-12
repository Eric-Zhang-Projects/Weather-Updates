import React from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt, isLoggedIn } from '../helpers/jwtHelper';
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export class DeleteAccount extends React.Component {

DeleteConfirmation = () => {    
  return (
      <Alert variant= "danger">
        <Alert.Heading>Are you sure you want to delete your account?</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-around">
        <Button onClick={() => this.props.history.push('/account')} variant="outline-success">
            No, take me back to my account page
          </Button>
          <Button onClick={() => this.handleDelete()} variant="outline-danger">
            Yes, delete my account
          </Button>
        </div>
      </Alert>
  );
}

handleDelete = () => {

    const jwt = getJwt();
    Axios.post(`${BASE_URL}/deleteAccount`, {}, { headers: {'Authorization': `Bearer ${jwt}`}})
    .then(res => {
        console.log(res.data);
        this.props.history.push('/logout');
    }).catch( err => {
        console.log(err);
    });
}



render(){
    return (
    <div className = "base-container">
     <NavbarLoggedIn/>
     <div className = "alert"><this.DeleteConfirmation/></div>
     </div>
    )
}
}
