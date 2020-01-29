import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, } from 'reactstrap';
import axios from 'axios';

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
        if(parseInt(this.state.Share)<1 || parseInt(this.state.Share)>max){
            this._error.share = 'Share quantity should be more than 0 and less than 100000';
        }
    }

    handle_tickerSymbol = (event) => {
        this.setState({
            TickerSymbol : event.target.value
        })
        if(!(/[a-zA-Z]*/.test(this.state.TickerSymbol))){
            this._error.share = 'Ticker Symbol must be alphabetic string';
        }
    }

    handle_asp = (event) => {
        this.setState({
            SharePrice : event.target.value
        })
        if(parseInt(this.state.SharePrice)<1 || parseInt(this.state.SharePrice)>max){
            this._error.price = 'Share Price should be more than 0 and less than 100000';
        }
    }

    handle_submit = (event) => {
        if(this._error.share !== '' || this._error.price !== '' || this._error.ticker !== ''){
            alert(this._error.share+'\n'+this._error.price+'\n'+this._error.ticker);
            return 
        }
        event.preventDefault();
        var form_data = {
            TickerSymbol: this.state.TickerSymbol.toUpperCase(),
            Price: this.state.SharePrice,
            Shares: this.state.Share,
            TradeType: 'Buy'
        }

        axios.post('http://localhost:3033/api/trade', form_data)
        .then(response => {
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
                        <Input required value={this.state.SharePrice} onChange={this.handle_asp} />
                        <small className="text-danger"></small>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Shares">Shares</Label>
                        <Input required value={this.state.Share} onChange={this.handle_share} />
                        <small className="text-danger"></small>
                    </FormGroup>
                    <Button size="sm" block onClick={this.handle_submit}>Add</Button>
                </Form>
            </Row>
        )
    }
}

export default Add
