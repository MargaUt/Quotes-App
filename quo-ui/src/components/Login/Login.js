import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from 'react-router';


// ToDo: pasitikrinti ar tokia role, ir tada daryti this.history.push("/eiles"), kai yra Component reikia 
// naudoti withRouter ir reikia rasyti, ten kur norime perduoti, o kai yra function galima nauditi kelis:
// arba withRouter arba useHistory.
const Forma = (
  {
    email,
    pass,
    onPassChange,
    onEmailChange,
    onSubmit,
    name,
    onLogOut,
    answer
  },
  context
) => {
  return (
    <span className="login-container">
      <form onSubmit={onSubmit}>
        {name === "" && (
          <div className="form-row align-items-center">
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
        {name !== "" && (
          <div className="form-row align-items-center">
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
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      name: "",
      answer: ""
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
    this.setState({ name: "" });
    this.props.history.push('/');
  };

  render() {
    return (
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
    );

  }
  handleLoggedUser = async () => {
    try {
      let username = (await axios.get(`${url}/api/user/loggedUsername`)).data;
      if(username !== "not logged"){ 
        let role = (await axios.get(`${url}/api/user/${username}/`)).data.role;
        this.setState({ name: username + " (" + role + ")" });
      }
    } catch (error) {
      console.log("Klaida: ", error);
    }
  };
  componentDidMount() {
    this.handleLoggedUser();
  }
}

export default withRouter(Login);
