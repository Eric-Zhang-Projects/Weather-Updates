import React from "react";
import axios from "axios";
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import Button from 'react-bootstrap/Button';
import { createBrowserHistory } from 'history';
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import SweetAlert from 'react-bootstrap-sweetalert';
import Card from 'react-bootstrap/Card';
import sun from "../../images/sun_128.png";
import rain from "../../images/rain_128.png";
import lightning from "../../images/lightning_128.png";
import windy from "../../images/windy_128.png";
import snow from "../../images/snow_128.png";
import cloudy from "../../images/cloudy_128.png";

export class Notifications extends React.Component {

    state= {
        email: '',
        cityName: '',
        cityState: '',
        snowClicked:false,
        rainClicked:false,
        lightningClicked:false,
        windyClicked:false,
        sunnyClicked:false,
        cloudyClicked:false,
        showSubmitError: false,
        showConfirmation: null,
        conditionArray: []
    }

    componentDidMount = () => {
        const jwt = getJwt();
        const history = createBrowserHistory();
        const location = history.location;
        this.setState({
            cityName: location.state.cityName,
            cityState: location.state.cityState
        })
        axios.get(`${BASE_URL}/getEmail`, 
        { headers: {'Authorization': `Bearer ${jwt}`}})
        .then( result => {
            console.log("Got email");
            this.setState({
                email: result.data
            })
        }).catch(err => {
          console.log(err.messasge);
      });
    }

    toggleSnow = () =>{
        this.setState({
            snowClicked: !this.state.snowClicked
        })
    }

    highlightSnowCard =() =>{
        if (!this.state.snowClicked){
        return (
            <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#D2D1D1"}} onClick={()=>this.toggleSnow()}>
            <Card.Img variant="top" src={snow} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            <Card.Body>
                <Card.Title style={{"fontSize": "15px"}}>Snow</Card.Title>
            </Card.Body>
        </Card>            
        )
        } else {
            return (
                <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#68D9F3", "borderWidth": "5px"}} onClick={()=>this.toggleSnow()}>
                <Card.Img variant="top" src={snow} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
                <Card.Body>
                    <Card.Title style={{"fontSize": "15px"}}>Snow</Card.Title>
                </Card.Body>
            </Card>            
            )
        }
    }

    toggleRain = () =>{
        this.setState({
            rainClicked: !this.state.rainClicked
        })
    }

    highlightRainCard =() =>{
        if (!this.state.rainClicked){
        return (
            <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#D2D1D1"}} onClick={()=>this.toggleRain()}>
            <Card.Img variant="top" src={rain} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            <Card.Body>
                <Card.Title style={{"fontSize": "15px"}}>Rain</Card.Title>
            </Card.Body>
        </Card>            
        )
        } else {
            return (
                <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#68D9F3", "borderWidth": "5px"}} onClick={()=>this.toggleRain()}>
                <Card.Img variant="top" src={rain} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
                <Card.Body>
                    <Card.Title style={{"fontSize": "15px"}}>Rain</Card.Title>
                </Card.Body>
            </Card>            
            )
        }
    }

    toggleLightning = () =>{
        this.setState({
            lightningClicked: !this.state.lightningClicked
        })
    }

    highlightLightningCard =() =>{
        if (!this.state.lightningClicked){
        return (
            <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#D2D1D1"}} onClick={()=>this.toggleLightning()}>
            <Card.Img variant="top" src={lightning} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            <Card.Body>
                <Card.Title style={{"fontSize": "15px"}}>Lightning</Card.Title>
            </Card.Body>
        </Card>            
        )
        } else {
            return (
                <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#68D9F3", "borderWidth": "5px"}} onClick={()=>this.toggleLightning()}>
                <Card.Img variant="top" src={lightning} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
                <Card.Body>
                    <Card.Title style={{"fontSize": "15px"}}>Lightning</Card.Title>
                </Card.Body>
            </Card>            
            )
        }
    }

    toggleWindy = () =>{
        this.setState({
            windyClicked: !this.state.windyClicked
        })
    }

    highlightWindyCard =() =>{
        if (!this.state.windyClicked){
        return (
            <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#D2D1D1"}} onClick={()=>this.toggleWindy()}>
            <Card.Img variant="top" src={windy} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            <Card.Body>
                <Card.Title style={{"fontSize": "15px"}}>Windy</Card.Title>
            </Card.Body>
        </Card>            
        )
        } else {
            return (
                <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#68D9F3", "borderWidth": "5px"}} onClick={()=>this.toggleWindy()}>
                <Card.Img variant="top" src={windy} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
                <Card.Body>
                    <Card.Title style={{"fontSize": "15px"}}>Windy</Card.Title>
                </Card.Body>
            </Card>            
            )
        }
    }

    toggleSunny = () =>{
        this.setState({
            sunnyClicked: !this.state.sunnyClicked
        })
    }

    highlightSunnyCard =() =>{
        if (!this.state.sunnyClicked){
        return (
            <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#D2D1D1"}} onClick={()=>this.toggleSunny()}>
            <Card.Img variant="top" src={sun} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            <Card.Body>
                <Card.Title style={{"fontSize": "15px"}}>Sunny</Card.Title>
            </Card.Body>
        </Card>            
        )
        } else {
            return (
                <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#68D9F3", "borderWidth": "5px"}} onClick={()=>this.toggleSunny()}>
                <Card.Img variant="top" src={sun} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
                <Card.Body>
                    <Card.Title style={{"fontSize": "15px"}}>Sunny</Card.Title>
                </Card.Body>
            </Card>            
            )
        }
    }

    toggleCloudy = () =>{
        this.setState({
            cloudyClicked: !this.state.cloudyClicked
        })
    }

    highlightCloudyCard =() =>{
        if (!this.state.cloudyClicked){
        return (
            <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#D2D1D1"}} onClick={()=>this.toggleCloudy()}>
            <Card.Img variant="top" src={cloudy} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
            <Card.Body>
                <Card.Title style={{"fontSize": "15px"}}>Cloudy</Card.Title>
            </Card.Body>
        </Card>            
        )
        } else {
            return (
                <Card style={{width: "flex", display: "inline-block", "marginRight": "5%", "textAlign":"center", "cursor": "pointer", "borderColor": "#68D9F3", "borderWidth": "5px"}} onClick={()=>this.toggleCloudy()}>
                <Card.Img variant="top" src={cloudy} style={{"width": "128px", "height": "128px", "marginTop": "24px"}} />
                <Card.Body>
                    <Card.Title style={{"fontSize": "15px"}}>Cloudy</Card.Title>
                </Card.Body>
            </Card>            
            )
        }
    }

    onSubmit =() => {
        if (this.state.snowClicked || this.state.rainClicked || this.state.lightningClicked || this.state.windyClicked || this.state.sunnyClicked || this.state.cloudyClicked){
            console.log("show popup for confirm notifications");
            this.setState({
                showSubmitError: false,
                showConfirmation: this.showConfirmationPopup()
            })
        } else {
            this.setState({
                showSubmitError: true
            })
        }
    }

    showSubmitError =() =>{
        if (this.state.showSubmitError){
            return (<p style={{"color":"red"}}>Please select a notification type</p>)
        }
    }

    showConfirmationPopup = () => {
        return <SweetAlert
        success
        showCancel
        confirmBtnText="Yes, delete my account"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => this.confirmNotifications()}
        onCancel={() => this.setState({showConfirmation: false})}
        focusCancelBtn
      >
    This will confirm that you will recieve notifications for if:
    </SweetAlert>
    }

    confirmNotifications =() =>{
        console.log("call api to send notifications");
        axios.post(`${BASE_URL}/setNotifications`, {
            conditions: this.state.conditionArray,
        }).then (res => {
            console.log("confirmed notifications");
            this.props.history.push('/dashboard')
        }).catch(error =>{
            alert("Failed to sign up for notifications");
            this.props.history.push('/notifications')
        });
    }

    render() {
        return (<div className = "notifications-base">
            <NavbarLoggedIn/>
            <Breadcrumb style={{"color": "white"}}>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                    Search Results
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">Weather</Breadcrumb.Item>
                <Breadcrumb.Item active>Set Up Notifications</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Setting up notifications for {this.state.cityName}, {this.state.cityState}</h1>
            <div>
                <ol className="list">
                How notifications work:
                <hr/>
                    <li className="elements">Make sure your desired email is in Account Info (currently: {this.state.email})</li>
                    <li className="elements">Click which boxes you want to recieve notifications for</li>
                    <li className="elements">For example: Click the snow box to recieve an email notification when a change in weather, in this case snow, is now forecasted</li>
                </ol>
            </div>

            <div className = "notifications-options-base">
                <div className = "notifications-options-selections">
                    <div className = "notifications-content">
                <div className = "notifications-cards-list">
                        {this.highlightSnowCard()}
                        {this.highlightRainCard()}
                        {this.highlightLightningCard()}
                        {this.highlightWindyCard()}
                        {this.highlightSunnyCard()}
                        {this.highlightCloudyCard()}
                </div>
                <div style={{"paddingTop": "50px"}}><Button style={{"fontSize":"20px"}} onClick={()=>{this.onSubmit()}}>Set up notifications!</Button></div>
                {this.showSubmitError()}
                </div>
                </div>
            </div>
            <div>{this.state.showConfirmation}</div>
            </div>
        )
    }

}