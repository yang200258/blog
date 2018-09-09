const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session')


// session 设置
app.use(
  session({
    secret: '这是加密的密钥',
    resave: false,
    saveUninitialized: false
  })
)
//导入body-parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
// parse application/json
app.use(bodyParser.json());

// 设置静态托管目录
app.use('/www',express.static('public'))

//遍历导入router文件
fs.readdir(path.join(__dirname,'router'),(err,filename)=>{
    if(err) console.log('读取router文件目录失败' + err);
    filename.forEach((item)=>{
        const router = require(path.join(__dirname,'./router',item));
        app.use(router);
    })
});

//设置模板引擎路径
app.set('views',path.join(__dirname,'views'));
// 设置渲染引擎
app.set('view engine','art');
//设置expess兼容art-template
app.engine('art', require('express-art-template'));


app.listen(3001,()=>{
    console.log('server success!');
});