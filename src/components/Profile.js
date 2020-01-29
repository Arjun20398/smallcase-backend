import React, { Component } from 'react'
import { Button } from 'reactstrap'
import DisplayTable from "./DisplayTable"
import Header from "./Header"
import axios from "axios"

const config = require("../config");
const min_price = 1;
const max_price = 100000;
const min_count = 1;
const max_count = 100000;
const min_sell_count = 1;

export class Profile extends Component {
    _errors = {
        buy_price: "",
        buy_count: "",
        sell_value : ""
    }

    _isFormValid = 0;

    constructor() {
        super();
        this.state = {
            returns: -1,
            table_data: [],
            name:'',
            credits: 0,
            _form_error:''
        }
    }

    fetchData = () => {
        console.log("Fetching data")

        axios.get('http://localhost:3033/api/portfolio')
            .then(response => {

                let arr = [...response.data];

                arr.forEach(a => {
                    a.buy_price = '';
                    a.buy_count = '';
                    a.sell_value = '';
                })

                this.setState(prevState => ({
                    table_data: arr
                }))
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:3033/api/returns')
            .then(response => {

                this.setState(prevState => ({
                    returns: response.data.amount
                }))
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('http://localhost:3033/api/credits')
            .then(response => {
                this.setState(prevState => ({
                    credits: response.data.Credit,
                    name : response.data.Name
                }))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handle_delete = (index) => {
        console.log("Handle Delete " + index);

        if (index === -1) {
            return;
        }

        var data = this.state.table_data[index];
        data.TradeType = 'Sell';
        axios.delete(`http://localhost:3033/api/trade/`, { data })
            .then(() => {
                this.fetchData();
            })
            .catch((error) => {
                console.log(error);
            });


        var array = [...this.state.table_data];

        array.splice(index, 1);
        this.setState({ table_data: array });

    }

    handle_buy = (index, event) => {


        if (index === -1) {
            return;
        } else if(this._errors.buy_price !== '' || this._errors.buy_count !== ''){
            alert(this._errors.buy_count +' '+ this._errors.buy_price );
            return;
        }
        event.preventDefault();

        let data = this.state.table_data[index]

        let body = {
            TickerSymbol: data.TickerSymbol,
            Price: data.buy_price,
            Shares: data.buy_count,
            TradeType:'Buy',
        }

        axios.put(`http://localhost:3033/api/trade/`, body)
            .then(() => {
                this.fetchData();
            })
            .catch(function (error) {
                console.log(error);
            });
        this.fetchData(); 

    }

    handle_sell = (index, event) => {

        if (index === -1) {
            return
        } else if(this._errors.sell_value !== ''){
            alert(this._errors.sell_value);
            return 
        }

        event.preventDefault();

        let data = this.state.table_data[index]


        let body = {
            TickerSymbol: data.TickerSymbol,
            Shares: - data.sell_value,
            TradeType:'Sell'
        }

        axios.put(`http://localhost:3033/api/trade/`, body)
            .then(() => {
                this.fetchData();
            })
            .catch(function (error) {
                console.log(error);
            });
        //this.fetchData();

    }

    handle_change_buy_price = (index, event) => {
        var array = [...this.state.table_data];
        if(event.target.value >= min_price && event.target.value <= max_price){
            this._errors.buy_price = '';
        } else {
            this._errors.buy_price = 'Minimum share price should be ' + min_price +
                                        '\n Maximum share price should be ' + max_price;
        }
        if (index !== -1) {
            array[index].buy_price = event.target.value;
            this.setState({ table_data: array });
        }
    }

    handle_change_buy_count = (index, event) => {
        if(event.target.value >= min_count && event.target.value <= max_count && typeof(event.target.value) === 'number'){
            this._errors.buy_count = '';
        } else {
            this._errors.buy_count = 'Minimum share count should be ' + min_count +
                                        '\n Maximum share count should be ' + max_count;
        }
        var array = [...this.state.table_data];
        if (index !== -1) {
            array[index].buy_count = event.target.value;
            this.setState({ table_data: array });
        }
    }

    handle_change_sell = (index, event) => {
        if(index === -1){
            return 
        }
        console.log("Handle Change " + index)
        var array = [...this.state.table_data];
        if(event.target.value >= min_sell_count && event.target.value < array[index].Shares  && typeof(event.target.value) === 'number'){
            this._errors.sell_value = '';
        } else {
            this._errors.sell_value = 'Minimum shares to sell should be ' + min_sell_count +
                                        '\n Maximum shares to sell should be ' + (array[index].Shares - 1);
            console.log(this._errors.sell_value);
        }
        
        array[index].sell_value = event.target.value;
        this.setState({ table_data: array });
        
    }


    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <Header name={this.state.name}credits={this.state.credits}></Header>
                <div className="m-5">
                    <Button className="float-left mb-3" href="/Add">Add</Button>
                    <Button className="float-left mb-3 ml-3" href="/history">History</Button>
                    <DisplayTable
                        handle_buy={this.handle_buy}
                        handle_delete={this.handle_delete}
                        handle_sell={this.handle_sell}
                        table_data={this.state.table_data}
                        handle_change_buy_price={this.handle_change_buy_price}
                        handle_change_buy_count={this.handle_change_buy_count}
                        handle_change_sell={this.handle_change_sell}>
                    </DisplayTable>
                    <div className="text-right"><h4>Returns : {this.state.returns}</h4></div>
                </div>
            </div>
        )
    }
}

export default Profile
