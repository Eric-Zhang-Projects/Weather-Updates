import React from "react";
import loginLogo from "../../images/loginLogo.png";
import Navbar from "../navbar/Navbar";

export class About extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return <div>
        
        <div className = "base-container" >
        <Navbar />
            To Do:
            <p> Protected Routes(done)</p>
            <p>Pages:</p>
            <ul>
                <li>Account info + updating and deleting</li>
                <li>Dashboard page with current weather info + search bar option</li>
                <li> alerts for login successes</li>

            </ul>
       
        </div>
        </div>
        }


}