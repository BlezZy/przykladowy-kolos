const express = require('express')
const router = express.Router()
const UserController = require('../controller/UsersController')


router.get('/', UserController.getUser)
router.get('/statistics', UserController.getUserStatistics)
router.get('/:id', UserController.getUserByID)
router.post('/', UserController.addUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)


module.exports = router