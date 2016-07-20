//基础配置
//http://120.31.66.15:8080/
var hostName='http://app.utvgo.com';//http://120.31.66.15';//http://app.utvgo.com:8099/utvgoClient/interfaces/main_index.action
var hostPort=8080;
var serverAddress=hostName+':'+hostPort;



var userId=1517; //用户帐号 用于测试




/**
得到高宽，补充插件,修复当display为none是el.width()为0的bug
usage:
el.getW();//33
el.getH();//332
el.getSize();//{width:33,height:332}
**/
;(function($){
  $.extend($.fn, {
    getW: function(){
      // `this` refers to the current Zepto collection.
      // When possible, return the Zepto collection to allow chaining.
      //position: "absolute", visibility: "hidden", display: "block" 
      var pos=this.css('position')
      	  ,vis=this.css('visibility')
      	  ,dis=this.css('display')
      	  ,w=0
      ;
      this.css({
      	"position": "absolute", "visibility": "hidden", "display": "block"
      });
      w=this.width();

      this.css({
      	"position": pos, "visibility": vis, "display": dis
      });
      return w;
    }
    ,getH: function(){
    	var pos=this.css('position')
      	  ,vis=this.css('visibility')
      	  ,dis=this.css('display')
      	  ,h=0
      ;
      this.css({
      	"position": "absolute", "visibility": "hidden", "display": "block"
      });
      h=this.height();

      this.css({
      	"position": pos, "visibility": vis, "display": dis
      });
      return h;
    }
    ,getSize: function(){
    	var pos=this.css('position')
      	  ,vis=this.css('visibility')
      	  ,dis=this.css('display')
      	  ,w=0
      	  ,h=0
      ;
      this.css({
      	"position": "absolute", "visibility": "hidden", "display": "block"
      });
      w=this.width();
      h=this.height();
      this.css({
      	"position": pos, "visibility": vis, "display": dis
      });
      return {
      	width:w
      	,height:h
      };
    }
  })
})(Zepto);



function getUrlPara(href,rem){
	var url = href||window.location.href //获取url
		,request = {}
		,str=''
		,remStr = rem || '?' 
		,index = url.indexOf(remStr)
	;
   if (index != -1) {
   	  url=url.slice(index);
      str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         request[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
      }
   }
   return request;
}


function isWeiXin(){ 
	var ua = window.navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
		return true; 
	}else{ 
		return false; 
	} 
} 

function showLoading(){
	$('.loadingTip').show();
}
function hideLoading(){
	$('.loadingTip').hide();
}



/**主体布局和侧边结构 js**/
;(function(){
	$('#menuBt').tap(function(e){
		if($('#sideMenu').hasClass('sideMenu-on')){
			$('#sideMenu').removeClass('sideMenu-on');
			$('#main').removeClass('main-on');
		}else{
			$('#sideMenu').addClass('sideMenu-on');
			$('#main').addClass('main-on');
		}
	});
	$('#meBt').tap(function(e){
		alert('me');
	});
	$('#topNavBackBt').tap(function(e){
		window.history.back();
	});

	$('#topNavSearchBt').tap(function(e){
		alert('search');
	});
	
	$('#main').on('touchstart',function(e){
		if($('#sideMenu').hasClass('sideMenu-on')&&e.target.id!='menuBt'){
			$('#sideMenu').removeClass('sideMenu-on');
			$('#main').removeClass('main-on');
			e.stopPropagation();
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	});

	//侧边搜索
	$('#searchInput').tap(function(e){
		alert('input');
	});

})();



/**detail tab**/
function detailTabInitShow(){

	$('.detailTabItem').on('tap',function(e){
		var i=$(this).index();
		//console.log(i);
		$('.detailTabItem.on').removeClass('on');
		$(this).addClass('on');
		$('.detailTabItemContent.on').removeClass('on');
		$('.detailTabItemContent').eq(i).addClass('on');
	});

	$('.detailTabItem.on').removeClass('on');
	$('.detailTabItem').eq(0).addClass('on');
	$('.detailTabItemContent').eq(0).addClass('on');
}
