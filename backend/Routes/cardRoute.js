const express = require('express');
const cardController = require('../controller/cardController');
const router = express.Router();
const authCheck = require('../middleware/auth-check');

router.post('/',authCheck,cardController.getCards);
router.post('/swipe',authCheck, cardController.swipeCards);
router.post('/matches',authCheck,cardController.getMatches);

module.exports = router;