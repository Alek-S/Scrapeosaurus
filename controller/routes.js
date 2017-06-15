'use strict';
// const Burger = require('../models/burger');


module.exports = function(app) {

//===HTML ROUTES===
	
	//grab all burgers and use them for index template
	app.get('/', function (req, res) {
		res.render('index');	
	});


//===API ROUTES===


};