const PDFDocument = require('pdfkit-table');
const fs = require("fs-extra");
const {Restoran} = require('../models');


async function buildPDF(dataCallback, endCallback) {
    var restoran = await Restoran.findAll({
        include: ['category']
    });

    let mapRestoran = restoran.map((resto, index) => ({
        no: index+1,
        nama: resto.nama,
        alamat: resto.alamat,
        kategori: resto.category.nama,
    }))

    let doc = new PDFDocument({ margin: 30, size: 'A4' });
    doc.pipe(fs.createWriteStream("./document.pdf"));

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.fontSize(16).text(`Data Restoran Tersertifikasi Halal Oleh MUI di Kota Bandung`, {
        align: 'center'
    });
    doc.moveDown();

    const tableJson = { 
        "headers": [
          { "label":"No", "property":"no", "width":20 },
          { "label":"Nama", "property":"nama", "width":100 },
          { "label":"Alamat", "property":"alamat", "width":320 },
          { "label":"Kategori", "property":"kategori", "width":100 },
        ],
        "datas": mapRestoran,
        "options": {
          "width": 300,
        }
      };
      // the magic
      doc.table(JSON.stringify(tableJson), {
        align: 'center'
      });
      // done!
      doc.end();;
}

module.exports = { buildPDF };