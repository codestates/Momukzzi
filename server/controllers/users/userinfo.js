const { users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
console.log('userinfo');
console.log(req.body)
const logininfo = req.headers.authorization;

    if (logininfo) {
        //요청 들러온 토큰 정리
        const token = logininfo.split(" ")[1];
        const data = jwt.verify(token, "1234", async (err, data) => {
        if (err) {
            res.status(400).json({ data: null, message: "token err" });
        } else if (data) {
            const userInfo = await users.findOne({
                where: {
                    user_id: data.user_id,
                },
            });

            res.status(200).json({ data: { userInfo }});
        }
        });
    } else {
        res.status(400).json({ message: "login first!" });
    }
};
