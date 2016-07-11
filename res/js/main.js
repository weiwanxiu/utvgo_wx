//基础配置
//http://120.31.66.15:8080/
var hostName='http://120.31.66.15';//http://app.utvgo.com:8099/utvgoClient/interfaces/main_index.action
var hostPort=8080;
var serverAddress=hostName+':'+hostPort;








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



