import React from "react";
import axios from 'axios';
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import Card from 'react-bootstrap/Card';
import { createBrowserHistory } from 'history';
import Tab from 'react-bootstrap/Tab';
import sun from "../../images/sun_128.png";
import rain from "../../images/rain_128.png";
import lightning from "../../images/lightning_128.png";
import windy from "../../images/windy_128.png";
import snow from "../../images/snow_128.png";
import cloudy from "../../images/cloudy_128.png";


import Tabs from 'react-bootstrap/Tabs';


export class WeatherResults extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            cityName: "",
            cityState: "",
            dailyForecast: [],
            weeklyForecast: [],
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
            this.setState({
                dailyForecast: result.data.dayResponse,
                weeklyForecast: result.data.forecastResponse
            })
        console.log("daily: " + JSON.stringify(this.state.dailyForecast));
        console.log("forecast: " + JSON.stringify(this.state.weeklyForecast));
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

    weatherImg = (descriptions) => {
        return descriptions.map((desc) => {
            if (desc.includes("sun") || desc.includes("clear")){
                console.log("true!");
                return <Card.Img variant="top" src={sun} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            } 
            else if (desc.includes("cloud")) {
                return <Card.Img variant="top" src={cloudy} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            }
            else if (desc.includes("wind")){
                console.log("true!");
                return <Card.Img variant="top" src={windy} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            } 
            else if (desc.includes("rain")){
                console.log("true!");
                return <Card.Img variant="top" src={rain} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            } 
            else if (desc.includes("lightning") || desc.includes("storm") || desc.includes("thunder")){
                console.log("true!");
                return <Card.Img variant="top" src={lightning} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            } 
            else if (desc.includes("snow")){
                console.log("true!");
                return <Card.Img variant="top" src={snow} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            } 
            //default
            return <Card.Img variant="top" src={sun} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
        })
    }

    test = (hi) =>{
                return <Card.Img variant="top" src={rain} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            }

    render () {
        return <div className = "weather-container-base">
            <NavbarLoggedIn/>
            <h1 style={{"fontFamily": "Open Sans, sans-serif", padding:"20px"}}>Showing Results for {this.state.cityName}, {this.state.cityState}</h1>
            <div className = "weather-container-main">
            <div className = "weather-tabs">
            <Tabs defaultActiveKey="Daily Forecast" id="uncontrolled-tab-example">
                <Tab eventKey="Daily Forecast" title="Daily Forecast" style={{"paddingTop": "20px"}}>
                    {this.state.dailyForecast.map((day, i) => (
                    <div className = "weather-card">
                    <Card style={{width: "flex", display: "inline-block", "marginRight": "5px"}}>
                        {this.weatherImg(day.descriptions)}
                        <Card.Body>
                            <Card.Title style={{"fontSize": "15px"}}>{day.dateTime}</Card.Title>
                            <Card.Text>
                            Temperature: {day.temp} F
                            <br/>
                            Feels Like: {day.feelsLike} F
                            <br/>
                            Conditions: {day.descriptions}
                            <br/>
                            Humidity: {day.humidity}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                    ))}
                </Tab>
                <Tab eventKey="Weekly Forecast" title="Weekly Forecast" style={{"paddingTop": "20px"}}>
                {this.state.weeklyForecast.map((day, i) => (
                    <div className = "weather-card">
                    <Card style={{width: "flex", display: "inline-block", "marginRight": "5px"}}>
                        {this.weatherImg(day.descriptions)}
                        <Card.Body>
                            <Card.Title style={{"fontSize": "15px"}}>{day.date}</Card.Title>
                            <Card.Text>
                            Day's Range: {day.minTemp} F - {day.maxTemp} F
                            <br/>
                            Avg Temp: {day.avgTemp} F
                            <br/>
                            Conditions: {day.descriptions}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </div>
                    ))}
                </Tab>
            </Tabs>
            </div>
            </div>
        </div>
    }

}
