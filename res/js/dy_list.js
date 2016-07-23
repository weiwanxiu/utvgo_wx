
$('.list-page-main').on('scroll',function(e){
	var $el=$(this),top=$el.scrollTop(),wh=$el.height();
	//var contentH=$(this).scrollTop()+$(this).height()-46;
	//console.log($(this).scrollTop()+'||'+$('#listContent').height()+'||'+contentH);
	//$('.topNav-title').html($(this).scrollTop()+'||'+$('#listContent').height()+'||'+contentH);

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
		if(ajaxMore){
			return;
		}
		//加在更多
		if($('.nomore').length>0){
			$('.nomore').show().html('正在加载...');
			return;
		}else{
			$('#listContent').append('<div class="nomore">正在加载...</div>');
		}
		getNewData('more');
		//$('#listContentBox').append('<div class="nomore">没有更多了!</div>');
	}
});
var ajaxMore=null;

$('.listTypeSelectedBox').on('tap',function(e){
	e.stopPropagation();
	e.preventDefault();
	e.stopImmediatePropagation();
	$(this).hide();
	$('.listTypeBox.fixed').show();
	updateListTypeFixedSwiper();
});

var channelId,pageNo,typeId,areaId,yearId,pageSize;
var urlParaObj=getUrlPara();
channelId=urlParaObj.channelId;
pageNo=1;
typeId=0;
areaId=0;
yearId=0;
pageSize=10;

function getTypeData(){
	$.ajax({
	  type: 'GET',
	  url: serverAddress+'/utvgoClient/interfaces/hdtvContent_typeContext.action',
	  // data to be added to query string:
	  data: {channelId:channelId,pageSize:pageSize,pageNo:pageNo,publishYear:yearId,typeId:typeId,areaId:areaId},
	  // type of data we are expecting in return:
	  dataType: 'json',
	  success: function(data){
	  	hideLoading();
	    renderTypeData(data);
		  //renderListData(data.result.hotDys,'new');
		  getNewData('new');
	  },
	  error: function(xhr, type){
	    alert('network error!');
	  }
	});
}
getTypeData();

function renderTypeData(data){
	var s='',items=[],i= 0,len= 0,text='',on='';
	//type
	s+='<div id="listType-type" class="listType-row listType-type swiper-container"><div class="swiper-wrapper">';
	items=data.result.dyTypes||[];
	i=0;
	len=items.length;
	for(;i<len;i++){
		text=items[i].typeName;
		if(text=='全部类型'){
			on='on';
		}else{
			on='';
		}
		s+='<div class="swiper-slide listType-item '+on+'" data-id="'+items[i].typeId+'"><div class="listType-item-text">'+text+'</div></div>';
	}
	s+='</div></div>';

	//area
	s+='<div id="listType-area" class="listType-row listType-area swiper-container"><div class="swiper-wrapper">';
	items=data.result.areaList||[];
	i=0;
	len=items.length;
	for(;i<len;i++){
		text=items[i].areaName;
		if(text=='全部类型'||text=='全部地区'){
			text='全部地区'
			on='on';
		}else{
			on='';
		}
		s+='<div class="swiper-slide listType-item '+on+'" data-id="'+items[i].areaId+'"><div class="listType-item-text">'+text+'</div></div>';
	}
	s+='</div></div>';


	//year
	s+='<div id="listType-year" class="listType-row listType-year swiper-container"><div class="swiper-wrapper">';
	items=data.result.publishYears||[];
	i=0;
	len=items.length;
	for(;i<len;i++) {
		text = items[i];
		if (text == 0) {
			text = '全部年份'
			on = 'on';
		} else {
			on = '';
		}
		s += '<div class="swiper-slide listType-item ' + on + '" data-id="' + items[i] + '"><div class="listType-item-text">' + text + '</div></div>';
	}
	s+='</div></div>';

	$('#listTypeBox').html(s);

	s= s.replace('id="listType-type"','id="listType-type-fixed"');
	s= s.replace('id="listType-area"','id="listType-area-fixed"');
	s= s.replace('id="listType-year"','id="listType-year-fixed"');
	$('#listTypeBoxFixed').html(s);

	initListTypeSwiper();
}

function initListTypeEvent(){
	$('.listType-type .listType-item').on('tap',function(e){
		typeId=$(this).attr('data-id');
		$('.listType-type .listType-item.on').removeClass('on');
		$(this).addClass('on');
		getNewData('new');
	});
	$('.listType-area .listType-item').on('tap',function(e){
		areaId=$(this).attr('data-id');
		$('.listType-area .listType-item.on').removeClass('on');
		$(this).addClass('on');
		getNewData('new');
	});
	$('.listType-year .listType-item').on('tap',function(e){
		yearId=$(this).attr('data-id');
		$('.listType-year .listType-item.on').removeClass('on');
		$(this).addClass('on');
		getNewData('new');
	});

}
function getNewData(action){
	var action=action||'new';
	if(action=='new'){
		pageNo=1;
	}else{
		pageNo++;
	}
	showLoading();
	ajaxMore=$.ajax({
		type: 'GET',
		url: serverAddress+'/utvgoClient/interfaces/hdtvContent_listChannelData.action',
		// data to be added to query string:
		data: {channelId:channelId,pageSize:pageSize,pageNo:pageNo,publishYear:yearId,typeId:typeId,areaId:areaId},
		// type of data we are expecting in return:
		dataType: 'json',
		success: function(data){
			ajaxMore=null;
			hideLoading();
			renderListData(data.result,action);
		},
		error: function(xhr, type){
			ajaxMore=null;
			alert('network error!');
		}
	});
}


function renderListData(data,action){
	var s='';
	for(var i= 0,len=data.length;i<len;i++){
		s+='<div class="rmdy-item"><a href="dyDetail.html?contentId='+data[i].id+'&type='+(data[i].type||'dy')+'" class="rmdy-item-link"><img src="'+data[i].img+'" /><p class="rdzx-text ellipsis">'+data[i].name+'</p></a></div>';
	}

	if(!!!action||action=='new'){
		$('#listContentBox').html(s);
	}else{
		$('#listContentBox').append(s);
	}
	//加载到内容了
	$('.nomore').hide();
	//没有内容了
	if(data.length<pageSize){
		$('.nomore').show().html('没有更多了!');

	}
}
function updateListTypeFixedSwiper(){
	// listTypeType.reInit();
	// listTypeArea.reInit();
	// listTypeYear.reInit();

	listTypeTypeFixed.reInit();
	listTypeAreaFixed.reInit();
	listTypeYearFixed.reInit();
}
var listTypeType,listTypeArea,listTypeYear,listTypeTypeFixed,listTypeAreaFixed,listTypeYearFixed;
function initListTypeSwiper() {
	listTypeType = new Swiper('#listType-type', {
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

	listTypeArea = new Swiper('#listType-area', {
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

	listTypeYear = new Swiper('#listType-year', {
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
	listTypeTypeFixed = new Swiper('#listType-type-fixed', {
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

	listTypeAreaFixed = new Swiper('#listType-area-fixed', {
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
	listTypeYearFixed = new Swiper('#listType-year-fixed', {
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
}