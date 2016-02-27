$(document).ready(function() {
	setTimeout(function(){
		var path = location.pathname;
		//获取侧边栏
		BluesCode.sidebar.GetList("http://lansky.sinaapp.com/api/jekyll/sidebar", path);
		//获取评论列表
		path.replace("index.html", "");
		BluesCode.comment.GetCommentList("http://lansky.sinaapp.com/api/jekyll/comment",path);
	}, 500);
	//取消回复按钮
	$("#cancel-reply").click(function(e){
		BluesCode.comment.cancelReply();
	});
	//评论提交按钮
	$("#commentform").submit(function(e){
		e.preventDefault();
		var path = location.pathname;
		path.replace("index.html", "");
		BluesCode.comment.AjaxSubmit("http://lansky.sinaapp.com/api/jekyll/comment/add",path);
	});
});