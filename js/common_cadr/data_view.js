/****
特殊模块，数据视图渲染
****/ 

define(function(require) {
var datas={
	bg_data:{
		tit:"男女比例",
		data:{"女":[45,"#ff7171"],"男":[55,"#ffae72"]}
	},
	vg_data:{
		tit:"农村人口比例",
		data:{"农村户口":[45,"#ff7171"],"非农村户口":[55,"#ffae72"]}
	},
	ht_data:{
		tit:"健康比例",
		data:{"健康或良好":[88,"#ff7171"],"残迹":[1,"#eebe77"],"一般或较弱":[15,"#7cb1ef"],"有慢性病":[8,"#d5eb7e"],"有生理缺陷":[1,"#68c9bf"]}
	},
	sf_data:{
		tit:"学生来源比例",
		data:{"正常入学":[45,"#ff7171"],"借读":[55,"#ffae72"],"其他":[55,"#eebe77"]}
	},
	ss_data:{
		tit:"入学比例",
		data:{"就近入学":[45,"#ff7070"],"义务教育阶段其他":[55,"#ffaf72"],"统一招生":[55,"#7cb1ef"],"体育特招":[55,"#ffd772"],"艺术特招":[55,"#68c9bf"],"高中阶段其他":[55,"#d5eb7e"]}
	},
	as_data:{
		tit:"就读方式",
		data:{"走读":[45,"#ff7171"],"住校":[55,"#ffae72"]}
	}
};

xrzb('boy_girl',datas.bg_data.data,datas.bg_data.tit);
xrzb('isvillage',datas.vg_data.data,datas.vg_data.tit);
xrzb('ishealthy',datas.ht_data.data,datas.ht_data.tit);
xrzb('studerfrom',datas.sf_data.data,datas.sf_data.tit);
xrzb('startschool',datas.ss_data.data,datas.ss_data.tit);
xrzb('attendschool',datas.as_data.data,datas.as_data.tit);

function xrzb(id,datas,tit){
	var labels = new Array();
	var values = new Array();
	for(var key in datas){
		labels.push(key);
		values.push({value:datas[key][0],name:key,itemStyle:{normal:{color:datas[key][1]}}});
	}
	 
	//渲染表格（想看明白请看ECharts 3.0官方api） 
	var myChart = echarts.init(document.getElementById(id));
		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
			  
        		bottom:5,
				data:labels
			},
			series: [
				{
					name:tit,
					type:'pie',
					radius: ['22%', '58%'],
					avoidLabelOverlap: false,
					startAngle:20,
					center: ['50%', '38%'],
					label:{normal:{formatter:"{b}\n{d}%",textStyle:{fontSize:12},show:true}},
					labelLine:{normal:{smooth:false,length:8,length2:4,show:true}},
					data:values
				}
			]
		};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}

});
	
	