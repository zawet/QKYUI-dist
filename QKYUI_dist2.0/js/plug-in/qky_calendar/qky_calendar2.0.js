//qky日历插件
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
			var opt={
						/*基础配置*/
						ajaxsrc:"js/plug-in/qky_calendar/qky_calendar2.0.html",//异步地址
						csssrc:"js/plug-in/qky_calendar/qky_calendar2.0.css",//css调用地址//为之后的主题更换留接口
						//在哪里展出,默认右下（css直接锁定了）展出，值："po_leftup（左上）,po_leftdown（左下）,po_rightup（右上）" 可以另加内外边距的快速css，比如"po_leftup,ml15",用，号分割;
						position:"po_leftup",
						boxid:".qkycalendar_box",//日历盒子id或者class
						drawid:".qkycalendar",//日历渲染id或者class
						cilckid:".qkycalendar_btn",//日历点击id或者class
						hoverid:".qkycalendar_btn_hover",//日历滑动id或者class
						
						/*初始日期时间*/
						year:toy,
						moon:tom,
						day:tod,
						minutes:minute,
						hours:hour,
						seconds:second,
						
						/*过去日子选择限制（目前只支持日期年月日，不支持单年月或者单时分秒以及年月日时分秒）*/
						oldday_set:{isset:false,setdate:"today"},//过去日子操作设置
						//isset是否设置限制
						//setdate为设置什么日期或者时刻为新旧日期转折，默认为today就是今天会自动转化为今天日期，只支持格式为yyyy-mm-dd
						
						/*机制判断*/
						isinput:false,//是否从输入框里的时间来做初始值
						isdistshowdate:false,//是否一开始就在输入框里显示初始化日期
						isshowym:true,//是否显示年月,不能出现ym不显示，只要日数，就是isshowym为false的时候isshowday一定得false
						isshowday:true,//是否显示日数选择 只有在isshowym为true时才能有作用
						isshowtime:false,//是否显示时分秒////不能在不显示天数的情况下，同时显示年月选择和时间选择
						
						/*函数回调*/
						clickday:function(id,istime,isym,isday){//日数点击，可以外接函数蹭掉默认函数，默认是把选中的日期加到日历组建底部
							id.prev(".qkycalendar_btn").val(exports.redate(id,istime,isym,isday));
						},
						choosetimes:function(id,istime,isym,isday){//时间转换，可以外接函数蹭掉默认函数，默认是把选中的日期加到日历组建底部
							id.prev(".qkycalendar_btn").val(exports.redate(id,istime,isym,isday));
						}		
			 };
	
		//暴露执行体
		var isone=true;
		exports.qkycalendar=function(options){
			var opts=opt;
			 if (!isValid(options)) return this;
			 opts = $.extend({}, opts, options);//有传值进来后，进行对默认覆盖
			 if(isone){
			 loadExtentFile(opts.csssrc,"css");
			 isone=false;
			 }
			 //机制和选择初始化去掉或者改变指定状态
			 if(!opts.isshowym)opts.isshowday=false;//isshowym为false的时候isshowday一定得false
			 if(opts.isshowym&&!opts.isshowday)opts.isshowtime=false;//杜绝在不显示天数的情况下，同时显示年月选择和时间选择
			 if(opts.oldday_set.setdate=="today")opts.oldday_set.setdate=opts.year+"-"+(opts.moon+1)+"-"+opts.day;
			 
			 qkycalendar_draw(opts);	
		}
		

		
		//日历整体执行渲染（主体执行域）
		function qkycalendar_draw(d_opts){
			
			 htmlajax(d_opts.ajaxsrc,function(calhtml){//异步过来html主体
			 		//渲染日历基础外框
					$(d_opts.boxid).append(calhtml);
					
			 		//初始化外框
			 		d_opts.cilckid=$(d_opts.boxid).find(d_opts.cilckid);
					d_opts.drawid=$(d_opts.boxid).find(d_opts.drawid);
					d_opts.hoverid=$(d_opts.boxid).find(d_opts.hoverid);
					d_opts.position=d_opts.position.split(",");
					for(var i=0;i<d_opts.position.length;i++){
					d_opts.drawid.addClass(d_opts.position[i]);
					}
					
					
					
					//过滤初始化日期
					var cleardate=check_date(d_opts);
					ys=cleardate[0];ms=Number(cleardate[1]);ds=cleardate[2];hs=cleardate[3];mis=cleardate[4];ss=cleardate[5];
					
					
					
					//初始化日期的显示情况
					var datestring="";
					 if(d_opts.isdistshowdate){//是否一开始就在输入框显示初始化数据
						if(d_opts.isshowtime){
							if(d_opts.isshowtime=="hms"){
								if(d_opts.isshowday)datestring=ys+"-"+(ms+1)+"-"+ds+" "+hs+":"+mis+":"+ss;
								else datestring=hs+":"+mis+":"+ss;
							}else{
								if(d_opts.isshowday) datestring=ys+"-"+(ms+1)+"-"+ds+" "+hs+":"+mis;
								else datestring=hs+":"+mis;
							}
						}else{
							if(d_opts.isshowday)datestring=ys+"-"+(ms+1)+"-"+ds;
							else datestring=ys+"-"+(ms+1);
					 	}
					}
					d_opts.cilckid.val(datestring);
					
					
			 		//外层日历出来已否交互
					 qkycalendar_mutual(d_opts); 
			 
					//年月日数据初始化渲染 
					
					qkycalendar_drawymd(ys,ms+1,ds,d_opts.drawid,d_opts.isshowtime,d_opts.clickday,d_opts.isshowym,d_opts.isshowday,d_opts.oldday_set);
					
					
					//时分秒数据初始化渲染 
					 if(d_opts.isshowtime&&(d_opts.isshowtime=="hm"||d_opts.isshowtime=="hms")){
						d_opts.drawid.find(".qkycalendar_times").hide();
						d_opts.drawid.find(".qkycalendar_times."+d_opts.isshowtime).show();
						qkycalendar_times(hs,mis,ss,d_opts.drawid,d_opts.isshowtime,d_opts.choosetimes,d_opts.isshowym,d_opts.isshowday);
					 }
					 
					 
					 
					 //年月的输入或者点击上下转换时
					 d_opts.drawid.find(".qkycalendar_years input.time_val").on("focusout",function(){
							 var thisyear=Number($(this).parents(".qkycalendar_years").find(".year").val());
							 var thismoon=Number($(this).parents(".qkycalendar_years").find(".moon").val());
							 if(thismoon>12)thismoon=12;if(thismoon<=0)thismoon=1;//限制只能输入1-12这些数字
							 $(this).parents(".qkycalendar_years").find(".moon").val(thismoon);
							 qkycalendar_drawymd(thisyear,thismoon,ds,$(this).parents(".qkycalendar"),d_opts.isshowtime,d_opts.clickday,d_opts.isshowym,d_opts.isshowday,d_opts.oldday_set);
							 $(this).parents(".qkycalendar").prev().val(exports.redate(d_opts.drawid,d_opts.isshowtime,d_opts.isshowym,d_opts.isshowday));
						 });	
						 
						d_opts.drawid.find(".qkycalendar_years .time_chooseicon i").on("click",function(){
							var level=Number($(this).parent().attr("level"));
							var minl=Number($(this).parent().attr("min"));
							var maxl=Number($(this).parent().attr("max"));
							var val=$(this).parents(".times_control").find(".time_val");
							var thisval=Number(val.val());
							var temval=0;
							if($(this).hasClass("timeup")){
								temval=thisval;
								temval=temval+level;
								if(temval>maxl)temval=minl;
							}
							if($(this).hasClass("timedown")){
								temval=thisval
								temval=temval-level;
								if(temval<minl)temval=maxl;
							}
							temval=temval < 10 ? '0' + temval: temval;
							val.val(temval);
							
							var thisyear=Number($(this).parents(".qkycalendar_years").find(".year").val());
							var thismoon=Number($(this).parents(".qkycalendar_years").find(".moon").val());
							qkycalendar_drawymd(thisyear,thismoon,ds,$(this).parents(".qkycalendar"),d_opts.isshowtime,d_opts.clickday,d_opts.isshowym,d_opts.isshowday,d_opts.oldday_set);
							$(this).parents(".qkycalendar").prev().val(exports.redate(d_opts.drawid,d_opts.isshowtime,d_opts.isshowym,d_opts.isshowday));
						})
					 
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
		function qkycalendar_drawymd(y,m,d,id,isshowtime,clickday,isshowym,isshowday,oldday_set){
			var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]	;
			var thisdata=new Date(y,m-1,d);
			var weeks=thisdata.getDay();
			id.find(".qkycalendar_day label").html(d);
			id.find(".qkycalendar_day span").html(week[weeks]);
			id.find(".qkycalendar_years .year").val(y);
			id.find(".qkycalendar_years .moon").val(m);
			if(isshowym){id.find(".ymd_box").show();}else{id.find(".ymd_box").hide();}
			if(isshowday){id.find(".qkycalendar_mian").show();}else{id.find(".qkycalendar_mian").hide();}
			qkycalendar(y,m,d,id.find(".qkycalendar_mian .table"));
			qkycalendar_dayclick(id,isshowtime,clickday,isshowym,isshowday,oldday_set);
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
							var dss='';
							if(thisday<10)dss="0"+thisday;else dss=thisday;
							if(thisday==tod&&y==toy&&m==tom+1){
								weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" class="today" title="今天">'+thisday+'</a></td>';
							}else if(thisday==d){
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
		function qkycalendar_dayclick(id,isshowtime,clickday,isshowym,isshowday,oldday_set){
				//日数点击
				
				id.find(".qkycalendar_mian table tbody tr td a").each(function(i) {
					if(oldday_set.isset){
						var o_n_day= new Date(oldday_set.setdate);
						var thisdate=new Date($(this).attr("date"));
						//console.log(oldday_set.setdate);
						if(thisdate.getTime()<o_n_day.getTime()){
							$(this).addClass("oldday");
						}else{
							$(this).addClass("newday");
						}
					}else{$(this).addClass("newday");}
					$(this).click(function(){
						if($(this).hasClass("newday")){
							$(this).parents("tbody").find("a").removeClass("active");
							$(this).addClass("active");
							clickday($(this).parents(".qkycalendar"),isshowtime,isshowym,isshowday);
						}
					});
				});	
		}
		
		//渲染时分秒，并执行交互事件
		function qkycalendar_times(h,m,s,drawid,isshowtime,choosetimes,isshowym,isshowday){
			drawid.find(".qkycalendar_times .hour").html(h);
			drawid.find(".qkycalendar_times .min").html(m);
			drawid.find(".qkycalendar_times .second").html(s);
			drawid.find(".qkycalendar_times .time_chooseicon i").on("click",function(){
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
				choosetimes($(this).parents(".qkycalendar"),isshowtime,isshowym,isshowday);
			})
		}
		
		//日历月份选择（被年月自主转换替代了）
		/*function qkycalendar_choose(id,type,drawid,isshowtime,clickday,isshowym,isshowday){
			var thisyear=Number(id.parent().find(".year").val());
			var thismoon=Number(id.parent().find(".moon").val());
			//console.log(thisyear,thismoon);
			var addnumber;
			var ifcode;
			var distmoon;
			if(type=="perv"){addnumber=-1;ifcode=(thismoon<2);distmoon=12;}
			if(type=="next"){addnumber=1;ifcode=(thismoon>11);distmoon=1;}
			thismoon=thismoon+addnumber;
			if(ifcode){thismoon=distmoon;thisyear=thisyear+addnumber;}
			else{thismoon=thismoon;thisyear=thisyear;}
			qkycalendar_drawymd(thisyear,thismoon,ds,drawid,isshowtime,clickday,isshowym,isshowday);
		}*/
		
		//通过指定的日期元素和时间控件获取选中的日期和时间
		 exports.redate=function(id,istime,isym,isday){
			var data=[];
			var html="";
			if(isym){
				if(isday){
					var onday=id.find(".qkycalendar_mian .table a.active");
					if(isNull(onday.attr("date"))!="kong"){
						data.push(onday.attr("date"));
					}else{
						data.push(opt.year+"-"+(opt.moon+1)+"-"+opt.day);
					}
				}else{
					var ty=Number(id.find(".year").val());
					var tm=Number(id.find(".moon").val());
					data.push(ty+"-"+tm);
				}
			}
			if(istime&&isNull(istime)!="kong"){
				data.push(id.find("."+istime+" .hour").html());
				data.push(id.find("."+istime+" .min").html());
				if(istime=="hms")
				data.push(id.find("."+istime+" .second").html());
			}else{data=data}
			
			//格式化数据
			for(var i=0;i<data.length;i++){
				if(isym){
					if(data.length>1){
						if(i>0&&i<data.length-1)html+=data[i]+":";
						if(i==data.length-1&&i!=0)html+=data[i];
						if(i==0)html+=data[i]+" ";
					}else{html+=data[i];}
				}else{
					if(i==data.length-1&&i!=0)html+=data[i];
					else html+=data[i]+":";
				}
			}
			return html;
		}
	
		
/*********辅助函数*********/	

//分割日期字符串为数组，
function fgdate(string,type){
	var date=[];
	if(type=="y-m-d h:m:s"){
		var ymd=string.split(" ")[0].split("-");
		var hms=string.split(" ")[1].split(":");
		for(var i=0;i<6;i++){
			if(i<3)date.push(ymd[i]);
			else date.push(hms[i-3]);
		}
		
	}
	if(type=="y-m-d"){
		var ymd=string.split("-");
		date=ymd;
	}
	if(type=="h:m:s"){
		var hms=string.split(":");
		date=hms;
	}
	return date;
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
//直接加css和js文件
function loadExtentFile(filePath, fileType){
    if(fileType == "js"){
        var oJs = document.createElement('script');        
        oJs.setAttribute("type","text/javascript");
        oJs.setAttribute("src", filePath);//文件的地址 ,可为绝对及相对路径
        document.getElementsByTagName("head")[0].appendChild(oJs);//绑定
    }else if(fileType == "css"){
        var oCss = document.createElement("link"); 
        oCss.setAttribute("rel", "stylesheet"); 
        oCss.setAttribute("type", "text/css");  
        oCss.setAttribute("href", filePath);
        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
    }
}

})