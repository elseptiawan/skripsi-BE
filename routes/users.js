var express = require('express');
var router = express.Router();
const {
  login
} = require('../controllers/UserController');

// Login
router.post('/login', login);

module.exports = router;
