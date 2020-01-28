import React, { Component } from 'react'
import { Button } from 'reactstrap'
import DisplayTable from "./DisplayTable"
import Header from "./Header"
import axios from "axios"

const config = require("../config");

export class Profile extends Component {
    constructor() {
        super();
        this.state = {
            returns: -1,
            table_data: [],
            name:'',
            credits: 0
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
                    credits: response.data.Credit
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
        if (index !== -1) {
            array[index].buy_price = event.target.value;
            this.setState({ table_data: array });
        }
    }

    handle_change_buy_count = (index, event) => {
        var array = [...this.state.table_data];
        if (index !== -1) {
            array[index].buy_count = event.target.value;
            this.setState({ table_data: array });
        }
    }

    handle_change_sell = (index, event) => {
        console.log("Handle Change " + index)
        var array = [...this.state.table_data];
        if (index !== -1) {
            array[index].sell_value = event.target.value;
            this.setState({ table_data: array });
        }
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
