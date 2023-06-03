const {Category} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

exports.index = async (req, res) => {
    try{
        const categories = await Category.findAll({
            include: ['restorans']
        });

        res.json({message : 'Success Get All Categories', response : categories});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.show = async (req, res) => {
    try{
        const category = await Category.findOne({
            where : {
                kategori_id : req.params.id
            },
            include: ['restorans']
        });

        if(!category) {
            return res.json({message : 'Data not Found'});
        }

        res.json({message : 'Success Get category', response : category});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.store = async (req, res) => {
    const schema = {
        nama : 'string|empty:false'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        const category = await Category.create(req.body);

        res.json({message : 'Success Create Category', response : category});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.update = async (req, res) => {
    const schema = {
        nama : 'string|empty:false'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try{
        var category = await Category.findByPk(req.params.id);

        if(!category) {
            return res.json({message : 'Data not Found'});
        }

        category = await category.update(req.body);

        res.json({message : 'Success Update Category', response : category});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.destroy = async (req, res) => {
    try{
        var kategori = await Category.findByPk(req.params.id);

        if(!kategori) {
            return res.json({message : 'Data not Found'});
        }

        await kategori.destroy();

        res.json({message : 'Success Delete Kategori', response : kategori});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}