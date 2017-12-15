	//电子邮箱验证
    function check(){
    		//验证邮箱
            var temp = document.getElementById("user0");
            //验证密码
    		var password0=($('#password0').val());
    		var password1=($('#password1').val());
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!myreg.test(temp.value)){
                $('.tipWraper').css('display','block');
                $('.tipWraper .text').text('请输入有效的E-mail！');
                $('.tipWraper').fadeToggle(2000, function() {
                    
                });
                 // myreg.focus();
                return false;
            }else if(password0.length==0||password1.length==0){
                $('.tipWraper').css('display','block');
                $('.tipWraper .text').text('请输入密码');
                $('.tipWraper').fadeToggle(2000, function() {
                    
                });
            }else if(password0!=password1){
                $('.tipWraper').css('display','block');
                $('.tipWraper .text').text('两次输入的密码不一致');
                $('.tipWraper').fadeToggle(2000, function() {
                    
                });
            }else{
				//后台管理  注册
				$('#register').click(function(){
					$.ajax({
						type:'POST',
						dataType:'json',
						url:'/admin/register',
						data:{user:$('#user0').val(),password:$('#password0').val()},
						error:function(response,status,xhr){
							console.log('出错了')
						},
						success:function(response,status,xhr){
                            rapaidLog();
						}
					})
				})            	
            }
          }
    //注册完直接登录
    function rapaidLog(){
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
    }