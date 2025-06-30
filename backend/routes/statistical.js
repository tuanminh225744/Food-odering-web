const router = require('express').Router();
const statisticalController = require('../controller/statisticalController.js');

router.get('/', statisticalController.getStatistics);

module.exports = router;
