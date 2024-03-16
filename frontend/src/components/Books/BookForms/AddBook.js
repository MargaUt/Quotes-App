import React, { Component } from "react";
import axios from "axios";
import url from "../../../UrlConfig";
import { withRouter } from "react-router";
import "./AddBook.scss";
import ImageUploader from "../../../common/ImageUploader/ImageUploader.js";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      bookIsFinished: true,
      booksPages: "",
      releasedYear: 2000,
      title: "",
      picture: "",
      error: "",
    };
  }

  handleBookAuthor = (event) => this.setState({ author: event.target.value });

  handleBooksPages = (event) =>
    this.setState({ booksPages: event.target.value });

  handleReleasedYear = (event) =>
    this.setState({ releasedYear: event.target.value });

  handleBookTitle = (event) => this.setState({ title: event.target.value });

  handlePicture = (picture) => this.setState({ picture: picture });

  handleBookIsFinished = (event) => {
    this.setState({ bookIsFinished: event.target.checked });
  };

  doSubmit = async () => {
    const data = {
      author: this.state.author,
      bookIsFinished: this.state.bookIsFinished,
      booksPages: this.state.booksPages,
      releasedYear: this.state.releasedYear,
      title: this.state.title,
      picture: this.state.picture,
    };
    try {
      await axios.post(`${url}/api/book`, data);
      this.props.history.push("/books");
    } catch (e) {}
  };

  handleSubmit = (event) => {
    this.doSubmit();
    event.preventDefault();
  };

  render() {
    return (
      <form className="container contact " onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="contact-form">
              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  for="inlineFormInputAuthor"
                >
                  Book author ({this.state.author}):
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputAuthor"
                    value={this.state.author}
                    onChange={this.handleBookAuthor}
                    placeholder="Author"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  for="inlineFormInputTitle"
                >
                  {" "}
                  Book title ({this.state.title}):
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputTitle"
                    value={this.state.title}
                    onChange={this.handleBookTitle}
                    placeholder="Book title"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  for="inlineFormInputPages"
                >
                  {" "}
                  Book pages ({this.state.booksPages}):
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    value={this.state.booksPages}
                    onChange={this.handleBooksPages}
                    className="form-control"
                    id="inlineFormInputPages"
                    placeholder="Book pages"
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  for="inlineFormInputReleasedYear"
                >
                  {" "}
                  Book released year ({this.state.releasedYear}):
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="inlineFormInputReleasedYear"
                    value={this.state.releasedYear}
                    onChange={this.handleReleasedYear}
                    placeholder="Book released year"
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
                        checked={this.state.bookIsFinished}
                        onChange={this.handleBookIsFinished}
                      />
                      {this.state.bookIsFinished
                        ? "Book is finished to read"
                        : "Book is not finished to read"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <ImageUploader
                    className="picture-uploader"
                    onChange={(picture) => this.handlePicture(picture)}
                    defaultImage={this.state.picture}
                    defaultDisplayImage={
                      <div className="testi-image">
                        <img src={this.state.picture} alt="" />
                      </div>
                    }
                  />
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
}

export default withRouter(AddBook);
