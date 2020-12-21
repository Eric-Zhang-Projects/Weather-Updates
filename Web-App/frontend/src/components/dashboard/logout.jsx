import axios from "axios";
import React from "react";
import { BASE_URL } from "../../constants.json";
//import Popup from 'react-popup';

export class Logout extends React.Component {

    componentDidMount() {
        axios.get(`${BASE_URL}/deletecache`)
        .then (res => {
            console.log("deleted cache" + res);
        }).catch(error => {
            console.log(error);
        });
    }

    logout = () => {
        console.log("clearing jwt: " + localStorage.getItem("jwt"));
        localStorage.clear("jwt");
        this.props.history.push('/login');
    }

    render() {
        //return <Redirect to ={ { pathname: 'login' }}>{this.logout()}</Redirect>
        return ( <div>{this.logout()} </div> )
    }
}
//https://www.npmjs.com/package/reactjs-popup
    // Popup.create({
    //     title: null,
    //     content: 'This popup uses the create method directly to get more control. This popup demonstrates custom buttons.',
    //     buttons: {
    //         left: [{
    //             text: 'Cancel',
    //             className: 'danger',
    //             action: function () {
    //                 Popup.alert('You pressed the Cancel btn');
    
    //                 /** Close this popup. Close will always close the current visible one, if one is visible */
    //                 Popup.close();
    //             }
    //         }],
    //         right: [{
    //             text: 'Alt',
    //             key: 'ctrl+enter',
    //             action: function () {
    //                 // Passing true as the second argument to the create method
    //                 // displays it directly, without interupting the queue.
    //                 Popup.create({
    //                     title: null,
    //                     content: 'I was configured to display right away, without affecting the queue. Closing this will display the previously visible popup.',
    //                     buttons: {
    //                         left: ['cancel'],
    //                         right: []
    //                     }
    //                 }, true);
    //             }
    //         }, {
    //             text: 'Save',
    //             className: 'success',
    //             action: function () {
    //                 Popup.alert('You pressed the Save btn');
    
    //                 /** Close this popup. Close will always close the current visible one, if one is visible */
    //                 Popup.close();
    //             }
    //         }]
    //     }
    // });
