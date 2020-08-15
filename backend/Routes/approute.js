const express = require('express');
const router = express.Router();
const appController = require('../controller/app');
const authCheck = require('../middleware/auth-check');

router.get('/',authCheck,appController.getUserInfo);
router.put('/setting',authCheck, appController.updateSetting);
router.put('/profile',authCheck,appController.updateProfile);

module.exports = router;