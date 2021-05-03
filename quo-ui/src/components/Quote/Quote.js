import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import EditQuote from "../EditQuote/EditQuote";
import DeleteQuoteModal from "../DeleteQuoteModal/DeleteQuoteModal";
// import Heart from "../Img/heart-circle-outline.svg";
import {BsFillHeartFill, BsHeart } from 'react-icons/bs';


class Quote extends Component {

clean = (date) =>{
  return date.replaceAll(":", "-");
}
  render() {
    return (
      <tbody>
        <tr>
          <td>{this.props.author}</td>
          <td  type="date">{this.props.date}</td>
          <td  type="number">{this.props.page}</td>
          <td>{this.props.text}</td>
          <td>{this.props.title}</td>
          <td >
                  {this.props.favourite === false && (
                <h3><BsHeart/></h3>
            )}
                 {this.props.favourite === true && (
                <h3><BsFillHeartFill /></h3>
            )}     
          </td>  
          <td>
            <button type="button" className="btn btn-success" onClick={this.props.handleEdit} >
            Edit
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-primary" data-toggle="modal"
              data-target={"#modal-" + this.props.id + "-" + this.clean(this.props.date) + "-" + this.props.page} >
            Delete
            </button>
            <DeleteQuoteModal
              handleD={this.props.handleD}
              id={"modal-" + this.props.id + "-" + this.clean(this.props.date) + "-" + this.props.page}>
           Do you want to delete quote  {this.props.date} date ?
            </DeleteQuoteModal>
          </td>
        </tr>
      </tbody>
    );
  }
}

Quote.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  favourite: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleD: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired

};

export default Quote;