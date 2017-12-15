$(function(){
	//获取数据
	$.ajax({
		type:'GET',
		dataType:'json',
		data:{id:id},
		url:'/admin/getInfoDetail',
		success:function(response,status,xhr){
			// console.log(response);
			$('.detailTitle').text(response[0].title);
			$('.newTime').text(new Date(response[0].create_time).toLocaleDateString());
			$('.name').text(response[0].create_by);
			$('.detailText').html(response[0].content);
		}
	})	
})
