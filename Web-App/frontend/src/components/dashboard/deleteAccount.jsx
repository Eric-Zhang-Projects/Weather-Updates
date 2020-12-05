import React from "react";
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import SweetAlert from 'react-bootstrap-sweetalert';


export class DeleteAccount extends React.Component {

confirmDelete = () =>{
  console.log("confirmed deletion");
  const jwt = getJwt();
  axios.post(`${BASE_URL}/deleteAccount`, {}, { headers: {'Authorization': `Bearer ${jwt}`}})
  .then(res => {
      console.log(res.data);
      this.props.history.push('/logout');

  }).catch( err => {
      console.log(err);
  });
}

showFinalPopup = () => {
  console.log("showing popup");
  //console.log(this.state.finalAlert);
  return <SweetAlert
  warning
  showCancel
  confirmBtnText="Yes, delete my account"
  confirmBtnBsStyle="danger"
  title="Are you sure?"
  onConfirm={() => this.confirmDelete()}
  onCancel={() => this.props.history.push('/account')}
  focusCancelBtn
>
  This will permanently delete your account and information from this application
</SweetAlert>
}

render(){
    return (
    <div className = "base-container">
     <NavbarLoggedIn/>
     <div>{this.showFinalPopup()}</div>
     </div>
    )
}
}
