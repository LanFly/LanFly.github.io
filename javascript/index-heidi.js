$(document).ready(function(){
	var path = location.pathname;
	//获取侧边栏
	BluesCode.sidebar.GetList("http://lansky.sinaapp.com/api/jekyll/sidebar", path);
	path.replace("index.html", "");
	//获取文章列表
	BluesCode.GetPostList("http://lansky.sinaapp.com/api/jekyll/index",1,path);
	//上拉自动加载更多
	$(window).scroll(function() {
		var path = location.pathname;
		BluesCode.more("http://lansky.sinaapp.com/api/jekyll/index",path);
	});
});