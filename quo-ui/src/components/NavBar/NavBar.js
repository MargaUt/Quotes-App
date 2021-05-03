import React, { Component, useState, useContext }  from 'react'
import { withRouter } from 'react-router';
import './NavBar.css';
import {Link} from 'react-router-dom';
import Login from '../Login/Login.js';
import UserContext from "../Utilities/UserContext";


// PVZ su klase ir state

// class NavBar extends Component {
//   static contextType = UserContext;
//   constructor(props, context) {
//     super(props, context);
//     this.context.updateNavBar = (loggedUserName) => this.setState({loggedUserName: loggedUserName })
//     this.state = {
//           loggedUserName: this.context.loggedUserName
//         }
//   }
//   render() {
//       return (
//         <div className="topnav">
//             <Link className="a" to='/'>Main {console.log("loggedUserName", this.state.loggedUserName)}</Link>
//             {/* <Link className="a" to='/quotes'>Quotes</Link> */}
//             {this.state.loggedUserName !== null && (<Link className="a" to='/quotes_form'>Add quote</Link> )}
//             <Link className="a" to='/books'>Books {console.log("loggedUserName", this.state.loggedUserName)}</Link>
//              {this.state.loggedUserName !== null && ( <Link className="a" to='/add_book'>Add book</Link> )}
//             <div className="login-container">
//                  <Login loggedUserName={console.log("loggedUserName", this.state.loggedUserName)} />
//             </div>
//         </div>
//       )
//   }
// }

// pvz su funkciniu komponentu ir useState useContext

// function NavBar(props) {
//     var context = useContext(UserContext);
//     var [loggedUserName, setLoggedUserName] = useState(context.loggedUserName);
//     context.updateNavBar = (loggedUserName) => setLoggedUserName(loggedUserName)
//     //ToDo: isideti consumeri ir pagal loggedUsername pasitikrinus, nerodyti nei add quotes, nei add book
//     return (
//       <div className="topnav">
//           <Link className="a" to='/'>Main {console.log("loggedUserName", loggedUserName)}</Link>
//           {/* <Link className="a" to='/quotes'>Quotes</Link> */}
//           {loggedUserName !== null && (<Link className="a" to='/quotes_form'>Add quote</Link> )}
//           <Link className="a" to='/books'>Books {console.log("loggedUserName", loggedUserName)}</Link>
//             {loggedUserName !== null && ( <Link className="a" to='/add_book'>Add book</Link> )}
//           <div className="login-container">
//                 <Login loggedUserName={console.log("loggedUserName", loggedUserName)} />
//           </div>
//       </div>
//     )
// }

// pvz su fake state changer

function NavBar(props) {
    const context = useContext(UserContext);
    const [refresh, setRefresh] = useState(0);

    const loggedUserName = context.loggedUserName;

    context.updateNavBar = () => setRefresh(Math.random())
    
    return (
      <div className="topnav">
          <Link className="a" to='/'>Main {console.log("loggedUserName", loggedUserName)}</Link>
          {/* <Link className="a" to='/quotes'>Quotes</Link> */}
          {loggedUserName !== null && (<Link className="a" to='/quotes_form'>Add quote</Link> )}
          <Link className="a" to='/books'>Books {console.log("loggedUserName", loggedUserName)}</Link>
          {loggedUserName !== null && ( <Link className="a" to='/add_book'>Add book</Link> )}
          {loggedUserName !== null && ( <Link className="a" to='/favourite_quotes'>Favourite quotes</Link> )}
          <div className="login-container">
                <Login loggedUserName={console.log("loggedUserName", loggedUserName)} />
          </div>
      </div>
    )
}

export default withRouter(NavBar);

// pvz su funciniu komponentu ir context Consumer

// export default function NavBar(props, context) {
//     //ToDo: isideti consumeri ir pagal loggedUsername pasitikrinus, nerodyti nei add quotes, nei add book
//     return (
//         <div>
//        <UserContext.Consumer>
//        {({loggedUserName}) =>     
//         <div className="topnav">
//             <Link className="a" to='/'>Main {console.log("loggedUserName", loggedUserName)}</Link>
//             {/* <Link className="a" to='/quotes'>Quotes</Link> */}
//             {loggedUserName !== null && (<Link className="a" to='/quotes_form'>Add quote</Link> )}
//             <Link className="a" to='/books'>Books {console.log("loggedUserName", loggedUserName)}</Link>
//              {loggedUserName !== null && ( <Link className="a" to='/add_book'>Add book</Link> )}
//             <div className="login-container">
//                  <Login loggedUserName={console.log("loggedUserName", loggedUserName)} />
//             </div>
//         </div>
        
//      }
//              </UserContext.Consumer>
//  </div>
//     )
// }
