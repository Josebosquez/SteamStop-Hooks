var express = require('express');
var router = express.Router();
var passport = require('passport')

const { createUser, login, getAllUsers} = require('./controller/userController')

router.get('/get-all-users', getAllUsers)

router.post('/create-user', createUser)
router.post('/login', login)

router.get('/logout', function (req, res) {
    res.clearCookie('jwt-cookie');
    res.send('Logged Out!')
})

module.exports = router
