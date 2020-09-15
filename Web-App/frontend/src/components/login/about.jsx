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
                <li> make current navbar link underlined </li>
                <li>Account info + updating and deleting (done)</li>
                <li>alerts/popups for updating account (done)</li>
                </ul>
                <ul>
                {/* for updating -> need to make sure duplicate user checking works for updating -> also need to include alerts on success and failure and figure out rerouting issue */}
                <hr/><br/>
                <li>Dashboard page with current weather info + search bar option + weather functionality</li>
                <li> forgot password</li>
                <li> password encryption</li>
                <li> sending emails with weather info</li>
                <li> create lambda with cron job</li>
                <li> styling smh</li>
                <li> clean up code and imports</li>



            </ul>
       
        </div>
        </div>
        }


}