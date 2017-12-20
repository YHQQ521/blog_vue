var pool=require('./config');

//uuid
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}


//登录 
function logIn(req,res,data){
	var select="select * from t_account where login_account='"+data.user+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			}else{
				if(rows.length==0){
					res.send('0');
				}else if(rows[0].password==data.password){
					//保存一下session信息
					var user={
						id:rows[0].id,
						user:rows[0].login_account
					}
					req.session.user=user;
					res.send({user:rows[0].login_account});
				}else{
					res.send('2');
				}
			}
		})
		connection.release();
	})
}
exports.logIn=logIn;

//注册 
function register(data,callback){
	var add="insert into t_account(id,login_account,password,status,create_by,is_deleted,create_time) values('"+uuid()+"',?,?,?,?,?,now())";
	var params=data;
	pool.getConnection(function(err,connection){
		if(err){
			callback(err,null);
		}
		connection.query(add,params,function(err,rows){
			if(err){
				callback(err,null);
			} else{
				callback(null,rows);
			}
		})
		connection.release();
	})
}
exports.register=register;


/***********************************************前台****************************************/

/*************************一、获取数据（pc端）********************/

/*************************一、获取数据（移动端端）****************/
//1、文章列表
function selectArticleList(req,res){
	var select="select a.article_id,a.cover_image_path,a.article_title,a.article_brief,a.create_time from t_article a where a.article_type='"+req.query.data+"' order by create_time desc";

	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectArticleList=selectArticleList;

//1、文章详情
function selectArticleDetail(req,res){
	var select="select a.article_title,a.article_content,a.create_by,a.create_time from t_article a where a.article_id='"+req.query.data+"' ";

	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectArticleDetail=selectArticleDetail;


/***********************************************后台****************************************/

/************************一、插入数据****************************/
//1、文章
function addArticle(data, callback){
	var id = uuid();
	var add="insert into t_article(article_id,article_type,article_title,article_brief,article_content,cover_image_path,article_type_sub,create_by,create_time,is_deleted) values('"+id+"',?,?,?,?,?,?,?,now(),0)";
	var params=data;
	pool.getConnection(function(err,connection){
		if(err) {
			callback(err, null);
		}
		connection.query(add,params,function(err,rows){
			if(err){
				callback(err, null);
			} else{
				callback(null, rows);
			}
		})
		connection.release();
	})		
}
exports.addArticle=addArticle;

//2、菜单
function addMenu(data, callback){
	var add="insert into t_article_menu(menu_id,menu_parent_id,menu_level,menu_type,menu_type_title,cover_photo_path,create_by,create_time,is_deleted) values('"+uuid()+"',?,?,?,?,?,?,now(),0)";
	var params=data;
	pool.getConnection(function(err,connection){
		if(err) {
			callback(err, null);
		}
		connection.query(add,params,function(err,rows){
			if(err){
				callback(err, null);
			} else{
				callback(null, rows);
			}
		})
		connection.release();
	})		
}
exports.addMenu=addMenu;

//3、我的作品
function addWorks(data,callback){
	var add="insert into t_works(works_id,image_path,href,title,is_deleted,create_time) values('"+uuid()+"',?,?,?,?,?)";
	var params=data;
	pool.getConnection(function(err,connection){
		if(err){
			callback(err,null);
		}
		connection.query(add,params,function(err,rows){
			if(err){
				callback(err,null);
			} else{
				callback(null,rows);
			}
		})
		connection.release();
	})	
}
exports.addWorks=addWorks;

/************************二、获取数据****************************/

/**************获取文章******************/
//1、获取文章类型
function selectArticleType(req,res){
	var select="select m.menu_id,m.menu_type,m.menu_type_title from t_article_menu m where m.menu_level='1'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectArticleType=selectArticleType;

//2、获取技术文章分类
function selectTechnicalClass(req,res){
	var select="select menu_id,menu_type,menu_type_title from t_article_menu where menu_level='2' and menu_parent_id=(select menu_id from t_article_menu where menu_type='technical')";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})
}
exports.selectTechnicalClass=selectTechnicalClass;

//3、文章列表页
function selectHtArticle(req,res){
	var select="select a.article_id,a.cover_image_path,a.article_title,a.create_time from t_article a order by create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtArticle=selectHtArticle;

//4、修改文章页和文章详情页
function selectHtArticle2(req,res){
	var select="select a.article_type,a.article_title,a.article_brief,a.article_content,a.cover_image_path,a.class_code,a.create_by,a.create_time,a.update_time,a.is_deleted,a.article_zan,b.class_name,c.article_type_title from t_article a left join t_article_technical_class b on b.class_code = a.class_code left join t_article_type c on a.article_type=c.article_type where a.is_deleted = '0' AND a.article_id='"+req.query.data+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtArticle2=selectHtArticle2;

//5、菜单列表页
function selectHtMenu(req,res){
	var select="select m.menu_id,m.menu_level,m.menu_type_title,m.cover_photo_path,m.create_time from t_article_menu m order by create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtMenu=selectHtMenu;

//6、修改菜单页和菜单详情页
function selectHtMenu2(req,res){
	var select="select m.menu_parent_id,m.menu_level,m.menu_type,m.menu_type_title,m.cover_photo_path,m.create_by,m.create_time from t_article_menu m where m.menu_id='"+req.query.data+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtMenu2=selectHtMenu2;

//7、一级菜单
function selectHtFirstMenu(req,res){
	var select="select m.menu_id,m.menu_type,m.menu_type_title from t_article_menu m where m.menu_level='1'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtFirstMenu=selectHtFirstMenu;

/**************获取我的作品******************/
//1、我的作品列表页
function selectHtWorks(req,res){
	var select="select * from t_works order by create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtWorks=selectHtWorks;
//2、修改我的作品和我的作品详情页
function selectHtWorks2(req,res){
	var select="SELECT	a.image_path,a.title,a.href FROM t_works a WHERE a.is_deleted = '0' AND a.works_id='"+req.query.data+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtWorks2=selectHtWorks2;


/*************************三、修改数据********************************/

//1、文章
function modifyArticle(data,callback){
	var update="UPDATE t_article SET article_type ='"+data[1]+"',article_title='"+data[2]+"',article_brief='"+data[3]+"',article_content='"+data[4]+"',cover_image_path = '"+data[5]+"',class_code='"+data[6]+"',update_by='"+data[7]+"',update_time=now() WHERE article_id ='"+data[0]+"'";
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}
		connection.query(update,function(err,rows){
			if(err){
				callback(err,null);
			} else{
				callback(null,rows);
			}
		})
		connection.release();
	})		
}
exports.modifyArticle=modifyArticle;

//2、菜单
function modifyMenu(data,callback){
	var update="UPDATE t_article_menu SET menu_parent_id ='"+data[1]+"',menu_level='"+data[2]+"',menu_type='"+data[3]+"',menu_type_title='"+data[4]+"',cover_photo_path = '"+data[5]+"',update_by='"+data[6]+"',update_time=now() WHERE menu_id ='"+data[0]+"'";
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}
		connection.query(update,function(err,rows){
			if(err){
				callback(err,null);
			} else{
				callback(null,rows);
			}
		})
		connection.release();
	})		
}
exports.modifyMenu=modifyMenu;

//3、我的作品
function modifyWorks(data,callback){
	var update="UPDATE t_works SET title ='"+data[2]+"', image_path = '"+data[1]+"',href='"+data[3]+"',update_time=now() WHERE works_id ='"+data[0]+"'";
	// console.log(update);
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}
		connection.query(update,function(err,rows){
			if(err){
				callback(err,null);
			} else{
				callback(null,rows);
			}
		})
		connection.release();
	})		
}
exports.modifyWorks=modifyWorks;


/*************************四、删除数据********************************/

//1、文章
function deleteArticle(req,res){
	var deleteData="delete from t_article where article_id=?";
	var params=req.query.data;
	pool.getConnection(function(err,connection){
		connection.query(deleteData,[params],function(err,rows){
			if(err){
				throw err;
			}else{

			}
		})
		connection.release();
	})
}
exports.deleteArticle=deleteArticle;

//2、菜单
function deleteMenu(req,res){
	var deleteData="delete from t_article_menu where menu_id=?";
	var params=req.query.data;
	pool.getConnection(function(err,connection){
		connection.query(deleteData,[params],function(err,rows){
			if(err){
				throw err;
			}else{

			}
		})
		connection.release();
	})
}
exports.deleteMenu=deleteMenu;

//3、我的作品
function deleteWorks(req,res){
	var deleteId="delete from t_works where works_id=?";
	var params=req.query.id;
	pool.getConnection(function(err,connection){
		connection.query(deleteId,[params],function(err,rows){
			if(err){
				throw err;
			}else{

			}
		})
		connection.release();
	})
}
exports.deleteWorks=deleteWorks;
