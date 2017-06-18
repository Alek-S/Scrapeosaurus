$(document).ready(function(){


	$.get(window.location.origin + '/api/comment',function(reply){

		reply.forEach(function(story) {

			story.comments.forEach(function(comment){
				$('#'+ story._id ).children('.comments').append('<p>' + comment + '</p>' );
			});
		});
	});

	$('.submit').on('click', function(){
		event.preventDefault();
		let id = $(this).closest('.story').attr('id');
		let newComment = $(this).siblings('input').val();

		console.log(id,newComment );

		$.post(window.location.origin + '/api/comment', {
			id: id,
			comments: newComment
		},function(reply){
			location.reload();
		});
	});

});