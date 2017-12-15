$(function(){
	//获取数据
	$.ajax({
		type:'GET',
		dataType:'json',
		data:{id:id},
		url:'/admin/getInfoDetail',
		success:function(response,status,xhr){
			// console.log(response);
			$('.title').text(response[0].title);
			$('.timeNum').text(new Date(response[0].create_time).toLocaleDateString());
			$('.author').text(response[0].create_by);
			$('.content').html(response[0].content);
		}
	})	
})