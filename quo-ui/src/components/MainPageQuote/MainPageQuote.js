import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './MainPageQuote.css';
import {FaQuoteLeft} from 'react-icons/fa';
import moment from "moment";


class MainPageQuote extends Component {

  render() {
    return (
  <div className="card">
    <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
      <div className="blockquote-custom-icon bg-info shadow-sm"><FaQuoteLeft /></div>
        <p className="mb-0 mt-2 font-italic">"{this.props.text}"</p>
          <footer className="blockquote-footer pt-4 mt-4 border-top">{this.props.author}
            <cite title="Source Title"> {this.props.title}</cite>
              <p class="card-text"><small class="text-muted">{moment(this.props.date).format('YYYY-MM-DD')}</small></p>
          </footer>
    </blockquote>
  </div>
    );
  }
}

MainPageQuote.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default MainPageQuote;