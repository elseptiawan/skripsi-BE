var express = require('express');
var router = express.Router();
const {
  store,
  update,
  index,
  show
} = require('../controllers/CategoryController');
const {verifyToken} = require('../middleware/authJWT');

//Get All
router.get('/', verifyToken, index);
// Gey by id
router.get('/:id', verifyToken, show);
// Store
router.post('/', verifyToken, store);
// Update
router.put('/:id', verifyToken, update);

module.exports = router;