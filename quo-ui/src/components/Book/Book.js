import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteBookModal from "../DeleteBookModal/DeleteBookModal";
import EditBook from "../EditBook/EditBook"
import './Book.css';

class Book extends Component { 

cleanData = (date) =>{
  return date.replaceAll(/[^\w]+/g, '');
}

  render() {
    return (
      <tbody>
        <tr onClick={this.props.handleViewBook}>
          <td ><img  className="picture" alt="picture" src={this.props.picture}/></td>
          <td type="text">{this.props.title}</td>
          <td type="text">{this.props.author}</td>
           <td>     
          </td>
        </tr>
      </tbody>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleViewBook: PropTypes.func.isRequired

};

export default Book;