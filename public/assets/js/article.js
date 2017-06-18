$(document).ready(function(){
	$.get(window.location.origin + '/api/comment',function(reply){

		reply.forEach(function(story) {

			story.comments.forEach(function(comment){
				$('#'+ story._id ).children('.comments').append('<p>' + comment + '</p>' );
			});
		});
	});
});