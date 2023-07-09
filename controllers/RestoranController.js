const {Restoran} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();
const { Op } = require("sequelize");

exports.index = async (req, res) => {
    try{
        var restorans = await Restoran.findAll({
            include: ['category']
        });

        if(req.query.search) {
            restorans = await Restoran.findAll({
                where : {
                    nama : {
                        [Op.like]: '%' + req.query.search + '%'
                    }
                },
                include: ['category']
            })
        }

        res.json({message : 'Success Get All Restoran', data : restorans});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.getByCategory = async (req, res) => {
    try{
        var restorans = await Restoran.findAll({
            where : {
                kategori_id : req.params.category
            },
            include: ['category']
        });

        if(req.query.search) {
            restorans = await Restoran.findAll({
                where : {
                    kategori_id : req.params.category,
                    nama : {
                        [Op.like]: '%' + req.query.search + '%'
                    }
                },
                include: ['category']
            })
        }

        res.json({message : 'Success Get All Restoran', data : restorans});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.show = async (req, res) => {
    try{
        const restoran = await Restoran.findOne({
            where : {
                id : req.params.id
            },
            include: ['category']
        });

        if(!restoran) {
            return res.json({message : 'Data not Found'});
        }

        res.json({message : 'Success Get Restoran', data : restoran});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.store = async (req, res) => {
    const schema = {
        kategori_id : 'string|empty:false',
        nama : 'string|empty:false',
        kecamatan : 'string|empty:false',
        alamat : 'string|empty:false',
        no_sertifikat : 'string|empty:false',
        latitude : 'string|empty:false',
        longtitude : 'string|empty:false',
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        const restoran = await Restoran.create(req.body);

        res.json({message : 'Success Create Restoran', response : restoran});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.update = async (req, res) => {
    const schema = {
        kategori_id : 'number|convert:true',
        nama : 'string|empty:false',
        kecamatan : 'string|empty:false',
        alamat : 'string|empty:false',
        no_sertifikat : 'string|empty:false',
        latitude : 'string|empty:false',
        longtitude : 'string|empty:false',
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        var restoran = await Restoran.findByPk(req.params.id);

        if(!restoran) {
            return res.json({message : 'Data not Found'});
        }

        restoran = await restoran.update(req.body);

        res.json({message : 'Success Update Restoran', response : restoran});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.destroy = async (req, res) => {
    try{
        var restoran = await Restoran.findByPk(req.params.id);

        if(!restoran) {
            return res.json({message : 'Data not Found'});
        }

        await restoran.destroy();

        res.json({message : 'Success Delete Restoran', response : restoran});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

