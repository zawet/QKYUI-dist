
/****
导航生成和交互js模块

1.2版本增加是否显示个人信息模块
****/ 

define(function(require) {
	var qkydata=require("../define/qkydata");//获取默认数据
	var qkyhtml=require("../define/qkyhtml");//获取默认要加载html
	var getpy=require("./getpy");//拼音获取引用
	var opts=qkydata.navdata;
	
	$.fn.extend({
        "qkynav": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {
				var thisdiv=$(this);
				htmlajax("dist/define/qkynav.html",function(thishtml){
					
					thisdiv.html(thishtml);
					
					
					//初始化数据
					$(".nav_logo img").attr("src",opts.logosrc);
					$(".nav_pjname").html(opts.pjname);
					$(".other_name").html(opts.tea_info.name);
					tofor($("#navbar .nav"),opts.navli,"lia",opts.navli_active);
					
					//是否显示个人信息
					if(opts.isinfo){
						$(".nav_other").removeClass("yc");
						tofor($("#otherli"),opts.otherli,"lia");
						
						if(opts.tea_info.isphoto){
							$(".user_photo").removeClass("dist").html("<img src='"+opts.tea_info.photo+"' />");
						}else{
							$(".user_photo").addClass("dist");
						}
						
						//获取未读消息并渲染
						var newsdata=qkydata.news_analogdata;
						$(".nav_news_badge").html(qkydata.news_analogdata.length>99 ? 99 : qkydata.news_analogdata.length);
						for(var i=0;i<newsdata.length;i++){
							if(i<5){//只显示5条
								var appicon=getpy.getpy(newsdata[i].appname);//获取应用名的拼音
								if($.inArray(appicon,qkydata.haveicon)!=-1){//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
									$("#nav_news_li_mould .app_icon").html('<img src="images/appicon/'+appicon+'.png" alt="">');
								}else{
									$("#nav_news_li_mould .app_icon").html("APP");
								}
								$("#nav_news_li_mould .nav_news_name").html(newsdata[i].newsname);
								$("#nav_news_li_mould .nav_news_times").html(newsdata[i].newsgettime);
								$("#nav_news_li_mould .nav_news_appname").html(newsdata[i].appname);
								$("#nav_news_li_mould .nav_news_cont").html(newsdata[i].newscont);
								$(".nav_news_libox").append($("#nav_news_li_mould").html());
							}
							var newspoph=$(".nav_news_popup").outerHeight();
							if(newspoph>500)$(".nav_news_popup").css("height","500px");//超过500的高度自动变可以滚动
						}
						
						$(document).on("click",":not('.nav_news_box')",function(){
							 $(".nav_news_box .nav_news_popup").slideUp(50);
						  })
						  $(".nav_news_box").on("click",function(event){
							 event.stopPropagation();
						  });
						$(".nav_news_icon").click(function(){
							$(this).parent().find(".nav_news_popup").slideToggle(50);
							$(this).find("span").hide();
							$(".nav_more").slideUp(50);
							 $(".navbtn").removeClass("active");
						});
						
					}
					//是否显示更多弹窗
					if(opts.morebtn){
						$(document).on("click",":not('.nav_more,.navbtn')",function(){
							 $(".nav_more").slideUp(50);
							 $(".navbtn").removeClass("active");
						  })
						  $(".nav_more").on("click",function(event){
							 event.stopPropagation();
						  });
						$(".navbtn").on("click",function(event){
							event.stopPropagation();
							$(".nav_more").slideToggle(50);
							$(this).toggleClass("active");
							 $(".nav_news_box .nav_news_popup").slideUp(50);
						});
						
						tofor($("#common"),opts.common,"a");//渲染常用app
						tofor($("#lately"),opts.lately,"a");//渲染最近app
						//渲染全部app
						var rowi=0;
						for(var key in opts.allapp){
							$("#nav_more_lli_mould h5 span").html(key);
							tofor($("#nav_more_lli_mould .li_a"),opts.allapp[key],"a");
							if(rowi%2==0){
							$(".row_left").append($("#nav_more_lli_mould").html());
							}else{
							$(".row_right").append($("#nav_more_lli_mould").html());
							}
							$("#nav_more_lli_mould .li_a").html("");
							rowi++;
						}
						
					}else{
						$(".navbtn").hide();
					}

					//创建设置弹窗
					$("body").append($("#modal_mould").html());
					$("#modal_mould,#nav_more_lli_mould,#nav_news_li_mould").remove();//去除所有隐藏待渲染的模板
					opts.setup();
				});
		    });
		}
	});
	
	
	function tofor(id,data_arr,type,avt) {
		for(var i=0;i<data_arr.length;i++){
			var thishtml="";
			if(type=="lia"){
				thishtml="<li><a "+data_arr[i][1]+">"+data_arr[i][0]+"</a></li>";
				if(i==avt)thishtml="<li class='active'><a "+data_arr[i][1]+">"+data_arr[i][0]+"</a></li>";	
			}else{
			thishtml="<a "+data_arr[i][1]+">"+data_arr[i][0]+"</a>";
			}
			id.append(thishtml);
		}
	};
	
	//私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }
	
	//异步获取html
	function htmlajax(url,sucfun){
		var urlhtml="";
		$.ajax({
		  url: url,
		  cache: false,
		  success: function(html){
			 sucfun(html);
		  }
		});	
	} 
})