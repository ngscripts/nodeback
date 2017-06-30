/**
 * Created by ulhaq on 5/15/2017.
 */
"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => console.log('Connected to DB ' + config.database));

const app = express();

const users = require('./routes/users');

// Port #
const port = 3000;

// Incase CROSS SITE TO BE ENABLED
app.use(cors());

// Static Assets
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Password Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Use Routes/Users
app.use('/api/users', users);

// Routing for Page Not Found
app.all('*', (req, res) => {
    res.sendfile(__dirname + '/public/index.html');
});

app.listen(port, () => { console.log("Magic is happening on port " + port); });
