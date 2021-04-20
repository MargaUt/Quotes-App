import React from 'react'
import './NavBar.css';
import {Link} from 'react-router-dom';
import Login from '../Login/Login.js';
import UserContext from "../Utilities/UserContext";



export default function NavBar(props) {

    return (
        <div className="topnav">
            <Link className="a" to='/'>Main</Link>
            {/* <Link className="a" to='/quotes'>Quotes</Link> */}
            <Link className="a" to='/quotes_form'>Add quote</Link> 
            <Link className="a" to='/books'>Books</Link>
            <Link className="a" to='/add_book'>Add book</Link>
            <div className="login-container">
                <UserContext.Consumer>
                 {({loggedUserName}) =>(<Login loggedUserName={loggedUserName}/>)}
                </UserContext.Consumer>   
            </div>
        </div>

    )
}
