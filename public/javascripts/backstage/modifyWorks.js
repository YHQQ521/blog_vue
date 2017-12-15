$(function(){
	//点击添加图片触发input file标签
    $('#triggerSwipe').click(function(){
      return $('#addSwipeFile').click();
    })

	$.ajax({
		type:'GET',
		dataType:'json',
		data:{data:worksId},
		url:'/admin/htgetWorks2',
		success:function(res,status,xhr){
			// console.log(res);
			$('#IDName').val(res[0].id);
			$('#worksTitle').val(res[0].title);
			$('#worksHref').val(res[0].href.slice(7));
	      //获取缩略图
      	  $('#addSwipeImgWrap').css('border','none');
          $('#addSwipeImgWrap').empty().append('<img src="../'+res[0].image_path+'">'); 
          $('#addSwipeImgHidden').val(res[0].image_path);  
		},
		error:function(err,status,xhr){
			console.log(err);
		}
	})
})
  //保存完图片立即上传到服务器文件夹（上传缩略图）
  function uploadSwipeImg(obj, type) {  
      $.ajaxFileUpload({  
          url : "/admin/imgUploadSaveSrc",  
          secureuri : false,
          fileElementId : "addSwipeFile",   
          dataType : 'json', 
          data: {'type': type, "type2":2},  
          type:'post',
          success : function(data){ 
          // console.log(data);
          $('#addSwipeImgWrap').css('border','none');
          $('#addSwipeImgWrap').empty().append('<img src="../'+data+'">'); 
          $('#addSwipeImgHidden').val(data);
          },  
          error : function(data){          
            console.log(data);  
          }  
      });  
      return false;  
  }
  //form表单只提交一次
  var checkSubmitFlg = false; 
  function checkSubmit(){ 
    if(checkSubmitFlg ==true){ 
      return false;
    } 
    checkSubmitFlg ==true; 
    return true; 
  } 