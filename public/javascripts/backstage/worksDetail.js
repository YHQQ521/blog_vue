$(function(){
  //获取数据
      $.ajax({
        type:'GET',
        dataType:'json',
        data:{data:adId},
        url:'/admin/htgetWorks2',
        success:function(response,status,xhr){
          console.log(response);
          $('#imgSamllSrc').append('<img src="../'+response[0].image_path+'" alt="">');
          $('#adTitle').text(response[0].title);
          $('#summary').text(response[0].href);
        }
      })
    $('.back').click(function(){
        window.close();
    })
})