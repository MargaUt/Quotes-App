import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./BookView.css";
import url from "../../../UrlConfig";
import { withRouter } from "react-router";
import MainPageQuote from "../../Quotes/MainPageQuotes/MainPageQuote/MainPageQuote";
import BookButtons from "../BookButtons/BookButtons.js";
import {LOADING_MESSAGE} from "../../../Utilities/constants"


class BookView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTitle: this.props.match.params.title,
      currentAuthor: this.props.match.params.author,
      author: "",
      title: "",
      releasedYear: 2000,
      booksPages: "",
      bookIsFinished: true,
      picture: "",
      quotes: [],
      error: "",
    };
  }

  render() {
    if (this.state.quotes === []) {
      return <div>{LOADING_MESSAGE}</div>;
    }
    var quotes = this.state.quotes.map((quote, index) => {
      return (
        <MainPageQuote
          id={"" + index}
          key={quote.quote + quote.date}
          author={quote.author}
          date={quote.date}
          page={quote.page}
          text={quote.text}
          title={quote.title}
          handleViewQuote={(e) => this.handleViewQuote(e, quote.date)}
        />
      );
    });
    return (
      <div>
        <div>
          {this.state.error !== "" && (
            <div>
              <div className="alert alert-danger">
                <h3> {this.state.error} </h3>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="card border-0 col-md-5">
            <img
              className="picture"
              src={this.state.picture}
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">{this.state.title}</h5>
              <p className="card-text">{this.state.author}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {" "}
                Book was released in {this.state.releasedYear} years.
              </li>
              <li className="list-group-item">
                Book has {this.state.booksPages} pages.
              </li>
              <li className="list-group-item">
                {this.state.bookIsFinished ? "Finished" : "Not Finished"}
              </li>
            </ul>
            <BookButtons />
          </div>
          <div className="card-deck">{quotes}</div>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    axios
      .get(
        `${url}/api/book/${this.state.currentTitle}/${this.state.currentAuthor}`
      )
      .then((answer) => {
        this.setState({
          author: answer.data.author,
          bookIsFinished: answer.data.bookIsFinished,
          booksPages: answer.data.booksPages,
          releasedYear: answer.data.releasedYear,
          title: answer.data.title,
          picture: answer.data.picture,
          quotes: answer.data.quotes,
        });
      })
      .catch((error) => {});
  };

  handleViewQuote = (e, date) => this.props.history.push(`/view_quote/${date}`);
}

BookView.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEditBook: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default withRouter(BookView);
