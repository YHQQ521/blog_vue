//获取文章内容
  $(function(){
    $('#tabChange li').on('click',function(){
      $(this).addClass('tabActive').siblings().removeClass('tabActive')
    })
      //获取文章内容
      $.ajax({
        type:'GET',
        dataType:'json',
        data:{logUser:userInfo},
        url:'/admin/htgetArticle',
        success:function(response,status,xhr){
          // console.log(response)
          for(var i=0;i<response.length;i++){
            var htArticleList='<tr>'+
                              '<td style="padding-left:20px;">'+
                                     (i+1)+
                               '</td>'+
                              '<td width="10%"><img src="../'+response[i].cover_image_path+'" alt="" width="70" height="50" />'+
                              '</td>'+
                              '<td class="fsColor pointer" onclick="showDetail(\''+response[i].article_id+'\')">'+
                                  response[i].article_title+
                              '</td>'+
                              '<td>'+
                                new Date(response[i].create_time).toLocaleDateString()+
                              '</td>'+
                              '<td>'+
                                '<div class="button-group">'+
                                    '<a class="button border-main" href="#add" onclick="modify(\''+response[i].article_id+'\')">'+
                                        '<span class="icon-edit">'+
                                          '</span>'+ '修改' +
                                    '</a>'+
                                    '<a class="button border-red" href="javascript:void(0)" onclick="del(\''+response[i].article_id+'\',this)">'+
                                      '<span class="icon-trash-o">'+
                                      '</span>'+ '删除'+
                                    '</a>'+ 
                                '</div>'+
                              '</td>'+
                            '</tr>'
            $('#htArticleList').append(htArticleList);
          }
        }
      })
  })

//点击删除按钮
  function del(id,data){
      window.top.$('.delTipWraper').css('display','block'); 
      window.top.$('#delConfirm').one('click',function(){
         window.top.$('.delTipWraper').css('display','none');
        //删除标签
        data.parentNode.parentNode.parentNode.remove();
        //从数据库中删除数据
        $.ajax({
          type:'GET',
          dataType:'json',
          data:{data:id},
          url:'/admin/deleteArticle',
          success:function(response,status,xhr){
            console.log('success');
          },
          error:function(err,status,xhr){
            console.log(err)
          }
        })
      }) 
      window.top.$('#delCancel,#delClose').one('click',function(){
        window.top.$('.delTipWraper').css('display','none');
      })  
  }
//点击修改按钮(新增modifyAdContent页面重新插入数据)
  function modify(data){
    window.location.href="/admin/modifyArticle?data="+data
  }
//点击标题查看详情(新增detail页面)
  function showDetail(data){
    window.open("/admin/articleDetail?data="+data)
  }