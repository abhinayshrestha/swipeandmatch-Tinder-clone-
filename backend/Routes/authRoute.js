const express = require('express');
const router = express.Router();

const authContrller = require('../controller/auth');

router.post('/facebook',authContrller.authUser);

module.exports = router;