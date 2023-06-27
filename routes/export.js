var express = require('express');
var router = express.Router();
const {
  createPDF,
  fetchPDF,
  exportPDF
} = require('../controllers/ExportController');
const multer = require("multer")
const {verifyToken} = require('../middleware/authJWT');

var upload = multer({ dest: "file-excel/" });

// Create PDF
router.get('/create-pdf', exportPDF);
// Fetch PDF
router.get('/fetch-pdf', fetchPDF);

module.exports = router;