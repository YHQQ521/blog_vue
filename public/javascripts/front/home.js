$(function(){
	// 轮播图上一页下一页效果
	$('#pre').on('mouseover',function(){
		$(this).attr('src','../images/photo/zjt1.png');
	})
	$('#pre').on('mouseout',function(){
		$(this).attr('src','../images/photo/zjt.png');
	})
	$('#next').on('mouseover',function(){
		$(this).attr('src','../images/photo/yjt1.png');
	})
	$('#next').on('mouseout',function(){
		$(this).attr('src','../images/photo/yjt.png');
	})
	// 首页 获取作品轮播图
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/getWorks',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
				var swipe='<li style="display: block;">'+
							'<a href="'+response[i].href+'" target="_blank">'+
							'<img src="'+response[i].image_path+'">'+
							'</a>'
						'</li>'
				$('#ul1').append(swipe);
				var circle='<li>'+'</li>'
				$('#ul2').append(circle);
			}
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
				var article=	'<div class="articleRecomendList">'+
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
				$('.articleRecomend').append(article);
			}
		}
	})	

	// 首页 获取前端资讯列表数据
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/homeInfo',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
						var info='<li onclick="qdzx(\''+response[i].id+'\')">'+
					  					'<img class="zxIcon" src="../images/icon/num'+i+'.svg" alt="">'+
					  					'<div class="zxzx">'+
					  						'<h1>'+
					  							response[i].title+
					  						'</h1>'+
					  						'<p>'+
					  							response[i].brief+
					  						'</p>'+
					  					'</div>'+
					  				'</li>'
				$('.infoListWrap ul').append(info);
			}
		}
	})

	// 首页 获取受欢迎文章列表数据
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/getPopularTechnicalFile',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
						var popular='<li onclick="syhwz(\''+response[i].id+'\')">'+
									'<img src="../images/icon/sort'+i+'.svg" alt="">'+
									'<span>'+
										response[i].title+
									'</span>'+
								'</li>'
				$('.popularFiles').append(popular);
			}
		}
	})			
})
//跳转详情页面(要放在与加载函数外边)
//技术文档详情
function ydqw(data){
	window.location.href="/technicalFileDetail?data="+data;
}
//前端资讯详情
function qdzx(data){
	window.location.href="/infoDetail?data="+data;
}
//受欢迎文章详情详情
function syhwz(data){
	window.location.href="/technicalFileDetail?data="+data;
}
