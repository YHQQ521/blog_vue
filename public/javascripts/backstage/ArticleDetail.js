$(function(){
	  //获取数据
      $.ajax({
        type:'GET',
        dataType:'json',
        data:{data:ArticleId},
        url:'/admin/htgetArticle2',
        success:function(response,status,xhr){
          // console.log(response);
          $('#imgSamllSrc').append('<img src="../'+response[0].cover_image_path+'" alt="">');
          $('#selectedArticleType').text(response[0].article_type_title);
          $('#adTitle').text(response[0].article_title);
          $('#summary').text(response[0].article_brief);
          $('#selectedName').text(response[0].class_name);
          $('#adDescription').html(response[0].article_content);
          $('#zanTotal').text(response[0].article_zan);
        }
      })
    $('.back').click(function(){
        window.close();
    })
})