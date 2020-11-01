import React from "react";
import axios from 'axios';
import { BASE_URL } from "../../constants.json";
import { getJwt } from '../helpers/jwtHelper';
import NavbarLoggedIn from '../navbar/NavbarLoggedIn';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { createBrowserHistory } from 'history';
import AutocompleteSearch from '../autocompleteSearch/autocompleteSearch';

export class SearchResults extends React.Component {

    //show list of all cities that exist for the given name in separate cards, and provide an option to filter by country -> if usa, filter by state as well

    //https://www.youtube.com/watch?v=AirWT_XpEpM&ab_channel=CoderOne
constructor(props){
    super(props);

    this.state = {
        cities: [],
    }
}

    componentDidMount() {
        const history = createBrowserHistory();
        const location = history.location;
        const citiesList = [];
        location.state.cities.map((city) => {
            citiesList.push(city);
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
    }

    render () {
        return <div className = "base-container">
            <NavbarLoggedIn/>
            <div className = "content">
                <h1>Results for </h1>
                <ul>
                {this.state.cities.map((city) => (
                <li key = {city.id} style ={{"listStyleType": "none"}}>
                    <div className="card" style = {{"marginBottom": "20px"}}>
                        <div className="card-body">
                        <h5 className="card-title">{city.name} ({city.country})</h5>
                        <p className="card-text">Latitude: {city.coord.lat}, Longitude: {city.coord.lon}</p>
                        <a href="#" className="btn btn-primary">Get Weather Here!</a>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
            </div>
            </div>
    }
}
