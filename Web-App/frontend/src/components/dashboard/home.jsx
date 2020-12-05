import React from "react";
import axios from 'axios';
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { createBrowserHistory } from 'history';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import sun from "../../images/sun_128.png";
import rain from "../../images/rain_128.png";
import lightning from "../../images/lightning_128.png";
import windy from "../../images/windy_128.png";
import snow from "../../images/snow_128.png";
import cloudy from "../../images/cloudy_128.png";

export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            alertVisible: false,
            city: '',
            dailyForecast: [],
            weeklyForecast: [],
            defaultCity: '',
            defaultState: '',
            showingError: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.setShow = this.setShow.bind(this);
    }

    setShow = (bool) =>{
        this.setState({
            alertVisible: bool
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        this.setState({showingError: false});
    }

    SuccessfulAlert = () => {
      
        if (this.state.alertVisible) {
          return (
            <Alert variant="success" onClose={() => this.setShow(false)} dismissible>
              <Alert.Heading>Welcome back!</Alert.Heading>
              <p>Logged In</p>
            </Alert>
          );
        }
        return null;
      }

    componentDidMount() {
        const jwt = getJwt();
        if (jwt === null){
            this.props.history.push('/login');
        }
        console.log('passed in jwt:\n' + jwt);

        axios.get(`${BASE_URL}/dashboard`, 
        { headers: {'Authorization': `Bearer ${jwt}`}})
        .then( result => {
            this.setState({
                dailyForecast: result.data.dayResponse,
                weeklyForecast: result.data.forecastResponse,
                defaultCity: result.data.cityName,
                defaultState: result.data.cityState
            })
            console.log(this.state.defaultCity + ", " + this.state.defaultState);
        console.log("daily: " + JSON.stringify(this.state.dailyForecast));
        console.log("forecast: " + JSON.stringify(this.state.weeklyForecast));
        }).catch(err => {
          console.log(err.messasge);
      });
        //  axios.get(`${BASE_URL}/dashboard`, 
        //  { headers: {'Authorization': `Bearer ${jwt}`}})
        //  .then( result => {
        //      console.log("hit dashboard");
        //      console.log(result.data);
        //      const history = createBrowserHistory();
        //      const location = history.location;
        //      try {
        //         if (location.state.from === '/login'){
        //             this.setShow(true);
        //         }
                 
        //      } catch (error) {
        //         console.log('not from /login');
        //      }
        //     this.setState({
        //         info: result.data.city.name
        //     });
        // }).catch(err => {
        //     console.log(err.messasge);
        //     //alert("Valid credentials but failed to log in");
        //  //   this.props.history.push('/login');
        // });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const jwt = getJwt();
      if (jwt == null){
          this.props.history.push('/login');
      }
      console.log('passed in jwt:\n' + jwt);
      axios.post(`${BASE_URL}/findCity`, 
      { city: this.state.city},
      { headers: {'Authorization': `Bearer ${jwt}`}})
      .then( result => {
        //console.log("check if city exists: " + JSON.stringify(result.data));
        if (JSON.stringify(result.data).length > 2){
          // result.data.map((city)=>{
          //   console.log(city + " " + city.name);
          // })
          this.setState({
            showingError: false
          })          
          this.props.history.push(
            '/searchResults', {
            cities: result.data,
            cityName: this.state.city});
        }
        else{
          console.log("city does not exist");
          this.setState({
            showingError: true
          })
        }
      }).catch(err => {
        console.log(err.messasge);
     //   this.props.history.push('/login');
    });
    }

    weatherImg = (descriptions) => {
      return descriptions.map((desc) => {
          if (desc.includes("sun") || desc.includes("clear")){
              console.log("true!");
              return <Card.Img key="00" variant="top" src={sun} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
          } 
          else if (desc.includes("cloud")) {
              return <Card.Img key="00" variant="top" src={cloudy} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
          }
          else if (desc.includes("wind")){
              console.log("true!");
              return <Card.Img key="00" variant="top" src={windy} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
          } 
          else if (desc.includes("rain")){
              console.log("true!");
              return <Card.Img key="00" variant="top" src={rain} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
          } 
          else if (desc.includes("lightning") || desc.includes("storm") || desc.includes("thunder")){
              console.log("true!");
              return <Card.Img key="00" variant="top" src={lightning} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
          } 
          else if (desc.includes("snow")){
              console.log("true!");
              return <Card.Img key="00" variant="top" src={snow} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
          } 
          //default
          return <Card.Img key="00" variant="top" src={sun} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
      })
  }

  showError = () =>{
    if (this.state.showingError){
        return (<p style={{"color":"red"}}>Could not find a city with name: '{this.state.city}'</p>)
    }
  }

    render() {
        return <div className = "base-container">
            <NavbarLoggedIn/>
            {/* <this.SuccessfulAlert/> */}
            <div className = "search">
              <h1>Search for a city!</h1>
              <input className = "city" name = "city" value = {this.state.value} onChange = {this.handleChange} placeholder = "Enter city name"/>
              <Button type="button" className="btn" onClick={this.handleSubmit}>
                Go!
              </Button>
            </div>
            {this.showError()}
            <div className = "weather-container-main" style={{"height": "90vh"}}>
            <div className = "weather-tabs">
            <h4>{this.state.defaultCity}, {this.state.defaultState} (Default)</h4>
            <Tabs defaultActiveKey="Daily Forecast" id="uncontrolled-tab-example">
                <Tab eventKey="Daily Forecast" title="Daily Forecast" style={{"paddingTop": "20px"}}>
                    {this.state.dailyForecast.map((day, i) => (
                    <div className = "weather-card" key={i}>
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
                    <div className = "weather-card" key={i}>
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



            {/* <Toast show={this.setShow(true)} onClose={this.setShow(false)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast> */}
        </div>
    }

}
