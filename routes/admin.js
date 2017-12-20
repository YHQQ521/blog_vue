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

/***********************************************前台****************************************/

/*************************一、获取数据（pc端）********************/

/*************************一、获取数据（移动端端）****************/
//1、文章列表
router.get('/getArticleList',function(req,res){
  mysql.selectArticleList(req,res);
})
//2、文章详情
router.get('/getArticleDetail',function(req,res){
  mysql.selectArticleDetail(req,res);
})



/***********************************************后台****************************************/

/************************一、插入数据****************************/
//1、文章
router.post('/article_upload', function(req,res){
  var articleType='';
  var title='';
  var logUser='';
  var classCode='';
  var summary = '';
  var editorValue = '';
  var smallImg = '';
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
//2、菜单
router.post('/menu_upload', function(req,res){
  var menuParentId='';
  var menuLevel='';
  var menuTitleEN='';
  var menuTitleZH='';
  var coverPhotoPath='';
  var logUser='';

  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      menuParentId=fields.parentLevel;
      menuLevel=fields.menuLevel;
      menuTitleEN=fields.menuTitleEN;
      menuTitleZH=fields.menuTitleZH;
      coverPhotoPath = fields.menuIcon;
      logUser=fields.logUser;
    }
    var menuData = [menuParentId,menuLevel,menuTitleEN,menuTitleZH,coverPhotoPath,logUser];
    mysql.addMenu(menuData,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/menuList');
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

/************************二、获取数据****************************/

/**************获取文章******************/
//1、获取文章类型
router.get('/getArticleType',function(req,res){
  mysql.selectArticleType(req,res);
})
//2、获取技术文章分类
router.get('/getTechnicalClass',function(req,res){
  mysql.selectTechnicalClass(req,res);
})
//3、文章列表页
router.get('/htgetArticle',function(req,res){
  mysql.selectHtArticle(req,res);
})
//4、修改文章页和文章详情页
router.get('/htgetArticle2',function(req,res){
  mysql.selectHtArticle2(req,res);
})
//5、菜单列表页
router.get('/htgetMenu',function(req,res){
  mysql.selectHtMenu(req,res);
})
//6、修改菜单页和菜单详情页
router.get('/htgetMenu2',function(req,res){
  mysql.selectHtMenu2(req,res);
})
//7、一级菜单
router.get('/getFirstLevel',function(req,res){
  mysql.selectHtFirstMenu(req,res);
})

/**************获取我的作品**************/

//1、我的作品列表页
router.get('/htgetWorks',function(req,res){
  mysql.selectHtWorks(req,res);
})
//2、修改我的作品和我的作品详情页
router.get('/htgetWorks2',function(req,res){
  mysql.selectHtWorks2(req,res);
})


/*************************三、修改数据********************************/

//1、文章
router.post('/modifyArticle', function(req,res){
  var id='';
  var articleType='';
  var logUser='';
  var title='';
  var classCode='';
  var summary='';
  var editorValue = '';
  var smallImg='';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      id=fields.ID;
      articleType=fields.articleType;
      title=fields.title;
      logUser=fields.logUser;
      classCode=fields.classCode;
      summary=fields.summary;
      editorValue=fields.editorValue;
      smallImg = fields.smallImg;
    }
    var articledata = [id,articleType,title,summary,editorValue,smallImg,classCode,logUser];
    // console.log(adInfo);

    mysql.modifyArticle(articledata,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/articleList');
        }
    });             
  });
});

//2、菜单
router.post('/modifyMenu', function(req,res){
  var id='';
  var logUser='';
  var menuParentId='';
  var menuLevel='';
  var titleEN='';
  var titleZH='';
  var menuIcon='';
  var form = new formidable.IncomingForm();   //创建上传表单
  
  form.parse(req, function(err, fields, files) {
    if (err) {
        console.log(err);
    } else{
      id=fields.ID;
      logUser=fields.logUser;
      menuParentId=fields.parentLevel;
      menuLevel=fields.menuLevel;
      titleEN=fields.menuTitleEN;
      titleZH=fields.menuTitleZH;
      menuIcon = fields.menuIcon;
    }
    var modifyMenuData = [id,menuParentId,menuLevel,titleEN,titleZH,menuIcon,logUser];
    mysql.modifyArticle(modifyMenuData,function(err, info) {
        if(err) {
          console.log(err);
        }else {
          res.redirect('/admin/menuList');
        }
    });             
  });
});

//3、我的作品
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
    mysql.modifyWorks([id,swipeImg,title,fileHref],function(err,info){
      if(err){
        console.log(err);
      }else{
        res.redirect('/admin/worksList');
      }
    });            
  });
});


/*************************四、删除数据********************************/

//1、文章
router.get('/deleteArticle',function(req,res){
  mysql.deleteArticle(req,res);
})
//2、菜单
router.get('/deleteMenu',function(req,res){
  mysql.deleteMenu(req,res);
})
//3、我的作品
router.get('/deleteWorks',function(req,res){
  mysql.deleteWorks(req,res);
})


module.exports=router;
