import React from "react";
import Button from 'react-bootstrap/Button';
import Navbar from '../navbar/Navbar';

export class Unauthorized extends React.Component {

    handleClick = () =>{
        this.props.history.push("/login");
    }

    render(){

        return (
            <div> 
            <Navbar/>
            <div className = "page-error-base">
                    <div>
                    <h1>Slow down a sec!</h1>
                    <h5>You must log in to continue...</h5>
                    <hr/>
                    <Button type="button" className="btn" onClick={this.handleClick}>Back to Login</Button>     
                    </div>  
            </div>
            </div>
            )
    }
}