var express=require('express');
var router=express.Router();

//百度验证
router.get('/baidu_verify_WePRqRIEds.html', function(req, res, next) {
  res.render('baidu_verify_WePRqRIEds');
});
//在微信中打开免除提示
router.get('/MP_verify_UVYTLb73nwRyDfKx.txt', function(req, res, next) {
  res.send('MP_verify_UVYTLb73nwRyDfKx.txt');
});


/************************************返回后台管理页 *********************************/
  //1、登录、注册
router.get('/admin', function(req, res, next) {
  res.render('backstage/login', { title: '后台管理中心登录'} );
});
router.get('/admin/register', function(req, res, next) {
  res.render('backstage/register', { title: '后台管理中心注册'} );
});
  //2、后台首页
router.get('/admin/index', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/index', { title: '后台管理中心',userInfo:user.user});
});
  //3、文章
router.get('/admin/articleList', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/articleList', { title: '后台管理中心',userInfo:user.user});
});
router.get('/admin/addArticle', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/addArticle', { title: '后台管理中心',userInfo:user.user});
});
router.get('/admin/modifyArticle', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/modifyArticle', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
router.get('/admin/articleDetail', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/articleDetail', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
  //4、导航菜单
router.get('/admin/menuList', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/menuList', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
router.get('/admin/addMenu', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/addMenu', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
router.get('/admin/modifyMenu', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/modifyMenu', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
router.get('/admin/menuDetail', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/menuDetail', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});  
  //5、作品
router.get('/admin/worksList', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/worksList', { title: '后台管理中心',userInfo:user.user});
});
router.get('/admin/addWorks', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/addWorks', { title: '后台管理中心',userInfo:user.user});
});
router.get('/admin/modifyWorks', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/modifyWorks', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
router.get('/admin/worksDetail', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/worksDetail', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});



module.exports=router;