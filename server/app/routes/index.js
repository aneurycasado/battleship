'use strict';
var router = require('express').Router();
module.exports = router;
router.use('/games', require('./games'));
router.use(function (req, res) {
    res.status(404).end();
});
