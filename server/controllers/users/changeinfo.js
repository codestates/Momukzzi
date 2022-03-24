const { user } = require('../../models');

module.exports = async (req, res) => {
    console.log('changeinfo')

    const newuserinfo = req.body

    await user.update(newuserinfo, {where : {user_id : newuserinfo.user_id}})
    .then((res) =>{
        if (res){
        res.status(200).json({
        message: "userinfo changed !",
        data: {
            user_id : newuserinfo.user_id
        },
    })}else{
        res.status(400).json({
            message : "not be change",
        })
    }}).catch(
        res.status(400).json({
            message : "not be change",
        }))

}

