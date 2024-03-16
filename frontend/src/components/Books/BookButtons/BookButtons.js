import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./BookButtons.css";
import url from "../../../UrlConfig";
import { withRouter } from "react-router";
import DeleteBookModal from "../DeleteBookModal/DeleteBookModal";
import UserContext from "../../../Utilities/UserContext";

class BookButtons extends Component {
  static contextType = UserContext;
  constructor(props, context) {
    super(props, context);
    this.context.updateBookButtons = (loggedUserName) =>
      this.setState({ loggedUserName: loggedUserName });

    this.state = {
      loggedUserName: this.context.loggedUserName,
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

  cleanData = (date) => date.replaceAll(/[^\w]+/g, "");

  handleBookEdit = (e, title, author) =>
    this.props.history.push(`/edit_book/${title}/${author}`);

  handleDelete = (e, title, author) => {
    axios
      .delete(`${url}/api/book/${title}/${author}`)
      .then((res) => {
        this.props.history.push("/books");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          this.setState({
            error: "You cannot delete a book with existing quote.",
          });
        }
      });
  };

  render() {
    return (
      <div className="card-body">
        {this.state.loggedUserName !== null && (
          <button
            type="button"
            className="btn btn-success"
            onClick={(e) =>
              this.handleBookEdit(e, this.state.title, this.state.author)
            }
          >
            Edit Book
          </button>
        )}
        {this.state.loggedUserName !== null && (
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target={
              "#modal-" + this.cleanData(this.state.author, this.state.title)
            }
          >
            Delete
          </button>
        )}
        {this.state.loggedUserName !== null && (
          <DeleteBookModal
            handleDelete={(e) =>
              this.handleDelete(e, this.state.title, this.state.author)
            }
            id={"modal-" + this.cleanData(this.state.author, this.state.title)}
          >
            Do you really want to delete {this.state.author} {this.state.title}?
          </DeleteBookModal>
        )}
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
      .catch((error) => {
      });
  };
}

BookButtons.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEditBook: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default withRouter(BookButtons);
