$(function(){
	// 首页 获取技术文档列表数据
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/getLifeList',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
				var article='<dl  onclick="ydqw(\''+response[i].id+'\')">'+
								'<dt>'+
									'<img src="../'+response[i].cover_photo+'">'+
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
//生活感悟详情页
function ydqw(data){
	window.location.href="/mFront/lifeDetail?data="+data;
}