const {Restoran} = require('../models');

const { Op } = require("sequelize");

const statistika_deskriptif = async (category = null) => {
    try{
        var jlh_restoran = 0;
        var jlh_per_kecamatan = 0
        if (!category){
            jlh_restoran = await Restoran.count();
            jlh_per_kecamatan = await Restoran.count({
                group: ['kecamatan']
            });
        }

        else{
            jlh_restoran = await Restoran.count({
                where : {
                    kategori_id: category
                }
            });
            jlh_per_kecamatan = await Restoran.count({
                group: ['kecamatan'],
                where : {
                    kategori_id: category
                }
            });
        }

        const rata_rata = jlh_restoran/30;

        var sigma = 0;

            jlh_per_kecamatan.forEach(element => {
                const temp = element['count'] - rata_rata;
                const kuadrat = temp * temp;
                sigma = sigma + kuadrat;
            });

            const standard_deviasi = Math.sqrt(sigma/29);

            const batas_atas = rata_rata + (0.6 * standard_deviasi)
            const batas_bawah = rata_rata - (0.6 * standard_deviasi)

            return {batah_bawah : batas_bawah, batas_atas : batas_atas};
    } catch (error) {
        return {success: 'false', message: error};
    }
}

exports.checkKlasifikasi = async (req, res) => {
    try{
        const batas = await statistika_deskriptif(req.params.category);
        var jlh_restoran = await Restoran.count({
            where : {
                kecamatan : {
                    [Op.like]: req.params.kecamatan
                }
            }
        });

        if(!jlh_restoran){
            jlh_restoran = 0;
        }

        var klasifikasi = '';

        if (jlh_restoran > batas.batas_atas){
            klasifikasi = 'Banyak';
        }
        else if (jlh_restoran < batas.batah_bawah){
            klasifikasi = 'Sedikit';
        }
        else{
            klasifikasi = 'Sedang';
        }

        res.json({response : klasifikasi});
    } catch (error) {
        return {success: 'false', message: error};
    }
}

exports.getJumlah = async (req, res) => {
    try{
        const jumlah = await Restoran.count({
            where : {
                kecamatan : {
                    [Op.like]: req.params.kecamatan
                }
            }
        });

        res.json({response : jumlah});
    } catch (error) {
        return {success: 'false', message: error};
    }
}