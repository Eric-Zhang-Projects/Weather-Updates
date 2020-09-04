import React from "react";
import loginLogo from "../../images/loginLogo.png";

export class About extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return <div className = "base-container" >
            To Do:
            <p>Fix CORs header issue - Refused to set unsafe header "Access-Control-Request-Headers"</p>
            <p> Protected Routes</p>
            <p>Change navigation bar is logged in -> can check for jwt</p>
            <p>Pages:</p>
            <ul>
                <li>Account info</li>
                <li>Dashboard page with current weather info + search bar option</li>
                <li>Log out</li>
            </ul>
       
        </div>
    }


}