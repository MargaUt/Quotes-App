import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Switch, Route, withRouter } from 'react-router';
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
import axios from 'axios';  // NEISTRINTI
axios.defaults.withCredentials = true;  // NEISTRINTI

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

ReactDOM.render((
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <AppContainer>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path="/quotes" component={Quotes} />
        <Route path="/quotes_form" component={QuotesForm} />
        <Route path="/edit/:date" component={EditQuote} />
        <Route path="/books" component={Books} />
        <Route path="/add_book" component={AddBook} />
        <Route path="/edit_book/:title/:author" component={EditBook} />
        <Route path="/view_book/:title/:author" component={BookView} />
        <Route path="/view_quote/:date" component={QuoteView} />
        <Route path="/demonstracija" component={DemonstruotiNavigacija} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </AppContainer>
  </BrowserRouter>
), document.getElementById('root'));







// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
