import React, { Component } from 'react';
import axios from 'axios';
import url from './../../UrlConfig';
import PropTypes from "prop-types";
import './Books.css';
import Book from '../Book/Book.js';
import { withRouter } from 'react-router';
import DeleteBookModal from "../DeleteBookModal/DeleteBookModal.js";



class Books extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: [], 
            error: ""

        }
    }

    render(){
        const unikalus = "tikrai"
        if (this.state.books === []) {
            return <div>Please wait... Data is loading...</div>
        }
        var books = this.state.books.map((book, index) => {
            return (  
                <Book
                    id={"" + index}
                    key={book.title + book.author} 
                    author={book.author}
                    title={book.title}
                    releasedYear={book.releasedYear}
                    booksPages={book.booksPages}
                    bookIsFinished={book.bookIsFinished}
                    handleEditBook={(e) => this.handleBookEdit(e, book.title, book.author)}
                    handleDelete={(e) => this.handleDelete(e, book.title, book.author)}
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
              <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Book released year</th>
                    <th scope="col">Book pages</th>
                    <th scope="col">Book is finished to read </th>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                    {books}
                </table>
            </div>
        );
       }

    componentDidMount = () => {
        axios.get(`${url}/api/book`)
          .then((answer) => {
              this.setState({books: answer.data})
              console.log(answer);
            })
          .catch((error) => {
              console.log("Error while reading books: ", error)
            })
    }

handleBookEdit = (e, title, author) => 
 this.props.history.push(`/edit_book/${title}/${author}`);
  

    
  handleDelete = (e, title, author) => {
     console.log("it works with remove!");
	axios.delete(`${url}/api/book/${title}/${author}/`)
	.then(res => {
                axios.get(`${url}/api/book`)
          .then((answer) => {
              this.setState({books: answer.data})
            })
          .catch((err) => {
              console.log("Error: ", err)
            })
    console.log(res.data)
  })
  .catch((err) => {
    if(err.response.status  === 400){
    this.setState({
          error: "You cannot delete a book with existing quote."
        });
    }
  })
  
}
 
}

export default withRouter(Books);