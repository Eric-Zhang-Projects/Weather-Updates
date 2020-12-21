import React from "react";
import Button from 'react-bootstrap/Button';
import Navbar from '../navbar/Navbar';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import { createBrowserHistory } from 'history';

export class PageError extends React.Component {

    state = {
        loggedIn: 'false'
    }

    handleClick = () =>{
        if (this.state.loggedIn==="true"){
            this.props.history.push("/dashboard");
        } else {
            this.props.history.push("/login");
        }
    }

    componentDidMount = () => {
        const history = createBrowserHistory();
        const location = history.location;
        if (location.state.loggedIn==="true"){
           this.setState({
               loggedIn: "true"
           })
        }
    }

    errorMessage = () => { 
        if (this.state.loggedIn === "true"){
            return (
                <div> 
                <NavbarLoggedIn/>
                <div className = "page-error-base">
                        <div>
                        <h1>Whoops!</h1>
                        <h5>Looks like you may have skipped a step...</h5>
                        <hr/>
                        <Button type="button" className="btn" onClick={this.handleClick}>Back to Dashboard</Button>     
                        </div>  
                </div>
                </div>
                )
        } else {
            return (
                <div> 
                <Navbar/>
                <div className = "page-error-base">
                        <div>
                        <h1>Whoops!</h1>
                        <h5>Looks like you may have skipped a step....</h5>
                        <hr/>
                        <Button type="button" className="btn" onClick={this.handleClick}>Back to home page</Button>     
                        </div>  
                </div>
                </div>
                )
        }
    }

    render(){
        return (
            <div>
            {this.errorMessage()}
            </div>
        )
    }
}