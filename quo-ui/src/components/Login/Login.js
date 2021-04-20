import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from 'react-router';
import {useContext} from 'react';
import UserContext from "../Utilities/UserContext";




// ToDo: 1.pasidaryti logino globalu kontexta current useriui, pagal Andriaus skaidres. turi buti null logged user
//2. contexta isideti contexto provideri ir ten isideti routeri,
//3. handleLoggedUser irasyti i globalu contexta logged user,
//4. private route panaudoti  per use context globalu contexta  ir is ten pasiimti logged user,
//5. vietoj isLogged pasitikrinti, ar logged user nera nulll ir tada nunaviguoti i puslapi arba grizti i main page.


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
var a = 0;
class Login extends Component {
   static contextType = UserContext;
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      pass: "",
      name: "",
      answer: "",
      loggedUserName: this.context.loggedUserName
    };
    var secondUserName= this.props.secondUserName;
    var loggedUserName = this.props.loggedUserName;
    const updateMe = this.props.updateMe;
    console.log(loggedUserName, secondUserName, updateMe)
    console.log("statinis:", this.context)
    console.log("User name", this.state.name)
  }

  updateMe = () => {
    this.setState({loggedUserName: this.state.loggedUserName});
    console.log("UpdateMe:", this.state.loggedUserName)
  };

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
    this.context.loggedUserName = this.state.name;
    this.props.history.push('/');
  };

  pakeistKonteksta = (event) => {
    console.log("keiciam konteksta", this.context);
    a++;
    this.context.loggedUserName = "kazkas naujo "+a;
    var naujas = {
      loggedUserName: this.context.loggedUserName,
      secondUserName: this.context.secondUserName
    }
    this.context = naujas;
    event.preventDefault();
  }

  render() {
    console.log("vardas", this.context.loggedUserName);
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
      <button onClick={this.pakeistKonteksta}>Atnaujinti {this.context.loggedUserName}</button>
      <button onClick={this.handleUpdateMe}>Atnaujinti is state {this.state.loggedUserName}</button>
      </span>
    );

  }
  handleLoggedUser = async () => {
      
    try {
      let loggedUserName = (await axios.get(`${url}/api/user/loggedUsername`)).data;
      if(loggedUserName !== "not logged"){

        let role = (await axios.get(`${url}/api/user/${loggedUserName}/`)).data.role;
        this.setState({ name: loggedUserName + " (" + role + ")" });
        this.context.loggedUserName = this.state.name
        console.log("Naujas contekstas",  this.context.loggedUserName)
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
