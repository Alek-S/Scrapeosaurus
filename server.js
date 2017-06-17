'use strict';

//==MODULES==
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');


//==Express Setup==
const app = express();
app.set('port', (process.env.PORT || 5000));


//===Parsing===
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


//===Static Files, CSS,Images,Fonts===
app.use(express.static('public'));


//===Express-Handlebars===
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


//===MongoDB Connection with Mongoose==
mongoose.Promise = global.Promise; //use standard Promise instead of Mongo's promise library
mongoose.connect('mongodb://localhost/scrape');
const db = mongoose.connection;

db.on('error', function(error) { // Show any mongoose errors
	console.log(chalk.red('Mongoose Error: '), error);
});


//===Routes===
require('./controller/routes.js')(app);


//==Start Server==
let server = app.listen(app.get('port'), function() {
	console.log('Running on Port:', app.get('port'),'\n' );
});

module.exports = server;