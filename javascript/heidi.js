$(document).ready(function(){
	// Toggle blog-menu
	$(".nav-toggle").on("click", function(){	
		$(this).toggleClass("active");
		$(".mobile-menu").slideToggle();
		return false;
	});
	
	
	// Hide mobile-menu > 960
	$(window).resize(function() {
		if ($(window).width() > 768) {
			$(".nav-toggle").removeClass("active");
			$(".mobile-menu").show();
		}
		if ($(window).width() <= 768) {
			$(".mobile-menu").hide();
		}
	});
});

var BluesCode = {
	CurPage: 0,
	PageSize: 10,
	//获取文章列表并显示
	GetPostList: function(url, page, path) {
		BluesCode.isloading = true;
		$(".more").text("我正在努力加载(＞﹏＜)").css("display", "block");
		$.ajax({
			url: url,
			dataType: "jsonp",
			data: {page: page, pagesize: BluesCode.PageSize, type: "jsonp", p: path},
			success: function(data) {
				if(data.state == "success") {
					if(data.result.length > 0) {
						$(".more").before(BluesCode.HTML.PostList(data.result)).text("上拉加载更多⊙﹏⊙‖∣");
						BluesCode.CurPage = page;
					}else{
						BluesCode.StopAutoMore = true;
						$(".more").text("文章都被你看完了o(╯□╰)o").css("display", "block");
					}
				}else{
					$(".more").text("发生错误了："+data.message).css("display", "block");
				}
				BluesCode.isloading = false;
			},
			error: function(errorThrown) {
				$(".more").text("加载失败了::>_<::要不刷新试试").css("display", "block");
				BluesCode.isloading = false;
			}
		});
	},
	//是否强制禁止加载文章列表
	StopAutoMore: false,
	//是否正在加载文章列表
	isloading: false,
	//上拉自动加载更多文章列表
	more: function(url, path) {
		if(BluesCode.StopAutoMore == true) {
			return ;
		}
		var UserHeight = $(window).height() + $(document).scrollTop();
		var moreHeight = $("#masthead").height() + $("#navi-menu").height() + $("#primary").height();
		if(UserHeight >= moreHeight) {
			if(BluesCode.isloading == false) {
				BluesCode.GetPostList(url, BluesCode.CurPage+1, path);
			}
		}
	},
	//是否正在提交评论
	IsSubmit: false,
	//评论
	comment: {
		//点击回复链接
		reply: function(name) {
			$("#cancel-reply").text("取消回复");
			$("#replyto").val(name);
			return false;
		},
		//点击取消回复链接
		cancelReply: function() {
			$("#cancel-reply").text("");
			$("#replyto").val('');
			return false;
		},
		//加载评论列表
		GetCommentList: function(url, path) {
			if(!path) {
				$("#commentlist").html('<p style="text-align: center;">参数错误o(╯□╰)o 请从首页点击文章阅读</p>');
				return false;
			}
			var ag = BrowserAgent.GetAgent();
			$.ajax({
				url: url,
				dataType: "jsonp",
				data: {"p": path,"b": ag.browser,"t": ag.type,"s": ag.system,"type": "jsonp"},
				success: function(data) {
					if(data.state == "success") {
						$("#commentNumber").text(data.result.length);
						if(data.result.length > 0) {
							$("#commentlist").html(BluesCode.HTML.CommentList(data.result));
						}else{
							$("#commentlist").html('<p style="text-align:center">暂时还没有人评论 o(╯□╰)o</p>');
						}
					}else{
						$("#commentlist").html('<p style="text-align: center;">加载评论发生错误了：'+data.message+'</p>');
						alert("加载评论发生错误了："+data.message);
					}
				},
				error: function(errorThrown) {
					$("#commentlist").html('<p style="text-align: center;">评论加载失败了::>_<::要不刷新试试 Error: '+errorThrown+'</p>');
					alert("评论加载失败了::>_<::要不刷新试试");
				}
			});
		},
		//提交评论
		AjaxSubmit: function(url, path) {
			if(!path) {
				alert('参数错误o(╯□╰)o 请从首页点击文章阅读');
				return false;
			}
			if(!BluesCode.IsSubmit){
				BluesCode.IsSubmit = true;
				$('#submit').val('正在提交...');
				$.ajax({
					url: url,
					dataType: "jsonp",
					data: $('#commentform').serialize()+'&type=jsonp&p='+path,
					success: function(data) {
						if(data.state == "success") {
							$("#commentlist").prepend(BluesCode.HTML.CommentList([data.result]));
							alert('提交成功O(∩_∩)O~~');
						}else{
							alert("发生错误了/(ㄒoㄒ)/~~ "+data.message);
						}
						BluesCode.IsSubmit = false;
						$('#submit').val('发表评论');
					},
					error: function(errorThrown) {
						alert('发生错误~\(≧▽≦)/~啦啦啦'+errorThrown);
						BluesCode.IsSubmit = false;
						$('#submit').val('发表评论');
					}
				});
			}else{
				alert('我正在努力提交你的评论/(ㄒoㄒ)/~~');
			}
		}
	},
	sidebar: {
		GetList: function(url, path) {
			$.ajax({
				url: url,
				dataType: "jsonp",
				data: {p: path, type: "jsonp"},
				success: function(data) {
					if(data.state == "success") {
						$("#secondary").html(BluesCode.HTML.SidebarList(data.result));
					}else{
						$("#sidebar-loading").html('<h1 class="widget-title">发生错误了/(ㄒoㄒ)/~~ '+data.message+'</h1>');
					}
				},
				error: function(errorThrown) {
					$("#sidebar-loading").html('<h1 class="widget-title">发生错误了/(ㄒoㄒ)/~~ </h1>');
				}
			});
		}
	},
	HTML: {
		//生成文章列表HTML
		PostList: function(post) {
			var html="";
			for(var i=0; i<post.length; i++) {
				if(post[i].image != "") {
					html += '<article class="post type-post status-publish format-standard has-post-thumbnail hentry">';
					html += '<div class="single-post-thumbnail clear">'+
                            '<a href="'+post[i].path+'" title="click to read '+post[i].title+'" rel="bookmark"><img src="'+post[i].image+'" alt="'+post[i].image+'" /></a>'+
                        	'</div>';
				}else{
					html += '<article class="post type-post status-publish format-standard hentry">';
				}
				html += '<header class="entry-header">'+
                        '<h1 class="entry-title"><a href="'+post[i].path+'" rel="bookmark">'+post[i].title+'</a></h1>'+
                        '<div class="entry-meta">'+
                        '<span class="posted-on">最后编辑：<a href="" rel="bookmark"><time class="entry-date published" datetime="'+post[i].date+'">'+BluesCode.Time.GetTimeString(post[i].date)+'</time></a></span>'+
                        '<span class="byline"> by <span class="author vcard"><a class="author-url" href="'+post[i].authorurl+'">'+post[i].author+'</a></span></span>'+
                        '</div></header>';
                html += '<div class="entry-content">'+post[i].overview+'...<br /><a href="'+post[i].path+'" class="readmore">Read more >></a></div>';
                html += '<footer class="entry-footer">'+
                        '<span class="cat-links">Posted in <a href="'+post[i].category+'" rel="category tag">'+post[i].category+'</a></span></footer>'+
                    	'</article>';
			}
			return html;
		},
		//生成评论列表HTML
		CommentList: function(comment) {
			var html = "";
			for(var i=0; i<comment.length; i++) {
				html += '<li class="comment even thread-even depth-1">'+
						'<div id="comment-1" class="comment">';
				if(!comment[i].website) {
					comment[i].website = "";
				}
				html += '<div class="avatar-container">'+
							'<a href="'+comment[i].website+'" target="_blank">'+
	                        '<img alt="头像丢失" src="'+comment[i].avatar+'" class="avatar avatar-160 photo" height="160" width="160" />'+
	                        '</a>'+
                        '</div>';
                html += '<div class="comment-inner">';
                var reply = "";
                if(comment[i].reply_to) {
                	reply = '<span class="reply-to-name"> 回复 '+comment[i].reply_to+'</span>';
                }
                html +='<div class="comment-header">'+
	                   '<h4>'+
	                   '<a href="mailto:'+comment[i].email+'" rel="external nofollow" class="url">'+comment[i].name+'</a>'+reply+
	                   '<a class="comment-date-link" href="javascript:;">'+BluesCode.Time.GetTimeString(comment[i].time)+'</a>'+
	                   '</h4>'+
	            	   '</div>';
	           	html += '<div class="comment-content post-content">'+comment[i].comment+'</div>';
	           	html += '<div class="comment-actions">'+
                            '<p class="comment-reply">'+
                            '<a rel="nofollow" class="comment-reply-link" href="#respond" title="回复给 '+
                            comment[i].name+'" onclick=\'BluesCode.comment.reply("'+comment[i].name+'")\'>Reply</a>'+
                            '</p>'+
                        '</div>';
                html += '</div></div></li>';
			}
			return html;
		},
		SideBarList: function(data) {
			var html = "";
			for(var name in data){
				html += '<aside id="sidebar-'+name+'" class="widget widget_'+name+'">';
                    html += '<h1 class="widget-title">'+data[name].name+'</h1>';
                    html += '<ul>'
                    for(var i=0; i<data[name].data.length; ++i){
                    	html += '<li><a href="'+data[name].data[i].path+'">'+data[name].data[i].title+'</a></li>';
                    }
                    html += '</ul>';
                html += '</aside>';
			}
			return html;
		}
	},
	//时间对象
    Time: {
        GetTimestamp: function() {
            return Math.round(new Date().getTime() / 1000);
        },
        GetTimeString: function(timestamp) {
            var timestamp = new Date(timestamp * 1000);
            return timestamp.toLocaleString();
        }
    }
}