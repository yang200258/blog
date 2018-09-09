const db = require('../db/index.js');
const moment = require('moment');

const addArticlePage = (req,res)=>{
    if(!req.session.islogin) {
        res.redirect('/');
        return;
    }
    res.render('./article/add',{
        user: req.session.user,
        islogin: req.session.islogin
    });
}

const addArticle = (req,res)=>{
    let body = req.body;
    body.ctime = moment().format('YYYY-MM-DD HH-mm-ss');
    let sql = "insert into article set ?";
    db.base(sql,body,(err,results)=>{
        if(err) return res.send({msg: '文章添加错误:' + err,status: 500});
        if(results.affectedRows !== 1) {
            if(err) return res.send({msg: '文章添加错误:' + err,status: 501});
        } else {
            res.send({msg:'添加成功!',status: 200,insertId: results.insertId});
        }
    });
}

const showArticleDetail = (req,res)=>{
    let id = req.params.id;
    let sql = "select * from article where id = ?";
    db.base(sql,id,(err,results)=>{
        if(err) {
            res.send('查询文章出现错误:' + err);
            return;
        }
        res.render('./article/info',{
            article: results[0],
            islogin: req.session.islogin,
            user: req.session.user
        });
    });
    
}

const editArticlePage = (req,res)=>{
    let id = req.params.id;
    let sql = "select * from article where id =?";
    db.base(sql,id,(err,results)=>{
        if(err) {
            res.send('编辑文章出现错误:' + err);
            return;
        }
        res.render('./article/edit',{
            article: results[0],
            islogin: req.session.islogin,
            user: req.session.user
        });
    }); 
}



const editArticle = (req,res)=>{
    let body = req.body;
    body.ctime = moment().format('YYYY_MM_DD HH-mm-ss');
    let sql = "update article set title=?,content=?,ctime=? where id = ?";
    let data = [body.title,body.content,body.ctime,body.id];
    db.base(sql,data,(err,results)=>{
        if(err) {
            res.send({msg: '修改文章失败:' + err,status: 502});
            return;
        } else if(results.affectedRows == 1) {
            res.send({
                msg: '编辑文章成功!',
                status: 200,
                islogin: req.session.islogin,
                user: req.session.user
            });
        } else {
            res.send({msg: '修改文章失败:' + err,status: 502});
        }
    });
}

module.exports = {
    addArticlePage,
    addArticle,
    showArticleDetail,
    editArticlePage,
    editArticle
}