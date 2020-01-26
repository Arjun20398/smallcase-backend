import React from 'react'
import { Table, Button, Input } from 'reactstrap'


function DisplayTable(props) {
    var handle_buy = props.handle_buy,
        handle_delete = props.handle_delete,
        handle_sell = props.handle_sell,
        handle_change_buy_price = props.handle_change_buy_price,
        handle_change_buy_count = props.handle_change_buy_count,
        handle_change_sell = props.handle_change_sell,
        table_data = props.table_data;
    return (
        <Table>
            <thead>
                <tr>
                    <th>Ticker Symbol</th>
                    <th>Average Buy Price</th>
                    <th>Shares</th>
                    <th>Sell/Buy</th>
                </tr>
            </thead>
            <tbody>
                {table_data.map((anObjectMapped, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{anObjectMapped.TickerSymbol}</th>
                            <td>{anObjectMapped.Price}</td>
                            <td>{anObjectMapped.Shares}</td>
                            <td className="row">
                                <form className="row" onSubmit={(event) => handle_buy(index, event)}>
                                    <Input required onChange={(event) => handle_change_buy_price(index, event)} className="w-25" name="buy_price" id="buy-price" value={anObjectMapped.buy_price}  placeholder="Price"/>
                                    <Input required onChange={(event) => handle_change_buy_count(index, event)} className="w-25" name="buy_count" id="buy-count" value={anObjectMapped.buy_count} placeholder="Shares" />
                                    <Button type="submit" outline color="success">Buy</Button>
                                </form>
                                <form className="row" onSubmit={(event) => handle_sell(index, event)}>
                                    <Input required onChange={(event) => handle_change_sell(index, event)} className="w-25" name="sell" id="dell" value={anObjectMapped.sell_value} />
                                    <Button type="submit" outline color="warning">Sell</Button>
                                </form>
                                <Button outline color="danger" onClick={() => handle_delete(index)}>Delete</Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    )
}

export default DisplayTable
