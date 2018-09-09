const express = require('express');
const router = express();
const article = require('../controller/article.js');


router.get('/article/add',article.addArticlePage);

router.post('/article/add',article.addArticle);

router.get('/article/info/:id',article.showArticleDetail);

router.get('/article/edit/:id',article.editArticlePage);

router.post('/article/edit',article.editArticle);


module.exports = router;