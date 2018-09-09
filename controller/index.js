const db = require('../db/index.js');



const showIndexPage = (req,res)=>{
    const pageSize = req.query.acount || 15;
    const nowPage = Number(req.query.page) || 1;
    let sql2 = "select count(*) as count from article";
    db.base(sql2,null,(err,resultscount)=>{
        if(err) {
            res.send('查询文章总数失败:' + err);
            return;
        } else {
            const totalArticle = resultscount[0].count;
            const maxPage = Math.ceil(totalArticle/pageSize);
            arr = [];
            for(let i = 0;i<maxPage;i++) {
                arr[i] = i+1;
            }
            let sql = `select article.id, article.title as title, article.ctime as ctime, user.nickname as nickname 
            from article
            LEFT JOIN user
            ON article.authorId=user.id
            ORDER BY article.id desc limit ${(nowPage - 1) * pageSize},${pageSize}`;
            db.base(sql,null,(err,results)=>{
               if(err) {
                 res.render('index',{
                     user: req.session.user,
                     islogin: req.session.islogin,
                     totalPage: arr,
                     nowPage: nowPage,
                     maxPage: maxPage

                 });
               } else {
                res.render('index',{
                    user: req.session.user,
                    islogin: req.session.islogin,
                    article: results,
                    totalPage: arr,
                    nowPage: nowPage,
                    maxPage: maxPage
                });
                
               } 
            });
            
        }
    });
      
}


module.exports = {
    showIndexPage
}