const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const routes = require('./api/routes');
const cors  = require('cors');
const port = process.env.PORT || '5000';
const path = require('path');

const app = express();

const mongoURL = "mongodb://arjun:arjun123@ds229258.mlab.com:29258/tradedb"
//const mongoURL = "mongodb://localhost:27018/Tradedb"


mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, {
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

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {res.sendFile(path.join(__dirname + "/client/build/index.html"));});


console.log(`Server is listing on port: ${port}`)