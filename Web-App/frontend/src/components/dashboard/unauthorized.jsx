import React from "react";
import Button from 'react-bootstrap/Button';


export class Unauthorized extends React.Component {

    handleClick = () =>{
        this.props.history.push("/login");
    }

    render(){

        return (
            <div className = "base-container">
                    <div>
                    Hey big man you lost?
                    </div>
                    <hr/>
                    <Button type="button" className="btn" onClick={this.handleClick}>Go Home</Button>       
            </div>
            )


    }
}