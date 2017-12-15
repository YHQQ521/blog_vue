$(function(){
	//点击添加图片触发input file标签
	$('#triggerSmall').click(function(){
		return $('#addsmallImgFile').click();
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