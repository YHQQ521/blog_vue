  $(function(){
    //点击添加图片触发input file标签
    $('#triggerSwipe').click(function(){
      return $('#addSwipeFile').click();
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