const { review, shop, user } = require('../../models');
const Sequelize = require('sequelize');

module.exports = async (req, res) => {
    console.log('create review')


    const newreview = req.body

    review.create(newreview).then( async ()=> { 
            const upreview = await review.findOne({
            where : {
                user_id : newreview.user_id,
                shop_id : newreview.shop_id,
                comment : newreview.comment
            }})

            const averagestar = await review.findAll({
                where : {
                    shop_id : newreview.shop_id
                },
                attributes : 
                    ['shop_id',[Sequelize.fn('AVG', Sequelize.col('star')), 'star_avg']],
                group: 'shop_id'
            })

            const star_avg = averagestar[0].dataValues.star_avg


            const totalreview = await review.findAll({
                where : {
                    shop_id : newreview.shop_id
                },
                attributes : 
                    ['shop_id',[Sequelize.fn('COUNT', Sequelize.col('star')), 'totalreview']],
                group: 'shop_id'
            })

            const totalrev = totalreview[0].dataValues.totalreview


            const userreview = await review.findAll({
                where : {
                    user_id : newreview.user_id
                },
                attributes : 
                    ['user_id',[Sequelize.fn('COUNT', Sequelize.col('star')), 'totalreviewbyuser']],
                group: 'user_id'
            })

            const userreviewcount = userreview[0].dataValues.totalreviewbyuser



            await shop.update({star_avg : star_avg, total_review : totalrev}, {where : {id : newreview.shop_id}}) 
            await user.update({total_review : userreviewcount}, {where : {id : newreview.user_id}}) 

            res.status(200).json({
                message : "new review updated!",
                data : {upreview}
            })

        })
}

