$(function(){
	// message页面 ajax数据传输(获取数据库中的数据)
	$.ajax({
		type:'GET',
		dataType:'json',
		url:'/admin/MessageTitle',
		success:function(response,status,xhr){
			console.log(response);
			for(var i=0;i<response.length;i++){
				var ma='<li>'+
							'<img src="'+response[i].portrait+'" alt="">'+
							'<p class="messageText">'+
								'<span class="messageName">'+response[i].visitor+'</span>'+
								'<span class="messageInfo">'+response[i].comment+'</span>'+
								'<span class="messageTime">'+response[i].time+'</span>'+
								'<span class="zan">'+'顶'+'<span class="zanNum">'+response[i].zan+'</span>'+'</span>'+
							'</p>'+
						'</li>';
				$('#message').prepend(ma);
			}
		}
	})	
})
