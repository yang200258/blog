const express = require('express');
const router = express.Router();
const index = require('../controller/index.js');

router.get('/',index.showIndexPage);


module.exports = router;