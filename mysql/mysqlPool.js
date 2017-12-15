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

/*************************一、插入数据********************************/

//1、技术文档
function addArticle(data, callback){
	var id = uuid();
	var add="insert into t_article(article_id,article_type,article_title,article_brief,article_content,cover_image_path,class_code,create_by,create_time,is_deleted) values('"+id+"',?,?,?,?,?,?,?,now(),0)";
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

//2、前端资讯
function addInfo(data, callback){
	var id = uuid();
	var add="insert into info(id,title,cover_photo,content,create_by,create_time,brief,status,is_deleted) values('"+id+"',?,?,?,?,?,?,?,?)";
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
exports.addInfo=addInfo;

//3、我的作品
function addWorks(data,callback){
	var add="insert into works(id,image_path,href,title,is_deleted,create_time) values('"+uuid()+"',?,?,?,?,?)";
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

//4、生活感悟
function addLife(data, callback){
	var id = uuid();
	var add="insert into life(id,title,cover_photo,content,create_by,create_time,brief,status,is_deleted) values('"+id+"',?,?,?,?,?,?,?,?)";
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
exports.addLife=addLife;

/*************************二、获取数据********************************/

//前端
/**************首页获取数据******************/

//1、首页从数据库中获取技术文档
function homeSelectTechnicalFile(req,res){
	var select="SELECT	a.id,a.title,a.cover_photo,a.content,a.brief,a.create_by,a.create_time,a.update_time,a.zan, b.class_name FROM technicalFile a LEFT JOIN class b ON b.class_code = a.class_code WHERE a.`status` = '0' AND a.is_deleted = '0' order by create_time desc limit 0,4";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);					
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})	
}
exports.homeSelectTechnicalFile=homeSelectTechnicalFile;

//2、首页从数据库中获取前端资讯
function homeSelectInfo(req,res){
	var select="SELECT	a.id,a.title,a.cover_photo,a.content,a.brief,a.create_by,a.create_time,a.update_time,a.zan FROM info a  WHERE a.status = '0' AND a.is_deleted = '0' order by a.create_time desc limit 0,3";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})
}
exports.homeSelectInfo=homeSelectInfo;

//3、首页从数据库中获取我的作品
function selectWorks(req,res){
	var select="select * from works order by create_time desc limit 0,3";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);					
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})	
}
exports.selectWorks=selectWorks;

//4、首页从数据库中获取受欢迎文章
function selectPopularTechnicalFile(req,res){
	var select="select * from technicalfile order by zan desc limit 0,6";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectPopularTechnicalFile=selectPopularTechnicalFile;

/**************获取技术文档数据******************/

//1、技术文档列表页
function selectTechnicalFile(req,res){
	var select="SELECT	a.id,a.title,a.cover_photo,a.content,a.brief,a.create_by,a.create_time,a.update_time,a.zan, b.class_name FROM technicalFile a LEFT JOIN class b ON b.class_code = a.class_code WHERE a.status = '0' AND a.is_deleted = '0' order by a.create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);					
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})
}
exports.selectTechnicalFile=selectTechnicalFile;

//2、技术文档详情页
function selectTechnicalFileDetail(req,res){
	var select="SELECT a.title,a.content,a.create_by,a.create_time,a.update_time,a.zan, b.class_name FROM technicalFile a LEFT JOIN class b ON b.class_code = a.class_code WHERE a.status = '0' AND a.is_deleted = '0' AND a.id='"+req.query.id+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);				
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})	
}
exports.selectTechnicalFileDetail=selectTechnicalFileDetail;

/**************获取前端资讯数据******************/

//1、前端资讯列表页
function selectInfo(req,res){
	var select="SELECT	a.id,a.title,a.cover_photo,a.content,a.brief,a.create_by,a.create_time,a.update_time,a.zan FROM info a  WHERE a.status = '0' AND a.is_deleted = '0' order by a.create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);					
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})
}
exports.selectInfo=selectInfo;

//2、前端资讯详情页
function selectInfoDetail(req,res){
	var select="SELECT a.title,a.content,a.create_by,a.create_time,a.update_time,a.zan FROM info a WHERE a.status = '0' AND a.is_deleted = '0' AND a.id='"+req.query.id+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);					
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})	
}
exports.selectInfoDetail=selectInfoDetail;

/**************获取我的作品数据******************/

//1、我的作品列表页
function selectWorksList(req,res){
	var select="select * from works order by create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);					
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})	
}
exports.selectWorksList=selectWorksList;

/**************获取生活感悟数据******************/

//1、生活感悟列表页
function selectLife(req,res){
	var select="SELECT	a.id,a.title,a.cover_photo,a.content,a.brief,a.create_by,a.create_time,a.update_time,a.zan FROM life a  WHERE a.status = '0' AND a.is_deleted = '0' order by a.create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);					
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})
}
exports.selectLife=selectLife;

//2、生活感悟详情页
function selectLifeDetail(req,res){
	var select="SELECT a.title,a.content,a.create_by,a.create_time,a.update_time,a.zan FROM life a WHERE a.status = '0' AND a.is_deleted = '0' AND a.id='"+req.query.id+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				if(req.query.jsonpcallback){
					var jsonpcallback = req.query.jsonpcallback;
					jsonpcallback = jsonpcallback+"("+JSON.stringify(rows)+")"
					res.send(jsonpcallback);					
				}else{
					res.send(rows);
				}
			}
		})
		connection.release();
	})	
}
exports.selectLifeDetail=selectLifeDetail;



//后台
/**************获取技术文档******************/
//0、获取文章类型
function selectArticleType(req,res){
	var select="select article_type_id,article_type,article_type_title from t_article_type";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})
}
exports.selectArticleType=selectArticleType;
//1、获取技术文章分类
function selectTechnicalClass(req,res){
	var select="select class_id,class_name,class_code,parent_id from t_article_technical_class where class_level=1";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})
}
exports.selectTechnicalClass=selectTechnicalClass;

//2、文章列表页
function selectHtArticleFile(req,res){
	var select="select a.article_id,a.cover_image_path,a.article_title,a.create_time from t_article a order by create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtArticleFile=selectHtArticleFile;

//3、修改文章页和文章详情页
function selectHtArticle2(req,res){
	var select="select a.article_type,a.article_title,a.article_brief,a.article_content,a.cover_image_path,a.class_code,a.create_by,a.create_time,a.update_time,a.is_deleted,a.article_zan,b.class_name,c.article_type_title from t_article a left join t_article_technical_class b left join t_article_type c on b.class_code = a.class_code and a.article_type=c.article_type where a.is_deleted = '0' AND a.article_id='"+req.query.data+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtArticle2=selectHtArticle2;

/**************获取前端资讯******************/

//1、前端资讯列表页
function selectHtInfo(req,res){
	var select="select a.id,a.cover_photo,a.title,a.create_time from info a order by create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtInfo=selectHtInfo;
//2、修改前端资讯和前端资讯详情页
function selectHtInfo2(req,res){
	var select="SELECT	a.title,a.cover_photo,a.content,a.brief,a.create_by,a.create_time,a.update_time,a.zan FROM	info a WHERE a.`status` = '0' AND a.is_deleted = '0' AND a.id='"+req.query.data+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtInfo2=selectHtInfo2;

/**************获取我的作品******************/
//1、我的作品列表页
function selectHtWorks(req,res){
	var select="select * from works order by create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtWorks=selectHtWorks;
//2、修改我的作品和我的作品详情页
function selectHtWorks2(req,res){
	var select="SELECT	a.id,a.image_path,a.title,a.href FROM works a WHERE a.is_deleted = '0' AND a.id='"+req.query.data+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtWorks2=selectHtWorks2;

/**************获取生活感悟******************/

//1、生活感悟列表页
function selectHtLife(req,res){
	var select="select a.id,a.cover_photo,a.title,a.create_time from life a order by create_time desc";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtLife=selectHtLife;
//2、修改生活感悟和生活感悟详情页
function selectHtLife2(req,res){
	var select="SELECT	a.title,a.cover_photo,a.content,a.brief,a.create_by,a.create_time,a.update_time,a.zan FROM	life a WHERE a.`status` = '0' AND a.is_deleted = '0' AND a.id='"+req.query.data+"'";
	pool.getConnection(function(err,connection){
		connection.query(select,function(err,rows){
			if(err){
				throw err;
			} else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
				res.send(rows);
			}
		})
		connection.release();
	})	
}
exports.selectHtLife2=selectHtLife2;



/*************************三、修改数据********************************/

//1、技术文档
function addModifyTechnicalFile(data,callback){
	var update="UPDATE technicalFile SET title ='"+data[1]+"', cover_photo = '"+data[2]+"',class_code='"+data[7]+"',content='"+data[3]+"',create_by='"+data[4]+"',brief='"+data[5]+"',is_deleted='"+data[8]+"',status='"+data[6]+"',update_time=now() WHERE id ='"+data[0]+"'";
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
exports.addModifyTechnicalFile=addModifyTechnicalFile;

//2、前端资讯
function addModifyInfo(data,callback){
	var update="UPDATE info SET title ='"+data[1]+"', cover_photo = '"+data[2]+"',content='"+data[3]+"',create_by='"+data[4]+"',brief='"+data[5]+"',is_deleted='"+data[7]+"',status='"+data[6]+"',update_time=now() WHERE id ='"+data[0]+"'";
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
exports.addModifyInfo=addModifyInfo;

//3、生活感悟
function addModifyLife(data,callback){
	var update="UPDATE life SET title ='"+data[1]+"', cover_photo = '"+data[2]+"',content='"+data[3]+"',create_by='"+data[4]+"',brief='"+data[5]+"',is_deleted='"+data[7]+"',status='"+data[6]+"',update_time=now() WHERE id ='"+data[0]+"'";
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
exports.addModifyLife=addModifyLife;

//4、我的作品
function addModifyWorks(data,callback){
	var update="UPDATE works SET title ='"+data[2]+"', image_path = '"+data[1]+"',href='"+data[3]+"',is_deleted='"+data[4]+"',update_time=now() WHERE id ='"+data[0]+"'";
	console.log(update);
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
exports.addModifyWorks=addModifyWorks;


/*************************四、删除数据********************************/

//1、我的作品
function deleteWorks(req,res){
	var deleteId="delete from works where id=?";
	var params=req.query.id;
	pool.getConnection(function(err,connection){
		connection.query(deleteId,[params],function(err,rows){
			if(err){
				throw err;
			}else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
			}
		})
		connection.release();
	})
}
exports.deleteWorks=deleteWorks;

//2、技术文档
function deleteTechnicalFile(req,res){
	var deleteId="delete from technicalFile where id=?";
	var params=req.query.data;
	pool.getConnection(function(err,connection){
		connection.query(deleteId,[params],function(err,rows){
			if(err){
				throw err;
			}else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
			}
		})
		connection.release();
	})
}
exports.deleteTechnicalFile=deleteTechnicalFile;

//3、前端资讯
function deleteInfo(req,res){
	var deleteId="delete from info where id=?";
	var params=req.query.data;
	pool.getConnection(function(err,connection){
		connection.query(deleteId,[params],function(err,rows){
			if(err){
				throw err;
			}else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
			}
		})
		connection.release();
	})
}
exports.deleteInfo=deleteInfo;

//4、生活感悟
function deleteLife(req,res){
	var deleteId="delete from life where id=?";
	var params=req.query.data;
	pool.getConnection(function(err,connection){
		connection.query(deleteId,[params],function(err,rows){
			if(err){
				throw err;
			}else{
				res.setHeader("Content-Type","text/plain");
        		res.setHeader("Access-Control-Allow-Origin","");
			}
		})
		connection.release();
	})
}
exports.deleteLife=deleteLife;