import React, { Component } from 'react';
import axios from 'axios';
import url from './../../UrlConfig';
import PropTypes from "prop-types";
import './Quotes.css';
import Quote from '../Quote/Quote.js';
import { withRouter } from 'react-router';




class Quotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            quotes: []

        }
    }



    render(){
        if (this.state.quotes === []) {
            return <div>Duomenys dar kraunami... Prašome palaukti...</div>
        }
        var quotes = this.state.quotes.map((quote, index) => {
            return (  
                <Quote
                    id={"" + index}
                    key={quote.quote + quote.date} 
                    author={quote.author}
                    date={quote.date}
                    page={quote.page}
                    text={quote.text}
                    title={quote.title}
                    favourite={quote.favourite}
                    handleEdit={(e) => this.handleEdit(e, quote.date)}
                    handleD={(e) => this.handleD(e, quote.date)}
                    />
               
            );
        });
        return (<table className="table table-hover">
                    <thead>
                     <tr>
                      <th scope="col">Book author</th>
                      <th scope="col">Date</th>
                      <th scope="col">Quote page</th>
                      <th scope="col">Quote</th>
                      <th scope="col">Book title</th>
                      <th scope="col">Favourite Quote</th>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">&nbsp;</th>
                     </tr>
                    </thead>
                        {quotes}
                </table>);
    }

    componentDidMount = () => {
        axios.get(`${url}/api/quote`)
          .then((atsakymas) => {
              this.setState({quotes: atsakymas.data})
              console.log(atsakymas);
            })
          .catch((klaida) => {
              console.log("Klaida skaitant eiles: ", klaida)
            })
    }


handleEdit = (e, date) => 
 this.props.history.push(`/edit/${date}`);


  handleD = (e, date) => {
     console.log("it works with remove!");
	axios.delete(`${url}/api/quote/${date}/`)
	.then(res => {
                axios.get(`${url}/api/quote`)
          .then((answer) => {
              this.setState({quotes: answer.data})
            })
          .catch((err) => {
              console.log("Error: ", err)
            })
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })
  
}

}

export default withRouter(Quotes);