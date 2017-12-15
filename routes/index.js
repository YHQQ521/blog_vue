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
//返回pc端页面
//0、loading页
router.get('/',function(req,res){
  res.render('loading');
})
//1、首页
router.get('/index',function(req,res){
  var user=req.session.user?req.session.user:'';
  res.render('front/index',{title:'首页',js:'home',index:1,userInfo:user.user});
})
//2、返回技术文档列表页
router.get('/technicalFileList',function(req,res){
	var user=req.session.user?req.session.user:'';
	res.render('front/technicalFileList',{title:'技术文档列表页',js:'technicalFileList',index:2,userInfo:user.user});
})
//3、返回技术文档详情页
router.get('/technicalFileDetail',function(req,res){
	var user=req.session.user?req.session.user:'';
	res.render('front/technicalFileDetail',{title:'技术文档详情页',js:'technicalFileDetail',index:2,userInfo:user.user,data:req.query.data});
})
//4、返回前端资讯列表页
router.get('/infoList',function(req,res){
  var user=req.session.user?req.session.user:'';
  res.render('front/infoList',{title:'前端资讯列表页',js:'infoList',index:3,userInfo:user.user});
})
//5、返回前端资讯详情页
router.get('/infoDetail',function(req,res){
  var user=req.session.user?req.session.user:'';
  res.render('front/infoDetail',{title:'技术文档详情页',js:'infoDetail',index:3,userInfo:user.user,data:req.query.data});
})
//6、返回我的作品列表页
router.get('/worksList',function(req,res){
  var user=req.session.user?req.session.user:'';
  res.render('front/worksList',{title:'我的作品列表页',js:'worksList',index:4,userInfo:user.user});
})
//7、返回生活感悟列表页
router.get('/lifeList',function(req,res){
  var user=req.session.user?req.session.user:'';
  res.render('front/lifeList',{title:'生活感悟列表页',js:'lifeList',index:5,userInfo:user.user});
})
//8、返回生活感悟详情页
router.get('/lifeDetail',function(req,res){
  var user=req.session.user?req.session.user:'';
  res.render('front/lifeDetail',{title:'生活感悟详情页',js:'lifeDetail',index:5,userInfo:user.user,data:req.query.data});
})
//9、返回关于我页面
router.get('/about',function(req,res){
  var user=req.session.user?req.session.user:'';
  res.render('front/about',{title:'关于我',js:'about',index:6,userInfo:user.user});
})

//返回移动端页面

//1、返回首页
router.get('/mFront',function(req,res){
  res.render('mFront/index',{title:'首页',js:'index'});
})
//2、返回技术文档列表页
router.get('/mFront/technicalFileList',function(req,res){
  res.render('mFront/technicalFileList',{title:'技术文档',js:'technicalFileList'});
})
//3、返回技术文档详情页
router.get('/mFront/technicalFileDetail',function(req,res){
  res.render('mFront/technicalFileDetail',{title:'技术文档详情',js:'technicalFileDetail',data:req.query.data});
})
//4、返回前端资讯列表页
router.get('/mFront/infoList',function(req,res){
  res.render('mFront/infoList',{title:'前端资讯列表',js:'infoList'});
})
//5、返回前端资讯详情页
router.get('/mFront/infoDetail',function(req,res){
  res.render('mFront/infoDetail',{title:'前端资讯详情',js:'infoDetail',data:req.query.data});
})
//6、返回我的作品列表页
router.get('/mFront/worksList',function(req,res){
  res.render('mFront/worksList',{title:'我的作品列表',js:'worksList'});
})
//7、生活感悟列表页
router.get('/mFront/lifeList',function(req,res){
  res.render('mFront/lifeList',{title:'我的作品列表',js:'lifeList'});
})
//8、生活感悟详情页
router.get('/mFront/lifeDetail',function(req,res){
  res.render('mFront/lifeDetail',{title:'前端资讯详情',js:'lifeDetail',data:req.query.data});
})
//9、关于我
router.get('/mFront/about',function(req,res){
  res.render('mFront/about',{title:'关于我',js:'about'});
})

//返回我的作品
//1、返回时钟
router.get('/works/canvas/clock',function(req,res){
  res.render('works/canvas/clock');
})


//返回后台管理页 
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
  //4、作品
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
  //5、前端资讯
router.get('/admin/infoList', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/infoList', { title: '后台管理中心',userInfo:user.user});
});
router.get('/admin/addInfo', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/addInfo', { title: '后台管理中心',userInfo:user.user});
});
router.get('/admin/modifyInfo', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/modifyInfo', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
router.get('/admin/infoDetail', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/infoDetail', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
  //6、生活感悟
router.get('/admin/lifeList', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/lifeList', { title: '后台管理中心',userInfo:user.user});
});
router.get('/admin/addLife', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/addLife', { title: '后台管理中心',userInfo:user.user});
});
router.get('/admin/modifyLife', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/modifyLife', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});
router.get('/admin/lifeDetail', function(req, res, next) {
  var user=req.session.user?req.session.user:'';
  res.render('backstage/lifeDetail', { title: '后台管理中心',userInfo:user.user,data:req.query.data});
});


module.exports=router;