function init(){GetRadioDetailInfo(function(a){var t=a.result,i=$("#videoView");i.attr("src",t.playUrl+liveAuth),$(".video-play-title").text(t.radioName),window.document.title=t.radioName,renderRadioShow(a),initPlayEvent()})}function GetRadioDetailInfo(a){showLoading(),$.ajax({type:"GET",url:serverAddress+"/utvgoClient/interfaces/getRadio_detailInfo.action?id="+contentId+"&fetchRadioId="+fetchRadioId,data:{},dataType:"json",success:function(t){var i=t;0==t.status&&a&&a(i),hideLoading()},error:function(a,t){}})}function renderRadioShow(a){for(var t=$("#detailTabContentBox_0"),i=(a.extra.showList,a.result,a.extra.showList),e="",o="",n="",s=new Date,d="",l=0,r=i.length;l<r;l++)d=new Date(s.toString().replace(s.toString().split(" ")[4],i[l].startTime))-s,console.log(d),d<0?isOverClass="isOver":0<=d&&d<=1e3*i[l].duration?isOverClass="onPlay":isOverClass="notStart",e+='<li data-showid="'+i[l].id+'" class="listItem '+isOverClass+'"> <div class="icon "><b class="top"></b><b class="bottom"></b><i></i><span class="playTipsText">'+n+'</span></div> <div class="tvShowItem ellipsis"> <span class="tvShowtime">'+i[l].startTime+"&nbsp;&nbsp;"+i[l].showName+"</span> </div> </li>";i.length<=0&&(e='<li class="listItem nolist">没有资源</li>'),o='<ul class="tvListBox overflow-scroll-y ">'+e+"</ul>",e="",t.append(o),$("#detailTabContentBox_0 .tvListBox").eq(0).addClass("show");var c=$(window).height()-.37*$(window).height()-20;$("#detailTabContentBox_0 .tvListBox").height(c)}function initPlayEvent(){var a=document.getElementById("videoView"),t=$(".video-play-img");$(".video-play-play-icon").on("tap",function(){t.hasClass("on")?(a.pause(),t.removeClass("on")):(a.play(),t.addClass("on"))})}var urlParaObj=getUrlPara(),playUrl=urlParaObj.playUrl||"",contentId=urlParaObj.contentId||"",fetchRadioId=urlParaObj.fetchRadioId||"",radioName=decodeURIComponent(urlParaObj.radioName)||"",showName=decodeURIComponent(urlParaObj.showName)||"",playUrl=decodeURIComponent(urlParaObj.playUrl)||"",islive=!1,liveAuth="?id=utvgo&uid=3a163d973ed4c23a8e150212099db671&user=vrrvrmnuwsihilggucfnhhchjidjbjijafgej&appid=10057&uuid=13BD6592188244D0A92C156532C06D372566000006566B00C122";showLoading(),$(document).ready(function(){init()}),isWeiXin()&&($(".video-top-bar").hide(),$(".video-play-wrapper").css("padding-top","0px")),$(".video-top-bar-back").on("tap",function(a){window.history.back()});