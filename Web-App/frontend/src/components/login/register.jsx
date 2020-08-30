import React from "react";
import loginLogo from "../../images/registerLogo.png";

export class Register extends React.Component {

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
                            <label htmlFor="password">Name</label>
                            <input type="text" name="password" placeholder="Name"/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="password">Email</label>
                            <input type="text" name="password" placeholder="Email"/>
                        </div>
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
                Register!
            </button>
            </div>
        </div>
    }


}