$(document).ready(function() {
	setTimeout(function(){
		var path = location.pathname;
		path.replace("index.html", "");
		BluesCode.comment.GetCommentList("http://lansky.sinaapp.com/api/jekyll/comment",path);
	}, 500);
	$("#cancel-reply").click(function(e){
		BluesCode.comment.cancelReply();
	});
	$("#commentform").submit(function(e){
		e.preventDefault();
		var path = location.pathname;
		path.replace("index.html", "");
		BluesCode.comment.AjaxSubmit("http://lansky.sinaapp.com/api/jekyll/comment/add",path);
	});
});