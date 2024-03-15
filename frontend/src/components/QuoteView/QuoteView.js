import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./QuoteView.css";
import { FaQuoteLeft } from "react-icons/fa";
import moment from "moment";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import url from "./../../UrlConfig";
import { withRouter } from "react-router";
import QuoteButtons from "../QuoteButtons/QuoteButtons";
import UserContext from "../Utilities/UserContext";

class QuoteView extends Component {
  static contextType = UserContext;
  constructor(props, context) {
    super(props, context);

    this.context.updateQuoteView = (loggedUserName) =>
      this.setState({ loggedUserName: loggedUserName });

    this.state = {
      loggedUserName: this.context.loggedUserName,
      currentDate: this.props.match.params.date,
      date: this.props.date,
      page: this.props.page,
      text: this.props.text,
      favourite: this.props.favourite,
      error: "",
    };
  }

  render() {
    return (
      <div className="row justify-content-center col-3">
        <div className="card border-0" style={{ width: "20rem" }}>
          <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
            <p className="mb-0 mt-2 font-italic">"{this.state.text}"</p>
            <footer className=" pt-4 mt-4 border-top">
              <p class="card-text">
                <small class="text-muted">
                  {moment(this.state.date).format("YYYY-MM-DD")}
                </small>
              </p>
              <p class="card-text">
                <small class="text-muted">Quote page: {this.state.page}</small>
              </p>
              {this.state.loggedUserName !== null && (
                <p class="card-text">
                  <small class="text-muted">
                    {" "}
                    {this.state.favourite === false && (
                      <h3>
                        <BsHeart />
                      </h3>
                    )}
                    {this.state.favourite === true && <BsFillHeartFill />}
                  </small>
                </p>
              )}
              <QuoteButtons />
            </footer>
          </blockquote>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    if (this.state.currentDate != null) {
      axios
        .get(`${url}/api/quote/${this.state.currentDate}`)
        .then((answer) => {
          this.setState({
            date: answer.data.date,
            page: answer.data.page,
            text: answer.data.text,
            favourite: answer.data.favourite,
          });
        })
        .catch((error) => {});
    }
  };
}

QuoteView.propTypes = {
  id: PropTypes.string.isRequired,
  handleDeleteQuote: PropTypes.func.isRequired,
};

export default withRouter(QuoteView);
