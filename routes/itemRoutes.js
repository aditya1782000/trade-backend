const express = require('express');
const controller = require('../controllers/itemController');
const {isLoggedin, isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

const router = express.Router();

router.get('/', controller.index);

router.get('/new', isLoggedin, controller.new);

router.post('/', isLoggedin, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', isLoggedin, isAuthor, validateId, controller.edit);

router.put('/:id', isLoggedin, isAuthor, validateId, controller.update);

router.delete('/:id', isLoggedin, isAuthor, validateId, controller.delete);

module.exports = router;