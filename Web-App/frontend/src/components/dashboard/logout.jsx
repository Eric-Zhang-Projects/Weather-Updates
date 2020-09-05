import React from "react";
import { Redirect } from "react-router-dom";
//import Popup from 'react-popup';

export class Logout extends React.Component {

    constructor(props){
        super(props); 
    }

    logout = () => {
        console.log("local storage with jwt:" + localStorage.getItem("jwt"));
        localStorage.clear("jwt");
        console.log("after logout local storage jwt: " + localStorage.getItem("jwt"));
        this.props.history.push("/login");
    };

    render() {

        return <div>{this.logout()}</div>

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
