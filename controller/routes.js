'use strict';
const chalk = require('chalk');
// const Burger = require('../models/burger');


module.exports = function(app) {

//===HTML ROUTES===
	
	//grab all burgers and use them for index template
	app.get('/', function (req, res) {
		console.log(chalk.yellow('Get /'));
		res.render('index');	
	});


//===API ROUTES===


};