const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const axios =  require("axios")

module.exports = async (req, res) => {
    console.log("oauth login!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const code = req.body.code
    console.log(req.body)
    console.log(code)

    axios
        .get (
            "https://kapi.kakao.com/v2/user/me",
            {headers : { Authorization : `Bearer ${code}`,
            "Content-Type" : "application/x-www-form-urlencoded" }}
        ).then(async (result)=>{
            const id = result.data.id
            const nickname = result.data.properties.nickname
            const email = result.data.kakao_account.email

            const oauthuser = await user.findOne({
                where : {
                    user_id : id
                }
            })
            
            if (oauthuser){
                console.log("가입된 유저")

                const userInfo = await user.findOne({
                    where: {
                        user_id: id,
                        },
                    });
                
                let payload = {
                    user_id: userInfo.dataValues.user_id,
                    email: userInfo.dataValues.email,
                }
                
                const access_Token = jwt.sign(payload, "1234", { expiresIn: "10h" });
                const refresh_Token = jwt.sign(payload, "5678", { expiresIn: "2days" });
                
                console.log(payload)

                console.log(access_Token)

                res.status(200).cookie("refreshToken", refresh_Token, {
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
            }else{
                console.log("신규 가입 유저")
                user.create(
                    {
                        user_id : id,
                        nickname : nickname,
                        email : email,
                    }
                )

                const userInfo = await user.findOne({
                where: {
                    user_id: id,
                    },
                });

                let payload = {
                    user_id: userInfo.dataValues.user_id,
                    email: userInfo.dataValues.email,
                }

                const access_Token = jwt.sign(payload, "1234", { expiresIn: "10h" });
                const refresh_Token = jwt.sign(payload, "5678", { expiresIn: "2days" });
                
                console.log(payload)

                console.log(access_Token)

                res.status(200).cookie("refreshToken", refresh_Token, {
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
        })
        

};
