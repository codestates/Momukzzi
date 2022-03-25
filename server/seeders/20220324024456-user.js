'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];

    for (let i = 1; i < 51; i++) {
      const position = ["FW", "MF", "DF", "GK"];
      let obj = {
        user_id: "user" + i,
        password: 1234,
        email: "user" + i +"@naver.com",
        nickname : "nickname"+i,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      };
      datas.push(obj);
    }

    return queryInterface.bulkInsert("users", datas, {});
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete("users", null, {});
  },
};