const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo');
const verifyToken = require('../middlewares/verifyToken');

router.post('/add', verifyToken, todoController.addList);
router.delete('/delete/:id', todoController.deleteList);
router.get('/', verifyToken, todoController.loadList);
router.put('/update/:id', todoController.updateCompleted);

module.exports = router;
