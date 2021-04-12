import React, { Component } from 'react';
import axios from 'axios';
import url from './../../UrlConfig';
import PropTypes from "prop-types";
import './Books.css';
import Book from '../Book/Book.js';
import { withRouter } from 'react-router';
import DeleteBookModal from "../DeleteBookModal/DeleteBookModal.js";
import Pagination from "react-js-pagination";

class Books extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: [],
            keyword:"",
            pageSize: 10,
            currentPage: 1,
            totalPages: 0,
            totalElements: 0,
            numberOfElements: 0,
            error: ""
           
        }
    }

  searchSpace=(event)=>{
      if(event.key == "Enter") {
       let keyword = event.target.value;
      event.preventDefault();
    this.getBookInfo(1, keyword);
      }
 
  }

  handlePageChange = (page) => {
    console.log(page)
    //thi/({ currentPage: page });
    this.getBookInfo(page, this.state.keyword);
  };


    render(){

 // const { pageSize, currentPage, totalCount} = this.state;


        const unikalus = "tikrai"
        if (this.state.books === []) {
            return <div>Please wait... Data is loading...</div>
        }


    const books = this.state.books.map((book, index) => {
            return (  
                <Book
                    id={"" + index}
                    key={book.title + book.author} 
                    author={book.author}
                    title={book.title}
                    releasedYear={book.releasedYear}
                    booksPages={book.booksPages}
                    bookIsFinished={book.bookIsFinished}
                    picture={book.picture}
                    handleEditBook={(e) => this.handleBookEdit(e, book.title, book.author)}
                    handleDelete={(e) => this.handleDelete(e, book.title, book.author)}
                    />
               
            );
        });
        console.log(this.state.numberOfElements);
        return (  
          <div> 

            <div className="col">
                <input
                  type="text" placeholder="Enter book title ot author."
                  label="Search"
                  icon="search"
                  onKeyUp={(e)=>this.searchSpace(e)} 
                />
              </div>
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
                    <th scope="col">&nbsp;</th>
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

        <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={this.state.currentPage}
            itemsCountPerPage={this.state.pageSize}
            totalItemsCount={this.state.totalElements}
            pageRangeDisplayed={2}
            onChange={this.handlePageChange}
          />
            </div>
        );
       }



getBookInfo (currentPage, keyword) {
          axios.get(`${url}/api/book?page=${currentPage -1}&title=${keyword}&author=${keyword}`)
          .then((answer) => {
              this.setState({
                books: answer.data.content,
                totalPages: answer.data.totalPages,
                totalElements: answer.data.totalElements,
                numberOfElements: answer.data.numberOfElements,
                currentPage: answer.data.number + 1,})
              console.log(answer);
            })
          .catch((error) => {
              console.log("Error while reading books: ", error)
            })
  
}
    componentDidMount = () => {
        this.getBookInfo(this.state.currentPage, this.state.keyword);
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