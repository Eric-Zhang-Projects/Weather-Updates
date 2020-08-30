import React from "react";
import loginLogo from "../../images/loginLogo.png";

export class Login extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return <div className = "base-container">
            <div className = "content">
                <div className = "image">
                    <img src = {loginLogo}/>
                </div>
                <div className = "form">
                    <div className = "form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Username"/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" placeholder="Password"/>
                    </div>
                </div>
            </div>
            <div className="footer"> 
            <button type="button" className="btn">
                Login!
            </button>
            </div>
        </div>
    }


}