$(function(){
	//搜索框获得焦点和失去焦点事件
	$('#searchText').focus(function(){
		if(this.value == this.defaultValue){
			$(this).val('');
		}
	}).blur(function(){
		if(this.value == ''){
			$(this).val(this.defaultValue);
		}
	});

	//网页换肤效果
	$('#skin li').click(function(){
		$(this).addClass('selected')
			   .siblings().removeClass('selected');
		$('#cssFile').attr('href', 'styles/'+ this.id + '.css');
	});

	//导航区鼠标移动显示隐藏效果
	$('.nav li').hover(function(){
		$(this).find('.jnNav').show();//find()方法是查找此元素中满足条件的子元素
	}, function(){
		$(this).find('.jnNav').hide();
	});

	//左侧hot点提示
	$('#jnCategory a.prompted').append('<s class="chos"></s>');//增加的这个节点元素不能使块状元素

	//中间大屏广告轮播效果
	var $aScroll = $('#jnImgScroll div a');
	var len = $aScroll.length;
	var index = 0;
	var timer = null;

	$aScroll.css('opacity', 0.7);
	$aScroll.mouseover(function(){
		index = $(this).index();
		showImg(index);
	}).eq(0).mouseover();

	//鼠标滑入停止轮播器鼠标滑出开始轮播器
	$('#jnImgScroll').hover(function(){
		clearInterval(timer);
	}, function(){
		timer = setInterval(function(){
			showImg(index);
			index++;
			if( index == len){ index = 0;}
		}, 3000);
	}).trigger('mouseleave');//trigger()方法表示的是为元素触发指定事件


	//最新动态提示效果
	var x = 10, y = 20;
	$('#jnNotice li a').mouseover(function(evt){
		var event = evt || window.event;
		this.myTitle = this.title;
		this.title = '';
		$('body').append('<div id="toolTip">'+ this.myTitle +'</div>');
		$('#toolTip').css({
			'top' : event.pageY + y + 'px',
			'left' : event.pageX + x + 'px'
		}).show('fast');
	}).mouseout(function(){
		$('#toolTip').remove();
		this.title = this.myTitle;
	}).mousemove(function(event){
		$('#toolTip').css({
			'top' : event.pageY + y + 'px',
			'left' : event.pageX + x + 'px'
		});
	});


	//品牌活动滑动效果
	var $aBrand = $('#jnBrandTab a');
	var $jnBrand = $('#jnBrandContent');
	var wid = $jnBrand.width();
	$('.jnBrandList').width($aBrand.length * wid);

	$aBrand.click(function(){
		var index = $aBrand.index(this);
		$(this).parent().addClass('choice')
					    .siblings().removeClass('choice');
		$('.jnBrandList').animate({left : -index*wid}, 1000);//animate()表示的自定义动画

		//取消a超链接浏览器默认行为
		return false;
	});
});

function showImg(index){
	var $scrollLists = $('#jnImgScroll div a');
	var $scrollImgs = $('.jnImgScroll img');
	$scrollLists.eq(index).addClass('chos').css('opacity', 1)
						  .siblings().removeClass('chos').css('opacity', 0.7);
	$scrollImgs.eq(index).stop(true, true).fadeIn()//stop(true,true)表示的是停止指定元素正在运行的动画
						 .siblings().fadeOut();
}
