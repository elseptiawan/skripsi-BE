var express = require('express');
var router = express.Router();
const {
    store,
    update,
    index,
    show,
    getByCategory,
    destroy
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
//delete
router.delete('/:id', verifyToken, destroy);

module.exports = router;