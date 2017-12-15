$(function(){
	// articleList页面 ajax数据传输(获取数据库中的数据)
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/getWorksList',
		success:function(response,status,xhr){
			// console.log(response);
			for(var i=0;i<response.length;i++){
				var worksList='<div class="worksWrap">'+
							'<div class="imgWrap">'+
								'<a href="'+response[i].href+'" target="_blank">'+
									'<img src="'+response[i].image_path+'" alt="">'+
								'</a>'+
							'</div>'+
							'<h3>'+
								response[i].title+
							'</h3>'+
						'</div>'
				$('.myworks').append(worksList);
			}
		}
	})	
})

