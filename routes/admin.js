var express=require('express');
var mysql=require('../mysql/mysqlPool');
var formidable = require('formidable');
var fs = require('fs');
var router=express.Router();


//登录 
router.post('/login', function(req, res, next) {
  mysql.logIn(req,res,req.body);
});
//注册 
router.post('/register', function(req, res) {
  var login_account=req.body.user;
  var create_by=req.body.user;
  var password=req.body.password;
  var is_deleted=0;
  var status=0;
  
  mysql.register([login_account,password,status,create_by,is_deleted],function(err,info){
    if(err){
      console.log(err);
    }else{
      res.send(info);
    }
  });
});

//保存图片到指定文件夹并返回图片保存路径（公共的******）
router.post('/imgUploadSaveSrc', function(req,res){

  var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = './public/images/uploadImg/'; //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      console.log('success')
    }
    var filename = files.imgUpload.name;

    // 对文件名进行处理，以应对上传同名文件的情况
      var nameArray = filename.split('.');
      var date = new Date();
      var ms = Date.parse(date);
      var type = String(nameArray[nameArray.length-1]);

      var avatarName = "image"+ms +  '.' + type;

    var newPath = form.uploadDir + avatarName ;
    fs.renameSync(files.imgUpload.path, newPath);  //重命名
    NewPath=newPath.substring(9,newPath.length);
    //返回路径
    res.send(JSON.stringify(NewPath));
  });
});

/*************************一、插入数据********************************/

//1、技术文档
router.post('/technicalFile_upload', function(req,res){
  var articleType='';
  var logUser='';
  var title='';
  var price='';
  var classCode='';
  var description = '';
  var isDeleted=0;
  var status=0;
  var detailImgs = '';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      articleType=fields.articleType;
      title=fields.title;
      logUser=fields.logUser;
      classCode=fields.classCode;
      summary=fields.summary;
      editorValue=fields.editorValue;
      smallImg = fields.smallImg;
    }
    var adInfo = [articleType,title,summary,editorValue,smallImg,classCode,logUser];

    mysql.addArticle(adInfo,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/articleList');
        }
    });             
  });
});
//2、前端资讯
router.post('/info_upload', function(req,res){
  var time=new Date();
  var logUser='';
  var title='';
  var price='';
  var description = '';
  var isDeleted=0;
  var status=0;
  var detailImgs = '';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      title=fields.title;
      logUser=fields.logUser;
      summary=fields.summary;
      editorValue=fields.editorValue;
      smallImg = fields.smallImg;
    }
    var adInfo = [title,smallImg,editorValue,logUser,time,summary,status,isDeleted];

    mysql.addInfo(adInfo,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/infoList');
        }
    });             
  });
});
//3、我的作品
router.post('/works_upload', function(req,res){
  var time=new Date();
  var swipeImg='';
  var is_deleted=0;
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      swipeImg=fields.swipeImg;
      fileHref='/works/'+fields.fileHref;
      worksName=fields.worksName;
    }
    //向数据库中插入图片路径
    mysql.addWorks([swipeImg,fileHref,worksName,is_deleted,time],function(err,info){
      if(err){
        console.log(err);
      }else{
        res.redirect('/admin/worksList');
      }
    });
  });
});
//4、生活感悟
router.post('/life_upload', function(req,res){
  var time=new Date();
  var logUser='';
  var title='';
  var price='';
  var description = '';
  var isDeleted=0;
  var status=0;
  var detailImgs = '';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      title=fields.title;
      logUser=fields.logUser;
      summary=fields.summary;
      editorValue=fields.editorValue;
      smallImg = fields.smallImg;
    }
    var adInfo = [title,smallImg,editorValue,logUser,time,summary,status,isDeleted];

    mysql.addLife(adInfo,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/lifeList');
        }
    });             
  });
});

/*************************二、获取数据********************************/

//前端
/**************首页获取数据******************/

//1、首页从数据库中获取技术文档
router.get('/homeTechnicalFile',function(req,res){
  mysql.homeSelectTechnicalFile(req,res);
})
//2、首页从数据库中获取前端资讯
router.get('/homeInfo',function(req,res){
  mysql.homeSelectInfo(req,res);
})
//3、首页从数据库中获取我的作品
router.get('/getWorks',function(req,res){
  mysql.selectWorks(req,res);
})
//4、首页从数据库中获取受欢迎文章
router.get('/getPopularTechnicalFile',function(req,res){
  mysql.selectPopularTechnicalFile(req,res);
})

/**************获取技术文档数据******************/

//1、技术文档列表页
router.get('/getTechnicalFileList',function(req,res){
  mysql.selectTechnicalFile(req,res);
})
//2、技术文档详情页
router.get('/getTechnicalFileDetail',function(req,res){
  mysql.selectTechnicalFileDetail(req,res);
})

/**************获取前端资讯数据******************/

//1、前端资讯列表页
router.get('/getInfoList',function(req,res){
  mysql.selectInfo(req,res);
})
//2、前端资讯详情页
router.get('/getInfoDetail',function(req,res){
  mysql.selectInfoDetail(req,res);
})

/**************获取我的作品数据******************/

//1、我的作品列表页
router.get('/getWorksList',function(req,res){
  mysql.selectWorksList(req,res);
})

/**************获取生活感悟数据******************/

//1、生活感悟列表页
router.get('/getLifeList',function(req,res){
  mysql.selectLife(req,res);
})
//2、生活感悟详情页
router.get('/getLifeDetail',function(req,res){
  mysql.selectLifeDetail(req,res);
})

//后台
/**************获取文章******************/
//1、获取文章类型
router.get('/getArticleType',function(req,res){
  mysql.selectArticleType(req,res);
})
//1、获取技术文章分类
router.get('/getTechnicalClass',function(req,res){
  mysql.selectTechnicalClass(req,res);
})
//2、文章列表页
router.get('/htgetArticle',function(req,res){
  mysql.selectHtArticleFile(req,res);
})
//3、修改文章页和文章详情页
router.get('/htgetArticle2',function(req,res){
  mysql.selectHtArticle2(req,res);
})

/**************获取前端资讯******************/

//1、前端资讯列表页
router.get('/htgetInfo',function(req,res){
  mysql.selectHtInfo(req,res);
})
//2、修改前端资讯和前端资讯详情页
router.get('/htgetInfo2',function(req,res){
  mysql.selectHtInfo2(req,res);
})

/**************获取我的作品******************/

//1、我的作品列表页
router.get('/htgetWorks',function(req,res){
  mysql.selectHtWorks(req,res);
})
//2、修改我的作品和我的作品详情页
router.get('/htgetWorks2',function(req,res){
  mysql.selectHtWorks2(req,res);
})

/**************获取生活感悟******************/

//1、生活感悟列表页
router.get('/htgetLife',function(req,res){
  mysql.selectHtLife(req,res);
})
//2、修改生活感悟和生活感悟详情页
router.get('/htgetLife2',function(req,res){
  mysql.selectHtLife2(req,res);
})


/*************************三、修改数据********************************/

//1、技术文档
router.post('/modifyTechnicalFile', function(req,res){
  var id='';
  var logUser='';
  var title='';
  var price='';
  var classCode='';
  var description = '';
  var isDeleted=0;
  var status=0;
  var detailImgs = '';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      id=fields.ID;
      title=fields.title;
      logUser=fields.logUser;
      classCode=fields.classCode;
      summary=fields.summary;
      editorValue=fields.editorValue;
      smallImg = fields.smallImg;
    }
    var adInfo = [id,title,smallImg,editorValue,logUser,summary,status,classCode,isDeleted];
    // console.log(adInfo);

    mysql.addModifyTechnicalFile(adInfo,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/technicalFileList');
        }
    });             
  });
});

//2、前端资讯
router.post('/modifyInfo', function(req,res){
  var id='';
  var logUser='';
  var title='';
  var price='';
  var description = '';
  var isDeleted=0;
  var status=0;
  var detailImgs = '';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      id=fields.ID;
      title=fields.title;
      logUser=fields.logUser;
      summary=fields.summary;
      editorValue=fields.editorValue;
      smallImg = fields.smallImg;
    }
    var adInfo = [id,title,smallImg,editorValue,logUser,summary,status,isDeleted];
    // console.log(adInfo);

    mysql.addModifyInfo(adInfo,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/infoList');
        }
    });             
  });
});

//3、生活感悟
router.post('/modifyLife', function(req,res){
  var id='';
  var logUser='';
  var title='';
  var price='';
  var description = '';
  var isDeleted=0;
  var status=0;
  var detailImgs = '';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      id=fields.ID;
      title=fields.title;
      logUser=fields.logUser;
      summary=fields.summary;
      editorValue=fields.editorValue;
      smallImg = fields.smallImg;
    }
    var adInfo = [id,title,smallImg,editorValue,logUser,summary,status,isDeleted];
    // console.log(adInfo);

    mysql.addModifyLife(adInfo,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/lifeList');
        }
    });             
  });
});

//4、我的作品
router.post('/modifyWorks', function(req,res){
  var id='';
  var title='';
  var fileHref='';
  var isDeleted=0;
  var swipeImg='';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      id=fields.ID;
      swipeImg=fields.swipeImg;
      fileHref='/works/'+fields.fileHref;
      title=fields.worksName;
    }
    mysql.addModifyWorks([id,swipeImg,title,fileHref,isDeleted],function(err,info){
      if(err){
        console.log(err);
      }else{
        res.redirect('/admin/worksList');
      }
    });            
  });
});


/*************************四、删除数据********************************/

//1、我的作品
router.get('/deleteWorks',function(req,res){
  mysql.deleteSwipe(req,res);
})

//2、技术文档
router.get('/deleteTechnicalFile',function(req,res){
  mysql.deleteTechnicalFile(req,res);
})

//3、前端资讯
router.get('/deleteInfo',function(req,res){
  mysql.deleteInfo(req,res);
})

//4、生活感悟
router.get('/deleteLife',function(req,res){
  mysql.deleteLife(req,res);
})


module.exports=router;
