$(document).ready(function(){
	var path = location.pathname;
	//获取侧边栏
	BluesCode.sidebar.GetList("http://lan12600.vicp.cc/api/jekyll/sidebar", path);
	path.replace("index.html", "");
	//获取文章列表
	BluesCode.GetPostList("http://lan12600.vicp.cc/api/jekyll/index",1,path);
	//上拉自动加载更多
	$(window).scroll(function() {
		var path = location.pathname;
		BluesCode.more("http://lan12600.vicp.cc/api/jekyll/index",path);
	});
});