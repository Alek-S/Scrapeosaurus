'use strict';
const chalk = require('chalk');
const request = require('request');
const cheerio = require('cheerio');

//model
const Article = require('../model/Article.js');


module.exports = function(app) {

	//===HTML ROUTES===
	
	//grab all burgers and use them for index template
	app.get('/', function (req, res) {
		console.log(chalk.yellow('Get /'));
		res.render('index');	
	});


	//===API ROUTES===

	//scrape hacker news articles
	app.get('/api/scrape', (req,res)=>{
		console.log(chalk.yellow('Get /api/scrape'));

		request('https://news.ycombinator.com/news', (err, response, html)=> {
			if(err){
				console.log(err);
				res.json('server error');
			}else{
				let $ = cheerio.load(html);

				$('.athing .title').each(function(i, element) {
					let headline = $(this).children('.storylink').text();
					let link = $(this).children('a').attr('href');

					if (headline && link) {
						//TODO submit them as new article
					}
				});

				res.json('temp'); //TODO
			}
		});

	});

	//get articles
	app.get('/api/article', (req,res)=>{
		console.log(chalk.yellow('Get /api/article'));

		res.json('temp'); //TODO
	});

};