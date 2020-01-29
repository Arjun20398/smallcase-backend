import React from 'react'
import { Table } from 'reactstrap'


function DisplayHistory(props) {
    var history = props.history;
    return (
        <Table>
            <thead>
                <tr>
                    <th>Ticker Symbol</th>
                    <th>Price</th>
                    <th>Shares</th>
                    <th>Sell/Buy</th>
                </tr>
            </thead>
            <tbody>
                {history.map((anObjectMapped, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{anObjectMapped.TickerSymbol}</th>
                            <td>{anObjectMapped.Price}</td>
                            <td>{anObjectMapped.Shares}</td>
                            <td>{anObjectMapped.TradeType}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    )
}

export default DisplayHistory
