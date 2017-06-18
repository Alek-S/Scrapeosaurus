$(document).ready(function(){


	$('#scrape').on('click', function(){
		event.preventDefault();

		//get articles from hacker news
		$.get(window.location.origin + '/api/scrape',function(reply){
			//if scrape is succesful
			if(reply.result === 'success'){
				//go to article page
				window.location.replace(window.location.origin + '/article');
			}else{
				console.log('Scrape failed.');
			}
		});
	});


});