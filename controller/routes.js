'use strict';
const request = require('request');
const cheerio = require('cheerio');

//model
const Article = require('../model/Article.js');


module.exports = function(app) {

	//===HTML ROUTES===
	
	//grab all burgers and use them for index template
	app.get('/', function (req, res) {
		Article.find({}, (err, docs)=>{
			if(err){
				console.log(err);
			}else{
				res.render('preliminary');
				// res.render('index',{story: docs});
			}
		});	
	});

	//get all articles rendered page
	app.get('/article', (req,res)=>{
		Article.find({}, (err, docs)=>{
			if(err){
				console.log(err);
			}else{
				res.render('index',{story: docs});
			}
		});
	});



	//===API ROUTES===

	// 1. scrape hacker news articles
	app.get('/api/scrape', (req,res)=>{
		// 1. scrape hacker news articles
		// 2. check if link already in db
		// 3. if not, save entry as a new document

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

	//get all articles as JSON
	app.get('/api/article', (req,res)=>{
		Article.find({}, (err, docs)=>{
			if(err){
				console.log(err);
			}else{
				res.json(docs);
			}
		});
	});


	//get all comments as JSON
	app.get('/api/comment', (req,res)=>{
		Article.find({}).select({ _id: 1, comments: 1 }).exec(sendComments);
		
		function sendComments(err, docs){
			if(err){
				console.log(err);
			}else{
				res.json(docs);
			}
		}
	});

	//post new comment to story
	app.post('/api/comment', (req,res)=>{
		let storyId = req.body.id;
		let comment = req.body.comments;

		if(!comment || !storyId){
			res.json({result: 'missing required body fields'});
		}else{

			Article.update(
				{'_id': storyId},
				{ '$push':	{'comments': comment} }, (err)=>{
					if(err){
						console.log(err);
					}else{
						res.json({result: 'success'});
					}
				}
			);

		}
	});

	app.delete('/api/comment', (req,res)=>{
		let storyId = req.body.id;
		let position = req.body.position;
		let commentPos = {};

		position = 'comments.' + position;
		commentPos[position] = '1';

		if(!position || !storyId){
			res.json({result: 'missing required body fields'});
		}else{

			//set the specific comment to delete to null in the comments array
			Article.update(
				{'_id': storyId},
				{$unset: commentPos}, (err)=>{
					if(err){
						console.log(err);
					}else{

						//clear out null entries from comments
						Article.update(
							{'_id': storyId}, 
							{$pull : {"comments" : null}}, (err)=>{
								if(err){
									console.log(err);
								}else{
									res.json({result: 'success'});
								}
							}
						);

					}
				}
			);

		}
	});

};