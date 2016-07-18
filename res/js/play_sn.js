
	
	
	var urlParaObj=getUrlPara();//contentId=31996
	var contentId=0;
	
	var type='';
	var col='2';//几列
	var playUrl='';
	var playImg='';
	var playName='';
	var mediaNumber=1;

	var playDataList=[];
	var likeDataList=[];
	var currentIndex=0;

	function urlParaInit(url){
		urlParaObj=getUrlPara(url||'');
		type=urlParaObj.type||'';
		col=urlParaObj.col||'2';//几列
		playUrl=urlParaObj.playUrl||'';
		playImg=urlParaObj.playImg||'';
		playName=urlParaObj.playName||'';
		mediaNumber=urlParaObj.mediaNumber||1;
		contentId=urlParaObj.contentId||0;
	}

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
			//alert($(this).attr('data-href'));
			urlParaInit($(this).attr('data-href'));
			setVideoTitle(playName);
			setVideoInfo(playUrl,playImg);
			setVideoIntroduce(playName);
			document.getElementById('videoView').play();
		});
	}
	function renderVideoIntroduce(s){
		
		$('#videoIntroduceBox').html(s);
	}

	function renderDetailTab(data){
		var s='';
		s+='<div class="detailTabBar col'+col+' clearfix">';
		
		if(col==3){
			s+='<div class="detailTabItem on"> <span class="detailTab-text">选集</span> </div>';
		};
		
		s+='<div class="detailTabItem"> <span class="detailTab-text">猜你喜欢</span> </div> <div class="detailTabItem"> <span class="detailTab-text">简介</span> </div>';

		s+='</div>';

		s+='<div class="detailTabContentBox overflow-scroll-y">';

		if(col==3){
			s+='<div class="detailTabItemContent detail-jiList clearfix"> <a href="#" class="detail-jiList-item">1</a> </div>';
		}

		s+='<div id="likeListBox" class="detailTabItemContent indexContentBox clearfix"> </div> <div id="videoIntroduceBox" class="detailTabItemContent"> </div>';

		s+='</div>';

		$('.detailTabBox').each(function(i,n){
			$(n).html(s);
		});

		detailTabInitShow();

	}

	

	function init(){

		setVideoTitle(playName);
		setVideoInfo(playUrl,playImg);
		getLikeList();
		setVideoIntroduce(playName);
	}

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
	function setVideoIntroduce(s){
		var ss='<div class="detail-profile"> <p>'+s.replace('\r\n','</p><p>')+'</p></div>';
		$('#videoIntroduceBox').html(ss);
	}

	function setVideoTitle(s){
		document.title=s;
		$('.video-play-title').html(s);
	}
	
	if(isWeiXin()){
		$('.video-top-bar').hide();
		$('.video-play-wrapper').css('padding-top','0px');
	}


	urlParaInit();
	renderDetailTab();
	init();
