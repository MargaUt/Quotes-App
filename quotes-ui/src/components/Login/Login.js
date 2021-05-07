import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from "react-router";
import UserContext from "../Utilities/UserContext";

//ToDo: padaryti is bookView i single quote page

const Forma = (
  {
    email,
    pass,
    onPassChange,
    onEmailChange,
    onSubmit,
    name,
    onLogOut,
    answer,
  },
  context
) => {
  return (
    <span className="login-container">
      <form onSubmit={onSubmit}>
        {name === null && (
          <div className="form row align-items-center">
            {answer !== "" && (
              <div className="col-auto">
                <div className="alert alert-primary" role="alert">
                  {answer}
                </div>
              </div>
            )}
            <div className="col-auto">
              <input
                className="form-control"
                placeholder="El. paštas"
                type="text"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="col-auto">
              <input
                className="form-control"
                placeholder="Slaptažodis"
                type="password"
                value={pass}
                onChange={onPassChange}
              />
            </div>
            <div className="formcol-auto">
              <button type="submit" className="btn btn-success">
                Prisijungti
              </button>
            </div>
          </div>
        )}
        {name !== null && (
          <div className="form row align-items-center">
            <div className="col-auto">
              <span className="answer">{name}</span>
            </div>
            <div className="col-auto">
              <button
                type="button"
                onClick={onLogOut}
                className="btn btn-danger"
              >
                Atsijungti
              </button>
            </div>
          </div>
        )}
      </form>
    </span>
  );
};

class Login extends Component {
  static contextType = UserContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      pass: "",
      name: null,
      answer: "",
      loggedUserName: this.context.loggedUserName,
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPassChange = (event) => {
    this.setState({ pass: event.target.value });
  };

  onSubmit = (event) => {
    this.doLogin();
    event.preventDefault();
  };

  doLogin = async () => {
    let userData = new URLSearchParams();
    userData.append("username", this.state.email);
    userData.append("password", this.state.pass);
    try {
      await axios.post(`${url}/login`, userData, {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      });
      this.handleLoggedUser();
    } catch (e) {
      if (e.response.status === 401) {
        this.setState({
          answer: "Neteisingai  įvedėte el. paštą arba slaptažodį",
        });
      } else if (e.response.status === 403) {
        this.setState({
          answer: "Jūs neturite teisės prieiti prie šių duomenų",
        });
      }
    }
  };

  onLogOut = (event) => {
    this.doLogOut();
    event.preventDefault();
  };

  doLogOut = async () => {
    try {
      await axios.get(`${url}/logout`);
    } catch (err) {}
    this.setState({ name: null });
    this.context.loggedUserName = this.state.name;
    this.context.updateBookButtons(null);
    this.context.updateNavBar();
    this.context.updateQuoteButtons(null);
    this.context.updateQuoteView(null);
    this.props.history.push("/");
  };

  render() {
    return (
      <span>
        <Forma
          email={this.state.email}
          pass={this.state.pass}
          onEmailChange={this.onEmailChange}
          onPassChange={this.onPassChange}
          onSubmit={this.onSubmit}
          name={this.state.name}
          onLogOut={this.onLogOut}
          answer={this.state.answer}
        />
      </span>
    );
  }
  handleLoggedUser = async () => {
    try {
      let loggedUserName = (await axios.get(`${url}/api/user/loggedUsername`))
        .data;
      if (loggedUserName !== "not logged") {
        let role = (await axios.get(`${url}/api/user/${loggedUserName}/`)).data
          .role;
        this.setState({ name: loggedUserName + " (" + role + ")" });
        this.context.loggedUserName = loggedUserName;
        this.context.updateNavBar();
        this.context.updateBookButtons(loggedUserName);
        this.context.updateQuoteButtons(loggedUserName);
        this.context.updateQuoteView(loggedUserName);
      }
    } catch (error) {
    }
  };

  componentDidMount() {
    this.handleLoggedUser();
  }
}

export default withRouter(Login);
