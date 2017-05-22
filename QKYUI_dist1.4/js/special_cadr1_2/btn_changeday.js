
/****
点击按钮换天
****/ 

define(function(require) {
	
	/*2.初始化数据*/
	var myDate=new Date();
	var toy=myDate.getFullYear()    //获取完整的年份(4位,1970-????)
	var tom=myDate.getMonth()       //获取当前月份(0-11,0代表1月)
	var tod=myDate.getDate()       //获取当前日(1-31)
	
	var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");  
	var even = new Array("（单周）","（双周）");  
	
	/*3.执行体*/	
	goday(toy,tom+1,tod,"");
	$("#prv_moon").on("click",function(){
		goday("","","","prv");
	});
	$("#next_moon").on("click",function(){
		goday("","","","next");
	});
	$("#tothis_moon").on("click",function(){
		goday(toy,tom+1,tod,"");
	});
	
	
	/*4.函数块编写*/
	
	//日数跳转
	function goday(y,m,d,type){
		var thisy,thism,thisd;
		if(y!=''&&m!=''&&d!=''){
			thisy=y;
			thism=m;
			thisd=d;
		}else{
			var y_m=$("#this_ym").html().split("年");
			thisy=Number(y_m[0]);
			thism=Number(y_m[1].split("月")[0]);
			thisd=Number(y_m[1].split("月")[1].replace("日",""));
			if(type=="prv"){
				thisd--;
				if(thisd<1){
					thism--;	
					if(thism<1){thisy--;thism=12;}else{thisy=thisy;thism=thism;}
					thisd=DayNumOfMonth(thisy,thism);	
				}else{
					thisd=thisd;thisy=thisy;thism=thism;
				}
				
			}else if(type=="next"){
				thisd++;
				if(thisd>DayNumOfMonth(thisy,thism)){
					thisd=1;
					thism++;if(thism>12){thisy++;thism=1;}else{thisy=thisy;thism=thism;}
				}else{
					thisd=thisd;thisy=thisy;thism=thism;
				}		
			}else{}
		}
		$("#thisweek").html(thisweek(thisy,thism,thisd));
		$("#this_ym").html(thisy+"年"+thism+"月"+thisd+"日");
		
		/**执行表格数据变化s**/
		/**执行表格数据变化e**/
	}
	//获取今天星期几并星期六日返回双周或者单周
	function thisweek(y,m,d){
		var thisweek=new Date(y,m-1,d).getDay();
		var evens=0;
		if(getWeekNumber(y,m,d)%2==0){evens=1;}else{evens=0}
		if(thisweek!=0&&thisweek!=6){
			return dayNames[thisweek]
		}else{
			return dayNames[thisweek]+even[evens];
		}
	}
	
	
	
	//获取指定年月的天数
	function DayNumOfMonth(Year,Month){
		  var d = new Date(Year,Month,0);
		  return d.getDate();
	}
	
	//获取指定日是一年中第几周
	function getWeekNumber(y, m, d) {
		var now = new Date(y, m - 1, d),
			year = now.getFullYear(),
			month = now.getMonth(),
			days = now.getDate();
		//那一天是那一年中的第多少天
	   for (var i = 0; i < month; i++) {
			days += getMonthDays(year, i);
		}
	
		//那一年第一天是星期几
		var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
	 
		var week = null;
	   if (yearFirstDay == 1) {
			week = Math.ceil(days / yearFirstDay);
	   } else {
		   days -= (7 - yearFirstDay + 1);
		   week = Math.ceil(days / 7) + 1;
	   }
	
	   return week;
	}
	//获取整年每月天数
	function getMonthDays(year, month) {
     return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
    }
	//判断今年是否闰年
	function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }
	
});