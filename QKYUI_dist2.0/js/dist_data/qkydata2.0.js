
/****
默认数据存放
****/ 

define({
	navdata:{/*导航数据*/
	    htmlsrc:"mould_html/qkynav2.0.html",//头部模板获取异步地址
		logosrc:"images/nav_logo/qky-logo.png",//logo来源路径
		pjname:"初始页面2.0版本",//应用名
		theme:"navbar-default",//主题
		themetype:{
			pjnameColor:"#27b0f2",//应用名颜色
			navactiveColor:"#27b0f2"//主导航活动时背景色
		},//个性定制专属的应用名颜色和主导航选中颜色
		distclass:["navbar", "navbar-fixed-top", "headernav"],//默认一定要用的class
		navli_j:[
			{name:"导航1",attrcont:"href='#'",isactive:true},
			{name:"导航2",attrcont:"href='#'",isactive:false},
			{name:"导航3",attrcont:"href='#'",isactive:false},
			{name:"导航4",attrcont:"href='#'",isactive:false},
			{name:"导航5",attrcont:"href='#'",isactive:false},
			{name:"导航6",attrcont:"href='#'",isactive:false},
			{name:"导航7",attrcont:"href='#'",isactive:false},
			{name:"导航8",attrcont:"href='#'",isactive:false},
			{name:"导航9",attrcont:"href='#'",isactive:false},
			{name:"导航10",attrcont:"href='#'",isactive:true},
			{name:"导航11",attrcont:"href='#'",isactive:false},
			{name:"导航12",attrcont:"href='#'",isactive:false}
		],//主导航条
		
		
		morebtn:true,//是否显示最左汉堡包菜单建已经是否执行更多操作
		common:[//常用app
			["电子图书馆","href='#'"],["校友家园","href='#'"],
			["考勤管理","href='#'"],["党工团管理","href='#'"],
			["一卡通","href='#'"],["校园缴费","href='#'"],
			["车辆预约管理","href='#'"],["教育大数据分析","href='#'"],
			["校园服务岗","href='#'"],["校产管理","href='#'"]
		],
		lately:[//最近使用app
			["教育大数据分析","href='#'"],["校园缴费","href='#'"],
			["就餐管理","href='#'"],["电子班牌","href='#'"],
			["车辆预约管理","href='#'"],["教师培训","href='#'"],
			["空间预约管理","href='#'"],["教师业务档案","href='#'"],
			["校园服务岗","href='#'"]
		],
		appcenter_link:"default_html/appcenter.html",//应用中心页面链接
		allapp:{//所有app
			"教育管理":[["校园办公","href='#1'"],["校产管理","href='#2'"],["基础数据管理","href='#'"]],
			"教育大数据":[["基础数据分析","href='#'"],["综合素质分析","href='#'"],["学业水平分析","href='#'"],["微校园使用分析","href='#2'"]],
			"教务管理":[["课务管理","href='#'"],["考务管理","href='#'"],["成绩管理","href='#'"],["资源中心","href='#'"],["个人资源","href='#'"]],
			"资源平台":[["资源中心","href='#'"],["个人资源","href='#'"]],
			"教师专业发展":[["教师业务档案","href='#'"],["教师成长档案","href='#'"],["教师培训","href='#'"],["教师考勤","href='#'"],["教师家访","href='#'"]],
			"学生学业成长":[["学生电子信息","href='#'"],["综合素质评价","href='#'"],["学生成绩","href='#'"],["班级圈","href='#'"],["学生请假","href='#'"]],
			"校园管理":[
				["校园迎新","href='#3'"],["门户管理","href='#'"],["校园缴费","href='#4'"],
				["就餐管理","href='#'"],["宿舍管理","href='#'"],["电子图书馆","href='#'"],
				["空间预约管理","href='#'"],["车辆预约管理","href='#'"],["党工团管理","href='#'"],
				["信访管理","href='#'"],["运动会管理","href='#'"],["条形码打印管理","href='#'"],
				["校园服务岗","href='#5'"],["校园吉尼斯","href='#6'"],["校友家园","href='#7'"],
				["电子班牌","href='#'"],["一卡通","href='#'"],["考勤管理","href='#'"]
			],
			"通用功能":[["通知公告","href='#'"],["通讯录","href='#'"],["行事历","href='#'"],["个人网盘","href='#'"],["调查问卷","href='#'"]],
		},
		
		isinfo:true,//是否支持登录显示个人信息
		tea_info:{"name":"张晓明","isphoto":false,"photo":"images/tx01.png"},//个人信息
		otherli:[["切换身份","href='default_html/switch_user.html'"],["账户设置","href='default_html/account_settings.html'"],["个人设置","href='#'"],["退出","href='default_html/login.html'"]],//设置菜单

		isnews:true,//是否显示信息铃铛
		newsimgsrc:"images/appicon/",//应用图标的来源路径
		newscenter_link:"default_html/newscenter.html",//消息中心页面链接
		news_analogdata:[/*推送消息模拟数据*/
			{
				appname:"学习管理平台",
				newsname:"在线测试开放答题",
				newsgettime:"2017-03-28 13:00",
				newscont:"课程西方近代史的测试第一阶段测试已于2017-03-28 13:00开放答题"
			},
			{
				appname:"考务管理",
				newsname:"测试已截止",
				newsgettime:"2017-03-28 13:00",
				newscont:"课程中国文化概论的测试课后小练习已于2017-03-28 10:30截止"
			},
			{
				appname:"作业管理",
				newsname:"课程成员加入",
				newsgettime:"2017-03-28 09:12",
				newscont:"新的成员学生张小画加入课程设计概论"
			},
			{
				appname:"校园办公",
				newsname:"作业互评已经截止",
				newsgettime:"2017-03-27 15:00",
				newscont:"课程西方近代史的作业课后作业已于2017-03-27 15:00截止互评，去查看互评结果并批改作业吧"
			},
			{
				appname:"考务管理",
				newsname:"作业提交",
				newsgettime:"2017-03-27 11:00",
				newscont:"课程中国文化概论的作业文化解析已有6名学生提交，提交率23%"
			},
			{
				appname:"考务管理",
				newsname:"作业提交",
				newsgettime:"2017-03-27 11:00",
				newscont:"课程中国文化概论的作业文化解析已有6名学生提交，提交率23%"
			}
		],
		
		setup:function(){//常用设置按钮点击事件回调
			$(".setup").on("click",function(){
				$("#comapp_setup").modal('show');
			});	
		},
		qkynavafter:function(){},//头部渲染完后执行回调
		
		navclick:function(thiscilck){//头部导航点击后进行回调
			//console.log(thiscilck);//返回当前点击的头部项	
		},
		navhoverin:function(thiscilck){//头部导航进入悬停进行回调
			//console.log(thiscilck,"in");//返回当前点击的头部项	
		},
		navhoverout:function(thiscilck){//头部导航退出悬停进行回调
			//console.log(thiscilck,"out");//返回当前点击的头部项	
		}
	},
	//已经有的图标名记录数组;
	haveicon:["changyongshezhi","wangshangwenjuan","xiaoyuanbangong","xiaoyuanzhifu","yidongxiaoyuan","zhihuikongjian","zhihuixiaoyuan","zhinengpaike","zhinengxiaoyuan","zonghepingjia","zonghesuzhifenxi","zonghesuzhipingjia","jichushujufenxi","jiaoshichengchangdangan","xuexiguanlipingtai"] 
});