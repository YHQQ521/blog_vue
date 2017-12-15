$(function(){
  //获取轮播图
  $.ajax({
    type:'GET',
    dataType:'json',
    url:'/admin/htgetWorks',
    success:function(response,status,xhr){
      for(var i=0;i<response.length;i++){
          var swipeItem='<tr id="'+response[i].id+'">'+
                          '<td>'+(i+1)+'</td>'+  
                          '<td>'+
                            '<img src="../'+response[i].image_path+'" alt="" width="120" height="50" />'+
                          '</td>'+     
                          '<td class="fsColor pointer" onclick="showDetail(\''+response[i].id+'\')">'+
                              response[i].title+
                          '</td>'+
                          '<td>'+
                            new Date(response[i].create_time).toLocaleDateString()+
                          '</td>'+
                          '<td class="swipeline">'+
                            '<div class="button-group">'+
                              '<a class="button border-main" href="#add" onclick="modify(\''+response[i].id+'\')">'+
                                  '<span class="icon-edit">'+
                                    '</span>'+ '修改' +
                              '</a>'+
                              '<a class="button border-red" href="javascript:void(0)" onclick="del(\''+response[i].id+'\',this)">'+
                                '<span class="icon-trash-o"></span>'+ 
                                '删除'
                               '</a>'+
                            '</div>'+
                          '+</td>'+
                        '</tr>' 
        $('#swipeTable').append(swipeItem);
      }
    }
  })

})  
//删除我的作品(要放在$(function(){})的外面)
  function del(data1,data2){
      window.top.$('.delTipWraper').css('display','block'); 
      window.top.$('#delConfirm').one('click',function(){
         window.top.$('.delTipWraper').css('display','none');
        //删除标签
        data2.parentNode.parentNode.parentNode.remove();
        $.ajax({
          type:'GET',
          url:'/admin/deleteSwipe',
          data:{id:data1},
          dataType:'json',
          success:function(response,status,xhr){

          }
        })
      }) 
      window.top.$('#delCancel,#delClose').one('click',function(){
        window.top.$('.delTipWraper').css('display','none');
      })  
  }

//点击修改按钮(新增modifyAdContent页面重新插入数据)
  function modify(data){
    window.location.href="/admin/modifyWorks?data="+data
  }
//点击标题查看详情(新增detail页面)
  function showDetail(data){
    window.open("/admin/worksDetail?data="+data)
  }