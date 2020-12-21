import React from "react";
import Navbar from "../navbar/Navbar";

export class About extends React.Component {

    render() {
        return <div>
        
        <div className = "base-container">
        <Navbar />
            <div style={{"padding":"15vh"}}>
            To Do:
            <hr/>
            <ul style={{"": "left"}}>
                <li>send emails if weather changes</li>
                <li>confirm email can confirm any email and reset password for anyones account</li>
                <li> create lambda with cron job</li>
                <hr/>
                <li> password encryption</li>
                <li>filter by us vs country</li>
            </ul>
            </div>       
        </div>
        </div>
        }


}