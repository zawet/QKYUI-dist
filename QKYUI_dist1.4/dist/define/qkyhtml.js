/****
js调用的html模块
****/ 
define({
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
});