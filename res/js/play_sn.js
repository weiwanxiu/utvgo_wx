
	
	
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
	var duojiDataList=[];
	var currentIndex=0;
	var isDuoji=false;

	function urlParaInit(url){
		urlParaObj=getUrlPara(url||'');
		type=urlParaObj.type||'';
		col=urlParaObj.col||'2';//几列
		playUrl=urlParaObj.playUrl||'';
		playImg=urlParaObj.playImg||'';
		playName=urlParaObj.playName||'';
		mediaNumber=urlParaObj.mediaNumber||1;
		contentId=urlParaObj.contentId||0;

		if(col>2){
			isDuoji=true;
		}
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
			var i=$(this).parent().index();
			//alert(i);
			urlParaInit($(this).attr('data-href'));
			setVideoTitle(playName);
			setVideoInfo(playUrl,playImg);
			setVideoIntroduce(likeDataList[i].remark||playName);
			document.getElementById('videoView').play();
			if(isDuoji){
				$('.detail-jiList-item').off();
				getDuojiList();
			}
		});
	}
	function getDuojiList(){
		$.ajax({
		  type: 'GET',
		  url: serverAddress+'/utvgoClient/interfaces/content_listContentTvs.action',
		  // data to be added to query string:
		  data: {contentId:contentId},
		  // type of data we are expecting in return:
		  dataType: 'json',
		  success: function(data){
		  	if(data.status!=0){
		  		alert(data.result);
		  		return;
		  	}
			duojiDataList=data.result||[];
		    renderDuojiList(data);

		    
		  },
		  error: function(xhr, type){
		    alert('network error!');
		  }
		});
	}
	function renderDuojiList(data){
		var items=data.result||[];
		var s='';
		for(var i=0,len=items.length;i<len;i++){
			s+='<a data-playurl="'+items[i].playUrl+'" data-img="'+items[i].img+'" title="'+items[i].title+'" class="detail-jiList-item">'+items[i].mediaNum+'</a>';
		}
		$('#duojiListBox').html(s);

		$('.detail-jiList-item').on('tap',function(e){
			var $el=$(this);
			var i=$el.index();
			currentIndex=i;
			var playUrl=$el.attr('data-playurl');
			var title=$el.attr('title');
			var img=$el.attr('data-img');
			setVideoInfo(playUrl,img);
			document.getElementById('videoView').play();
			$('.detail-jiList-item.on').removeClass('on');
			$el.addClass('on');
			$('.video-play-play-icon').hide();
			$('.video-play-img').hide();
		});
		$('.detail-jiList-item').eq(0).addClass('on');
	}
	function playDuojiNext(){
		var len=duojiDataList.length;
		if((currentIndex+1)>=len){
			return;
		}
		$('.detail-jiList-item').eq(++currentIndex).trigger('tap');
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
			s+='<div id="duojiListBox" class="detailTabItemContent detail-jiList clearfix">  </div>';
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
		if(isDuoji){
			getDuojiList();
		}
		getLikeList();
		setVideoIntroduce(localStorage.getItem('videoRemark')||playName);
		document.getElementById('videoView').addEventListener('ended',function(e){
			if(isDuoji){
				playDuojiNext();
			}
		});
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

