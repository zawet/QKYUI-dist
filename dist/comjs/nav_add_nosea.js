
/****
导航生成和交互js模块

1.2版本增加是否显示个人信息模块
****/ 

(function ($) {
	var qkydata={/*导航数据*/
		"logosrc":"images/nav_logo/logo.png",
		"pjname":"初始页面",
		"navli":[["导航一","href='#'"],["导航二","href='#'"],["导航三","href='#'"],["导航四","href='#'"]],
		"navli_active":0,
		"moreli":{
			"校园办公":["xiaoyuanbangong",[["个人办公","href='#'"],["行政办公","href='#'"],["流程审批","href='#'"]]],
			"校园支付":["xiaoyuanzhifu",[["个人办公","href='#'"],["行政办公","href='#'"],["流程审批","href='#'"]]],
			"智慧教学":["zhihuijiaoxue",[["个人办公","href='#'"],["行政办公","href='#'"],["流程审批","href='#'"]]]
		},
		"morebtn":true,
		"common":[["个人办公","href='#'"],["行政办公","href='#'"],["流程审批","href='#'"]],
		"lately":[["个人办公","href='#'"],["行政办公","href='#'"],["流程审批","href='#'"]],
		"isinfo":true,//是否支持登录显示个人信息
		"tea_info":{"name":"张晓明","isphoto":true,"photo":"images/tx01.png"},
		"otherli":[["个人空间","href='#'"],["退出","id='toOut'"]]
	}//获取默认数据
	var qkyhtml={
		navmoreli_s:'<div class="nav_more_lli row"><div class="col-md-2"><svg class="color_icon" aria-hidden="true">',
		navmoreli_m:'</svg></div><div class="col-md-10"><h5>',
		navmoreli_m2:'</h5><div class="li_a">',
		navmoreli_e:'</div></div></div>',
		navhtml:'<div class="container-fluid po_r">'+
			'<div class="nav_box clear fl">'+
			  '<a class="navbtn fl"><i class="qkyicon_12 fz_18">&#xe612;</i></a>'+	
			  '<div class="nav_logo">'+
			  '<img src="" alt="" >'+
			  '</div>'+
			  '<div class="navline"></div>'+
			  '<div class="nav_pjname"></div>'+
			  '<button type="button" class="navbar-toggle collapsed mr0" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">'+
				'<span class="sr-only">Toggle navigation</span>'+
				'<span class="icon-bar"></span>'+
				'<span class="icon-bar"></span>'+
				'<span class="icon-bar"></span>'+
			  '</button>'+
			'</div>'+
			'<ul class="nav_other yc">'+
			   '<li><a href="#"><i class="qkyicon_14 fz_18">&#xe611;</i></a></li>'+
			   '<li class="dropdown">'+
				  '<a href="#" class="dropdown-toggle clear other_sel" data-toggle="dropdown">'+
				  '<div class="user_photo fl"><i class="qkyicon_14">&#xe84d;</i></div>'+
				  '<span class="fl other_name"></span>'+
				  '<span class="caret"></span>'+
				  '</a>'+
				  '<ul class="dropdown-menu" role="menu" id="otherli"></ul>'+
				'</li>'+
			'</ul>'+
			'<div id="navbar" class="navbar-collapse collapse">'+
			  '<ul class="nav navbar-nav"></ul>'+
			'</div>'+
			'<div class="nav_more row">'+
				'<div class="nav_more_left col-md-7 col-sm-6 col-xs-12">'+
					'<div class="scroll_box" id="moreli_box"></div>'+
					'<div class="navline"></div>'+
				'</div>'+
				'<div class="nav_more_right col-md-5 col-sm-6 col-xs-12">'+
					'<div class="scroll_box">'+
						'<div class="nav_more_lli clear pr0">'+
							'<h5>常用功能</h5>'+
							'<div class="li_a" id="common"></div>'+
						'</div>'+
						'<div class="nav_more_lli clear pr0">'+
							'<h5>最近访问</h5>'+
							'<div class="li_a" id="lately"></div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		 '</div>'
	};//获取默认要加载html
	
	var opts=qkydata;
	
	$.fn.extend({
        "qkynav": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {
				$(this).html(qkyhtml.navhtml);
				$(".nav_logo img").attr("src",opts.logosrc);
				$(".nav_pjname").html(opts.pjname);
				$(".other_name").html(opts.tea_info.name);
				if(opts.tea_info.isphoto)$(".user_photo").removeClass("dist").html("<img src='"+opts.tea_info.photo+"' />");
				else $(".user_photo").addClass("dist");
				tofor($("#navbar .nav"),opts.navli,"lia",opts.navli_active);
				tofor($("#common"),opts.common,"a");
				tofor($("#lately"),opts.lately,"a");
				if(opts.isinfo){
					$(".nav_other").removeClass("yc");
					tofor($("#otherli"),opts.otherli,"lia");
				}
				for(var key in opts.moreli){
					var liahtml="";
					for(var k=0;k<opts.moreli[key][1].length;k++){
						liahtml+="<a "+opts.moreli[key][1][k][1]+">"+opts.moreli[key][1][k][0]+"</a>"
					}
					$("#moreli_box").append(qkyhtml.navmoreli_s+"<use xlink:href='#icon-"+opts.moreli[key][0]+"'></use>"+qkyhtml.navmoreli_m+key+qkyhtml.navmoreli_m2+liahtml+qkyhtml.navmoreli_e);
				}
				if(opts.morebtn)$(".navbtn").on("click",function(){$(".nav_more").slideToggle(300);});
				else $(".navbtn").hide();
		    })
		}
	});
	
	
	tofor = function(id,data_arr,type,avt) {
		
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
})(window.jQuery);