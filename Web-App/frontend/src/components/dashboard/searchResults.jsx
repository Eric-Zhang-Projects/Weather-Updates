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
        cities: []
    }



}

    componentDidMount() {
        const history = createBrowserHistory();
        const location = history.location;
        this.setState({cities: location.state.cities});
        console.log(location.state.cities);

    }

    // citiesList = () => {
    //     const {name, country, lat, lon } = props;
    //     return (
    //         <div className = "list">
    //             <div className ="name">{name}</div>
    //             <div className ="country">{country}</div>
    //             <div className ="lat">{lat}</div>
    //             <div className ="lon">{lon}</div>
    //         </div>
    //     )
    // }


    render () {
        return <div>
            <NavbarLoggedIn/>
            results!</div>
    }
}
