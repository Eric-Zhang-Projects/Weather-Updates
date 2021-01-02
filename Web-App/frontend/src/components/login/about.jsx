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
                <li>make email sending multithreaded</li>
                <li> create lambda with cron job</li>
                <li>selecting a date with range for weather reporting</li>
                <li>refactor code into service + controller</li>
                <hr/>
                <li>filter by us vs country</li>
            </ul>
            </div>       
        </div>
        </div>
        }


}