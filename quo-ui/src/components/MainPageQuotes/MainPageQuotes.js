import React, { Component } from 'react';
import axios from 'axios';
import url from './../../UrlConfig';
import PropTypes from "prop-types";
import './MainPageQuotes.css';
import MainPageQuote from '../MainPageQuote/MainPageQuote.js';
import { withRouter } from 'react-router';



class MainPageQuotes extends Component {
    constructor(props){
        super(props);
        this.state = {
          quotes: [],
          error: ""
        }
    }

    render(){
        if (this.state.quotes === []) {
            return <div>Please wait... Data is loading...</div>
        }
        var quotes = this.state.quotes.map((quote, index) => {
            return (  
                <MainPageQuote
                    id={"" + index}
                    key={quote.quote + quote.date} 
                    author={quote.author}
                    date={quote.date}
                    page={quote.page}
                    text={quote.text}
                    title={quote.title}
                />
            );
        });
        return (   
        <div className="card-deck">
  
                {quotes}

        </div>
        );
       }

    componentDidMount = () => {
        axios.get(`${url}/api/quote/latest/`)
          .then((answer) => {
              this.setState({quotes: answer.data})
              console.log(answer);
            })
          .catch((error) => {
              console.log("Error while reading books: ", error)
            })
    }
 
}

export default withRouter(MainPageQuotes);