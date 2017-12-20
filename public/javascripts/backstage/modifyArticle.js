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
                var articleTypeItem='<label class="classItem arType" for="arType'+i+'">'+
                				'<input id="arType'+i+'" type="radio" value="'+response[i].article_type+'" onclick="getArticleTypeValue(this)" name="articleType">'+
                					response[i].article_type_title+
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
            for(var i=0;i<response.length;i++){
                var classItem='<label class="classItem techClass" for="class'+i+'">'+
                				'<input class="selectClass" id="class'+i+'" type="radio" name="articleClass" value="'+response[i].class_code+'" onclick="getValue(this)">'+
                					response[i].class_name+
                				'</label>' 
                $('#getClass').append(classItem);
              }                       
          }
    })
  	//获取数据
	$.ajax({
	    type:'GET',
	    dataType:'json',
	    data:{data:ArticleId},
	    url:'/admin/htgetArticle2',
	    success:function(response,status,xhr){
	      // console.log(response);
	      //选中文章类型 
	      for(var i=0;i<$('.arType').length;i++){
	      	if($('.arType').eq(i).children('input').val()==response[0].article_type){
	      		$('.arType').eq(i).children('input').attr('checked',true);
	      	}
	      }
	      $('#IDName').val(ArticleId);
	      $('#adTitle').val(response[0].article_title);
	      $('#selectedNameHidden').val(response[0].class_code);
	      //选中技术文章所属分类
	      for(var i=0;i<$('.techClass').length;i++){
	      	if($('.techClass').eq(i).children('input').val()==response[0].class_code){
	      		$('.techClass').eq(i).children('input').attr('checked',true);
	      	}
	      }
	      //获取文章摘要
	      $('#summary').val(response[0].article_brief);	
	      //获取编辑器内容
			UE.getEditor('editor').ready(function() {
			    		ue.setContent("");  //清空编辑器中的内容
			        	ue.setContent(response[0].article_content);  //赋值给UEditor
			      	});
			$('#editorValue').val(response[0].article_content);
	      //获取缩略图
      	  $('#addSmallImgWrap').css('border','none');
          $('#addSmallImgWrap').empty().append('<img src="../'+response[0].cover_image_path+'">'); 
          $('#addsmallImgHidden').val(response[0].cover_image_path);     
	    }
	})
})

	//文章类型值赋给隐藏域
	function getArticleTypeValue(data){
		$('#articleTypeHidden').val(data.value)
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