const express = require('express');
const router = express();
const user = require('../controller/user.js')

router.get('/registerPage',user.registerPage);

router.post('/register',user.register);

router.get('/loginPage',user.loginPage);

router.post('/login',user.login);

router.get('/logout',user.logout);

module.exports = router;

