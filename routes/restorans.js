var express = require('express');
var router = express.Router();
const {
    store,
    update,
    index,
    show,
    getByCategory
  } = require('../controllers/RestoranController');
  const {verifyToken} = require('../middleware/authJWT');

// Get All
router.get('/', verifyToken, index);
// Get By Kategori
router.get('/get-by-category/:category', verifyToken, getByCategory);
// Get by id
router.get('/:id', verifyToken, show);
// Store
router.post('/', verifyToken, store);
// Update
router.put('/:id', verifyToken, update);

module.exports = router;