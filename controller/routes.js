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
		res.render('index');	
	});


	//===API ROUTES===

	//scrape hacker news articles
	app.get('/api/scrape', (req,res)=>{

		request('https://news.ycombinator.com/news', (err, response, html)=> {
			if(err){
				console.log(err);
				res.json('server error');
			}else{
				let $ = cheerio.load(html);


				$('.athing .title').each(function() {
					let headline = $(this).children('.storylink').text(); //article title
					let link = $(this).children('a').attr('href'); //link to submitted story

					if (headline && link) {
						
						Article.count({link: link},(err, count)=> {
							if(err){
								console.log(err);
							}else{

								//if not already in the DB
								if(count === 0){
									//new document into mongo
									let entry = new Article({
										headline: headline,
										link: link
									}); 

									entry.save((err)=> {
										if (err) {
											console.log(err);
										}
									});	
								}
							}
						});
					}
				});

				res.json({result: 'success'});
			}
		});

	});

	//get articles
	app.get('/api/article', (req,res)=>{
		res.json('temp'); //TODO: reply
	});

};