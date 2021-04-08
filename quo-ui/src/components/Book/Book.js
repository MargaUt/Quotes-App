import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteBookModal from "../DeleteBookModal/DeleteBookModal";
import EditBook from "../EditBook/EditBook"

class Book extends Component { 

cleanData = (date) =>{
  return date.replaceAll(/[^\w]+/g, '');
}

  render() {
    return (
      <tbody>
        <tr>
          <td type="text">{this.props.title}</td>
          <td type="text">{this.props.author}</td>
          <td  type="number">{this.props.releasedYear}</td>
          <td  type="number">{this.props.booksPages}</td>
          <td >{this.props.bookIsFinished ? "Finished" : "Not Finished"}</td>  
          <td>     
          <button type="button" className="btn btn-success" onClick={this.props.handleEditBook}>
          Edit Book
          </button>
          </td>
          <td>
            <button type="button" className="btn btn-primary" data-toggle="modal"
              data-target={"#modal-" + this.cleanData(this.props.author, this.props.title )} >
            Delete
            </button>
            <DeleteBookModal
              handleDelete={this.props.handleDelete}
              id={"modal-" + this.cleanData(this.props.author, this.props.title )}>
            Do you really want to delete {this.props.author} {this.props.title}?
            </DeleteBookModal>
          </td>
          
        </tr>
      </tbody>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  releasedYear: PropTypes.number.isRequired,
  booksPages: PropTypes.number.isRequired,
  bookIsFinished: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditBook: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired

};

export default Book;