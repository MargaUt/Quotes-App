import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Switch, Route, withRouter,  Redirect} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.js';
import Quotes from './components/Quotes/Quotes.js';
import Books from './components/Books/Books.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import QuotesForm from './components/QuotesForm/QuotesForm.js';
import AddBook from './components/AddBook/AddBook.js';
import EditQuote from './components/EditQuote/EditQuote.js';
import EditBook from './components/EditBook/EditBook.js';
import BookView from './components/BookView/BookView';
import QuoteView from './components/QuoteView/QuoteView.js';
import FavouriteQuotes from './components/FavouriteQuotes/FavouriteQuotes';
import url from "./UrlConfig";
import UserContext from './components/Utilities/UserContext';
import {useContext} from 'react';
import axios from 'axios';  // NEISTRINTI
axios.defaults.withCredentials = true;  // NEISTRINTI


String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

var AppContainer = (props) => {
  return (
  <div id="container">
    <header >
      <NavBar/>
    </header>
      <main >
         <section className="half"> {props.children}</section>
      </main>
      </div>
  );
};

var NoMatch = (props) => {
  var goApp = () => props.history.push("/");
  return <div>Route did not match
  <button onClick={goApp}>Go Home</button></div>;
};

var DemonstruotiNavigacija = (props) => {
  let goHome = () => props.history.push("/");
  let { id } = props.match.params;
  return (
    <div>
      At route: {props.location.pathname} (ID: {id})
      <button onClick={goHome}>Go Home</button>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};

// eslint-disable-next-line no-redeclare
var DemonstruotiNavigacija2 = () => {
  let location = useLocation();
  let history = useHistory();
  let goHome = () => history.push("/");
  let params = useParams();
  let match = useRouteMatch();
  let { id } = useParams(); // arba match.params
  return (
    <div>
      At route: {location.pathname} (ID: {id})
      <button onClick={goHome}>Go Home</button>
      <pre>
        {JSON.stringify(history, null, 2)}<br />
        {JSON.stringify(location, null, 2)}<br />
        {JSON.stringify(match, null, 2)}<br />
        {JSON.stringify(params, null, 2)}
      </pre>
    </div>
  );
};

const PrivateRoute = ({component: Component, ...rest}) => {
let {loggedUserName, secondUserName} = useContext(UserContext);
let isLogin =  loggedUserName !== null;

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
            : <Redirect to="/" />
            
        )}
         />

    );
  
};


ReactDOM.render((
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <UserContext.Provider value={{loggedUserName: null, updateNavBar: () => {}, updateBookButtons: () => {}, 
    updateQuoteButtons: () => {}, updateQuoteView: () => {}}}>
      <AppContainer>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path="/quotes" component={Quotes} />
          <PrivateRoute path="/quotes_form" component={QuotesForm} />
          <Route path="/edit_quote/:date" component={EditQuote} />
          <Route path="/view_quote/:date" component={QuoteView} />
          <Route path="/books" component={Books} />
          <PrivateRoute path="/add_book" component={AddBook} />
          <Route path="/edit_book/:title/:author" component={EditBook} />
          <Route path="/view_book/:title/:author" component={BookView} />
          <PrivateRoute path="/favourite_quotes" component={FavouriteQuotes} />
          <Route path="/demonstracija" component={DemonstruotiNavigacija} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </AppContainer>
    </UserContext.Provider>
  </BrowserRouter>
), document.getElementById('root'));







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
