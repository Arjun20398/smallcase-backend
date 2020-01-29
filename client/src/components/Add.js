import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, } from 'reactstrap';
import axios from 'axios';
const config = require("../config");

const max = 100000;
export class Add extends Component {
    _error = {
        ticker:'',
        share:'',
        price:''
    }
    constructor(){
        super();
        this.state = {
            TickerSymbol : "",
            SharePrice : "",
            Share: "",
        }
    }

    handle_share = (event) => {
        this.setState({
            Share : event.target.value 
        })
        console.log(event.target.value)
        if(event.target.value<1 || event.target.value>max){
            this._error.share = 'Share quantity should be more than 0 and less than 100000';
        }
    }

    handle_tickerSymbol = (event) => {
        this.setState({
            TickerSymbol : event.target.value
        })
        console.log(!(/[a -zA-Z]*/.test(event.target.value)));
        if((/[a -zA-Z]*/.test(event.target.value) === true)){
            this._error.ticker = '';
        }
    }

    handle_asp = (event) => {
        this.setState({
            SharePrice : event.target.value
        })
        if(event.target.value<1 ||event.target.value>max){
            this._error.price = 'Share Price should be more than 0 and less than 100000';
        }
    }

    handle_submit = (event) => {
        console.log(this._error)
        if(this._error.share !== '' || this._error.price !== '' || this._error.ticker !== ''){
            alert(this._error.share+'\n'+this._error.price+'\n'+this._error.ticker);
            return ;
        }
        event.preventDefault();
        var form_data = {
            TickerSymbol: this.state.TickerSymbol.toUpperCase(),
            Price: this.state.SharePrice,
            Shares: this.state.Share,
            TradeType: 'Buy'
        }

        axios.post(config.URL + '/api/trade', form_data)
        .then(response => {
            console.log(response)
            this.props.history.push(`/`)
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(form_data)
    }

    render() {
        return (
            <Row>
                <Form className="col-md-3 col-sm-8 p-5 col-centered text-left border" onSubmit={this.handle_submit}>
                    <FormGroup>
                        <Label for="TickerSymbol">Ticker Symbol</Label>
                        <Input required value={this.state.TickerSymbol} onChange={this.handle_tickerSymbol} />
                        <small className="text-danger"></small>
                    </FormGroup>
                    <FormGroup>
                        <Label for="SingleSharePrice">Single Share Price</Label>
                        <Input type="number" required value={this.state.SharePrice} onChange={this.handle_asp} pattern="\d+" />
                        <small className="text-danger"></small>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Shares">Shares</Label>
                        <Input type="number" required value={this.state.Share} onChange={this.handle_share} pattern="\d+"/>
                        <small className="text-danger"></small>
                    </FormGroup>
                    <Button size="sm" block onClick={this.handle_submit}>Add</Button>
                </Form>
            </Row>
        )
    }
}

export default Add
