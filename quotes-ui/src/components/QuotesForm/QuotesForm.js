import React, { Component } from "react";
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from "react-router";
import "./QuotesForm.css";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Link } from "react-router-dom";
import chat_quote_fill_icon_159634 from "../Img/chat_quote_fill_icon_159634.ico";
import _ from "lodash";

import "react-datepicker/dist/react-datepicker.css";

// https://itnext.io/mapping-future-values-in-javascript-to-avoid-promise-nesting-embrace-functional-techniques-9e44bc829403
Promise.prototype.map = function (fn) {
  return new Promise((resolve, reject) =>
    this.then((x) => resolve(fn(x))).catch((e) => reject(e))
  );
};

class QuotesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      startDate: new Date(),
      page: 0,
      text: "",
      title: "",
      error: "",
      favourite: true,
      books: [],
      titles: [],
      selectedOption: "",
      clearable: true,
    };
  }

  handleBookAuthor = (bookTitleHash) => {
    var bookArray = this.state.books.filter(
      (book) =>
        (book.author + "-" + book.title).hashCode() === bookTitleHash.value
    );
    bookArray.map((book) =>
      this.setState({ author: book.author, title: book.title })
    );
  };

  onChangeDate(date) {
    this.setState({ startDate: date });
  }

  handlePage = (event) => this.setState({ page: event.target.value });

  handleText = (event) => this.setState({ text: event.target.value });

  handleBookTitle = (event) => this.setState({ title: event.target.value });

  renderList() {
    return this.state.books.map((book) => ({
      label: book.author + "-" + book.title,
      value: (book.author + "-" + book.title).hashCode(),
    }));
  }

  renderList2(books) {
    return books.map((book) => ({
      label: book.author + "-" + book.title,
      value: (book.author + "-" + book.title).hashCode(),
    }));
  }

  handleFavourite = (event) => {
    this.setState({ favourite: event.target.checked });
  };

  doSubmit = async () => {
    const data = {
      author: this.state.author,
      date: this.state.startDate,
      page: this.state.page,
      text: this.state.text,
      title: this.state.title,
      favourite: this.state.favourite,
    };
    try {
      await axios.post(`${url}/api/quote`, data);
      this.props.history.push("/quotes");
    } catch (e) {}
  };

  handleSubmit = (event) => {
    this.doSubmit();
    event.preventDefault();
  };

  getAsyncOptions2(inputValue) {
    return axios
      .get(
        `${url}/api/book?page=0&limit=5&title=${inputValue}&author=${inputValue}`
      )
      .map((res) => this.renderList2(res.data.content));
  }

  render() {
    return (
      <form className="container contact " onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <div className="contact-info">
              <img
                className="img-logo"
                src={chat_quote_fill_icon_159634}
                alt="image"
              />
              <h3 className="quote">
                "The way to get started is to quit talking and begin doing."
              </h3>
              <h5 className="quote"> -Walt Disney</h5>
            </div>
          </div>
          <div className="col-md-8">
            <div className="contact-form">
              <div className="form-group">
                <label className="control-label col-sm-2" for="date">
                  Author {this.state.author}
                </label>
                <div className="form-group">
                  <label className="control-label col-sm-2" for="date">
                    Book title {this.state.title}
                  </label>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      isClearable
                      className="basic-single"
                      classNamePrefix="select"
                      onChange={this.handleBookAuthor}
                      name="search"
                      loadOptions={(inputValue) =>
                        this.getAsyncOptions2(inputValue)
                      }
                    />
                  </div>
                  <div className="col-sm-4">
                    <Link
                      className="font-weight-bold font-italic h5"
                      to="/add_book"
                    >
                      Add book
                    </Link>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-2" for="date">
                  Date {this.state.date}
                </label>
                <div className="col-sm-10">
                  <DatePicker
                    className="form-control"
                    id="date"
                    name="date"
                    defaultValue=""
                    selected={this.state.startDate}
                    onChange={(date) => this.onChangeDate(date)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  for="inlineFormInputPage"
                >
                  {" "}
                  Quote Page {this.state.page}
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="inlineFormInputPage"
                    value={this.state.page}
                    onChange={this.handlePage}
                    placeholder="Quote Page"
                    tabindex="3"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  for="inlineFormInputText"
                >
                  Quote {this.state.text}
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    className="form-control"
                    rows="5"
                    id="inlineFormInputText"
                    value={this.state.text}
                    onChange={this.handleText}
                    placeholder="Quote"
                    tabindex="4"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <div className="form-check">
                    <label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={this.state.favourite}
                        onChange={this.handleFavourite}
                      />
                      {this.state.favourite
                        ? "   Favourite"
                        : "   Not favourite"}{" "}
                      quote
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  componentDidMount() {
    axios
      .get(`${url}/api/book/allBooks`)
      .map((response) => response.data)
      .then((books) => this.setState({ books: books }));
  }
}
export default withRouter(QuotesForm);
