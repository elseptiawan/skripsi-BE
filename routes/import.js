var express = require('express');
var router = express.Router();
const {
  importexcel
} = require('../controllers/ImportController');
const multer = require("multer")
const {verifyToken} = require('../middleware/authJWT');

var upload = multer({ dest: "file-excel/" });

// import excel
router.post('/', upload.single("file"), verifyToken, importexcel);

module.exports = router;