import React, { Component } from "react";
import axios from "axios";
import url from "./../../UrlConfig";
import "./Books.css";
import Book from "./Book/Book.js";
import { withRouter } from "react-router";
import Pagination from "react-js-pagination";
import Spinner from "../../common/Spinner/Spinner.js";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      books: [],
      keyword: "",
      pageSize: 10,
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      error: "",
      loading: true,
    };
  }

  searchSpace = (event) => {
    if (event.key === "Enter") {
      let keyword = event.target.value;
      event.preventDefault();
      this.getBookInfo(1, keyword);
    }
  };

  handlePageChange = (page) => {
    this.getBookInfo(page, this.state.keyword);
  };

  render() {
    if (this.state.loading === true) {
      return <Spinner />;
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
          handleViewBook={(e) =>
            this.handleViewBook(e, book.title, book.author)
          }
        />
      );
    });
    return (
      <div>
        <div className="col-lg-8 col-md-6 col-sm-12 p-0">
          <input
            type="text"
            placeholder="Enter book title or author"
            className="plus"
            id="search"
            name="search"
            onKeyUp={(e) => this.searchSpace(e)}
          />
        </div>

        <div className="self-card margin">
          <div className="card-body">
            <table className="table align-middle table-hover">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">&nbsp;</th>
                </tr>
              </thead>
              {books}
            </table>
          </div>
        </div>
        <nav
          aria-label="Page navigation example"
          className="pagination justify-content-center"
        >
          <Pagination
            className="page-item disabled page-link page-item"
            itemClass="page-item"
            linkClass="page-link"
            activePage={this.state.currentPage}
            itemsCountPerPage={this.state.pageSize}
            totalItemsCount={this.state.totalElements}
            pageRangeDisplayed={2}
            onChange={this.handlePageChange}
          />
        </nav>
      </div>
    );
  }

  getBookInfo(currentPage, keyword) {
    axios
      .get(
        `${url}/api/book?page=${
          currentPage - 1
        }&title=${keyword}&author=${keyword}`
      )
      .then((answer) => {
        this.setState({
          books: answer.data.content,
          totalPages: answer.data.totalPages,
          totalElements: answer.data.totalElements,
          numberOfElements: answer.data.numberOfElements,
          currentPage: answer.data.number + 1,
        });
      })
      .catch((error) => {});
  }
  componentDidMount = () => {
    this.timerHandle = setTimeout(
      () => this.setState({ loading: false }),
      3500
    );
    this.getBookInfo(this.state.currentPage, this.state.keyword);
  };

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  handleViewBook = (e, title, author) =>
    this.props.history.push(`/view_book/${title}/${author}`);
}

export default withRouter(Books);
