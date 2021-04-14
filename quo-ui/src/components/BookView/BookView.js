import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './BookView.css';
import {FaQuoteLeft} from 'react-icons/fa';
import url from './../../UrlConfig';
import { withRouter } from 'react-router';
import QuoteView from '../QuoteView/QuoteView.js';
import DeleteBookModal from "../DeleteBookModal/DeleteBookModal";


class BookView extends Component {




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
        quotes: [],
        error: ""
        }
  }



cleanData = (date) =>
 date.replaceAll(/[^\w]+/g, '');

  
handleBookEdit = (e, title, author) => 
 this.props.history.push(`/edit_book/${title}/${author}`);


handleDelete = (e, title, author) => {
     console.log("it works with remove!");
	axios.delete(`${url}/api/book/${title}/${author}/`)
	.then(res => {
         this.props.history.push('/books');
  })
  .catch((err) => {
    if(err.response.status  === 400){
    this.setState({
          error: "You cannot delete a book with existing quote."
        });
    }
  })
  
}

  render() {


             if (this.state.quotes === []) {
            return <div>Please wait... Data is loading...</div>
        }
        var quotes = this.state.quotes.map((quote, index) => {
            return (  
                <QuoteView
                    id={"" + index}
                    key={quote.quote + quote.date} 
                    date={quote.date}
                    page={quote.page}
                    text={quote.text}
                    favourite={quote.favourite}
                />
            );
        });
    return (
        <div>
                      <div>            
                {this.state.error !== "" && (
                  <div>
                    <div className="alert alert-danger" >
                      <h3> {this.state.error} </h3>
                    </div>
                  </div>
                  )}
              </div>
        <div>
<div className="card" >
  <img className="picture" src={this.state.picture} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{this.state.title}</h5>
    <p className="card-text">{this.state.author}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"> Book was released in {this.state.releasedYear} years.</li>
    <li className="list-group-item">Book has {this.state.booksPages} pages.</li>
    <li className="list-group-item">{this.state.bookIsFinished ? "Finished" : "Not Finished"}</li>
  </ul>
  <div className="card-body">
           <button type="button" className="btn btn-success" onClick={(e) => this.handleBookEdit(e, this.state.title, this.state.author)}>
          Edit Book
          </button>
            <button type="button" className="btn btn-primary" data-toggle="modal"
              data-target={"#modal-" + this.cleanData(this.state.author, this.state.title )} >
            Delete
            </button>
            <DeleteBookModal
              handleDelete={(e) => this.handleDelete(e, this.state.title, this.state.author)}
              id={"modal-" + this.cleanData(this.state.author, this.state.title )}>
            Do you really want to delete {this.state.author} {this.state.title}?
            </DeleteBookModal>
  </div>
</div>
<div className="card-deck">
    {quotes}
</div>
</div>
</div>
    );
  }

  componentDidMount = () => {
    axios.get(`${url}/api/book/${this.state.currentTitle}/${this.state.currentAuthor}/`)
      .then((answer) => {
        this.setState({
         author: answer.data.author,
         bookIsFinished: answer.data.bookIsFinished,
         booksPages: answer.data.booksPages,
         releasedYear: answer.data.releasedYear, 
         title: answer.data.title,
         picture: answer.data.picture,
         quotes: answer.data.quotes
        })
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
 }   


}

BookView.propTypes = {

  handleDelete: PropTypes.func.isRequired,
  handleEditBook: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired

};

export default withRouter(BookView);