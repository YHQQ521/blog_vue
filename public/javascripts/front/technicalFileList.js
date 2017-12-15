$(function(){
	// articleList页面 ajax数据传输(获取数据库中的数据)
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/getTechnicalFileList',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
				var ma=	'<div class="articalListNew">'+
			'<h3 class="articleTitle">'+response[i].title+'</h3>'+
			'<div class="content">'+
				'<img src="'+response[i].cover_photo+'" alt="">'+
				'<p class="textInfo">'+response[i].brief+'</p>'+
				'<p class="ydqw" onclick="ydqw(\''+response[i].id+'\')">阅读全文>></p>'+
			'</div>'+
			'<div class="markInfo">'+
				'<span class="time">'+new Date(response[i].create_time).toLocaleDateString()+'</span>'+
				'<span>作者:<span class="name">'+response[i].create_by+'</span></span>'+
			'</div>'+
		'</div>';
				$('.articleListWrap').append(ma);
			}
		}
	})	
})
//跳转详情页面(要放在与加载函数外边)
function ydqw(data){
	window.location.href="/technicalFileDetail?data="+data;
}
