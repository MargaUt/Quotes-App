import React, { Component } from 'react';
import axios from 'axios';
import url from './../../UrlConfig';
import PropTypes from "prop-types";
import './FavouriteQuotes.css';
import FavouriteQuote from '../FavouriteQuote/FavouriteQuote.js';
import { withRouter } from 'react-router';



class FavouriteQuotes extends Component {
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
                <FavouriteQuote
                    id={"" + index}
                    key={quote.quote + quote.date} 
                    author={quote.author}
                    date={quote.date}
                    page={quote.page}
                    text={quote.text}
                    title={quote.title}
                    favourite={quote.favourite}
                    handleViewQuote={(e) => this.handleViewQuote(e,  quote.date)}
                    
                />
            );
        });
        return (  
            <div className="card-deck mx-auto">
                {quotes}
            </div>

        );
       }

    componentDidMount = () => {
        axios.get(`${url}/api/quote/favourites`)
          .then((answer) => {
              this.setState({quotes: answer.data})
              console.log(answer);
            })
          .catch((error) => {
              console.log("Error while reading quotes: ", error)
            })
    }
    
    handleViewQuote = (e, date) => 
 this.props.history.push(`/view_quote/${date}`);
 
}

export default withRouter(FavouriteQuotes);