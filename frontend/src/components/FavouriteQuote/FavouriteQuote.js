import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./FavouriteQuote.css";
import { FaQuoteLeft } from "react-icons/fa";
import moment from "moment";
import { withRouter } from "react-router";

class FavouriteQuote extends Component {
  render() {
    return (
      <div onClick={this.props.handleViewQuote}>
        <div className="card border-0">
          <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
            <div className="blockquote-custom-icon bg-info shadow-sm">
              <FaQuoteLeft />
            </div>
            <p className="mb-0 mt-2 font-italic">" {this.props.text}"</p>
            <footer className="blockquote-footer pt-4 mt-4 border-top">
              {this.props.author}
              <cite title="Source Title"> {this.props.match.params.title}</cite>
              <p class="card-text">
                <small class="text-muted">
                  {moment(this.props.date).format("YYYY-MM-DD")}
                </small>
              </p>
            </footer>
          </blockquote>
        </div>
      </div>
    );
  }
}

FavouriteQuote.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  handleViewQuote: PropTypes.func.isRequired,
};

export default withRouter(FavouriteQuote);
