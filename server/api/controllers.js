'use strict'

const mongoose = require('mongoose');
const Trade = mongoose.model('Trade');
const History = mongoose.model('History');


exports.addTrade = async (req, res) => {
    let newHistory = new History(req.body);
    try {
        let result = await newHistory.save();
    } catch (err) {
        console.error(err);
    }

    try {
        let trade = new Trade(req.body)
        let result = await trade.save();
        res.json(result)
    } catch (err) {
        res.json(err)
    }
}


exports.getHistory = async (req, res) => {
    try {
        let result = await History.find({})
        res.json(result)

    } catch (err) {
        res.send(err)
    }
}


exports.updateTrade = async (req, res) => {
    
    try {
        let result = await History.findOneAndUpdate(
            { _id: req.params.tradeId },
            req.body,
            { new: true }
        );
    } catch (err) {
        console.error(err);
    }


    try {
        let ts = req.body.TickerSymbol;
        let trade = await Trade.findOne({ TickerSymbol: ts });

        if (req.body.Shares > 0) {
            // if buy => change avg pricep
            let num = (trade.Price * trade.Shares + parseInt(req.body.Price) * parseInt(req.body.Shares));
            let dum = (trade.Shares + parseInt(req.body.Shares));
            console.log({ num, dum })
            trade.Price = num / dum;
        }

        trade.Shares += parseInt(req.body.Shares);
        console.log(trade, req.body)
        await trade.save();

        res.json(trade);

    } catch (err) {
        res.send(err)
    }

}


exports.deleteTrade = async (req, res) => {

    try {
        var r = await Trade.deleteOne({
            TickerSymbol: req.body.TickerSymbol
        });

        res.json({ message: 'Trade successfully deleted', r });
    } catch (err) {
        res.send(err);
    }
}


exports.getPortfolio = async (req, res) => {

    try {
        let result = await Trade.find({})
        res.json(result)

    } catch (err) {
        res.send(err)
    }
}


exports.getHoldings = async (req, res) => {
    try {

    } catch (err) {
        res.send(err);
    }
}


exports.getReturns = async (req, res) => {
    const currentPrice = 100;
    // SUM((CURRENT_PRICE[ticker] - AVERAGE_BUY_PRICE[ticker]) * CURRENT_QUANTITY[ticker])
    try {

        let result = await Trade.aggregate([
            {
                $project: {
                    'totalPrice': {
                        $multiply: [
                            {
                                $subtract: [currentPrice, '$Price']
                            },
                            '$Shares'
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    amount: {
                        $sum: "$totalPrice"
                    }
                }
            }
        ]);

        res.json({ amount: result[0].amount });
    } catch (err) {
        res.send(err);
    }

}