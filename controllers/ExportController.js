const {Restoran, Category} = require('../models');
const pdfService = require('../service/pdf-service');
const pdf = require('html-pdf');
const path = require('path');
const fs = require("fs");
const PDFDocument = require("pdfkit-table");

// exports.createPDF = async (req, res) => {
//     try{
//         const restorans = await Restoran.findAll({
//             include: ['category']
//         });
//         pdf.create(pdfTemplate(restorans), {}).toFile('result.pdf', (err) => {
//             if(err) {
//                 res.send(Promise.reject());
//             }
    
//             res.send(Promise.resolve());
//         });
//     } catch (error) {
//         res.status(400).json({success: 'false', message: error});
//     }
// }

exports.fetchPDF = async (req, res) => {
    try{
        var pathFile = path.join(__dirname, '../document.pdf');
        res.sendFile(pathFile);
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.exportPDF = async (req, res) => {
    try{
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=data.pdf`,
          });
          pdfService.buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end()
          );
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}