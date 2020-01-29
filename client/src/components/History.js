import React, { Component } from 'react'
import { Button } from 'reactstrap'
import DisplayHistory from "./DisplayHistory"
import Header from "./Header"
import axios from "axios"
import PageChoose from './PageChoose'
const config = require("../config");


export class History extends Component {

    constructor() {
        super();
        this.state = {
            credits : 0,
            name : "",
            currentPage : 1,
            limit: 10,
            _isloading : false,
            totalPage : 1,
            pagelist : [],
            history : []
        }
    }

    fetchData = () => {
        console.log("Fetching history")
        this.fetchPage(this.state.currentPage)
        axios.get(config.URL + '/api/credits')
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

    getPageCount = () => {
        axios.get(config.URL + '/api/getHistoryCount')
            .then(response => {
                var arr = [];
                for(var i=0; i<Math.ceil(response.data/this.state.limit); i++){
                    arr.push(i);
                }
                // console.log(arr)
                this.setState(prevState => ({
                    totalPage: Math.ceil(response.data/this.state.limit),
                    pagelist: arr
                }))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetchPage = (index) =>{
        axios.get(config.URL + '/api/history?pageNo='+index+'&size='+this.state.limit)
            .then(response => {
                let arr = [...response.data];
                console.log(arr)
                this.setState({
                    history: arr
                })
                this.setState({
                    _isloading:false
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handlePageChange = (event,index) => {
        this.setState({
            _isloading:true
        })
        this.setState({
            currentPage : index+1
        })
        console.log(this.state.currentPage);
        this.fetchPage(index+1);
    }

    componentDidMount() {
        this.fetchData();
        this.getPageCount();
    }

    render() {
        return (
            <div>
                <Header name={this.state.name} credits={this.state.credits}></Header>
                <div className="m-5">
                    <Button className="float-left mb-3" href="/Add">Add</Button>
                    <Button className="float-left mb-3 ml-3" href="/">Home</Button>
                    {this._isloading?"Please wait..." : <DisplayHistory
                        history={this.state.history}>
                    </DisplayHistory>}
                    <PageChoose pagelist = {this.state.pagelist}
                                currentPage = {this.state.currentPage}
                                handlePageChange = {this.handlePageChange}></PageChoose>
                </div>
            </div>
        )
    }
}

export default History
