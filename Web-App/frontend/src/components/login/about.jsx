import React from "react";
import loginLogo from "../../images/loginLogo.png";

export class About extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return <div className = "base-container">
            This website was made with React and Spring Boot :)
        </div>
    }


}