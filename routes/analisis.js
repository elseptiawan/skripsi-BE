var express = require('express');
var router = express.Router();
const {
  getBatas,
  checkKlasifikasi,
  getJumlah
} = require('../controllers/AnalisisController');

// import excel
router.get('/', getBatas);
// check klasifikasi
router.get('/check/:kecamatan/:category?', checkKlasifikasi);
// get jumlah
router.get('/jumlah/:kecamatan', getJumlah);

module.exports = router;