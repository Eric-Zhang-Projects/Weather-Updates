import React from "react";
import axios from 'axios';
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { createBrowserHistory } from 'history';

export class WeatherResults extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            cityName: "",
            cityState: ""
        }
    }

    componentDidMount() {
        const history = createBrowserHistory();
        const location = history.location;
        this.setState({
            cityName: location.state.cityName,
            cityState: location.state.cityState
        })
    }

    render () {
        return <div className = "base-container">
            <NavbarLoggedIn/>
            <div className = "content">
                {this.state.cityName}, {this.state.cityState}
            </div>
        </div>
    }

}
