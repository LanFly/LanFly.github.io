$(document).ready(function() {
	setTimeout(function(){
		BluesCode.comment.GetCommentList("http://localhost/sae/api/jekyll/index.php/comment");
	}, 500);
	$("#cancel-reply").click(function(e){
		BluesCode.comment.cancelReply();
	});
	$("#commentform").submit(function(e){
		e.preventDefault();
		BluesCode.comment.AjaxSubmit("http://localhost/sae/api/jekyll/index.php/comment/add");
	});
});