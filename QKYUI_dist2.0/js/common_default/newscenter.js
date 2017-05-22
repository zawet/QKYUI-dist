
/****
应用中心的js模块中心 20170406 zwt 创建1.0版本
****/ 

define(function(require,exports) {
	var qkydata=require("../dist_data/qkydata2.0");//获取默认数据
	var getpy=require("./getpy");//拼音获取引用
	var opts=qkydata.navdata;
	var haveicon=qkydata.haveicon //已经有的图标名记录数组;
	var rach=require("../common_cadr/radio_checkbox1.2");//获取单复选的暴露方法
	
	//暴露的执行函数
	exports.newscenter_run=function(){
		//获取消息并渲染
		var newsdata=opts.news_analogdata;
		for(var i=0;i<newsdata.length;i++){
			var appicon=getpy.getpy(newsdata[i].appname);//获取应用名的拼音
			if($.inArray(appicon,qkydata.haveicon)!=-1){//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
				$("#news_list_mould .app_icon").html('<img src="../images/appicon/'+appicon+'.png" alt="">');
			}else{
				$("#news_list_mould .app_icon").html("APP");
			}
			$("#news_list_mould .nav_news_name").html(newsdata[i].newsname);
			$("#news_list_mould .nav_news_times").html(newsdata[i].newsgettime);
			$("#news_list_mould .nav_news_appname").html(newsdata[i].appname);
			$("#news_list_mould .nav_news_cont").html(newsdata[i].newscont);
			$(".news_listbox").append($("#news_list_mould").html());
		}
		
		
		//获取所有应用和分类，并进行渲染应用设置列表
		var apptype=[];
		for(var keys in opts.allapp){
			var app_typepy=getpy.getpy(keys);//获取应用类别名的拼音	
			apptype.push([keys,"id="+app_typepy]);
			$("#newssetup_box_mould .newssetup_box").attr("apptypeid",app_typepy).attr("apptypename",keys);
			$("#newssetup_box_mould h4 a").html(keys);
			newssetup_li_draw(opts.allapp[keys],$("#newssetup_li_mould"),$(".newssetup_"));
		}
		
		$("#news_list_mould,#newssetup_box_mould,.newssetup_li_mould").remove();//去除所有待渲染的隐藏模板
		newscenter_int();//交互
	}
	
	//消息中心交互合集
	function newscenter_int(){
		$(".news_leftli").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(".news_rightmian").addClass("yc");
			$(".news_rightmian."+$(this).attr("id")).removeClass("yc");
		});
		
		rach.rach_run(function(){},function(ch){
			var havechoose=$(".checkbox-qky.child.select").length;
			if(havechoose>0){
			$("#choosenumber").html("已选中"+havechoose+"条信息");
			$(".allnews_delete").removeClass("disabled");
			}else{
			$("#choosenumber").html("全选");
			$(".allnews_delete").addClass("disabled");
			}
			
		});
		
		//设置开关交互
		$(".qky_switch").on("click",function(){
		 	$(this).toggleClass("active");
		 });
		
		
	}
	
	function newssetup_li_draw(data,list_mould,mianid){
		for(var i=0;i<data.length;i++){
				var apppy=getpy.getpy(data[i][0]);//获取应用名的拼音
				if($.inArray(apppy,haveicon)!=-1){//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
					list_mould.find(".app_icon").html('<img src="../images/appicon/'+apppy+'.png" alt="">');
				}else{
					list_mould.find(".app_icon").html("APP");
				}
				list_mould.find(".newssetup_li").attr("listid",apppy);
				list_mould.find(".newssetup_li_appname").html(data[i][0]);
				$("#newssetup_box_mould .newssetup_ul").append(list_mould.html());
			}
			mianid.append($("#newssetup_box_mould").html());
			$("#newssetup_box_mould .newssetup_ul").html("");
	}
	
})