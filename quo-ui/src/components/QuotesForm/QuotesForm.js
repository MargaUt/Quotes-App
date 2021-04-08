import React, { Component } from 'react';
import axios from "axios";
import url from "./../../UrlConfig";
import { withRouter } from 'react-router';
import './QuotesForm.css';


class QuotesForm extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        author: "",
        date: "",
        page: 0,
        text: "",
        title: "",
        error: ""
        }
  }

  handleBookAuthor = (event) => this.setState({ author: event.target.value});

  handleDate = (event) => this.setState({ date: event.target.value});
  
  handlePage = (event) => this.setState({ page: event.target.value});

  handleText = (event) => this.setState({ text: event.target.value});

  handleBookTitle = (event) => this.setState({ title: event.target.value});

  


  // handleActive = (event) =>{
  //  console.log("value: ", event.target.checked)
  //  this.setState({ active: event.target.checked})
  // } 

  doSubmit = async () => {
    const data ={
      author: this.state.author,
      date: this.state.date,
      page: this.state.page,
      text: this.state.text,
      title: this.state.title,
      
    }
    try {
      await axios.post(`${url}/api/quote`, data)
       this.props.history.push('/quotes');
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

     <div className="col-sm-3 my-1">
      <label className="sr-only" for="inlineFormInputAuthor"> Book Author ({this.state.author}):</label>
      <input type="text" className="form-control" id="inlineFormInputAuthor" value={this.state.author}
          onChange={this.handleBookAuthor} placeholder="Book Author"/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" for="inlineFormInputDate">  Date ({this.state.date}):</label>
      <input type="text" 
          value={this.state.date}
          onChange={this.handleDate} className="form-control" id="inlineFormInputDate" placeholder="Date"/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" for="inlineFormInputPage"> Quote Page ({this.state.page}):</label>
      <input type="number" className="form-control" id="inlineFormInputPage" value={this.state.page}
          onChange={this.handlePage} placeholder="Quote Page"/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" for="inlineFormInputText">Quote ({this.state.text}):</label>
      <input type="text" className="form-control" id="inlineFormInputText" value={this.state.text}
          onChange={this.handleText} placeholder="Quote"/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" for="inlineFormInputTitle"> Book Title ({this.state.title}):</label>
      <input type="text" className="form-control" id="inlineFormInputTitle" value={this.state.title}
          onChange={this.handleBookTitle} placeholder="Book Title"/>
    </div>

 

    
    {/* <div className="col-auto my-1">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={this.state.active}
          onChange={this.handleActive} id="autoSizingCheck2"/>
        <label className="form-check-label" for="autoSizingCheck2">
         {this.state.active ? "Aktyvi" : "Neaktyvi"} eilė
        </label>
      </div>
    </div> */}

    <div className="col-auto my-1">
      <button type="submit" className="btn btn-primary">Save</button>
    </div>
  </div>
</form>


    );
  }
}
 export default withRouter(QuotesForm);