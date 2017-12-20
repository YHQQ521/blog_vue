$(function(){
	//点击添加图片触发input file标签
	$('#triggerSmall').click(function(){
		return $('#addsmallImgFile').click();
	})
	//获取文章类型
    $.ajax({
      type:'GET',
      dataType:'json',
      url:'/admin/getArticleType',
      success:function(response,status,xhr){
            for(var i=0;i<response.length;i++){
                var articleTypeItem='<label class="classItem" for="arType'+i+'">'+
                				'<input id="arType'+i+'" type="radio" value="'+response[i].menu_type+'" onclick="getArticleTypeValue(this)" name="articleType">'+
                					response[i].menu_type_title+
                				'</label>' 
                $('#getArticleType').append(articleTypeItem);
              }                       
          }
    })
	//获取技术文章分类
  $.ajax({
    type:'GET',
    dataType:'json',
    url:'/admin/getTechnicalClass',
    success:function(response,status,xhr){
    	console.log(response)
          for(var i=0;i<response.length;i++){
              var classItem='<label class="classItem" for="class'+i+'">'+
              				'<input id="class'+i+'" type="radio" name="articleClass" value="'+response[i].menu_type+'" onclick="getValue(this)">'+
              					response[i].menu_type_title+
              				'</label>' 
              $('#getClass').append(classItem);
            }                       
        }
  })
})
	//文章类型值赋给隐藏域
	function getArticleTypeValue(data){
		$('#articleTypeHidden').val(data.value);
		if(data.value!=='technical'){
			$('.hideTechClass').css('display','none')
			//清空技术文章分类隐藏域的值
			$('#selectedNameHidden').val('')
			//清楚选中技术文章分类
			$('#getClass .classItem input').attr('checked',false)
		}else{
			$('.hideTechClass').css('display','block')
		}
	}
	//分类值赋给隐藏域
	function getValue(data){
		$('#selectedNameHidden').val(data.value)
	}
	//保存完图片立即上传到服务器文件夹（上传缩略图）
	function uploadSmallImg(obj, type) {  
	    $.ajaxFileUpload({  
	        url : "/admin/imgUploadSaveSrc",  
	        secureuri : false,
	        fileElementId : "addsmallImgFile",   
	        dataType : 'json', 
	        data: {'type': type, "type2":2},  
	        type:'post',
	        success : function(data){ 
	        // console.log(data);
	        $('#addSmallImgWrap').css('border','none');
	        $('#addSmallImgWrap').empty().append('<img src="../'+data+'">'); 
	        $('#addsmallImgHidden').val(data);
	        },  
	        error : function(data){          
	          console.log(data);  
	        }  
	    });  
	    return false;  
	}

  	//文章摘要超出字数提示
  	function characterCountBeyond(){
  		var summary=$('#summary').val().length;
  		if(summary>200){
  			var num=$('#summary').val().substr(0,200);
  			$('#summary').val(num);
		    return false;  			
  		}else{
  			var remainWords=200-summary;
  			$('#remainWords').text('还可以输入'+remainWords+'个字');
  			return true;
  		}
  	}
  	//提交前验证
    function checkaddContent(){
	if($('#selectedNameHidden').val()==''){
        window.top.$('.tipWraper').css('display','block');
        window.top.$('.tipWraper .text').text('请选择分类');
        window.top.$('.tipWraper').fadeToggle(2000, function() {
            
        });
	    return false;	   
	  }else if($('#addsmallImgHidden').val()==''){
        window.top.$('.tipWraper').css('display','block');
        window.top.$('.tipWraper .text').text('请上传缩略图');
        window.top.$('.tipWraper').fadeToggle(2000, function() {
            
        });
	    return false;
	  }else if($('#summary').val()==''){
        window.top.$('.tipWraper').css('display','block');
        window.top.$('.tipWraper .text').text('请填写文章摘要');
        window.top.$('.tipWraper').fadeToggle(2000, function() {
            
        });
	    return false;
	  }else{
		  //form表单只提交一次
		  var checkSubmitFlg = false; 
		  function checkSubmit(){ 
		    if(checkSubmitFlg ==true){ 
		      return false;
		    } 
		    checkSubmitFlg ==true; 
		    return true; 
		  } 
		  checkSubmit();
	  	 return true;
	  }
    }