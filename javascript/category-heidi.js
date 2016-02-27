$(document).ready(function(){
	var path = location.pathname;
	//获取侧边栏
	BluesCode.sidebar.GetList("http://lansky.sinaapp.com/api/jekyll/sidebar", path);
	//获取文章列表
	BluesCode.GetPostList("http://lansky.sinaapp.com/api/jekyll/category",1,path);
	//上拉加载更多
	$(window).scroll(function() {
		var path = location.pathname;
		BluesCode.more("http://lansky.sinaapp.com/api/jekyll/category",path);
	});
});