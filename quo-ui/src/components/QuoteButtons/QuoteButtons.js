import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './QuoteButtons.css';
import {FaQuoteLeft} from 'react-icons/fa';
import url from './../../UrlConfig';
import { withRouter } from 'react-router';
import QuoteView from '../QuoteView/QuoteView.js';
import DeleteQuoteModal from "../DeleteQuoteModal/DeleteQuoteModal";
import UserContext from "../Utilities/UserContext";
import moment from "moment";


class QuoteButtons extends Component {
    static contextType = UserContext;
    constructor(props, context) {
    super(props, context);
    
    this.context.updateQuoteButtons = (loggedUserName) => 
    this.setState({loggedUserName: loggedUserName })

    this.state = {
        loggedUserName: this.context.loggedUserName,
        currentDate: this.props.match.params.date,
        date: "",
        page: 0,
        text: "",
        favourite: true,
        error: ""
        }
  }


clean = (data) => data.replaceAll(":", "-");


handleEditQuote = (e, date) => 
 this.props.history.push(`/edit_quote/${date}`);


  handleDeleteQuote = (e, date) => {
     console.log("it works with remove!");
    	axios.delete(`${url}/api/quote/${date}`)
	.then(res => {
       this.props.history.push('/');
  })
  .catch(err => {
    console.log(err)
  })
  
}



render(){
    return(

  <div className="card-body">
          {this.state.loggedUserName !== null && (<button type="button" className="btn btn-success" onClick={(e) => this.handleEditQuote(e, this.state.date)}>
            Edit Quote
          </button> )}
          {this.state.loggedUserName !== null && (<button type="button" className="btn btn-primary" data-toggle="modal"
              data-target={"#modal-"+ this.clean(this.state.date) + "-" + this.state.page } >
            Delete
          </button> )}
          {this.state.loggedUserName !== null && ( <DeleteQuoteModal
              handleDeleQuote={(e) => this.handleDeleteQuote(e, this.state.date)}
              id={"modal-" + this.clean(this.state.date)  + "-" +  this.state.page }>
             Do you want to delete quote {moment(this.state.date).format('YYYY-MM-DD')} date ?
          </DeleteQuoteModal> )}
            
  </div>

)}

    componentDidMount = () => {
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


QuoteButtons.propTypes = {
  id: PropTypes.string.isRequired
};

export default withRouter(QuoteButtons);