
/****
应用中心的js模块中心 20170406 zwt 创建1.0版本
****/ 

define(function(require,exports) {
	var qkydata=require("../dist_data/qkydata2.0");//获取默认数据
	var getpy=require("./getpy");//拼音获取引用
	var opts=qkydata.navdata;
	var haveicon=qkydata.haveicon //已经有的图标名记录数组;
	
	var appname=[];//缓存所有应用名字
	//暴露的执行函数
	exports.appcenter_run=function(){
		var apptype=[];
		for(var keys in opts.allapp){
			var app_typepy=getpy.getpy(keys);//获取应用类别名的拼音	
			apptype.push([keys,"id="+app_typepy]);
			$("#appbox_mould .app_box").attr("apptypeid",app_typepy).attr("apptypename",keys);
			$("#appbox_mould h4 a").html(keys);
			applist_draw(opts.allapp[keys],$("#applist_mould"),$(".appcenter_mian"));
			for(var k=0;k<opts.allapp[keys].length;k++){
				appname.push(opts.allapp[keys][k][0]);
			}
			
		}
		tofor($(".second_level .nav"),apptype,"lia",0);//渲染二级导航
		
		appcenter_int();//交互
	}
	
	//应用中心交互合集
	function appcenter_int(){
		var appstopid="";//缓存停用的应用id
		//获取所有app_box距离浏览器头的高度
		var allh=[];
		$(".appcenter_mian .app_box").each(function(i) {
				var kk=0;
				for(var j=0;j<i;j++){
					kk+=$(".app_box").eq(j).outerHeight(true);
				}
				allh.push([kk,$(this).attr("apptypeid")]);
				kk=0;	
		});
		
		//二级导航点击滚动到指定栏
		$(".second_level .nav li").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			var apptypeid=$(this).find("a").attr("id");
			//console.log(apptype);
			for(var i=0;i<allh.length;i++){
				if(apptypeid==allh[i][1]){
					$("body").animate({scrollTop: allh[i][0]}, 100); 
					document.documentElement.scrollTop =allh[i][0];
					window.pageYOffset =allh[i][0];
					document.body.scrollTop=allh[i][0];
				}
			}
		});
		//页面滚动时改变二级导航选中项
		$(window).scroll(function(){
			var body_scr=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			//console.log(body_scr);
			for(var ik=0;ik<allh.length;ik++){
				if(ik==0){
					if(body_scr<=allh[ik][0]&&body_scr>=0){
						$(".second_level .nav li").removeClass("active");
						$("#"+allh[ik][1]).parent().addClass("active");
					}
				}else{
					if(body_scr<=allh[ik][0]&&body_scr>allh[ik-1][0]){
						$(".second_level .nav li").removeClass("active");
						$("#"+allh[ik][1]).parent().addClass("active");
					}
				}
			}
		});
		//停用按钮
		$(".stop_use").on("click",function(){
			var appname=$(this).parent().find(".txt").html();
			$("#appname").html(appname);
			$('#stopapp').modal('show');
			appstopid=$(this).parents(".app_list").attr("listid");
		});
		//弹窗确定停用
		$("#stopapp_sumbit").on("click",function(){
			//console.log(appstopid);
			$(".app_list[listid='"+appstopid+"']").parents(".app_ul").find(".add_list").show();
			$(".app_list[listid='"+appstopid+"']").remove();
			$('#stopapp').modal('hide');
		});
		//新增app的按钮
		$(".add_list").on("click",function(){
			var apptype=$(this).parents(".app_box").attr("apptypename");
			$(".second_level .nav,.appcenter_mian").hide();
			$(".second_level .add_navbar").show();
			$(".nav_title").html('<i class="qkyicon_14">&#xe616;</i>添加应用');
			$(".appcenter_sigmian").removeClass("yc");
			
			$("#appbox_mould .app_box").attr("apptypename",apptype).attr("apptypeid",getpy.getpy(apptype));
			$("#appbox_mould h4 a").html(apptype).attr("name",apptype);
			//console.log(opts.allapp[apptype],apptype);
			applist_draw(opts.allapp[apptype],$("#applist_addmould"),$(".appcenter_sigmian"));
		});
		//返回按钮
		$(".appbtn_back").on("click",function(){
			$(".second_level .nav,.appcenter_mian").show();
			$(".second_level .add_navbar").hide();
			$(".appcenter_sigmian").html("");
			$(".appcenter_con").addClass("yc");
			$(".appcenter_mian").removeClass("yc");
		});
		//app名字点击
		$(".app_cont .txt").on("click",function(){
			var title=$(this).attr("togo");
			$(".second_level .nav,.appcenter_mian").hide();
			$(".second_level .add_navbar").show();
			$(".appcenter_infomian").removeClass("yc");
			$(".nav_title,.app_info_title").html(title);
		});
		//搜索栏输入后移除焦点时
		$("#appcenter_input").focusout(function(){
			var thisval= $(this).val();
			if(thisval == "" || thisval == undefined || thisval == null){
				$(".second_level .nav,.appcenter_mian").show();
				$(".second_level .add_navbar").hide();
				$(".appcenter_con").addClass("yc");
				$(".appcenter_mian").removeClass("yc");
			}else{
				$(".second_level .nav,.appcenter_mian").hide();
				$(".second_level .add_navbar").show();
				$(".nav_title,.app_info_title").html("搜索结果");
				$(".appcenter_con").addClass("yc");
				$(".appcenter_seachmian").removeClass("yc");
				//正则表达式
				var len = appname.length;
				var seachdata = [];
				var reg = new RegExp(thisval);
				for(var i=0;i<len;i++){
					//如果字符串中不包含目标字符会返回-1
					if(appname[i].match(reg)){
						seachdata.push(appname[i]);
					}
				}
				if(seachdata.length>0){
					$(".result_len").html(seachdata.length);
					applist_seachdraw(seachdata,$("#applist_mould"),$(".appseach_result"));
					$(".appseach_box").html($("#appseach_result_mould").html());
				}else{
					$(".appseach_box").html($("#noappdata_mould").html());
				}

			}
		});
	}
	

	
	//app应用列表渲染
	function applist_draw(data,list_mould,mianid){
		for(var i=0;i<data.length;i++){
				var apppy=getpy.getpy(data[i][0]);//获取应用名的拼音
				if($.inArray(apppy,haveicon)!=-1){//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
					list_mould.find(".app_icon").html('<img src="../images/appicon/'+apppy+'.png" alt="">');
				}else{
					list_mould.find(".app_icon").html("APP");
				}
				list_mould.find(".app_list").attr("listid",apppy);
				list_mould.find(".app_cont .txt").html(data[i][0]).attr("togo",data[i][0]);
				$("#appbox_mould .app_ul_").append(list_mould.html());
			}
			mianid.append($("#appbox_mould").html());
			$("#appbox_mould .app_ul_").html("");
	}
	//app搜索应用列表渲染
	function applist_seachdraw(data,list_mould,mianid){
		mianid.html("");
		for(var i=0;i<data.length;i++){
				var apppy=getpy.getpy(data[i]);//获取应用名的拼音
				if($.inArray(apppy,haveicon)!=-1){//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
					list_mould.find(".app_icon").html('<img src="../images/appicon/'+apppy+'.png" alt="">');
				}else{
					list_mould.find(".app_icon").html("APP");
				}
				list_mould.find(".app_list").attr("listid",apppy);
				list_mould.find(".app_cont .txt").html(data[i]).attr("togo",data[i]);
				mianid.append(list_mould.html());
			}
			
	}
	
	
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
})