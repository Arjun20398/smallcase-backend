const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');


var HistorySchema = new Schema({

    TickerSymbol: {
        type: String,
        required: true
    },

    CreatedTime: {
        type: Date,
        default: Date.now
    },

    Shares: {
        type: Number,
        required: true,
    },

    Price: {
        type: Number,
        required: true,
    }

});

var TradeSchema = new Schema({

    TickerSymbol: {
        type: String,
        required: true
    },

    Shares: {
        type: Number,
        required: true,
    },

    Price: {
        type: Number,
        required: true,
    }

});


mongoose.model('Trade', TradeSchema);
HistorySchema.plugin(autoIncrement.plugin, 'Counter');
mongoose.model('History', HistorySchema);