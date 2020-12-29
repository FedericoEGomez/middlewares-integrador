//----------* REQUIRE'S *----------//
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


//----------* MAIN ROUTES *----------//
router.get('/', mainController.index);


//----------* EXPORTS ROUTER *----------//
module.exports = router;
