import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./common/NavBar/NavBar.js";
import Quotes from "./components/Quotes/Quotes.js";
import Books from "./components/Books/Books.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import QuotesForm from "./components/Quotes/QuotesForms/QuotesForm.js";
import AddBook from "./components/Books/BookForms/AddBook.js";
import EditQuote from "./components/Quotes/QuotesForms/EditQuote.js";
import EditBook from "./components/Books/BookForms/EditBook.js";
import BookView from "./components/Books/BookView/BookView";
import QuoteView from "./components/Quotes/QuoteView/QuoteView.js";
import FavouriteQuotes from "./components/Quotes/FavouriteQuotes/FavouriteQuotes";
import UserContext from "./Utilities/UserContext";
import { useContext } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

String.prototype.hashCode = function () {
  var hash = 0;
  if (this.length === 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

var AppContainer = (props) => {
  return (
    <div id="container">
      <header>
        <NavBar />
      </header>
      <main>
        <section className="half"> {props.children}</section>
      </main>
    </div>
  );
};

var NoMatch = (props) => {
  var goApp = () => props.history.push("/");
  return (
    <div>
      Route did not match
      <button onClick={goApp}>Go Home</button>
    </div>
  );
};

var DemonstruotiNavigacija = (props) => {
  let goHome = () => props.history.push("/");
  let { id } = props.match.params;
  return (
    <div>
      At route: {props.location.pathname} (ID: {id})
      <button onClick={goHome}>Go Home</button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  let { loggedUserName } = useContext(UserContext);
  let isLogin = loggedUserName !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <UserContext.Provider
      value={{
        loggedUserName: null,
        updateNavBar: () => {},
        updateBookButtons: () => {},
        updateQuoteButtons: () => {},
        updateQuoteView: () => {},
      }}
    >
      <AppContainer>
        <Switch>
          <Route exact path="/" component={App} />
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
  </BrowserRouter>,
  document.getElementById("root")
);
