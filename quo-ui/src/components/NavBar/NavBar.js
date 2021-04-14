import React from 'react'
import './NavBar.css';
import {Link} from 'react-router-dom';
import Login from '../Login/Login.js';



export default function NavBar() {
    return (
        <div className="topnav">
            <Link className="a" to='/'>Main</Link>
            {/* <Link className="a" to='/quotes'>Quotes</Link> */}
            <Link className="a" to='/quotes_form'>Add quote</Link> 
            <Link className="a" to='/books'>Books</Link>
            <Link className="a" to='/add_book'>Add book</Link>
            <div className="login-container">
                <Login/>
            </div>
        </div>

    )
}
