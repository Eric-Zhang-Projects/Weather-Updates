import React from "react";
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { createBrowserHistory } from 'history';

export class SearchResults extends React.Component {

    //show list of all cities that exist for the given name in separate cards, and provide an option to filter by country -> if usa, filter by state as well

    //https://www.youtube.com/watch?v=AirWT_XpEpM&ab_channel=CoderOne
constructor(props){
    super(props);

    this.state = {
        cityName: "",
        cities: [],
    }
}

    componentDidMount() {
        const history = createBrowserHistory();
        const location = history.location;
        const citiesList = [];
        try{
            this.setState({cityName: location.state.cityName});
            console.log(this.state.cityName);
            location.state.cities.map((city) => {
                return citiesList.push(city);
            });
            console.log(citiesList);
            this.setState(state =>{
                //const cities = [...state.cities, citiesList];
                const cities = state.cities.concat(citiesList);
                console.log(cities);
                return {
                    cities,
                };
            });
            console.log(this.state.cities);
        } catch (e){
            this.props.history.push('/pageerror', {loggedIn: "true"});
        }
    }

    handleSubmit = (city) => {
        this.props.history.push(
            '/weatherResults', {
            cityName: city.city,
            cityState: city.stateId});
    }

    render () {
        return <div className = "base-container">
            <NavbarLoggedIn/>
            <div className = "content">
                <h1>Results for "{this.state.cityName}"</h1>
                <hr/>
                <ul>
                {this.state.cities.map((city, i) => (
                    <Accordion key={i}>
                <li key = {i} style ={{"listStyleType": "none"}}>
                    <div className="card" style = {{"marginBottom": "20px"}}>
                        <div className="card-body">
                        <h5 className="card-title">{city.city}, {city.stateName} ({city.stateId})</h5>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            More Details
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                            <p className="card-text">County: {city.countyName}</p>
                            <p className="card-text">Timezone: {city.timezone}</p>
                            <p className="card-text">Latitude: {city.lat}, Longitude: {city.lng}</p>
                            <p className="card-text">Total Population: {city.population}, Density: {city.density}</p>
                            </Card.Body>
                        </Accordion.Collapse>
                        <Button type="button" className="btn" onClick={() => this.handleSubmit(city)}>
                            Get Weather Here!
                        </Button>
                    </div>
                    </div>
                </li>
                </Accordion>
            ))}
            </ul>
            </div>
            </div>
    }
}
