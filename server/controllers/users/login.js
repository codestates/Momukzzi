const { user } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    console.log("login");

    const userInfo = await user.findOne({
        where: {
        user_id: req.body.user_id,
        password: req.body.password,
        },
    });

    if (!userInfo) {
        console.log(userInfo);
        res.status(400).json({ data: null, message: "not authorized" });
    } else {
        let payload = {
        user_id: userInfo.dataValues.user_id,
        email: userInfo.dataValues.email,
        };
        
        const access_Token = jwt.sign(payload, "1234", { expiresIn: "10h" });
        const refresh_Token = jwt.sign(payload, "5678", { expiresIn: "2days" });

        res
        .status(200)
        .cookie("refreshToken", refresh_Token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json({
            message: "Login success!",
            data: {
            accessToken: access_Token,
            nickname: userInfo.dataValues.nickname,
            },
        });
    }
};
