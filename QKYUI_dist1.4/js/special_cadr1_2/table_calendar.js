
/****
表格日历生成和交互js模块
****/ 



define(function(require) {
	
	/*1.获取数据（前端做法是直接写在页面上，后端做法是通过ajax或者其他手段跟数据库交互获取数据）*/
	var qkydata=require("define/qkydata");
	
	
	/*2.初始化数据*/
	var myDate=new Date();
	var toy=myDate.getFullYear()    //获取完整的年份(4位,1970-????)
	var tom=myDate.getMonth()       //获取当前月份(0-11,0代表1月)
	var tod=myDate.getDate()       //获取当前日(1-31)
	
	/*3.执行体*/	
	gomoon(toy,tom+1,"");
	$("#prv_moon").on("click",function(){
		gomoon("","","prv");
	});
	$("#next_moon").on("click",function(){
		gomoon("","","next");
	});
	$("#tothis_moon").on("click",function(){
		gomoon(toy,tom+1,"");
	});
	
	
	/*4.函数块编写*/
	
	//日历跳转
	function gomoon(y,m,type){
		var thisy,thism;
		if(y!=''&&m!=''){
			thisy=y;
			thism=m;
		}else{
			var y_m=$("#this_ym").html().split("年");
			thisy=Number(y_m[0]);
			thism=Number(y_m[1].replace("月",""));
			if(type=="prv"){
				thism--;if(thism<1){thisy--;thism=12;}else{thisy=thisy;thism=thism;}
			}else if(type=="next"){
				thism++;if(thism>12){thisy++;thism=1;}else{thisy=thisy;thism=thism;}	
			}else{}
		}
		$("#this_ym").html(thisy+"年"+thism+"月");
		table_calendar(thisy,thism,tod,$("#table_calendar"));
	}
			
	//渲染日历指定年月的表格列表
	function table_calendar(y,m,d,id){
		var weekHtml="<tr>";
		var moomHtml="";
		md=DayNumOfMonth(y,m);//获取当前月天数
		var dates=new Date(y,m-1,1);
		var mfd=dates.getDay();//获取第一天星期几，0为星期天
		//获取此月周数
		var forweek=Math.ceil((md+mfd)/7);
		id.html('<thead><tr><th>周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th></tr></thead>'); 
		for(var i=0;i<forweek;i++){
			
			for(var j=0;j<7;j++){
				//j+(i*7)为加了前空白期的循环下标
				if((j+(i*7))<mfd){
				weekHtml+='<td class="oldday">&nbsp;</td>';
				}else{
					var thisday=j+(i*7)-mfd+1;
					//(j+(i*7))-mfd+1为真正日数，即几号；
					if(thisday>md){
						weekHtml+='<td class="oldday">&nbsp;</td>';
					}else {
						var ds='';
						if(thisday<10)ds="0"+thisday;else ds=thisday;
						if(thisday==d&&y==toy&&m==tom+1){
							weekHtml+='<td><div date="'+y+'-'+m+'-'+thisday+'" class="calday today"><label>'+thisday+'</label><div class="calbox"></div></div></td>';
						}else{
							weekHtml+='<td><div date="'+y+'-'+m+'-'+thisday+'" class="calday"><label>'+thisday+'</label><div class="calbox"></div></div></td>';
						}
					}
				}
			}
			moomHtml+=weekHtml+"</tr>";
			weekHtml="<tr>";
		}
		id.append("<tbody>"+moomHtml+"</tbody>");
		
		id.find("tbody tr").each(function(t){if(t==id.find("tbody tr").length-1)$(this).addClass("down");});
		
		//更多层
		var morebox='<div class="morebox"><a class="moreclose"><i class="qkyicon_14 fz_16">&#xe618;</i></a><h4></h4><div class="callibox"></div></div>';
		
		//增加数据
		id.find(".calday").each(function(i) {
			var thisrl=$(this).attr("date"); 
			var thistime=new Date($(this).attr("date").replace(/\-/g, "\/"));
			var todaytime=new Date(toy,tom,tod);
			var thisrl1=thisrl.split("-");
			var thisweek=thistime.getDay();
			if(thistime<todaytime){
				$(this).addClass("oldday").parent().addClass("oldday");
				$(this).find(".calbox").html("<span>正常</span>");
			}
			
			for(var key in qkydata.table_data){
				/*if(key==thisrl){
					//console.log(morebox);
					$(this).find(".calbox").html("");
					$(this).append(morebox);//插入更多框架
					for(var o=0;o<qkydata.table_data[key].length;o++){
						$(this).find("h4").html(key);
						$(this).find(".callibox").append(
						"<a class='calli dian3' title='"+qkydata.table_data[thisrl][o][0]+"' "+qkydata.table_data[thisrl][o][1]+">"+qkydata.table_data[thisrl][o][0]+"</a>"
						);
						$(this).find(".calbox").append(
						"<a class='calli out dian3' title='"+qkydata.table_data[thisrl][o][0]+"' "+qkydata.table_data[thisrl][o][1]+">"+qkydata.table_data[thisrl][o][0]+"</a>"
						);//插入日历事件
					}
					if($(this).find(".calli.out").length>2){
						$(this).find(".calli.out").eq(1).after("<a class='calli out more'>更多</a>");//展示超两行显示更多
						$(this).find(".calli.out").each(function(i) {
							if(i>2) $(this).hide();
						});
					}
				}*/
				if(key==thisrl){
				$(this).find(".calbox").html("");
				
				$(this).find(".calbox").append(
						"<a class='callis dian3'>"+qkydata.table_data[thisrl].length+"项记录</a>"
						);//插入日历事件
				}
				
			}
			
    	});
		
		//事件执行
		id.find(".calday .morebox").hover(function(){},function(){$(this).slideUp(200);});
		id.find(".calday .more").on("click",function(){$(this).parent().parent().find(".morebox").slideDown(200);})
		id.find(".calday .moreclose").on("click",function(){$(this).parent().slideUp(200);});
		//id.not(".calday .more").click(function(){$(".morebox").slideUp(200);});/***以为区域点击 s**/
		
	}
	//获取指定年月的天数
	function DayNumOfMonth(Year,Month){
		  var d = new Date(Year,Month,0);
		  return d.getDate();
	}
	
	return {
		cal_bar:function(){
			gomoon(toy,tom+1,"");
			$("#prv_moon").on("click",function(){
				gomoon("","","prv");
			});
			$("#next_moon").on("click",function(){
				gomoon("","","next");
			});
			$("#tothis_moon").on("click",function(){
				gomoon(toy,tom+1,"");
			});
		}
	};
})