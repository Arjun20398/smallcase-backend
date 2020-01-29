const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const routes = require('./api/routes');
const cors  = require('cors');
const port = 3033;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27018/Tradedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

autoIncrement.initialize(mongoose.connection);
require('./api/models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.listen(port)


routes(app);


console.log(`Server is listing on port: ${port}`)