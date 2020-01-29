const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');


var History = new Schema({
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
    },

    TradeType: {
        type:String,
        required:true,
    }
});

var Portfolio = new Schema({

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

var Profile = new Schema({

    Name: {
        type: String,
        required: true
    },

    Credit: {
        type: Number,
        required: true,
    }

});


History.plugin(autoIncrement.plugin, 'Counter');
mongoose.model('Trade', Portfolio);
mongoose.model('History', History);
mongoose.model('Profile', Profile);