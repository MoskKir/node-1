const express = require('express')

const UserController = require('../controllers/user-controller')
const user_controller = new UserController()

const router = new express.Router()

router.get('/', user_controller.getUser)
router.post('/', user_controller.addUser)
router.put('/', user_controller.updateUser)
router.delete('/:id', user_controller.deleteUser)

module.exports = router