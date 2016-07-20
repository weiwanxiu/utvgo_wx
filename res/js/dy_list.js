
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
			return;
		}
		$('#listContentBox').append('<div class="nomore">没有更多了!</div>');
	}
});


$('.listTypeSelectedBox').on('tap',function(e){
	$(this).hide();
	$('.listTypeBox.fixed').show();
});

hideLoading();

new Swiper('.listType-type',{
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

new Swiper('.listType-area',{
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

new Swiper('.listType-year',{
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