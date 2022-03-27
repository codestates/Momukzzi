const { shop, menu, shop_pic, shop_tag, tag,review } = require('../../models');

module.exports = async (req, res) => {
    console.log('get shopinfo')

    const targetshop = await shop.findOne({
        include:[{
            model : menu,
            attributes : ['menu_name','price']
        },
        {
            model : shop_pic,
            attributes : ['pic_URL']
        },
        {
            model : review,
            attributes : ['user_id','comment','star']
        }],

        where: {
            id: req.params.shop_id,
        },
        });

        const taglist = await shop_tag.findAll({
            include :[{
                model : tag,
                attributes : ['tag']
            }],
            where :{
                shop_id : req.params.shop_id
            }
        })

        res.status(200).json({
            message : "shopinfo called!",
            data : {targetshop,taglist}
            }
        )

}

