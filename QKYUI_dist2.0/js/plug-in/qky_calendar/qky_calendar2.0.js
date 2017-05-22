// oa首页日历渲染
define(function(require,exports) {
	var myDate = new Date();
	var toy=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	var tom=myDate.getMonth();       //获取当前月份(0-11,0代表1月)
	var tod=myDate.getDate();        //获取当前日(1-31)
	var hour = myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
	var minute = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
	var second = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
	var ys,ms,ds,hs,mis,ss;
	
	//日历默认参数
			var opts={
						ajaxsrc:"js/plug-in/qky_calendar/qky_calendar2.0.html",
						boxid:".qkycalendar_box",
						drawid:".qkycalendar",
						cilckid:".qkycalendar_btn",
						hoverid:".qkycalendar_btn_hover",
						year:toy,
						moon:tom,
						day:tod,
						minutes:minute,
						hours:hour,
						seconds:second,
						isinput:false,//是否从输入框里的时间来做初始值
						isshowymd:true,//是否显示年月日
						isshowtime:false,//是否显示时分秒
						isdistshowdate:false,//是否一开始就在输入框里显示初始化日期
						clickday:function(id,istime){//日数点击，可以外接函数蹭掉默认函数，默认是把选中的日期加到日历组建底部
							id.prev(".qkycalendar_btn").val(exports.redate(id,istime));
						},
						choosetimes:function(id,istime){//时间转换，可以外接函数蹭掉默认函数，默认是把选中的日期加到日历组建底部
							id.prev(".qkycalendar_btn").val(exports.redate(id,istime));
						}		
			 };
			 
/*		$.fn.extend({
			"qky_calendar": function (options) {
				//检测用户传进来的参数是否合法
				if (!isValid(options))
					return this;
				opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
				return this.each(function (i) {
					opts.boxid=$(this);
					qkycalendar_draw(opts);
				});
			}
		});
*/			 

		//暴露执行体
		exports.qkycalendar=function(options){
			
			 if (!isValid(options)) return this;
			 opts = $.extend({}, opts, options);//有传值进来后，进行对默认覆盖
			 qkycalendar_draw(opts);	
		}
		

		
		//日历整体执行渲染（主体执行域）
		function qkycalendar_draw(d_opts){
			
			 htmlajax(d_opts.ajaxsrc,function(calhtml){//异步过来html主体
			 		//初始化外框
			 		d_opts.cilckid=$(d_opts.boxid).find(d_opts.cilckid);
					d_opts.drawid=$(d_opts.boxid).find(d_opts.drawid);
					d_opts.hoverid=$(d_opts.boxid).find(d_opts.hoverid);
					
					//渲染日历基础外框
					d_opts.drawid.html(calhtml);
					
					//过滤初始化日期
					var cleardate=check_date(d_opts);
					ys=cleardate[0];ms=Number(cleardate[1]);ds=cleardate[2];hs=cleardate[3];mis=cleardate[4];ss=cleardate[5];
					
					//初始化日期的显示情况
					 if(d_opts.isdistshowdate){//是否一开始就在输入框显示初始化数据
						if(d_opts.isshowtime){
							if(d_opts.isshowtime=="hms"){
								d_opts.cilckid.val(ys+"-"+(ms+1)+"-"+ds+" "+hs+":"+mis+":"+ss);
							}else{
								d_opts.cilckid.val(ys+"-"+(ms+1)+"-"+ds+" "+hs+":"+mis);
							}
						}else{
					 		d_opts.cilckid.val(ys+"-"+(ms+1)+"-"+ds);
					 	}
					}
					
			 		//外层日历出来已否交互
					 qkycalendar_mutual(d_opts); 
			 
					//年月日数据初始化渲染 
					if(d_opts.isshowymd){
					qkycalendar_drawymd(ys,ms+1,ds,d_opts.drawid,d_opts.isshowtime,d_opts.clickday);
					}
					
					//时分秒数据初始化渲染 
					 if(d_opts.isshowtime&&(d_opts.isshowtime=="hm"||d_opts.isshowtime=="hms")){
						d_opts.drawid.find(".qkycalendar_times").hide();
						d_opts.drawid.find(".qkycalendar_times."+d_opts.isshowtime).show();
						qkycalendar_times(hs,mis,ss,d_opts.drawid,d_opts.isshowtime,d_opts.choosetimes);
					 }
					 
					 //左右转换月按钮
					 $(".qkycalendar_chooose_button").on("click",function(){
						if($(this).hasClass("perv")) qkycalendar_choose($(this),"perv",d_opts.drawid,d_opts.isshowtime,d_opts.clickday);
						if($(this).hasClass("next")) qkycalendar_choose($(this),"next",d_opts.drawid,d_opts.isshowtime,d_opts.clickday);
					 });		 
			})
		}
		
		//检查初始化日期，设置了从输入框初始化isinput为true，就从输入框的日期初始化，默认是初始化今天当天当时
		function check_date(c_opts){
			var dates=[];
			if(c_opts.isinput){//判断是否从输入框获取值来进行初始化 格式yyyy-mm-dd hh:mm:ss
				var thisval=c_opts.cilckid.val();
				if(isNull(thisval)!="kong"){
					var inpymd=thisval.split(" ")[0].split("-");
					dates.push(Number(inpymd[0]));
					dates.push(Number(inpymd[1]-1));
					dates.push(Number(inpymd[2]));
					if(c_opts.isshowtime){
						var inphms=thisval.split(" ")[1].split(":");
						dates.push(Number(inphms[0]));
						dates.push(Number(inphms[1]));
						if(c_opts.isshowtime=="hms")
						dates.push(Number(inphms[2]));
					}
			 	}
			 }else{
				dates.push(c_opts.year);
				dates.push(c_opts.moon);
				dates.push(c_opts.day);
				 if(c_opts.isshowtime){
					dates.push(c_opts.hours);
					dates.push(c_opts.minutes);
					if(c_opts.isshowtime=="hms")
					dates.push(c_opts.seconds);
				 }
			 }
			 return dates;
		}
		
		//外框交互
		function qkycalendar_mutual(opts){
			opts.cilckid.attr("isc","no");
			opts.hoverid.attr("isc","no");
			var huncundrawid= opts.drawid;
			
			//除此之外的点击关闭
			$(document).on("click",":not('.qkycalendar_box')",function(){
				$(".qkycalendar").slideUp(200);
				opts.cilckid.removeClass("active").attr("isc","no");
				opts.hoverid.attr("isc","no");
			})
			$(".qkycalendar_box").on("click",function(event){
				event.stopPropagation();
			});	
			
			//点击id的点击			 
			opts.cilckid.on("click",function(){
				$(".qkycalendar_btn").not($(this)).removeClass("active").attr("isc","no").next(".qkycalendar").slideUp(0);
				if($(this).attr("isc")=="no"){
					$(this).addClass("active").next(".qkycalendar").slideDown(100);
					$(this).attr("isc","yes");
					huncundrawid=$(this).next(".qkycalendar");
				}else{
					$(this).removeClass("active").next(".qkycalendar").slideUp(100);
					$(this).attr("isc","no");
					huncundrawid=$(this).next(".qkycalendar");
				}					  
			});
			
			//悬停id的事件			  
			$(opts.hoverid).hover(function(){
				$(".qkycalendar_btn_hover").not($(this)).removeClass("active").attr("isc","no").next(".qkycalendar").slideUp(0);
				if($(this).attr("isc")=="no"){
					$(this).next(".qkycalendar").slideDown(100);
					$(this).attr("isc","yes");
					huncundrawid=$(this).next(".qkycalendar");
				}else{
					$(this).next(".qkycalendar").slideUp(100);
					$(this).attr("isc","no");
					huncundrawid=$(this).next(".qkycalendar");
				}			   
			},function(){});
		}	
		
		//日历整体渲染,输入年月日和渲染id和是否添加数据，是否显示时分秒
		function qkycalendar_drawymd(y,m,d,id,isshowtime,clickday){
			var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]	;
			var thisdata=new Date(y,m-1,d);
			var weeks=thisdata.getDay();
			id.find(".qkycalendar_day label").html(d);
			id.find(".qkycalendar_day span").html(week[weeks]);
			id.find(".qkycalendar_years .year").html(y);
			id.find(".qkycalendar_years .moon").html(m);
			qkycalendar(y,m,d,id.find(".qkycalendar_mian .table"));
			qkycalendar_dayclick(id,isshowtime,clickday);
			
		}
		
		//日历表格渲染
		function qkycalendar(y,m,d,id){
			var weekHtml="<tbody><tr>";
			var moomHtml="";
			md=DayNumOfMonth(y,m);//获取当前月天数
			var dates=new Date(y,m-1,1);
			var mfd=dates.getDay();//获取第一天星期几，0为星期天
			//获取此月周数
			var forweek=Math.ceil((md+mfd)/7);
			id.html('<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>'); 
			for(var i=0;i<forweek;i++){
				for(var j=0;j<7;j++){
					//j+(i*7)为加了前空白期的循环下标
					if((j+(i*7))<mfd){
					weekHtml+='<td>&nbsp;</td>';
					}else{
						var thisday=j+(i*7)-mfd+1;
						//(j+(i*7))-mfd+1为真正日数，即几号；
						if(thisday>md){
							weekHtml+='<td>&nbsp;</td>';
						}else {
							var ds='';
							if(thisday<10)ds="0"+thisday;else ds=thisday;
							if(thisday==tod&&y==toy&&m==tom+1){
								weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" class="today" title="今天">'+thisday+'</a></td>';
							}else if(thisday==d&&y==ys&&m==ms+1){
								weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" class="active">'+thisday+'</a></td>';
							}else{
								weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'">'+thisday+'</a></td>';
							}
						}
					}
				}
				moomHtml+=weekHtml+"</tr>";
				weekHtml="<tr>";
			}
			id.append(moomHtml+"</tbody>");	
		}
		
		//日历天数点击事件，或者给天数上添加数据显示
		function qkycalendar_dayclick(id,isshowtime,clickday){
				//日数点击
				id.find(".qkycalendar_mian table tbody tr td a").each(function(i) {
					$(this).click(function(){
						$(this).parents("tbody").find("a").removeClass("active");
						$(this).addClass("active");
						clickday($(this).parents(".qkycalendar"),isshowtime);
					});
				});	
		}
		
		//渲染时分秒，并执行交互事件
		function qkycalendar_times(h,m,s,drawid,isshowtime,choosetimes){
			drawid.find(".qkycalendar_times .hour").html(h);
			drawid.find(".qkycalendar_times .min").html(m);
			drawid.find(".qkycalendar_times .second").html(s);
			drawid.find(".time_chooseicon i").on("click",function(){
				var level=Number($(this).parent().attr("level"));
				var minl=Number($(this).parent().attr("min"));
				var maxl=Number($(this).parent().attr("max"));
				var val=$(this).parents(".times_control").find(".time_val");
				var thisval=Number(val.html());
				var temval=0;
				if($(this).hasClass("timeup")){
					temval=thisval;
					temval=temval+level;
					if(temval>maxl)temval=0;
				}
				if($(this).hasClass("timedown")){
					temval=thisval
					temval=temval-level;
					if(temval<minl)temval=maxl;
				}
				temval=temval < 10 ? '0' + temval: temval;
				val.html(temval);
				choosetimes($(this).parents(".qkycalendar"),isshowtime);
			})
		}
		
		//日历月份选择
		function qkycalendar_choose(id,type,drawid,isshowtime,clickday){
			var thisyear=Number(id.parent().find("p .year").text());
			var thismoon=Number(id.parent().find("p .moon").text());
			//console.log(thisyear,thismoon);
			var addnumber;
			var ifcode;
			var distmoon;
			if(type=="perv"){addnumber=-1;ifcode=(thismoon<2);distmoon=12;}
			if(type=="next"){addnumber=1;ifcode=(thismoon>11);distmoon=1;}
			thismoon=thismoon+addnumber;
			if(ifcode){thismoon=distmoon;thisyear=thisyear+addnumber;}
			else{thismoon=thismoon;thisyear=thisyear;}
			qkycalendar_drawymd(thisyear,thismoon,ds,drawid,isshowtime,clickday);
		}
		
		//通过指定的日期元素和时间控件获取选中的日期和时间
		 exports.redate=function(id,istime){
			var data=[];
			var html="";
			var onday=id.find(".qkycalendar_mian .table a.active");
			if(isNull(onday.attr("date"))!="kong"){
				data.push(onday.attr("date"));
			}else{
				data.push(opts.year+"-"+(opts.moon+1)+"-"+opts.day);
			}
			if(istime&&isNull(istime)!="kong"){
				data.push(id.find("."+istime+" .hour").html());
				data.push(id.find("."+istime+" .min").html());
				if(istime=="hms")
				data.push(id.find("."+istime+" .second").html());
			}else{data=data}
			for(var i=0;i<data.length;i++){
				if(data.length>1){
					if(i>0&&i<data.length-1)
					html+=data[i]+":";
					if(i==data.length-1&&i!=0)
					html+=data[i];
					if(i==0)
					html+=data[i]+" ";
				} else{
					html+=data[i];
				}
			}
			return html;
		}	
		
/*********辅助函数*********/	
		
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

//判断某字符串是否为空
function isNull(data){ 
    return (data == "" || data == undefined || data == null) ? "kong" : data; 
}
		
//获取指定年月的天数
function DayNumOfMonth(Year,Month){
	var d = new Date(Year,Month,0);
	return d.getDate();
}
		
//私有方法，检测参数是否合法
function isValid(options) {
	return !options || (options && typeof options === "object") ? true : false;
} 

//获取一个元素的所有class
function getclass_indian(id){
	var classdata=id.attr("class").split(" ");
	var reclass="";
	for(var i=0;i<classdata.length;i++){
		reclass+="."+classdata[i];
	}
	return reclass;
}

})