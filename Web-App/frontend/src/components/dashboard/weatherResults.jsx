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
        const jwt = getJwt();
        if (jwt == null){
            this.props.history.push('/login');
        }
        const history = createBrowserHistory();
        const location = history.location;
        this.setState({
            cityName: location.state.cityName,
            cityState: location.state.cityState
        })
        axios.post(`${BASE_URL}/getWeatherForCity`, 
        {cityName: location.state.cityName,
        cityState: location.state.cityState},
        { headers: {'Authorization': `Bearer ${jwt}`}})
        .then( result => {
        console.log("check if city exists: " + JSON.stringify(result.data));
        // if (JSON.stringify(result.data).length > 2){
        //     // result.data.map((city)=>{
        //     //   console.log(city + " " + city.name);
        //     // })
        //     console.log("hello");
        //     this.props.history.push(
        //       '/searchResults', {
        //       cities: result.data,
        //       cityName: this.state.city});
        //   }
        //   else{
        //     console.log("city does not exist");
        //   }
        }).catch(err => {
          console.log(err.messasge);
       //   this.props.history.push('/login');
      });
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
