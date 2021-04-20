import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './QuoteView.css';
import {FaQuoteLeft} from 'react-icons/fa';
import moment from "moment";
import {BsFillHeartFill, BsHeart } from 'react-icons/bs';
import url from "./../../UrlConfig";
import { withRouter } from 'react-router';

class QuoteView extends Component {
    constructor(props) {
    super(props);
    this.state = {
        currentDate: this.props.match.params.date,
        date: this.props.date,
        page: this.props.page,
        text: this.props.text,
        favourite: this.props.favourite,
        error: ""
        }
  }

  render() {
    return (
          <div className="card" >
    <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
        <p className="mb-0 mt-2 font-italic">"{this.state.text}"</p>
         <footer className=" pt-4 mt-4 border-top">
          <p class="card-text"><small class="text-muted">{moment(this.state.date).format('YYYY-MM-DD')}</small></p>
              <p class="card-text"><small class="text-muted">Quote page: {this.state.page}</small></p>
              <p class="card-text"><small class="text-muted">  {this.state.favourite === false && ( <h3><BsHeart/></h3> )}
                    {this.state.favourite === true && (
                <h3><BsFillHeartFill /></h3>
            )}
          </small></p>
          </footer>
    </blockquote>
  </div>
    );
  }

  componentDidMount = () => {
    if (this.state.currentDate != null) {
          axios.get(`${url}/api/quote/${this.state.currentDate}`)
      .then((answer) => {
        this.setState({
         date: answer.data.date,
         page: answer.data.page,
         text: answer.data.text,
         favourite: answer.data.favourite
        })
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
    }

  }

}


export default withRouter(QuoteView);
 
            
            
