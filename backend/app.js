const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const langueRoutes = require('./api/routes/langue');
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/langues", {
    useNewUrlParser: true,

});

////gestion du cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use('/api/langue', langueRoutes);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;