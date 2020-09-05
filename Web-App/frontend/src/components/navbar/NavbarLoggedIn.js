import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import { MenuItemsLoggedIn } from "./MenuItemsLoggedIn";
import './Navbar.css';
import { getJwt, isLoggedIn } from '../helpers/jwtHelper';

//https://www.youtube.com/watch?v=fL8cFqhTHwA

class NavbarLoggedIn extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.state = { 
    //         Menu: MenuItems
    //     };
    //     this.handleChange = this.handleChange.bind(this);
    // }

    // handleChange = (event) => {
    //     this.setState({[event.target.name]: event.target.value});
    // }

    // componentDidMount() {

    //     const jwt = getJwt();
    //     if (jwt == null){
    //         this.props.history.push('/login');
    //     }
    // }

    render() {

        return(
            <nav className = "NavbarItems">
                <h1 className="navbar-title">Weather Updater!</h1>
                <div className = "menu-icon"></div>
                <ul className="nav-menu"> 
                    { MenuItemsLoggedIn.map((item, index)=>{
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    }) }
                </ul>
            </nav>
        );
    }
}

export default NavbarLoggedIn