$(document).ready(function(){
	BluesCode.GetPostList("http://localhost/sae/api/jekyll/index.php/index",1);
	$(window).scroll(function() {
		BluesCode.more("http://localhost/sae/api/jekyll/index.php/index");
	});
});