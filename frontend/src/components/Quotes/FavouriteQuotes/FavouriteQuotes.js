import React, { Component } from "react";
import axios from "axios";
import url from "../../../UrlConfig";
import "./FavouriteQuotes.css";
import FavouriteQuote from "./FavouriteQuote/FavouriteQuote.js";
import { withRouter } from "react-router";
import Spinner from "../../../common/Spinner/Spinner.js";

class FavouriteQuotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      error: "",
      loading: true,
    };
  }

  render() {
    if (this.state.loading === true) {
      return <Spinner />;
    }
    var quotes = this.state.quotes.map((quote, index) => {
      return (
        <FavouriteQuote
          id={"" + index}
          key={quote.quote + quote.date}
          author={quote.author}
          date={quote.date}
          page={quote.page}
          text={quote.text}
          title={quote.title}
          favourite={quote.favourite}
          handleViewQuote={(e) => this.handleViewQuote(e, quote.date)}
        />
      );
    });
    return <div className="card-deck mx-auto">{quotes}</div>;
  }

  componentDidMount = () => {
    this.timerHandle = setTimeout(
      () => this.setState({ loading: false }),
      3500
    );
    axios
      .get(`${url}/api/quote/favourites`)
      .then((answer) => {
        this.setState({ quotes: answer.data });
      })
      .catch((error) => {});
  };

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  handleViewQuote = (e, date) => this.props.history.push(`/view_quote/${date}`);
}

export default withRouter(FavouriteQuotes);
