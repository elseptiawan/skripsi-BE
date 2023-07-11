const {Restoran, Category, sequelize} = require('../models');
const multer = require("multer")
const excelToJson = require("convert-excel-to-json")
const fs = require("fs-extra")

const { Op } = require("sequelize");
var upload = multer({ dest: "file-excel/" });

exports.importexcel = async (req, res) => {
    try{
        if (!req.file){
          return res.status(400).json({message: "Pilih File yang akan di-import"})
        }

        const file_extension = req.file.originalname.slice(
          ((req.file.originalname.lastIndexOf('.') - 1) >>> 0) + 2
        );

        const array_of_allowed_files = ['xls', 'xlsx'];

        if (!array_of_allowed_files.includes(file_extension)) {
          return res.status(400).json({message: "Format file tidak didukung, Silahkan pilih file xls atau xlsx"});
        }

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

        const t = await sequelize.transaction();

        data.forEach(async (element) => {
          const category = await Category.findOne({
            where: {
              nama: {
                [Op.like]: element["Kategori"],
              },
            }
          });

          await Restoran.create({
            kategori_id: category.kategori_id,
            nama: element["Nama"],
            kecamatan: element["Kecamatan"],
            alamat: element["Alamat"],
            no_sertifikat: element["Nomor Sertifikat"],
            latitude: element["Latitude"],
            longtitude: element["Longtitude"],
          });
        });

        await t.commit();

        res.status(200).json({message: "Success Import Data"});
    } catch (error) {
        await t.rollback();
        res.status(400).json({success: 'false', message: error});
    }
}

const createCategory = async (nama) => {
    const category = await Category.create({
        nama: nama
    });

    return category;
}