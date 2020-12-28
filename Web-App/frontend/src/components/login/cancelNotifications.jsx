import React from "react";
import Navbar from '../navbar/Navbar';
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import Button from 'react-bootstrap/Button';
import warning from "../../images/warning_128.png";
import check from "../../images/check_128.png";

export class CancelNotifications extends React.Component {

    state = {
        showResult: null
    }

    componentDidMount = () => {
        try {
            const encodedEmail = this.props.location.search.substring(3);
            console.log("confirm encoded email: " + encodedEmail);
            axios.post(`${BASE_URL}/cancelnotificationsbyemail`, {email: encodedEmail},
            { headers: { "Content-Type": "application/json; charset=UTF-8" }})
            .then(res => {
                console.log("result: " + res.data);
                if (res.data === "success"){
                    this.setState({showResult: this.success()})
                } else {
                    this.setState({showResult: this.error(res.data)})
                }
            }).catch(error => {
                console.log(error);
            });
        } catch (e){
            this.props.history.push('/pageerror', {loggedIn: "false"});
        } 
    }

    success = () => {
        return (
            <div>
                <img alt="" src={check} style={{"width": "128px", "height": "128px", "marginBottom": "24px"}}></img>
                <div>Success!</div>
                <div>Your notifications have been canceled.</div>
            </div>
        )
    }

    error = (msg) => {
        return (
            <div>
                <img alt="" src={warning} style={{"width": "128px", "height": "128px", "marginBottom": "24px"}}></img>
                <div>Error!</div>
                <div>{msg}</div>
            </div>
        )
    }


    render() {
        return <div>
        <Navbar/>     
        <div className = "forgot-password-base">
            <div className = "forgot-password-content">
            {this.state.showResult}
            <Button style={{"marginTop": "24px"}} onClick={()=>this.props.history.push('/login')}>Back home</Button>
            </div>
        </div>
        </div>
    }
}