$(function(){
	//首页登录 ajax将输入数据与数据库中数据比对
	$('#logIn').click(function(){
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/admin/logIn',
			data:{user:$('#user0').val(),password:$('#password0').val()},
			error:function(response,status,xhr){
				console.log('出错了');
			},
			success:function(response,status,xhr){
				if(response==0){
					alert('用户名不存在');
				}else if(response==2){
					alert('密码错误');
				}else{
					alert('登录成功');
					$('#syLog').css('display','none');
					$('#log').css('display','none');
					$('#name').css('display','block');
					$('#name').text(response.user);
				}
			},
		})
	}) 
	//首页注册 ajax将数据插入数据库
	$('#register2').click(function(){
		$.ajax({
			type:'GET',
			dataType:'json',
			url:'/admin/register',
			data:{user:$('#user').val(),password:$('#password').val()},
			success:function(response,status,xhr){
				console.log('插入成功');
			}
		})
	}) 
	// //首页点击登录的事件
	// $('#log').click(function(){
	// 	$('#syLog').css('display','block');
	// })
	// if($('#syLog').css('display')=='block'){
	// 	$('body').height($(window).height()).css('overflow-y','hidden');	
	// }else{
	// 	$('body').height($(window).height()).css('overflow-y','auto');		
	// }
	// $('#close').click(function(){
	// 	$('#syLog').css('display','none');
	// })
	// //首页点击注册的事件
	// $('#register').click(function(){
	// 	$('#syLog').css('display','none');
	// 	$('#syRegister').css('display','block');
	// })
	// $('#close2').click(function(){
	// 	$('#syRegister').css('display','none');
	// })
	//导航效果
	$('.navWrap li').mouseover(function(){
		$(this).addClass('cartoon');
		$(this).children('a').css('color','#fff');
	})
	$('.navWrap li').mouseout(function(){
		$(this).removeClass('cartoon');
		$(this).children('a').css('color','#000');
	})

	//当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(window).scroll(function(){
        if ($(window).scrollTop()>10){
            $(".upArrow").fadeIn(1500);
        }
        else
        {
            $(".upArrow").fadeOut(1500);
        }
    });
	//点击向上箭头、qq、微信事件
	$('.upArrow').click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
	})
	$('.weChat').on('mouseover',function(){
		$('.weChatTwoCode').css('display','block');
	})
	$('.weChat').on('mouseout',function(){
		$('.weChatTwoCode').css('display','none');
	})

})
