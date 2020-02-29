const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/MyApp', {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to database!')
    })
    .catch(() => {
        console.log('Connection failed!')
    });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next()
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);
app.use(cors());

module.exports = app;