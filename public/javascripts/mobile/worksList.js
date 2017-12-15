$(function(){
	// 首页 获取技术文档列表数据
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/getWorksList',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
				var works='<dl onclick="ckzp(\''+response[i].href+'\')">'+
							'<dt>'+
								'<img src="../'+response[i].image_path+'">'+
							'</dt>'+
							'<dd>'+
								'<p class="tit">'+
									response[i].title+
								'</p>'+
							'</dd>'+
						'</dl>'
				$('.worksWrap').append(works);
			}
		}
	})		
})

//跳转详情页面(要放在与加载函数外边)
//技术文档详情
function ckzp(data){
	window.location.href=data;
}