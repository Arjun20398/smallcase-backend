'use strict'

const mongoose = require('mongoose');
const Trade = mongoose.model('Trade');
const History = mongoose.model('History');
const Profile = mongoose.model('Profile');
const sellingPrice = 100;


exports.addTrade = async (req, res) => {
    let newHistory = new History(req.body);
    try {
        let result = await newHistory.save();
    } catch (err) {
        console.error(err);
    }
    let profile = await Profile.findOneAndUpdate({},{$inc: {Credit:- req.body.Price * req.body.Shares}},{new:true});
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
        let history = new History(req.body);
        let trade = await Trade.findOne({ TickerSymbol: ts });

        let totalShares = trade.Shares + parseInt(req.body.Shares),avgBuyPrice;
        // if buy => change avg pricep
        if(req.body.Shares < 0){
            avgBuyPrice = trade.Price;
            history.Shares *= -1;
            history.Price = sellingPrice;
            let profile = await Profile.findOneAndUpdate({},{$inc: {Credit: 100 * req.body.Shares}},{new:true});
        } else {
            avgBuyPrice = (trade.Price * trade.Shares + 
                parseInt(req.body.Price) * parseInt(req.body.Shares)) / totalShares;
            let profile = await Profile.findOneAndUpdate({},{$inc: {Credit: - req.body.Price * req.body.Shares}},{new:true});
        }
        trade.Price = avgBuyPrice;
        trade.Shares += parseInt(req.body.Shares);
        //console.log(trade, req.body)
        await history.save();
        await trade.save();
        res.json(trade);

    } catch (err) {
        res.send(err)
    }

}


exports.deleteTrade = async (req, res) => {
    let body = req.body;
    let history = new History({TickerSymbol:body.TickerSymbol,Price:sellingPrice,
                            Shares:body.Shares,TradeType:body.TradeType,CreatedTime:Date.now()})
    try {
        var r = await Trade.deleteOne({
            TickerSymbol: req.body.TickerSymbol
        });
        await history.save();
        let profile = await Profile.findOneAndUpdate({},{$inc: {Credit: 100 * body.Shares}},{new:true});
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


exports.getCredits = async (req, res) => {
    try {
        let profile = await Profile.findOne();
        res.json(profile);
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