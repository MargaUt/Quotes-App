import React, { Component } from 'react';
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from 'react-router';
import './AddBook.scss';
import ImageUploader from '../ImageUploader/ImageUploader.js';
import PropTypes from "prop-types";

class AddBook extends Component {

  constructor(props) {

    super(props);
    this.state = { 
        author: "",
        bookIsFinished: true,
        booksPages: "",
        releasedYear: 2000,
        title: "",
        picture: "",
        error: ""
        }
  }


  handleBookAuthor = (event) => this.setState({ author: event.target.value});

  handleBooksPages = (event) => this.setState({ booksPages: event.target.value});

  handleReleasedYear = (event) => this.setState({ releasedYear: event.target.value});

  handleBookTitle = (event) => this.setState({ title: event.target.value});

  handlePicture = (picture) => this.setState({ picture: picture});
 
  handleBookIsFinished = (event) =>{
   console.log("value: ", event.target.checked)
   this.setState({ bookIsFinished: event.target.checked})
  } 

  doSubmit = async () => {
    const data ={
      author: this.state.author,
      bookIsFinished: this.state.bookIsFinished,
      booksPages: this.state.booksPages,
      releasedYear: this.state.releasedYear,
      title: this.state.title,
      picture: this.state.picture
   
    }
    try {
      await axios.post(`${url}/api/book`, data)
       this.props.history.push('/books');
    } catch (e) {
      console.log("klaida: ", e)
        console.log("klaida: ", e.response)
      }
      
    }
//  }


  handleSubmit = (event) => {
    this.doSubmit();
    event.preventDefault();
  }

  render() {
    return (

<form onSubmit={this.handleSubmit}>
  <div className ="align-items-center">

    <div className="form-group" >
      <label className="sr-only" for="inlineFormInputAuthor">Book author ({this.state.author}):</label>
      <input type="text" className="form-control" id="inlineFormInputAuthor" value={this.state.author}
          onChange={this.handleBookAuthor} placeholder="Author"/>
    </div>

    <div className="form-group">
      <label className="sr-only" for="inlineFormInputPages"> Book pages ({this.state.booksPages}):</label>
      <input type="number" 
          value={this.state.booksPages}
          onChange={this.handleBooksPages} className="form-control" id="inlineFormInputPages" placeholder="Book pages"/>
    </div>


    <div className="form-group">
      <label className="sr-only" for="inlineFormInputReleasedYear"> Book released year ({this.state.releasedYear}):</label>
      <input type="number" className="form-control" id="inlineFormInputReleasedYear" value={this.state.releasedYear}
          onChange={this.handleReleasedYear} placeholder="Book released year"/>
    </div>

    <div className="form-group">
      <label className="sr-only" for="inlineFormInputTitle"> Book title ({this.state.title}):</label>
      <input type="text" className="form-control" id="inlineFormInputTitle" value={this.state.title}
          onChange={this.handleBookTitle} placeholder="Book title"/>
    </div>

    
    <div className="form-group">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={this.state.bookIsFinished}
          onChange={this.handleBookIsFinished} id="autoSizingCheck2"/>
        <label className="form-check-label" for="autoSizingCheck2">
         {this.state.bookIsFinished ? "Book is finished to read" : "Book is not finished to read"} 
        </label>
      </div>
    </div>

      <ImageUploader
        className="picture-uploader"
        onChange={(picture) => this.handlePicture(picture)}
        defaultImage={this.state.picture}
        defaultDisplayImage={
        <div className="testi-image">
            <img alt="picture" src={this.state.picture} />
        </div>
        }
      />

    <div className="col-auto my-1">
      <button type="submit" className="btn btn-primary">Save</button>
    </div>
  </div>
</form>


    );
  }
}

AddBook.propTypes = {
onChange: PropTypes.func.isRequired,

};
 export default withRouter(AddBook);