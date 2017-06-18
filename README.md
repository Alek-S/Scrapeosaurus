[![Build Status](https://travis-ci.org/Alek-S/Scrapeosaurus.svg?branch=master)](https://travis-ci.org/Alek-S/Scrapeosaurus)
[![Dependency Status](https://gemnasium.com/badges/github.com/Alek-S/Scrapeosaurus.svg)](https://gemnasium.com/github.com/Alek-S/Scrapeosaurus)
[![Known Vulnerabilities](https://snyk.io/test/github/alek-s/scrapeosaurus/badge.svg)](https://snyk.io/test/github/alek-s/scrapeosaurus)

# Scrapeosaurus

#### Try It Now: [Live Page Link](https://scrapeosaurus.herokuapp.com)

 When the button is clicked, the Y Combinator News HTML is fetched by the server. The server will then parse out the front page stories. If the story has no yet been added, then it's saved to a Mongo database.

 Once scraped, the page redirects to the article section where all saved stories can be viewed. Likewise, comments can be added or removed to individual stories. Comments are persisted in Mongo as a nested element in the same collection. 

![example](./screenshots/comment.gif)

 ## Technology Used
 Node.js, Express, Express-Handlebars, Mongoose / MongoDB, Cheerio, Request, jQuery

### Middleware Stack
Morgan, Helmet

### Testing and Deployment
Travis CI, Mocha, Supertest, Snyk, Gemnasium, Heroku

![Test](./screenshots/test.png)
