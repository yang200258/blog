const db = require('../db/index.js');
const moment = require('moment');
const bcrypt = require('bcrypt');


const registerPage = (req,res)=>{
    res.render('./user/register',{});
}


const register = (req,res)=>{
    let body = req.body;
    let sql = "select * from user where username=?";
    let data = [body.username];
    db.base(sql,data,(err,results)=>{
        if(err) console.log('用户名查询错误:' + err);
        if(results == "") {
            body.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
            let saltRounds = 12;
            bcrypt.hash(body.password,saltRounds,(err,pw)=>{
                if(err) res.send({msg: '密码加密错误:' + err,status: '402'});
                body.password = pw;
                let sql2 = "insert into user set ?";
                db.base(sql2,body,(err,results)=>{
                    if(err) res.send({msg: '注册失败:' + err,status: '401'});
                    res.send({msg: '注册成功!',status: '200'});
                });
            });
        } else {

        }
    })
}

const loginPage = (req,res)=>{
    res.render('./user/login',{});
}

const login = (req,res)=>{
    let body = req.body;
    let sql = "select * from user where username=?";
    let data = [body.username];
    db.base(sql,data,(err,results)=>{
        if(err) {
            res.send({msg: '登录时查询用户民错误:' + err,status: 304});
            return;
        }
        if(results != "") {
            bcrypt.compare(body.password,results[0].password,(err,result)=>{
                if(err) {
                    res.send({msg: '密码匹配发生错误' + err,status: 303});
                    return;
                }
                if(result) {
                    req.session.user = results[0];
                    req.session.islogin = true;
                    res.send({msg: '登录成功',status: 200});
                } else {
                    res.send({msg: '登录失败,请检查用户名/密码!',status: 305});
                }
            });
        }
    });
}

const logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('./');
    });
}



module.exports = {
    registerPage,
    register,
    loginPage,
    login,
    logout
}