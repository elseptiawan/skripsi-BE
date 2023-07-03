const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {User} = require('../models');
const Validator = require('fastest-validator');

const v = new Validator();

exports.login = async(req, res) => {
    const schema = {
        email : 'email',
        password : 'string|min:6'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }

    try {
        var user = await User.scope('withPassword').findOne({
            where:{
                email: req.body.email
            }
        });

        if (!user){
            return res.status(400).json({success: 'false', message: 'Email Tidak ditemukan'});
        }
        const match = await bcrypt.compareSync(req.body.password, user.password);
        if(!match) return res.status(400).json({success: 'false', message: 'Password Salah'});
        const userId = user.id;
        const email = user.email;

        const token = jwt.sign({userId, email}, process.env.API_SECRET, {
            expiresIn: '86400s'
        });

        user = await User.findOne({
            where:{
                email: req.body.email
            }
        });
        
        res.json({success: 'true', response: user, token: token});
    } catch (error) {
        res.status(400).json({success: 'false', message: error});
    }
}

exports.token = async(req, res) => {
    res.json({success: true});
}