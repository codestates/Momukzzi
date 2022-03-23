const { users } = require('../../models');

module.exports = async (req, res) => {
    console.log('changeinfo')

    newuserinfo = req.body

    await users.update(newuserinfo, {where : {user_id : newuserinfo.user_id}})
    .then(res.status(200).json("done!"))

}

