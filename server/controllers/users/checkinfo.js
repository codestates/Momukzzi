const { user } = require('../../models');

module.exports = async (req, res) => {
    console.log('changeinfo')

    const newuserinfo = req.body

    const checkid = await user.findOne( 
        {where : {user_id : newuserinfo.user_id}})
        
    const checknick = await user.findOne( 
        {where : {
            user_id : newuserinfo.user_id,
            nickname : newuserinfo.nickname}})


    if (!checknick) {
            res.status(200).json({
            message: "Nickname can be use!"
        })}else{
        res.status(226).json({
            message : "Nickname exist"
        })
        }
}
