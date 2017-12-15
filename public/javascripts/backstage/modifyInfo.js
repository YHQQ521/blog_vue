$(function(){
	//点击添加图片触发input file标签
	$('#triggerSmall').click(function(){
		return $('#addsmallImgFile').click();
	})
  	//获取数据
	$.ajax({
	    type:'GET',
	    dataType:'json',
	    data:{data:adId},
	    url:'/admin/htgetInfo2',
	    success:function(response,status,xhr){
	      console.log(response);
	      $('#IDName').val(adId);
	      $('#adTitle').val(response[0].title);
	      //获取文章摘要
	      $('#summary').val(response[0].brief);	
	      //获取编辑器内容
			UE.getEditor('editor').ready(function() {
			    		ue.setContent("");  //清空编辑器中的内容
			        	ue.setContent(response[0].content);  //赋值给UEditor
			      	});
			$('#editorValue').val(response[0].content);
	      //获取缩略图
      	  $('#addSmallImgWrap').css('border','none');
          $('#addSmallImgWrap').empty().append('<img src="../'+response[0].cover_photo+'">'); 
          $('#addsmallImgHidden').val(response[0].cover_photo);     
	    }
	})
})

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
	if($('#addsmallImgHidden').val()==''){
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