$(function(){
	// 首页 获取作品轮播图
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/getWorks',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
				var swipe='<div class="swiper-slide">'+
							'<a href="'+response[i].href+'" target="_blank">'+
								'<img src="'+response[i].image_path+'">'+
							'</a>'+
						'</div>'
				$('.swiper-wrapper').append(swipe);
			}
			//控制图片高度
			var w=$('.ItemDetailsPhoto_home').width();
			var h=w/2;
			$('.ItemDetailsPhoto_home').css('height',h);
			//初始化轮播图
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 2000,//可选选项，自动滑动
			    loop: true,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			})	
		}
	})	

	// 首页 获取技术文档列表数据
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/homeTechnicalFile',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
				var article='<dl  onclick="ydqw(\''+response[i].id+'\')">'+
								'<dt>'+
									'<img src="'+response[i].cover_photo+'">'+
								'</dt>'+
								'<dd>'+
									'<p class="tit">'+
										response[i].title+
									'</p>'+
									'<p class="fileBrief">'+
										response[i].brief+
									'</p>'+
								'</dd>'+
							'</dl>'
				$('.ItemDetailsPhoto_home2').append(article);
			}
		}
	})	
})

//跳转详情页面(要放在与加载函数外边)
//技术文档详情
function ydqw(data){
	window.location.href="/mFront/technicalFileDetail?data="+data;
}