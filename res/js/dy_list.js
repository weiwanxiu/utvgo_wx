
$('.list-page-main').on('scroll',function(e){
	var $el=$(this),top=$el.scrollTop(),wh=$el.height();
	var contentH=$(this).scrollTop()+$(this).height()-46;
	//console.log($(this).scrollTop()+'||'+$('#listContent').height()+'||'+contentH);
	$('.topNav-title').html($(this).scrollTop()+'||'+$('#listContent').height()+'||'+contentH);

	//即将滚到顶部了
	if(top<=136){
		//显示相对定位 类型，隐藏已选类型,隐藏固定定位
		$('.listTypeBox').show();
		$('.listTypeBox.fixed').hide();
		$('.listTypeSelectedBox').hide();
	}else{
		//隐藏固定定位 类型，显示已选类型
		$('.listTypeBox').hide();
		$('.listTypeSelectedBox').show();
	}
	//即将到底部了
	if((top+wh-46+5)>=$('#listContent').height()){
		//加在更多
		if($('.nomore').length>0){
			$('.nomore').show().html('正在加载...');
			return;
		}else{
			$('#listContentBox').append('<div class="nomore">正在加载...</div>');
		}
		getMoreData();
		//$('#listContentBox').append('<div class="nomore">没有更多了!</div>');
	}
});


$('.listTypeSelectedBox').on('tap',function(e){
	$(this).hide();
	$('.listTypeBox.fixed').show();
	updateListTypeFixedSwiper();
});

var channelId,pageNo;
var urlParaObj=getUrlPara();
channelId=urlParaObj.channelId;
pageNo=1;



function getTypeData(){
	$.ajax({
	  type: 'GET',
	  url: serverAddress+'/utvgoClient/interfaces/hdtvContent_typeContext.action',
	  // data to be added to query string:
	  data: {channelId:channelId,pageSize:10,pageNo:pageNo,publishYear:'',typeId:'',areaId:''},
	  // type of data we are expecting in return:
	  dataType: 'json',
	  success: function(data){
	  	hideLoading();
	    renderTypeData(data);
	  },
	  error: function(xhr, type){
	    alert('network error!');
	  }
	});
}
function renderTypeData(data){
	var s='';
	//type
	s+='<div id="listType-type" class="listType-row listType-type swiper-container"><div class="swiper-wrapper">';

	s+='</div></div>';

	//area
	s+='<div id="listType-area" class="listType-row listType-area swiper-container"><div class="swiper-wrapper">';

	s+='</div></div>';


	//year
	s+='<div id="listType-year" class="listType-row listType-year swiper-container"><div class="swiper-wrapper">';

	s+='</div></div>';

	$('.listTypeBox').html(s);
	
}

function getMoreData(){

	//加载到内容了
	//$('.nomore').hide();

	//没有内容了
	//$('.nomore').show().html('没有更多了!');
}

function updateListTypeFixedSwiper(){
	// listTypeType.reInit();
	// listTypeArea.reInit();
	// listTypeYear.reInit();

	listTypeTypeFixed.reInit();
	listTypeAreaFixed.reInit();
	listTypeYearFixed.reInit();
}

var listTypeType=new Swiper('#listType-type',{
	//pagination: '#slideTopBannerIndicator',
	paginationClickable: true,
	//slidesPerView: 1,
	slidesPerView: 'auto',
	freeMode: true
	//loop: true,
	//autoplay:8000,
	//onFirstInit:bannerPageChangeTips,
	//onSlideChangeEnd:bannerPageChangeTips
});

var listTypeArea=new Swiper('#listType-area',{
	//pagination: '#slideTopBannerIndicator',
	paginationClickable: true,
	//slidesPerView: 1,
	slidesPerView: 'auto',
	freeMode: true
	//loop: true,
	//autoplay:8000,
	//onFirstInit:bannerPageChangeTips,
	//onSlideChangeEnd:bannerPageChangeTips
});

var listTypeYear=new Swiper('#listType-year',{
	//pagination: '#slideTopBannerIndicator',
	paginationClickable: true,
	//slidesPerView: 1,
	slidesPerView: 'auto',
	freeMode: true
	//loop: true,
	//autoplay:8000,
	//onFirstInit:bannerPageChangeTips,
	//onSlideChangeEnd:bannerPageChangeTips
});
var listTypeTypeFixed=new Swiper('#listType-type-fixed',{
	//pagination: '#slideTopBannerIndicator',
	paginationClickable: true,
	//slidesPerView: 1,
	slidesPerView: 'auto',
	freeMode: true
	//loop: true,
	//autoplay:8000,
	//onFirstInit:bannerPageChangeTips,
	//onSlideChangeEnd:bannerPageChangeTips
});

var listTypeAreaFixed=new Swiper('#listType-area-fixed',{
	//pagination: '#slideTopBannerIndicator',
	paginationClickable: true,
	//slidesPerView: 1,
	slidesPerView: 'auto',
	freeMode: true
	//loop: true,
	//autoplay:8000,
	//onFirstInit:bannerPageChangeTips,
	//onSlideChangeEnd:bannerPageChangeTips
});

var listTypeYearFixed=new Swiper('#listType-year-fixed',{
	//pagination: '#slideTopBannerIndicator',
	paginationClickable: true,
	//slidesPerView: 1,
	slidesPerView: 'auto',
	freeMode: true
	//loop: true,
	//autoplay:8000,
	//onFirstInit:bannerPageChangeTips,
	//onSlideChangeEnd:bannerPageChangeTips
});