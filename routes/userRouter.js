const express = require('express');
const { signup, login, loginWithCookie, resetPassword, addFriend, removeFriend, logout } = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();


//http://localhost:4000/user/signup
router.post('/signup', signup);
router.post('/login', login);
router.post('/resetpassword', resetPassword);
router.get('/login', loginWithCookie);
router.get('/logout', logout);

router.patch('/addfriend', authController, addFriend);
router.patch('/removefriend', authController, removeFriend);



module.exports = router;