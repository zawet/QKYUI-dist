
/****
导航生成和交互js模块

1.2版本增加是否显示个人信息模块
1.3版本新增主导航超出宽度部分变更多
1.4版本新增更多导航新版，跳转应用中心，消息弹层，优化数据判断结构，使用了ajax异步获取html,进行整体头部渲染完后进行补偿

2.0版本增加了，html获取地址外链，应用中心和消息中心链接地址也支持外链接
****/ 

define(function(require) {
	var qkydata=require("../dist_data/qkydata2.0");//获取默认数据
	var getpy=require("./getpy");//拼音获取引用
	var opts=qkydata.navdata;
	var appname=[];var apphref=[];//缓存所有应用名字/应用跳转
	var navmuchhtml=
	'<li class="dropdown">'+
        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+
        '<span>更多</span>'+
        '<span class="caret"></span>'+
        '</a>'+
        '<ul class="dropdown-menu maxh" role="menu" id="navmuchli"></ul>'+
     '</li>';
	$.fn.extend({
        "qkynav": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {
				var thisdiv=$(this);
				htmlajax(opts.htmlsrc,function(thishtml){
					
					//0.加入html和默认css和主题css
					thisdiv.addClass(opts.theme);//加入主题
					for(var i=0;i<opts.distclass.length;i++){
						thisdiv.addClass(opts.distclass[i]);
					}//加入初始化的class
					thisdiv.html(thishtml);//给html框架
					
					//1.初始化数据
					
					
					$(".nav_logo img").attr("src",opts.logosrc);
					$(".nav_pjname").html(opts.pjname);
					$(".nav_pjname").css("color",opts.themetype.pjnameColor);
					$(".other_name").html(opts.tea_info.name);
					
					//1.1主导航渲染
					tonavfor($("#navbar .nav"),opts.navli_j);
					tonavhtml();//超出一半进行折起变更多
					
					$(".navbar-nav .active  a").css("background",opts.themetype.navactiveColor);
					$(".navbar-nav .active a:hover").css("background",opts.themetype.navactiveColor);
					$(".navbar-nav .dropdown-menu .active a").css("background",opts.themetype.navactiveColor);
					
					//1.2是否显示个人信息
					if(opts.isinfo){
						$(".nav_other").removeClass("yc");
						tofor($("#otherli"),opts.otherli,"lia");
						
						if(opts.tea_info.isphoto){
							$(".user_photo").removeClass("dist").html("<img src='"+opts.tea_info.photo+"' />");
						}else{
							$(".user_photo").addClass("dist");
						}
					}
					
					var newsdata=opts.news_analogdata;//获取消息数据
					
					//1.3判断是否显示消息
					if(opts.isnews){
							$(".nav_news_box").show();
							$(".nav_allnaws_check").attr("href",opts.newscenter_link);//给消息跳页加链接
							if(newsdata.length<=0){
								$(".nav_news_badge").hide();
							} else{
								$(".nav_news_badge").show();
								//获取未读消息并渲染
								$(".nav_news_badge").html(newsdata.length>99 ? 99 : newsdata.length);
								for(var i=0;i<newsdata.length;i++){
									if(i<5){//只显示5条
										var appicon=getpy.getpy(newsdata[i].appname);//获取应用名的拼音
										if($.inArray(appicon,qkydata.haveicon)!=-1){//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
											$("#nav_news_li_mould .app_icon").html('<img src="'+opts.newsimgsrc+appicon+'.png" alt="">');
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
					}else{$(".nav_news_box").hide();}
						
						
					//1.4是否显示更多弹窗
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
						$(".appCenter").attr("href",opts.appcenter_link);//给应用中心跳页加链接
						if( opts.allapp == "" || opts.allapp == undefined || opts.allapp == null){
							$(".nav_more_havedata").hide();
							$(".nav_more_nodata").show();
						}else{
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
								for(var k=0;k<opts.allapp[key].length;k++){
									appname.push(opts.allapp[key][k][0]);
									apphref.push(opts.allapp[key][k][1]);
								}
							}
							//搜索框放开时
							$("#seachapp_inp").focusout(function(){
								
								var seach_cont=$(this).val();
								if(seach_cont == "" || seach_cont== undefined || seach_cont== null){
									$(".seachApp_showbox").hide();
								    $(".scroll_box").show();
								}else{
									$(".seachApp_showbox").show();
								    $(".scroll_box").hide();
									
									//正则表达式
									var len = appname.length;
									var seachappname =[]; var seachapphref= [];
									var reg = new RegExp(seach_cont);
									for(var i=0;i<len;i++){
										//如果字符串中不包含目标字符会返回-1
										if(appname[i].match(reg)){
											seachappname.push(appname[i]);
											seachapphref.push(apphref[i])
										}
									}
									if(seachappname.length>0){
										$(".seachApp_showbox .nav_more_lli").removeClass("yc");
										$(".seachApp_showbox .nodata").addClass("yc");
										$("#seachapp_num").html(seachappname.length);
										$("#seachapp_over").html("");
										for(var s=0;s<seachappname.length;s++){
											seachappname[s]=[seachappname[s],seachapphref[s]];
										}
										tofor($("#seachapp_over"),seachappname,"a");//渲染常用app
									}else{
										$(".seachApp_showbox .nav_more_lli").addClass("yc");
										$(".seachApp_showbox .nodata").removeClass("yc");;
									}
								}
							});
							//搜索结果页点x时
							$(".seachApp_showbox h5 i").click(function(){
								$(".scroll_box").show();
								$(".seachApp_showbox").hide();
							});
						}
						
					}else{
						$(".navbtn").hide();
					}

					//2收尾整洁html
					$("body").append($("#modal_mould").html());
					$("#modal_mould,#nav_more_lli_mould,#nav_news_li_mould").remove();//去除所有隐藏待渲染的模板
					
					//3回调函数执行
					opts.setup();//回调常用设置按钮点击事件
					opts.qkynavafter();//渲染完后回调
					$("#navbar .nav li").on("click","a",function(){
						opts.navclick($(this));
					});//主导航点击回调
					$("#navbar .nav li a").hover(
						function(){
							opts.navhoverin($(this));
						},function(){
							opts.navhoverout($(this));
						}
					);//主导航悬停进入和退出悬停时回调
				});
		    });
		}
	});
	
	//基础遍历方式
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
	//主导航特殊遍历方式
	function tonavfor(id,data_arr) {
		for(var i=0;i<data_arr.length;i++){
			var thishtml="";
			thishtml="<li><a "+data_arr[i].attrcont+">"+data_arr[i].name+"</a></li>";
			if(data_arr[i].isactive)thishtml="<li class='active'><a "+data_arr[i].attrcont+">"+data_arr[i].name+"</a></li>";	
			id.append(thishtml);
		}
	};
	//超出一半后折起来
	tonavhtml =function(){
		var leftwidth;
		if(opts.morebtn)leftwidth=$(".navbtn").outerWidth(true)+$(".nav_pjname").outerWidth(true)+$(".nav_logo").width()+1;
		else leftwidth=$(".nav_pjname").outerWidth(true)+$(".nav_logo").width()+1;
		if(navigator.userAgent.indexOf("MSIE 8.0")>0) leftwidth=leftwidth+40;
		var havewidth=$("#navbar").width()-(leftwidth+$(".nav_other").width());
		havewidth=havewidth/2;

		var temwidth=0;
		var muchli=[];
		var onefor=true;
		$("#navbar .nav li").each(function(i) {
            temwidth+=$(this).width();
			if(havewidth<=temwidth){
				muchli.push([opts.navli_j[i].name,opts.navli_j[i].attrcont,opts.navli_j[i].isactive]);
				$(this).hide().remove();	
			}
        });
		if(muchli.length!=0){
			$("#navbar .nav").append(navmuchhtml);
			tofor($("#navmuchli"),muchli,"lia");
			$("#navmuchli li").each(function(i) {
				var thiskeyss=$(this).find("a").html();
                if(muchli[i][0]==thiskeyss)
				if(muchli[i][2])
				$(this).addClass("active");
            });
		}
	}
	
	
	
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