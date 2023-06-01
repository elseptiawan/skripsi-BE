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
router.get('/', index);
// Get By Kategori
router.get('/get-by-category/:category', getByCategory);
// Get by id
router.get('/:id', show);
// Store
router.post('/', verifyToken, store);
// Update
router.put('/:id', verifyToken, update);

module.exports = router;