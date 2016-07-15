
	
	var urlParaObj=getUrlPara();//contentId=31996
	var contentId=urlParaObj.contentId||0;
	
	var type=urlParaObj.type||'';
	var col=urlParaObj.col||'2';//几列
	var playUrl=urlParaObj.playUrl||'';
	var playImg=urlParaObj.playImg||'';
	var playName=urlParaObj.playName||'';
	var mediaNumber=urlParaObj.mediaNumber||1;

	var playDataList=[];
	var likeDataList=[];
	var currentIndex=0;

	function getLikeList(){
		$.ajax({
		  type: 'GET',
		  url: serverAddress+'/utvgoClient/interfaces/content_getExtraInfo.action',
		  // data to be added to query string:
		  data: {contentId:contentId,userId:userId},
		  // type of data we are expecting in return:
		  dataType: 'json',
		  success: function(data){
		  	if(data.status!=0){
		  		alert(data.result);
		  		return;
		  	}
		    renderLikeList(data);

		    
		  },
		  error: function(xhr, type){
		    alert('network error!');
		  }
		});
	}
	function renderLikeList(data){
		var s='';
		var items=data.result||[];
		likeDataList=items;
		for(var i=0,len=items.length;i<len;i++){
			s+='<div class="rdzx-item"> <a data-href="./play_sn.html?playName='+encodeURIComponent(items[i].name)+'&playUrl='+encodeURIComponent(items[i].playUrl)+'&playImg='+encodeURIComponent(items[i].img)+'&contentId='+encodeURIComponent(items[i].contentId)+'&col=2&type='+encodeURIComponent(items[i].type)+'&mediaNumber='+encodeURIComponent(items[i].mediaNumber)+'" class="rdzx-item-link"><img src="'+items[i].img+'" /> <p class="rdzx-text">'+items[i].name+'</p></a> </div>';
		}


		$('#likeListBox').html(s);

		$('#likeListBox .rdzx-item-link').on('tap',function(e){

		});
	}
	function renderVideoIntroduce(s){
		
		$('#videoIntroduceBox').html(s);
	}

	function renderDetailTab(data){
		var s='';
		
		$('.detailTabBox').each(function(i,n){
			$(n).html(s);
		});

	}

	detailTabInitShow();

	function init(){

		setVideoTitle(playName);
		setVideoInfo(playUrl,playImg);
		getLikeList();
	}
	init();

	$('.video-play-wrapper').one('touchstart',function(e){
		$('.video-play-play-icon').hide();
		$('.video-play-img').hide();
		document.getElementById('videoView').play();
	});
	$('.video-top-bar-back').on('tap',function(e){
		//alert('t');
		window.history.back();
	});
	
	function setVideoInfo(url,img){
		if(playUrl){
			document.getElementById('videoView').src=url;
		}
		if(img){
			$('.video-play-img').css('background-image','url('+img+')');
		}
	}

	function setVideoTitle(s){
		document.title=s;
		$('.video-play-title').html(s);
	}
	
	if(isWeiXin()){
		$('.video-top-bar').hide();
		$('.video-play-wrapper').css('padding-top','0px');
	}