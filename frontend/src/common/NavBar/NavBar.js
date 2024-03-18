import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Login from "../Login/Login.js";
import UserContext from "../../Utilities/UserContext";

function NavBar(props) {
  const context = useContext(UserContext);
  const [refresh, setRefresh] = useState(0);

  const loggedUserName = context.loggedUserName;

  context.updateNavBar = () => setRefresh(Math.random());

  return (
    <div className="topnav">
      <Link className="a" to="/">
        Main
      </Link>
      {loggedUserName !== null && (
        <Link className="a" to="/quotes_form">
          Add quote
        </Link>
      )}
      <Link className="a" to="/books">
        Books
      </Link>
      {loggedUserName !== null && (
        <Link className="a" to="/add_book">
          Add book
        </Link>
      )}
      {loggedUserName !== null && (
        <Link className="a" to="/favourite_quotes">
          Favourite quotes
        </Link>
      )}
      <div className="login-container">
        <Login />
      </div>
    </div>
  );
}

export default withRouter(NavBar);
