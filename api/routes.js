'use strict';

module.exports = function (app) {
    const controller = require('./controllers');

    app.route('/api/trade')
        .get(controller.getHistory)
        .post(controller.updateTrade)
        .put(controller.updateTrade)
        .delete(controller.deleteTrade);

    app.route('/api/portfolio')
        .get(controller.getPortfolio);

    app.route('/api/holdings/')
        .get(controller.getHoldings);

    app.route('/api/returns/')
        .get(controller.getReturns);

    app.route('/api/credits')
        .get(controller.getCredits);

    app.route('/api/history')
        .get(controller.getHistory);
    
    app.route('/api/getHistoryCount')
        .get(controller.getHistoryCount);

};
