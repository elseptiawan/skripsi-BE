var express = require('express');
var router = express.Router();
const {
  login,
  token
} = require('../controllers/UserController');
const {verifyToken} = require('../middleware/authJWT');

// Login
router.post('/login', login);

// Check Token
router.get('/token', verifyToken, token);

module.exports = router;
