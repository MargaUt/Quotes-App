import React, { Component } from "react";
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from "react-router";
import "./EditBook.scss";
import ImageUploader from "../ImageUploader/ImageUploader.js";

class EditBook extends Component {
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
      error: "",
    };
  }

  handleBookAuthor = (event) => this.setState({ author: event.target.value });

  handleBookPages = (event) =>
    this.setState({ booksPages: event.target.value });

  handleReleasedYear = (event) =>
    this.setState({ releasedYear: event.target.value });

  handleBookTitle = (event) => this.setState({ title: event.target.value });

  handlePicture = (picture) => this.setState({ picture: picture });

  handleFinishedToReadBook = (event) => {
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
      await axios.put(
        `${url}/api/book/${this.state.currentTitle}/${this.state.currentAuthor}`,
        data
      );
      this.props.history.push("/books");
    } catch (e) {}
  };

  handleSubmit = (event) => {
    this.doSubmit();
    event.preventDefault();
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="form-group">
                <label for="inlineFormInputAuthor">
                  Book author ({this.state.author}):
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputAuthor"
                  value={this.state.author}
                  onChange={this.handleBookAuthor}
                  placeholder={this.state.author}
                />
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.bookIsFinished}
                  onChange={this.handleFinishedToReadBook}
                  id="autoSizingCheck2"
                />
                <label className="form-check-label" for="autoSizingCheck2">
                  {" "}
                  Book is
                  {this.state.bookIsFinished
                    ? "finished to read"
                    : " not finished to read"}
                </label>
              </div>

              <div className="form-group">
                <label for="inlineFormInputPages">
                  {" "}
                  Book pages ({this.state.booksPages}):
                </label>
                <input
                  type="number"
                  value={this.state.booksPages}
                  onChange={this.handleBookPages}
                  className="form-control"
                  id="inlineFormInputPages"
                  placeholder={this.state.booksPages}
                />
              </div>

              <div className="form-group">
                <label for="inlineFormInputYear">
                  {" "}
                  Book released Year ({this.state.releasedYear}):
                </label>
                <input
                  type="number"
                  value={this.state.releasedYear}
                  onChange={this.handleReleasedYear}
                  className="form-control"
                  id="inlineFormInputYear"
                  placeholder={this.state.releasedYear}
                />
              </div>

              <div className="form-group">
                <label for="inlineFormInputTitle">
                  Book title ({this.state.title}):
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputTitle"
                  value={this.state.title}
                  onChange={this.handleBookTitle}
                  placeholder={this.state.title}
                />
              </div>

              <ImageUploader
                className="picture-uploader"
                onChange={(picture) => this.handlePicture(picture)}
                defaultImage={this.state.picture}
                defaultDisplayImage={
                  <div className="testi-image">
                    <img
                      alt="picture"
                      src={this.state.picture}
                      value={this.state.picture}
                    />
                  </div>
                }
              />

              <div className="col-auto my-1">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
            {this.state.error != "" && (
              <div className="col-auto">
                <div className="alert alert-primary" role="alert">
                  {this.state.error}
                </div>
              </div>
            )}
          </form>
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
        });
      })
      .catch((error) => {});
  };
}
export default withRouter(EditBook);
