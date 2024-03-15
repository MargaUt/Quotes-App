import React, { Component } from "react";
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from "react-router";
import "./EditQuote.css";

class EditQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.props.match.params.date,
      date: "",
      page: 0,
      text: "",
      favourite: true,
      error: "",
    };
  }

  handleBookAuthor = (event) => this.setState({ author: event.target.value });

  handleDate = (event) => this.setState({ date: event.target.value });

  handlePage = (event) => this.setState({ page: event.target.value });

  handleText = (event) => this.setState({ text: event.target.value });

  handleBookTitle = (event) => this.setState({ title: event.target.value });

  handleQuoteFavourite = (event) => {
    this.setState({ favourite: event.target.checked });
  };

  doSubmit = async () => {
    const data = {
      date: this.state.date,
      page: this.state.page,
      text: this.state.text,
      favourite: this.state.favourite,
    };
    try {
      await axios.put(`${url}/api/quote/${this.state.currentDate}`, data);
      this.props.history.push("/quotes");
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
                <label for="inlineFormInputDate">
                  {" "}
                  Date ({this.state.date}):
                </label>
                <input
                  type="text"
                  value={this.state.date}
                  onChange={this.handleDate}
                  className="form-control"
                  id="inlineFormInputName"
                  placeholder={this.state.currentDate}
                />
              </div>

              <div className="form-group">
                <label for="inlineFormInputName">
                  {" "}
                  Quote page ({this.state.page}):
                </label>
                <input
                  type="number"
                  value={this.state.page}
                  onChange={this.handlePage}
                  className="form-control"
                  id="inlineFormInputName"
                  placeholder={this.state.page}
                />
              </div>

              <div className="form-group">
                <label for="inlineFormInputText">
                  Quote ({this.state.text}):
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputText"
                  value={this.state.text}
                  onChange={this.handleText}
                  placeholder={this.state.text}
                />
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={this.state.favourite}
                  onChange={this.handleQuoteFavourite}
                  id="autoSizingCheck3"
                />
                <label className="form-check-label" for="autoSizingCheck3">
                  {" "}
                  Quote is
                  {this.state.favourite ? "favourite. " : " not favourite."}
                </label>
              </div>

              <div className="col-auto my-1">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>

              <h3>{this.props.quote}</h3>
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
  };
}
export default withRouter(EditQuote);
