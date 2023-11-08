const express = require('express');
const controller = require('../controllers/maincontroller');
const router = express.Router();

router.get('/about', controller.about);
router.get('/contact', controller.contact);

module.exports = router;