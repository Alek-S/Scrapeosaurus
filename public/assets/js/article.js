$(document).ready(function(){


	$.get(window.location.origin + '/api/comment',function(reply){

		reply.forEach(function(story) {

			story.comments.forEach(function(comment, i){
				$('#'+ story._id ).children('.comments').append('<p class="comment" id="c'+ i + '" >' + comment + '<button class="delete"><img src="assets/images/delete.svg" alt="link" height="15px"></button></p>' );
				
			});
		});

		$('.delete').on('click', function(){
			event.preventDefault();

			let id = $(this).closest('.story').attr('id');
			let position = $(this).closest('.comment').attr('id').slice(1);

			console.log(id, position);

			$.ajax(window.location.origin + '/api/comment/', {
				type: 'DELETE',
				data: {
					id: id,
					position: position
				}
			}).done(function(){
				location.reload();
			});

		});

	});

	$('.submit').on('click', function(){
		event.preventDefault();
		let id = $(this).closest('.story').attr('id');
		let newComment = $(this).siblings('input').val();

		$.post(window.location.origin + '/api/comment', {
			id: id,
			comments: newComment
		},function(reply){
			location.reload();
		});
	});
});