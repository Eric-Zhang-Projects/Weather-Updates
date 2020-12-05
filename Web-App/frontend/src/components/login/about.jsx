import React from "react";
import Navbar from "../navbar/Navbar";

export class About extends React.Component {

    render() {
        return <div>
        
        <div className = "base-container" >
        <Navbar />
            To Do:
            <p> Protected Routes(done)</p>
            <p>Pages:</p>
            <ul>
            <li>filter by us vs country</li>
                <li>FIND OUT HOW TO DELETE CACHE ON LOGOUT</li>
                <li>Toast/Alert user after setting new default city</li>
                <li>Email notifications</li>
                <br/>
                <li> forgot password</li>
                <li> password encryption</li>
                <li> create lambda with cron job</li>
            </ul>
       
        </div>
        </div>
        }


}