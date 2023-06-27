const {Restoran, Category} = require('../models');
const multer = require("multer")
const excelToJson = require("convert-excel-to-json")
const fs = require("fs-extra")

const { Op } = require("sequelize");
var upload = multer({ dest: "file-excel/" });

exports.importexcel = async (req, res) => {
    try{
        var filePath = "file-excel/" + req.file.filename;

        const excelData = excelToJson({
            sourceFile: filePath,
            header: {
                rows: 1
            },
            columnToKey: {
                "*": "{{columnHeader}}"
            }
        });

        fs.remove(filePath);

        const data = excelData.Sheet1

        data.forEach((element) => {
            Category.findOrCreate({
                where: {
                  nama: {
                    [Op.like]: element["Kategori"],
                  },
                },
                defaults: {
                  nama: element["Kategori"],
                },
              }).then(([category]) => {
                Restoran.create({
                  kategori_id: category.kategori_id,
                  nama: element["Nama"],
                  kecamatan: element["Kecamatan"],
                  alamat: element["Alamat"],
                  no_sertifikat: element["Nomor Sertifikat"],
                  latitude: element["Latitude"],
                  longtitude: element["Longtitude"],
                });
              });
          });

        // data.map((element) => { 
        //     (async () => {
        //     const [category, created] = await Category.findOrCreate({
        //             where: {
        //                 nama: {
        //                     [Op.like]: element['Kategori']
        //                 }
        //             },
        //             defaults: {
        //                 nama: element['Kategori']
        //               }
        //         });

        //      const restoran = await Restoran.create({
        //         kategori_id: created ? created.kategori_id : category.kategori_id,
        //         nama: element['Nama'],
        //         kecamatan: element['Kecamatan'],
        //         alamat: element['Alamat'],
        //         no_sertifikat: element['Nomor Sertifikat'],
        //         latitude: element['Latitude'],
        //         longtitude: element['Longtitude']
        //      });
        //      })();
        //   });

        res.status(200).json({message: "Success Import Data"});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

const createCategory = async (nama) => {
    const category = await Category.create({
        nama: nama
    });

    return category;
}