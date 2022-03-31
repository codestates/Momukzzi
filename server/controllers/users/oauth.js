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
        ).then((result)=>{
            const nickname = result.data.nickname
            const email = result.email
            console.log(nickname,email)

            res.status(200).json({
                nickname : nickname,
                email : email
            })
            
        })
        

};
