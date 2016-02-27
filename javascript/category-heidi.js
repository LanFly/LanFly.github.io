$(document).ready(function(){
	var path = location.pathname;
	path.replace("index.html", "");
	BluesCode.GetPostList("http://lansky.sinaapp.com/api/jekyll/category",1,path);
	$(window).scroll(function() {
		var path = location.pathname;
		path.replace("index.html", "");
		BluesCode.more("http://lansky.sinaapp.com/api/jekyll/category",path);
	});
});