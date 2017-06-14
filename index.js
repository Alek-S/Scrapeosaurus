'use strict';


//==MODULES==
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");

//Models
//TODO

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
mongoose.connect("mongodb://localhost/scrape");
const db = mongoose.connection;

db.on("error", function(error) { // Show any mongoose errors
	console.log("Mongoose Error: ", error);
});

db.once("open", function() { //confirm mongoose connected
	console.log("Mongoose connected.");
});


//===Routes===
//TODO
// require('./controllers/apiroutes.js')(app);


//==Start Server==
app.listen(app.get('port'), function() {
	console.log('Running on Port:', app.get('port'));
});