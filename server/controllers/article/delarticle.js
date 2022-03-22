const { users } = require('../../models');

module.exports = async (req, res) => {
    console.log('changeinfo')

    newuserinfo = req.body

    await users.update(newuserinfo, {where : {userid : newuserinfo.userid}})
    .then(res.status(200).json("done!"))

}

