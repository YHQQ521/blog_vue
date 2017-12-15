$(function(){
	//后台管理  登录
	$('#login').click(function(){
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/admin/login',
			data:{user:$('#user0').val(),password:$('#password0').val()},
			error:function(response,status,xhr){
				console.log('出错了')
			},
			success:function(response,status,xhr){
				if(response==0){
	                $('.tipWraper').css('display','block');
	                $('.tipWraper .text').text('用户名不存在');
	                $('.tipWraper').fadeToggle(2000, function() {
	                    
	                });
				}else if(response==2){
	                $('.tipWraper').css('display','block');
	                $('.tipWraper .text').text('密码错误');
	                $('.tipWraper').fadeToggle(2000, function() {
	                    
	                });
				}else{
					window.location.href="/admin/index"
				}
			}
		})
	})
	//首页菜单效果
	  $(".leftnav h2").click(function(){
		  $(this).next().slideToggle(200);	
		  $(this).toggleClass("on"); 
	  })
	  $(".leftnav ul li a").click(function(){
		    $("#a_leader_txt").text($(this).text());
	  		$(".leftnav ul li a").removeClass("on");
			  $(this).addClass("on");
	  })
})
