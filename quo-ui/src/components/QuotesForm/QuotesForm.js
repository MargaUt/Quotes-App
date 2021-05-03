import React, { Component } from 'react';
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from 'react-router';
import './QuotesForm.css';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import moment from "moment";
import {Link} from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";


class QuotesForm extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        author: "",
        startDate: new Date(),
        page: 0,
        text: "",
        title: "",
        error: "", 
        favourite: true,
        books: [],
        titles: [],
        selectedOption: "",
        clearable: true
        }
  }

  handleBookAuthor = (bookTitleHash) => { 
  console.log("bookTitleHash: ", bookTitleHash)
  var bookArray = this.state.books.filter(book => (book.author + "-" + book.title).hashCode() === bookTitleHash.value);
  console.log("bookArray: ", bookArray);
  bookArray.map(book => this.setState({ author: book.author, title: book.title }));
  }


  onChangeDate(date) {this.setState({ startDate: date })}
  
  handlePage = (event) => this.setState({ page: event.target.value});

  handleText = (event) => this.setState({ text: event.target.value});

  handleBookTitle = (event) => this.setState({ title: event.target.value});


  renderList(){
 return (this.state.books.map(book =>({label: book.author + "-" + book.title, value: (book.author + "-" + book.title).hashCode()})))
}


  handleFavourite = (event) =>{
   console.log("value: ", event.target.checked)
   this.setState({ favourite: event.target.checked})
  } 

  doSubmit = async () => {
    const data ={
      author: this.state.author,
      date: this.state.startDate,
      page: this.state.page,
      text: this.state.text,
      title: this.state.title,
      favourite: this.state.favourite
      
    }
    try {
      await axios.post(`${url}/api/quote`, data)
       this.props.history.push('/quotes');
    } catch (e) {
      console.log("klaida: ", e)
        console.log("klaida: ", e.response)
      }
      
    }


  handleSubmit = (event) => {
    this.doSubmit();
    event.preventDefault();
  }

  render() {
     
    return (
  <form className="form-horizontal" onSubmit={this.handleSubmit}>   

     <div className="form-group">
        <label className="control-label col-sm-2" >
        Author {this.state.author}</label>
        <div className="form-group">
           <label className="col-sm-2"> 
           Book Title {this.state.title}</label>
           </div>
           <div className="row">
           
          <div className="col-sm" >
             <Select
               name="form-field-author"
               value={this.selectedOption}
               onChange={this.handleBookAuthor}
               clearable={this.state.clearable}
               valueKey='author'
               options={this.renderList()}      
            />
            </div>
                <div className="col-sm" >
            <Link  className="font-weight-bold font-italic h5" to='/add_book'>Add book</Link> 
        </div>
        </div>       
      </div>

      <div className="form-group">
        <label className="control-label col-sm-2" for="disabledSelect1">Date {this.state.date}</label>
          <div className="col-sm-4">
         <DatePicker
            className="form-control" 
            id="date"
            name="date"
            defaultValue=""
            selected={this.state.startDate}
            onChange={date => this.onChangeDate(date)} 
          />
          </div>
       </div>

      <div class="form-group">
      <label className="control-label col-sm-4" for="inlineFormInputPage"> Quote Page {this.state.page}</label>
       <div className="col-sm-4">
      <input type="number" className="form-control" id="inlineFormInputPage" value={this.state.page}
          onChange={this.handlePage} placeholder="Quote Page" tabindex="3"/>
      </div>
    </div>

      <div class="form-group">
      <label className="control-label col-sm-4" for="inlineFormInputText">Quote {this.state.text}</label>
       <div className="col-sm-4">
      <textarea type="text" className="form-control" id="inlineFormInputText" value={this.state.text}
          onChange={this.handleText} placeholder="Quote" tabindex="4"/>
      </div>
    </div>


     <div class="form-group">
     <div class="col-sm-offset-2 col-sm-10">
      <div className="form-check"> 
        <label>
         <input className="form-check-input" type="checkbox" checked={this.state.favourite}
          onChange={this.handleFavourite}/>
         {this.state.favourite ? " Favourite" : "Not favourite"} quote
        </label>
      </div>
      </div>
    </div> 

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" className="btn btn-default">Save</button>
      </div>
    </div>
       
</form>
  
    );
  }


   componentDidMount() {
   axios.get(`${url}/api/book/allBooks`)
        .then(res => {
            this.setState({
                books: res.data
            })
            console.log("hello", this.state.books)
        })
   }


}
 export default withRouter(QuotesForm);